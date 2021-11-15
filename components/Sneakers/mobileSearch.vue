<template>
    <div class="w-100 mx-12" style="position: relative">
        <div :class="{'mobile-search-bar': show}">
            <div class="search-top d-flex">
                <button class="btn search-close" type="button" @click="search(searchString)" v-if="show">
                    <search-close></search-close>
                </button>
                <form action v-bind:class="{'mobile-search-container': !show }" @submit.prevent="search(searchString)"
                      @click="!show ? showSearchBar() : {}"
                      v-if="getRouteBaseName() !== 'index'" v-bind:style="{width: show ? 'calc(100% - 45px)' : 'calc(100% - 42px)'}">
                    <input ref="search" type="search" :placeholder="$t('Search') + '...'" class="search-top-input"
                           v-model="searchString" >

                    <span class="svg-search-container" v-if="getRouteBaseName() != 'index' && !show">
                        <mobile-search-icon></mobile-search-icon>
                    </span>
                    <span class="clearable" v-on:click="clearSearchString" v-if="searchString && show"></span>
                </form>
                <a class="barcode-button only-on-mobile"  @click.prevent="openBarcodeScannerModal" v-if="$device.isMobileOrTablet && getRouteBaseName() != 'index' && !show">
                    <barcode-icon></barcode-icon>
                </a>
            </div>

            <div class="suggestion-list" v-if="searchString && show">
                <div v-for="suggestion in searchSuggestions">
                    <span v-on:click="search(suggestion)" class="suggestion-list-item">
                        {{ suggestion }}
                        <span class="float-right">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="18pt"
                                 height="12pt" viewBox="0 0 20 20" version="1.1"><g id="surface1"><path
                                    style=" stroke:none;fill-rule:nonzero;fill:rgb(3.529412%,1.960784%,3.529412%);fill-opacity:1;"
                                    d="M 19.757812 18.578125 L 2.84375 1.667969 L 9.167969 1.667969 C 9.628906 1.667969 10 1.292969
                                     10 0.835938 C 10 0.375 9.628906 0 9.167969 0 L 0.832031 0 L 0.515625 0.0664062 L 0.25 0.242188
                                      L 0.242188 0.246094 L 0.238281 0.253906 L 0.0664062 0.515625 L 0 0.835938 L 0 9.167969 C 0 9.628906
                                       0.375 10 0.832031 10 C 1.292969 10 1.667969 9.628906 1.667969 9.167969 L 1.667969 2.847656 L 18.578125
                                        19.757812 C 18.898438 20.078125 19.429688 20.078125 19.757812 19.757812 C 20.082031 19.433594
                                         20.082031 18.902344 19.757812 18.578125 Z M 19.757812 18.578125 "></path></g>
                            </svg>
                        </span>
                    </span>
                </div>
            </div>
            <div class="previous-searches" v-if="!searchString && !_.isEmpty(previousSearches) && show">
                <div class="previous-searches-title">
                    <span>{{ $t('previous-searches')}}</span>
                    <span class="previous-searches-clear float-right" v-on:click="clearPreviousSearches">{{ $t('clear')}}</span>
                </div>
                <div v-for="item in previousSearches">
                    <span class="previous-search-item" v-on:click="search(item)">
                        {{ item }}
                        <span class="float-right">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="18pt"
                                 height="12pt" viewBox="0 0 20 20" version="1.1"><g id="surface1"><path
                                    style=" stroke:none;fill-rule:nonzero;fill:rgb(3.529412%,1.960784%,3.529412%);fill-opacity:1;"
                                    d="M 19.757812 18.578125 L 2.84375 1.667969 L 9.167969 1.667969 C 9.628906 1.667969 10 1.292969
                                     10 0.835938 C 10 0.375 9.628906 0 9.167969 0 L 0.832031 0 L 0.515625 0.0664062 L 0.25 0.242188
                                      L 0.242188 0.246094 L 0.238281 0.253906 L 0.0664062 0.515625 L 0 0.835938 L 0 9.167969 C 0
                                       9.628906 0.375 10 0.832031 10 C 1.292969 10 1.667969 9.628906 1.667969 9.167969 L 1.667969
                                        2.847656 L 18.578125 19.757812 C 18.898438 20.078125 19.429688 20.078125 19.757812 19.757812
                                         C 20.082031 19.433594 20.082031 18.902344 19.757812 18.578125 Z M 19.757812 18.578125 "></path></g>
                            </svg>
                        </span>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters, mapState, mapMutations} from 'vuex';
    import debounce                                         from 'lodash/debounce'
    import BarcodeIcon from "../icons/barcode-icon";
    import SearchClose from "../icons/search-close";
    import MobileSearchIcon from "../icons/mobile-search-icon";
    import axios from 'axios'

    export default {
        name    : "mobileSearch",
        components: {MobileSearchIcon, SearchClose, BarcodeIcon},
        props   : {
            fixed: {
                type   : Object,
                default: () => {return {};}
            },
            show : {
                type   : Boolean,
                default: () => {return false;}
            }
        },
        computed: {
            ...mapState(['previousSearches']),
        },
        data()
        {
            return {
                searchString: this.$store.state.searchString,
                searchSuggestions : []
            }
        },
        watch   : {
            searchString: debounce(function (val) {
                this.getSuggestion()
            }, 200)
        },
        methods : {
            ...mapActions(['setSearchString']),
            ...mapMutations(['setPreviousSearches', 'clearPreviousSearches']),

            getSuggestion()
            {
                if(this.searchString) {
                   this.$axios.get(process.env.apiUrl + 'search-suggestion?q=' + this.searchString).then(({data}) => {
                        this.searchSuggestions = data;
                    }).catch((e) => {
                        console.log('Suggestion error: ' + e)
                    });
                }
            },
            search(search)
            {
                this.setSearchString(search);
                this.navigateSneaker();
                this.$emit('toggle-search-bar', {'value': false})
            },
            clearSearchString()
            {
                this.searchString = '';
                this.$refs.search.focus();
            },
            showSearchBar()
            {

                this.$emit('toggle-search-bar', {'value': true});
                this.$nextTick(()=>{
                    this.$refs.search.focus();
                })

            }
        }
    }
</script>

<style scoped>

</style>