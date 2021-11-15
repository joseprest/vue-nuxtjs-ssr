<template>
    <div>
        <simple-header :headerData="headerData" :subHeader="subHeader"/>
        <div class="container-fluid line categories-breadcrumbs">
            <breadcrumbs :items="breadcrumbItems" class="breadcrumbs-bg"></breadcrumbs>
            <b-alert show dismissible variant="danger" v-if="$route.query.not_found">
                {{$t('product-not-found', {product: $route.query.not_found})}}
            </b-alert>
        </div>
        <article class="container-fluid categories row line" id="categories">

            <aside class="col-lg-2 col-12 sidebar">
                <div class="mobile-filters-container">
                    <b-btn v-b-toggle.collapseMobileSort class="filter-button" @click="mobileSort">
                        <sort-icon/>
                        {{$t( "sort." + querySort)}}
                    </b-btn>
                    <b-btn v-b-toggle.collapseFilter class="filter-button" @click="mobileFilters">
                        <filter-icon/>
                        {{$t('Filter')}}
                    </b-btn>
                </div>

                <b-collapse class="filter-menu filter-menu-2" id="collapseMobileSort"  @hidden="hiddenSidebar">
                    <div class="filter-header col-12">
                        <p class="filter-header-title">
                            {{$t('Sort by')}}
                            <span v-if="hasSelectedFilters" class="option-text" v-on:click="resetLocalQueries">
                                <span class="vertical-divider"></span>
                                {{$t('reset-all')}}
                            </span>
                        </p>
                    </div>

                    <div class="filters-container">
                        <div class="sort-content">
                            <label class="container-box" @click.prevent="querySort = 'relevant'">{{ $t('sort.relevant') }}
                                <input type="checkbox" :checked="querySort === 'relevant'">
                                <span class="checkmark"></span>
                            </label>
                            <label class="container-box" @click.prevent="querySort = 'latest'">{{ $t('sort.latest') }}
                                <input type="checkbox" :checked="querySort === 'latest'">
                                <span class="checkmark"></span>
                            </label>
                            <label class="container-box" @click.prevent="querySort = 'low'">{{ $t('sort.low') }}
                                <input type="checkbox" :checked="querySort === 'low'">
                                <span class="checkmark"></span>
                            </label>
                            <label class="container-box" @click.prevent="querySort = 'high'">{{ $t('sort.high') }}
                                <input type="checkbox" :checked="querySort === 'high'">
                                <span class="checkmark"></span>
                            </label>
                        </div>
                    </div>

                    <div class="filter-footer">
                        <b-button v-b-toggle="'collapseMobileSort'" class="filter-toggler" v-on:click="mobileSort">
                            <span class="arrow-left">
                                <close-large-icon/>
                            </span>
                            <span class="filter-footer-title">
                                {{ $t('close') }}
                            </span>
                        </b-button>
                    </div>
                </b-collapse>

                <b-collapse  class="filter-menu filter-menu-2 hidden-on-mobile" :visible="!isMobile" id="collapseFilter" @hidden="hiddenSidebar">
                    <div class="filter-header col-12">
                        <p class="filter-header-title">
                            {{$t('Filter')}}
                            <span v-if="hasSelectedFilters" class="option-text" v-on:click="resetLocalQueries">
                                <span class="vertical-divider"></span>
                                {{$t('reset-all')}}
                            </span>
                        </p>
                    </div>
                    <div class="filters-container">
                        <div class="filters-content">
                            <div class="col-12 col-md-12 col-lg-12 pl-0 pr-0">
                                <div class="filter-group">
                                    <p class="filter-group-title">
                                        <a href v-b-toggle.sizeGroup @click.prevent>{{$t('Size')}}
                                            <span class="filter-arrow">
                                                <arrow-down-small/>
                                            </span>

                                            <span class="selected-filters-list">
                                                {{ getSelectedFilterValues('sizes') }}
                                            </span>
                                        </a>
                                    </p>
                                    <b-collapse class="collapse-on-mobile" id="sizeGroup" :visible="!isMobile">
                                        <small>
                                            <size-format-selector></size-format-selector>
                                        </small>
                                        <template v-for="size in actualSizes">
                                            <label class="container-size">
                                                <input type="checkbox" name="group3[]" :value="sizeFormat + size" v-model="querySizes">
                                                <span class="label-text" v-html="size"></span>
                                                <span class="checkmark"></span>
                                            </label>
                                        </template>
                                        <span class="toggle-sizes-btn" v-on:click="toggleIntermediateSizes">{{ $t('toggle-intermediate-sizes')}}</span>
                                    </b-collapse>
                                </div>
                            </div>
                            <div class="col-12 col-md-12 col-lg-12 pl-0 pr-0">
                                <div class="filter-group">
                                    <p class="filter-group-title">
                                        <a href v-b-toggle.brandGroup @click.prevent>{{$t('Brand')}}
                                            <span class="filter-arrow">
                                                <arrow-down-small/>
                                            </span>
                                            <span class="selected-filters-list">
                                                {{ getSelectedFilterValues('brands') }}
                                            </span>
                                        </a>
                                    </p>
                                    <b-collapse class="collapse-on-mobile" id="brandGroup" :visible="!isMobile">
                                        <template v-for="brand in brands">
                                            <label class="container-box">{{brand.brand}}
                                                <input type="checkbox" name="group4[]" :value="brand.slug" v-model="queryBrands">
                                                <span class="checkmark"></span>
                                            </label>
                                        </template>
                                    </b-collapse>
                                </div>
                            </div>
                            <div class="col-12 col-md-12 col-lg-12 pl-0 pr-0">
                                <div class="filter-group">
                                    <p class="filter-group-title">
                                        <a href v-b-toggle.genderGroup @click.prevent>{{$t('Gender')}}
                                            <span class="filter-arrow">
                                                <arrow-down-small/>
                                            </span>

                                            <span class="selected-filters-list">
                                                {{ getSelectedFilterValues('gender') }}
                                            </span>
                                        </a>
                                    </p>
                                    <b-collapse class="collapse-on-mobile" id="genderGroup" :visible="!isMobile">
                                        <label class="container-box">{{$t('filters.men') | upper}}
                                            <input type="checkbox" name="group2[]" value="men" v-model="queryGender">
                                            <span class="checkmark"></span>
                                        </label>
                                        <label class="container-box" >{{$t('filters.women') | upper}}
                                            <input type="checkbox" name="group2[]" value="women" v-model="queryGender">
                                            <span class="checkmark"></span>
                                        </label>
                                    </b-collapse>
                                </div>
                            </div>
                            <div class="col-12 col-md-12 col-lg-12 pl-0 pr-0">
                                <div class="filter-group filter-group-color">
                                    <p class="filter-group-title">
                                        <a href v-b-toggle.colorGroup @click.prevent>{{$t('Color')}}
                                            <span class="filter-arrow">
                                                <arrow-down-small/>
                                            </span>

                                            <span class="selected-filters-list">
                                                {{ getSelectedFilterValues('color') }}
                                            </span>
                                        </a>
                                    </p>
                                    <b-collapse class="collapse-on-mobile" id="colorGroup" :visible="!isMobile">
                                        <template v-for="color in colors">
                                            <label class="container-color" >
                                                <input type="checkbox" name="group5[]" :value="color" v-model="queryColor">
                                                <span :class="'checkmark ' + color"></span>
                                            </label>
                                        </template>
                                    </b-collapse>
                                </div>
                            </div>

                            <div class="col-12 col-md-12 col-lg-12 pl-0 pr-0">
                                <div class="filter-group">
                                    <p class="filter-group-title">
                                        <a href v-b-toggle.saleGroup @click.prevent>{{$t('Sale')}}
                                            <span class="filter-arrow">
                                                <arrow-down-small/>
                                            </span>

                                            <span class="selected-filters-list">
                                                {{ getSelectedFilterValuesSale() }}
                                            </span>
                                        </a>
                                        <i class="fa" aria-hidden="true"></i>
                                    </p>
                                    <b-collapse class="collapse-on-mobile" id="saleGroup" :visible="!isMobile">
                                        <label class="container-box" @click="resetDiscount(-1)">{{$t('filters.sale')}}%
                                            <input type="checkbox" name="group2[]" value="sale" v-model="queryFilters" >
                                            <span class="checkmark"></span>
                                        </label>
                                        <template v-for="amount in [20,50,70]" >
                                            <label class="container-box" @click="resetDiscount(amount)">{{$t('discount-from', {amount: amount})}}
                                                <input type="radio" name="group2[]" :value="amount" v-model="queryDiscountFrom" >
                                                <span class="checkmark"></span>
                                            </label>
                                        </template>
                                    </b-collapse>
                                </div>
                            </div>

                            <div class="col-12 col-md-12 col-lg-12 pl-0 pr-0">
                                <div class="filter-group">
                                    <p class="filter-group-title">
                                        <a href v-b-toggle.filterGroup @click.prevent>{{$t('Filter')}}
                                            <span class="filter-arrow">
                                                <arrow-down-small/>
                                            </span>

                                            <span class="selected-filters-list">
                                                {{ getSelectedFilterValues('filters') }}
                                            </span>
                                        </a>
                                        <i class="fa" aria-hidden="true"></i>
                                    </p>
                                    <b-collapse class="collapse-on-mobile" id="filterGroup" :visible="!isMobile">
                                        <label class="container-box">{{$t('filters.trending')}}
                                            <input type="checkbox" name="group1[]" value="trending" v-model="queryFilters">
                                            <span class="checkmark"></span>
                                        </label>
                                        <!--                                        <label class="container-box" >{{$t('filters.sale')}}%-->
                                        <!--                                            <input type="checkbox" name="group1[]" value="sale" v-model="queryFilters">-->
                                        <!--                                            <span class="checkmark"></span>-->
                                        <!--                                        </label>-->
                                        <label class="container-box" >{{$t('filters.free_shipping')}}
                                            <input type="checkbox" name="group1[]" value="free_shipping" v-model="queryFilters">
                                            <span class="checkmark"></span>
                                        </label>
                                        <!--                                        <label class="container-box" >{{$t('filters.available')}}-->
                                        <!--                                            <input type="checkbox" name="group1[]" value="available" v-model="queryFilters">-->
                                        <!--                                            <span class="checkmark"></span>-->
                                        <!--                                        </label>-->
                                        <label class="container-box" >{{$t('filters.vegan')}}
                                            <input type="checkbox" name="group1[]" value="vegan" v-model="queryFilters">
                                            <span class="checkmark"></span>
                                        </label>
                                    </b-collapse>
                                </div>
                            </div>


                        </div>
                    </div>
                    <div class="filter-footer">
                        <b-button v-b-toggle="'collapseFilter'" class="filter-toggler" v-on:click="mobileFilters">
                            <span class="arrow-left">
                                <svg width="15px" height="15px" viewBox="0 0 19 20" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                    <g transform="translate(-326.000000, -25.000000)" fill="white">
                                        <path d="M326.585248,43.7650981 C327.08059,44.2604402 327.881928,44.2604402 328.376707,
                                        43.7650981 L335.561703,36.5801017 L342.7467,43.7650981 C343.253312,44.1370274 343.953215,
                                        44.082365 344.395586,43.6354864 C344.835702,43.190862 344.88642,42.4909588 344.512236,
                                        41.9866002 L337.32724,34.8016038 L344.512236,27.6166073 C344.906143,27.1122488 344.859934,
                                        26.3926221 344.409111,25.9412352 C343.957724,25.4904119 343.238097,25.4442025 342.733738,
                                        25.8381094 L335.548742,33.0231058 L328.363746,25.8381094 C327.859387,25.4442025 327.13976,
                                        25.4904119 326.688373,25.9412352 C326.23755,26.3926221 326.191341,27.1122488 326.585248,
                                        27.6166073 L333.770244,34.8016038 L326.585248,41.9866002 C326.098358,42.4796882 326.098358,
                                        43.2720102 326.585248,43.7650981 Z"></path>
                                    </g>
                                    </g>
                                </svg>
                            </span>
                            <span class="filter-footer-title">
                                {{ newResultNumber ? $t('labels-show-results', {total: loadedSneakers.total}) : $t('close') }}
                            </span>
                        </b-button>
                    </div>
                </b-collapse>
            </aside>

            <div class="col-lg-10 row mr-0 ml-0 pl-0 pr-0 products-list" id="products-list">
                <component :is="headerData.image ? 'p':'h1'" class="col-12 search-title" v-if="filledSearchString">{{startCase(filledSearchString)}}
                    <span class="clear-round-icon" v-if="searchString" v-on:click="clearSearchString">
                    <close-small-icon/>
                </span>
                </component>

                <search-suggestions :searchSuggestions="loadedSneakers.searchSuggestions"/>
                <applied-filters @remove-filter="removeFilter"/>

                <template v-if="_.isEmpty(queryCategory) && (hasSelectedFilters || searchString) && filteredSuggestions.length > 0">
                    <p class="col-12 search-text mt-3">{{$t('Categories that are more relevant to your search')}}</p>

                    <suggestions-swiper :suggestions="filteredSuggestions"></suggestions-swiper>
                    <div class="col-12 under-slider-line">
                        <hr class="hr-line" noshade size="1">
                    </div>
                </template>

                <template v-else-if="!hasSelectedFilters && !searchString && brandsSlider">
                    <p class="col-12 search-text mb-2 font-weight-bold">{{ $t('our-brands') }}</p>
                    <client-only>
                    <brands-swiper :brands="brands"></brands-swiper>

                        <div style="width:100%; display: flex;margin-left:24px" slot="placeholder" >
                            <suggestion-swipper-placeholder  style="width:calc(25%-12); margin-right: 24px;height:80px"></suggestion-swipper-placeholder>
                            <suggestion-swipper-placeholder  style="width:calc(25%-12);margin-right: 24px;height:80px"></suggestion-swipper-placeholder>
                            <suggestion-swipper-placeholder  style="width:calc(25%-12);margin-right: 24px;height:80px"></suggestion-swipper-placeholder>
                            <suggestion-swipper-placeholder  style="width:calc(25%-12);margin-right: 24px;height:80px"></suggestion-swipper-placeholder>
                        </div>
                    </client-only>
                </template>

                <div class="row w-100">
                    <div class="sort" id="sorting">
                        <div class="col-md-6">
                            <p class="showing-text">{{$t('labels.showing', {total: loadedSneakers.total})}}</p>
                        </div>
                        <div class="sort-group col-md-6">
                            <p class="sort-text">{{$t('Sort by')}}:</p>
                            <b-dropdown
                                    toggle-class="sort-button"
                                    menu-class=""
                                    variant="none"
                                    boundary="window">
                                <template v-slot:button-content>
                                    <arrow-down-large-icon/>
                                    <span class="sort-button-text">{{$t('sort.' + $store.state.queries.sort )}}</span>
                                </template>
                                <b-dropdown-item @click.prevent="querySort = 'relevant'">{{$t('sort.relevant')}}</b-dropdown-item>
                                <b-dropdown-item @click.prevent="querySort = 'latest'">{{$t('sort.latest')}}</b-dropdown-item>
                                <b-dropdown-item @click.prevent="querySort = 'high'">{{$t('sort.high')}}</b-dropdown-item>
                                <b-dropdown-item @click.prevent="querySort = 'low'">{{$t('sort.low')}}</b-dropdown-item>
                            </b-dropdown>
                        </div>
                    </div>
                </div>
                    <template v-if="placeSneaker(i)" v-for="(sneaker, i) in loadedSneakers.data"  >
