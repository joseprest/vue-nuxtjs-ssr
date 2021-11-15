<template>
    <div class="search-suggestions">
        <div class="search-suggestions-container" v-if="searchSuggestions">
            <template v-for="(suggestion) in searchSuggestions">
            <span @click="acceptSuggestion(suggestion)" class="selected-filter-btn">
                <svg width="16px" height="16px" viewBox="0 0 23 23" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                     class="search-svg">
                    <g transform="translate(-274.000000, -23.000000)">
                        <path d="M291.782705,39.0814222 L296.193944,43.492661 C296.776498,44.0752149 296.776498,45.01764 296.193944,45.6001939 C295.61139,46.1827479 294.668965,46.1827479 294.086411,45.6001939 L289.675172,41.1889552 C288.072652,42.3640042 286.095017,43.0552485 283.956335,43.0552485 C278.602671,43.0552485 274.263672,38.7162491 274.263672,33.3625852 C274.263672,28.0089213 278.602671,23.6699219 283.956335,23.6699219 C289.309999,23.6699219 293.648998,28.0089213 293.648998,33.3625852 C293.648998,35.5012672 292.957754,37.4789019 291.782705,39.0814222 Z M283.956335,40.5699502 C287.938114,40.5699502 291.1637,37.3443644 291.1637,33.3625852 C291.1637,29.380806 287.938114,26.1552202 283.956335,26.1552202 C279.974556,26.1552202 276.74897,29.380806 276.74897,33.3625852 C276.74897,37.3443644 279.974556,40.5699502 283.956335,40.5699502 Z"
                              class="search-icon" style="fill: rgb(102,102,102);"></path>
                    </g>
                </svg>
                <span>{{ suggestion }}</span>
            </span>
            </template>
        </div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex';

    export default {
        name : "searchSuggestions",
        props: {
            searchSuggestions: {
                type   : Array,
                default: () => {return []}
            },
        },

        methods: {
            ...mapActions(['setSearchString']),

            async acceptSuggestion(suggestion)
            {
                this.setSearchString(suggestion);
                this.navigateSneaker()
            },
        },
    }
</script>

<style scoped>

</style>