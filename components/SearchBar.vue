<template>
    <div class="header-top-search" :class="$store.state.headerTopClass">
        <div class="container line row justify-content-start align-items-center">
            <form class="search-form col-md-8 d-flex justify-content-start align-items-center" @submit.prevent="submitSearchForm" method="get">

                <div class="clearable-container">
                    <type-ahead
                        ref="typeAhead"
                        input-class="search-input"
                        :placeholder="$t('placeholders.searchbar', {total: $store.state.totalSneakersCount})"
                        v-on:search="search"
                        :initial="searchString"
                    ></type-ahead>

                    <span class="clearable" v-on:click="clearSearchString" v-show="searchString"></span>
                </div>
                <button type="submit" class="search-button d-flex align-items-center">
                    <search-icon></search-icon>
                    {{$t('Search')}}
                </button>
            </form>
            <div class="viewed col-md-4 d-flex justify-content-end" v-if="viewedList.length > 0">
                <img class="img_rounded mr-2" v-lazy-load :data-src="thumb(viewedList[i - 1])" v-for="i in viewedLength" alt="viewed"/>
                <b-btn @mouseover="showCollapse = true"
                       variant="none"
                       :class="showCollapse ? 'collapsed' : null"
                       aria-controls="viewedCollapse"
                       :aria-expanded="showCollapse ? 'true' : 'false'">
                    {{$t('Last views')}}
                </b-btn>
                <b-collapse
                        id="viewedCollapse"
                        class="position-absolute viewed-collapse"
                        v-model="showCollapse" @mouseleave.native="showCollapse = false">
                    <div class="viewed-container  d-flex">
                        <div class="viewed-swiper-prev" v-if="viewedList.length > 4" ref="prevBtn">
                            <arrow-left-big/>
                        </div>
                        <div class="swiper-container w-100 h-100" ref="viewedSwiper">
                            <div class="swiper-wrapper">
                                <nuxt-link no-prefetch :to="localePath({name: 'product', params : { product : elem.slug}})"
                                           class="d-flex flex-column align-content-center viewed-card swiper-slide mb-2"
                                           v-for="elem in viewedList" :key="elem.slug">
                                    <img v-lazy-load :data-src="thumb(elem)" alt="img"/>
                                    <p class="text-center mb-0">{{elem.brand}}</p>
                                    <p class="text-center name">{{elem.name}}</p>
                                    <div class="viewed-card-footer">
                                        <span class="d-block text-center">{{ elem.numberOfOffers + ' ' +  $t('Offers') }}</span>
                                        <!--<span>{{$t('Price from').toLowerCase()}}</span>-->
                                        <span class="d-block text-center" :class="{'color-red': !getPriceRange(elem)}">
                                            {{ getPriceRange(elem) ? getPriceRange(elem) : $t('sold-out') }}
                                        </span>
                                    </div>
                                </nuxt-link>
                            </div>
                        </div>

                        <div class="viewed-swiper-next" v-if="viewedList.length > 4" ref="nextBtn">
                            <arrow-left-big style="transform: rotate(180deg) scaleY(2.5)"/>
                        </div>
                    </div>
                </b-collapse>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapState, mapGetters} from 'vuex'
    import Swiper from 'swiper'
    import ArrowRight from "./icons/arrow-right";
    import ArrowLeftBig from "./icons/arrow-left-big";
    import SearchIcon from "./icons/search-icon"
    import {filter} from "lodash-core"
    import TypeAhead from "./TypeAhead";

    export default {
        components: {
            TypeAhead, ArrowLeftBig, ArrowRight,SearchIcon,
        },
        data()
        {
            return {
                searchString: this.$store.state.searchString,
                showCollapse: false,
                vSwiper     : null,
            }
        },
        computed  : {
            ...mapState(['totalSneakersCount', 'viewedSneakers']),
            ...mapGetters(['currency']),
            viewedLength()
            {
                return this.viewedList.length < 3 ? this.viewedList.length : 3
            },
            viewedList(){
               return filter(this.viewedSneakers, e=>{ return e.slug !== this.$route.params.product })
            }
        },
        watch     : {
            showCollapse(val)
            {
                if (val) {
                    if (this.viewedSneakers.length > 4) {
                        setTimeout(() => {
                            this.vSwiper = new Swiper(this.$refs.viewedSwiper, {
                                spaceBetween : 20,
                                slidesPerView: 4,
                                loop         : false,
                                navigation   : {
                                    nextEl: this.$refs.nextBtn,
                                    prevEl: this.$refs.prevBtn,
                                },
                            });
                        }, 500);
                    }
                } else {
                    if (this.vSwiper) this.vSwiper.destroy();
                }
            }
        },
        methods   : {
            ...mapActions(['setSearchString']),
            clearSearchString()
            {
                this.$refs.typeAhead.clearString();
                this.search('');
            },
            getPriceRange(element)
            {
                return element['priceRange' + this._.capitalize(this.currency)];
            },
            search(search)
            {
                this.searchString = search;
                document.getElementsByTagName("BODY")[0].scrollIntoView({behavior: "smooth"});
                this.setSearchString(search);
                this.navigateSneaker();
            },
            submitSearchForm(event)
            {
                this.search(event.target.elements.q.value)
            }
        },
    }
</script>