<!--                        <client-only>-->
                            <sneaker-thumbnail :sneaker="sneaker" :key="sneaker.id" results></sneaker-thumbnail>
<!--                        </client-only>-->
                    </template>
                    <template v-else>
<!--                        <client-only>-->
                        <advertisement-thumbnail  :banner="getBanner(i)"/>
<!--                        </client-only>-->
                    </template>
                <div class="product-footer container-fluid" v-if="loadedSneakers.total > 0">
                    <p v-show="isMobile" class="hidden-on-desktop progress-title">{{$t('labels.viewed', {total: loadedSneakers.total , viewed: numberOfLoaded } )}}</p>
                    <div  v-show="isMobile" class="hidden-on-desktop progress">
                        <div class="progress-bar" role="progress bar" :style="'width:' + progress + '%'"
                             :aria-valuenow="numberOfLoaded" aria-valuemin="0" :aria-valuemax="loadedSneakers.total"></div>
                    </div>
                    <button  class="hidden-on-desktop button-main" @click.prevent="nextPage()"
                            v-show="isMobile && loadedSneakers.current_page < loadedSneakers.last_page">
                        <arrow-down-large-icon/>
                        <span class="button-main-text">{{$t('labels.loadmore', {item: 'Sneakers'} )}}</span>
                    </button>

                    <pagination v-show="!isMobile" class="hidden-on-mobile"></pagination>
                </div>
                <div class="product-footer container-fluid" v-if="loadedSneakers.total === 0">
                    <p class="progress-title">{{$t('No sneakers found matching your criteria')}}</p>
                </div>
            </div>

            <div class="mobile-filter-overlay" v-if="isMobile && (isMobileFiltersVisible || isMobileSortVisible)"></div>
        </article>
        <div class="info-description py-5 col-12" v-if="seoText &&  loadedSneakers.data && loadedSneakers.data.length < 61">
            <div class="row line">
                <link-parser :content="seoHTML"/>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters, mapMutations, mapState} from 'vuex'
    import debounce                                         from 'lodash/debounce'

    import SneakerThumbnail       from "./Thumbnail";
    import AppliedFilters         from "./appliedFilters";
    import SizeFormatSelector     from "./SizeFormat";
    import SuggestionsSwiper      from "./suggestionsSwiper";
    import BrandsSwiper           from "./brandsSwiper";
    import SimpleHeader           from "../SimpleHeader";
    import SearchSuggestions      from "./searchSuggestions"
    import ArrowDownLargeIcon     from "../icons/arrow-down-large-icon";
    import SortIcon               from "../icons/sort-icon";
    import FilterIcon             from "../icons/filter-icon";
    import CloseLargeIcon         from "../icons/close-large-icon";
    import ArrowDownSmall         from "../icons/arrow-down-small";
    import CloseSmallIcon         from "../icons/close-small-icon";
    import AdvertisementThumbnail from "../AdvertisementThumbnail";
    import LinkParser             from "../linkParser";
    import {capitalize, indexOf, toLower, remove, without, upperFirst, map, endsWith} from "lodash-core";
    import SuggestionSwipperPlaceholder from "../placeholders/suggestion-swipper";
    import Breadcrumbs from "../Breadcrumbs";
    import Pagination from "./Pagination";

    export default {
        name      : "sneakersMain",
        fetchOnServer: true,
        props     : {
            fixed       : {
                type   : Boolean,
                default: () => {return false}
            },
            brandsSlider: {
                type   : Boolean,
                default: false
            },
            headerData  : {
                type   : Object,
                default: () => {
                    return {
                        title: '',
                        image: ''
                    }
                }
            },
            seoText     : {
                type   : String,
                default: () => {return ''}
            },
            breadcrumbItems :{
                type: Array
            }
        },
        components: {
            Pagination,
            Breadcrumbs,
            SuggestionSwipperPlaceholder,
            LinkParser,
            AdvertisementThumbnail,
            CloseSmallIcon, ArrowDownSmall, ArrowDownLargeIcon, SortIcon, FilterIcon, CloseLargeIcon,
            SimpleHeader, SuggestionsSwiper, BrandsSwiper, SizeFormatSelector, AppliedFilters, SneakerThumbnail, SearchSuggestions,
        },
        data()
        {
            return {
                lastBannerPage        : 1,
                advertisementPositions: {},
                isMobile              : this.$device.isMobileOrTablet,
                loaded                : false,
                isMobileFiltersVisible: false,
                isMobileSortVisible   : false,
                newResultNumber       : null,
                waitForOtherFilters   : false,
                colors               : ["black", "blue", "white", "grey", "lyellow", "red", "orange", "yellow", "green", "marine",
                    "dark-grey", "light-grey", "pink", "greenyellow", "rainbow"],
                sizes                : {
                    eu: ["<17", "18", "18.5", "19", "19.5", "20", "20.5", "21", "21.5", "22", "22.5", "23", "23.5", "24", "24.5", "25",
                        "25.5", "26", "26.5", "27", "27.5", "28", "28.5", "29", "29.5", "30", "30.5", "31", "31.5", "32", "32.5", "33",
                        "33.5", "34", "34.5", "35", "35.5", "36", "36.5", "37", "37.5", "38", "38.5", "39", "39.5", "40", "40.5", "41",
                        "41.5", "42", "42.5", "43", "43.5", "44", "44.5", "45", "45.5", "46", "46.5", "47>"],
                    us: ["1", "1.5", "2", "2.5", "3", "3.5", "4", "4.5", "5", "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5",
                        "10", "10.5", "11", "11.5", "12", "12.5", "13", "13.5", "14", "14.5", "15", "15.5", "16", "16.5", "17", "17.5",
                        "18", "18.5", "19", "19.5", "20>"],
                    uk: ["1", "1.5", "2", "2.5", "3", "3.5", "4", "4.5", "5", "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5",
                        "10", "10.5", "11", "11.5", "12", "12.5", "13", "13.5", "14", "14.5", "15", "15.5", "16", "16.5", "17",
                        "17.5", "18", "18.5", "19>"]
                },
                showIntermediateSizes: false
            }
        },
        computed  : {
            ...mapState(['filters', 'sizeFormat', 'brands',
                 'searchString', 'totalSneakersCount', 'totalShopsCount', 'loadedSneakers']),
            ...mapGetters(['currency']),
            numberOfLoaded(){
              let loaded = this.loadedSneakers.current_page * this.loadedSneakers.per_page;
              return (loaded > this.loadedSneakers.total) ? this.loadedSneakers.total: loaded;
            },
            seoHTML()
            {
                return this.replaceShopAndSneakerCount(this.seoText )
            },
            subHeader()
            {
                try {
                    return {
                        minPrice  : this.loadedSneakers.aggregations_result['min_price_' + this.currency].value,
                        shopsCount: this.loadedSneakers.aggregations_result.total_shops.value,
                        totalCount: this.loadedSneakers.total
                    }
                }
                catch (e) {
                    return {}
                }
            },
            filteredSuggestions()
            {
                return this.loadedSneakers.suggestions
                    ? this.loadedSneakers.suggestions
                        .filter(elem => this.$route.path.indexOf(elem.url) === -1)
                        .sort((a, b) => b.clicks - a.clicks)
                    : [];
            },
            progress()
            {
                return this.numberOfLoaded * 100 / this.loadedSneakers.total
            },
            hasSelectedFilters()
            {
                return this.queryFilters.length || this.queryGender.length || this.querySizes.length
                    || this.queryColor.length || this.queryBrands.length || this.querySort !== 'relevant' || this.queryDiscountFrom>0;
            },
            filledSearchString()
            {
                let text = {};
                text["brands"] = this.queryBrands.map(e => this.brandNameBySlug(e)).join(' & ');
                text["gender"] = this.queryGender.map(e => this.$t('filters.' + e)).join(' & ');
                text["color"] = this.queryColor.map(e => this.$t('filters.' + e)).join(' & ');
                text["sizes"] = this.querySizes.map(e => { return e.substr(2); }).join(' & ');

                // category
                if(this.queryCategory.length){
                    if(this.queryCategory[0].includes(text["brands"])){
                        text["brands"] = this.queryCategory;
                    }else
                        text["brands"] += ' ' + this.queryCategory
                }
                if(this.queryDiscountFrom > 1)
                    text["discount_from"] = this.$t('discount-from', {amount: this.queryDiscountFrom} );

                this.queryFilters.forEach(el => {
                    text[el] = this.$t('filters.' + el);
                });

                // this.fillAppliedFilters();

                let q = this.searchString;

                if (q) {
                    this._.each(this.brands, brand => {
                        let pattern = new RegExp(brand.brand, "gi");
                        q = this.queryBrands.includes(brand.slug) ? q.replace(pattern, '') : q;
                    })
                    this._.each(this.colors, color => {
                        let pattern = new RegExp(this.$t('filters.' + color), "gi");
                        q = this.queryColor.includes(color.toLowerCase()) ? q.replace(pattern, '') : q;
                    })
                }
                text["q"] = this._.trim(q.replace(/"\s*(.*?)\s*"/g, '"$1"'));
                text = this._.pickBy(text, t => { return t});
                if (!this._.isEmpty(text)) {
                    return this.fix(this.$t('sneaker-title-general', this.querySizes.length > 1, text));
                }
                return 'Sneaker';
            },
            actualSizes(){
                if (this.showIntermediateSizes)
                    return this.sizes[this.sizeFormat];
                else {
                    let sizes = this.sizes[this.sizeFormat];
                    let intermediateSizes = [];
                    for (let index in sizes) {
                        let containsDot = sizes[index].indexOf('.');
                        if (containsDot === -1)
                            intermediateSizes.push(sizes[index]);
                    }
                    return intermediateSizes;
                }
            },
            queryFilters:{
                set: debounce(function (value){
                    this.$store.commit('changeQuery', {field: 'filters', data: value})
                    if(!this.waitForOtherFilters)
                        this.navigateSneaker();
                }, 200),
                get(){
                    return this.$store.state.queries.filters
                }
            },
            queryGender:{
                set: debounce(function (value){
                        this.$store.commit('changeQuery', {field: 'gender', data: value})
                        if(!this.waitForOtherFilters)
                            this.navigateSneaker();
                    }, 200),
                get(){
                    return this.$store.state.queries.gender
                }
            },
            querySizes:{
                set: debounce(function (value){
                    this.$store.commit('changeQuery', {field: 'sizes', data: value})
                    if(!this.waitForOtherFilters)
                        this.navigateSneaker();
                }, 200),
                get(){
                    return this.$store.state.queries.sizes
                }
            },
            queryColor:{
                set: debounce(function (value){
                    this.$store.commit('changeQuery', {field: 'color', data: value})
                    if(!this.waitForOtherFilters)
                        this.navigateSneaker();
                }, 600),
                get(){
                    return this.$store.state.queries.color
                }
            },
            queryBrands:{
                set: debounce(function (value){
                    this.$store.commit('changeQuery', {field: 'brands', data: value})
                    if(!this.waitForOtherFilters)
                        this.navigateSneaker();
                }, 200),
                get(){
                    return this.$store.state.queries.brands
                }
            },
            queryCategory:{
                set: debounce(function (value){
                    this.$store.commit('changeQuery', {field: 'category', data: value})
                    if(!this.waitForOtherFilters)
                        this.navigateSneaker();
                }, 200),
                get(){
                    return this.$store.state.queries.category
                }
            },
            querySort:{
                set: debounce(function (value){
                    this.$store.commit('changeQuery', {field: 'sort', data: value})
                    if(!this.waitForOtherFilters)
                        this.navigateSneaker();
                }, 200),
                get(){
                    return this.$store.state.queries.sort
                }
            },
            queryDiscountFrom:{
                set: debounce(function (value){
                     if(value !== -1) {
                        this.$store.commit('changeQuery', {field: 'discount_from', data: value})
                        if(!this.waitForOtherFilters)
                            this.navigateSneaker();
                     }else{
                         this.$store.commit('changeQuery', {field: 'discount_from', data: 0})
                     }
                }, 200),
                get(){
                    return this.$store.state.queries.discount_from
                }
            },
            queryPage:{
                set: debounce(function (value){
                    this.$store.commit('changeQuery', {field: 'page', data: value})
                    if(!this.waitForOtherFilters)
                        this.navigateSneaker();
                }, 10),
                get(){
                    return this.$store.state.queries.page
                }
            },
        },
        methods   : {
            ...mapMutations(['changeQuery','resetQueries', 'setNextPage', 'setSearchString','setLoadingMoreSneakers']),
            toggleIntermediateSizes() {
                this.showIntermediateSizes = !this.showIntermediateSizes;
            },
            startCase(text) {
                return map(text.split(' '), upperFirst).join(' ')
            },
            resetDiscount(amount)
            {
              if(amount == this.queryDiscountFrom)
                  this.queryDiscountFrom = 0;
              else{
                  if(amount === -1)
                      this.queryDiscountFrom = -1;
              }
            },
            resetLocalQueries() {
                this.waitForOtherFilters = true;
                this.querySort = 'relevant';
                this.querySizes = [];
                this.queryColor = [];
                this.queryBrands = [];
                this.queryFilters = [];
                this.queryGender = [];
                this.queryCategory = [];
                this.queryDiscountFrom = 0;
                this.navigateSneaker().then(()=>{
                    this.waitForOtherFilters = false;
                })
            },
            getBanner(position)
            {
                if (this.loadedSneakers.banners)
                    return this.loadedSneakers.banners[this.advertisementPositions[position]];
            },
            placeSneaker(position)
            {
                if(this._.isEmpty(this.loadedSneakers.banners))
                    return true;

                if (this._.isEmpty(this.advertisementPositions)) {
                    let initialRandom = Math.floor(Math.random() * (3 - 1 + 1) + 1);
                    this.advertisementPositions[initialRandom] = 0;
                }
                /* show banner only if total sneakers result >= 5 */
                if (this.loadedSneakers.total < 5)
                    return true;

                let currentPage = this.$store.state.queries.page;
                if (currentPage === this.lastBannerPage) {
                    if (position in this.advertisementPositions) {
                        this.setNextPosition(position);
                        return false;
                    }
                } else if ((currentPage - this.lastBannerPage) === 3) {
                    /* show banner again */
                    if (position in this.advertisementPositions) {
                        this.lastBannerPage = currentPage;
                        this.setNextPosition(position);
                        return false;
                    }
                } else if (position in this.advertisementPositions)
                    return false;

                return true;
            },
            setNextPosition(position)
            {

                let nextPosition = position + 3 * 60;
                if (!(nextPosition in this.advertisementPositions)) {
                    let keys = Object.keys(this.advertisementPositions).map(function (item) {
                        return +item;
                    });
                    let maxKey = Math.max(...keys);
                    this.advertisementPositions[nextPosition] = this.getNextBannerIndex(this.advertisementPositions[maxKey]);
                }
            },
            getNextBannerIndex(currentBannerIndex)
            {
                let nextBannerIndex = currentBannerIndex + 1;
                if (this.loadedSneakers.banners && nextBannerIndex > this.loadedSneakers.banners.length - 1) {
                    nextBannerIndex = 0;
                }
                return nextBannerIndex;
            },
            async clearSearchString()
            {
                this.setSearchString('');
                this.navigateSneaker();
            },
            getSelectedFilterValues(filter)
            {
                let filtersList = [];
                let filters = this.$store.state.queries[filter]
                if(filter === 'filters')
                    filters = without(filters, 'sale');

                for (let item in filters) {
                    filtersList.push((filter != 'sizes' && filter != 'brands')
                        ? this.$t('filters.' + this.$store.state.queries[filter][item])
                        : filter == 'brands'
                            ? this.brandNameBySlug(this.$store.state.queries[filter][item])
                            : this.$store.state.queries[filter][item]);
                }
                if (filtersList) {
                    let value = filtersList.join(', ');
                    if (value.length > 25)
                        value = value.substring(0, 25) + '...';
                    return value;
                }
                return '';
            },
            getSelectedFilterValuesSale()
            {
                let text = '';
                if(indexOf(this.queryFilters, 'sale') > -1)
                    text += this.$t('filters.sale');
                if(this.queryDiscountFrom > 0)
                    text += ', ' + this.$t('discount-from', {amount: this.queryDiscountFrom});
                return text
            },
            mobileFilters()
            {
                this.isMobileFiltersVisible = !this.isMobileFiltersVisible;
                if (this.isMobileFiltersVisible) {
                    this.newResultNumber = null;
                }
            },
            mobileSort()
            {
                this.isMobileSortVisible = !this.isMobileSortVisible;
            },
            delStyle()
            {
                // if (document.getElementById('collapseFilter'))
                //     document.getElementById('collapseFilter').removeAttribute('style');
            },
            hiddenSidebar()
            {
                // this.delStyle();
            },
            removeFilter({key, item, filter, index})
            {
               if(key === 'discount_from') {
                   this.queryDiscountFrom = 0;
                   return
               }
               let arr = [...filter];
                arr.splice(index, 1);
                this['query' + this._.capitalize(key)] = arr
            },
            nextPage()
            {
               this.setLoadingMoreSneakers(true);
               this.setNextPage();
               this.navigateSneaker();
            },
            fix(str)
            {
                return this._.replace(str, /[\s]{2,}/gi, ' ').trim();
            },
            checkResize()
            {
                if(window.innerWidth < 991.99)
                    this.isMobile = true;
                else
                    this.isMobile = false;
            },
            linkGen(pageNum)
            {
                let path = this.$route.path.replace(/\/page\/.*/gm, '');
                if((path+'/' === this.sneakerRootPage().path) && pageNum ===1)
                    path = path + '/';

                let pagePath =  pageNum === 1 ? path : path + (endsWith(path, '/') ? '':'/') + 'page/' + pageNum;
                return this.$route.fullPath.replace(this.$route.path, pagePath)
            },
        },
        inheritAttrs: true,
        mounted()
        {
            this.delStyle();
            this.lastBannerPage = this.$store.state.queries.page;

            // if (window.innerWidth < 991.99)
            //     this.isMobile = true;
            // this.$nextTick(function() {
            //     window.addEventListener('resize', this.checkResize);
            // })
        },
        beforeDestroy() {
            this.$store.commit('setLoadedSneakers', {});
            window.removeEventListener('resize', this.checkResize);
        },
        head(){
            let pagLinks = [];
            if(this.loadedSneakers.current_page > 1)
               pagLinks.push({hid: 'rel-prev', rel: 'prev', href: 'https://sneakers123.com' + this.linkGen(this.loadedSneakers.current_page-1)})
            if(this.loadedSneakers.current_page < this.loadedSneakers.last_page)
               pagLinks.push( {hid: 'rel-next', rel: 'next', href: 'https://sneakers123.com' + this.linkGen(this.loadedSneakers.current_page + 1)})
            return {
                link: pagLinks
            }

        }
    }
</script>

<style scoped>
</style>