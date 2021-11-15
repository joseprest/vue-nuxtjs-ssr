<template>
    <div>
        <simple-header/>
        <div class="container-fluid line shops-breadcrumbs">
            <breadcrumbs :items="breadcrumbItems"></breadcrumbs>
        </div>
        <article class="shopinfo" id="shopinfo" v-if="!_.isEmpty(shop)">
            <div class="top">
                <div class="left-top">
                    <div class="wraper wraper-top">
                        <h1 class="name">{{shop.name}}</h1>
                        <client-only>
                            <div class="d-flex flex-wrap align-items-center rating-container">
                                <span class="rating-value">{{ shop.rating }}</span>
                                <star-rating class="d-inline-flex" @rating-selected="setRating" v-bind:read-only="!canUserRate(shop.id)"
                                             v-bind:round-start-rating="false"
                                             v-bind:star-size="30" v-bind:show-rating="false" v-model="rating"></star-rating>
                                <span class="align-self-end rating-text">
                                    <span v-if="shop.rating != 0">
                                        ({{ shop.reviewsCount }} {{ $t('shop-rating')}})
                                    </span>
                                    <span v-else>{{ $t('evaluate-first')}}</span>
                                </span>
                                <span class="mt-2 color-blue w-100" v-if="ratingInfo">{{ ratingInfo }}</span>
                            </div>
                        </client-only>
                        <h2 class="description" v-html="description"></h2>
                        <arrow-right path-class/>
                    </div>
                </div>
                <div class="right-top" v-if="hasImage">
                    <div class="swiper-container">
                        <div class="swiper-wrapper">
                            <template v-for="(image, index) in shop.images">
                                <div class="swiper-slide"><img class="slide-img"
                                                               :data-src="image" v-lazy-load :alt="shop.name + ' photo ' + index"></div>
                            </template>
                        </div>
                        <div class="swiper-pagination"></div>
                    </div>
                </div>
            </div>
            <div class="bottom">
                <div class="left-bottom">
                    <div class="wraper">
                        <h3 class="country">{{$t('countries-abbr.' + shop.country)}}</h3>
                        <span v-html="shop.address"></span>
                    </div>
                </div>
                <div class="right-bottom"></div>
            </div>
        </article>

        <section class="brands-container" v-if="!_.isEmpty(shop.brands)">
            <div class="row line">
                <h2 class="col-12 primary-title mb-3">{{ $t('our-brands') }}</h2>
            </div>
            <div class="row line justify-content-center">
                <template v-for="(brand) in shop.brands">
                    <div class="brand-logo-wrap">
                        <l-img imgClass="brand-logo-img" :src="svg(brand)" :alt="brand"/>
                    </div>
                </template>
            </div>
        </section>

        <article class="shop-coupons container-fluid pl-0 pr-0" id="shop-coupons" v-if="!_.isEmpty(shop.vouchers)">
            <div class="row line">
                <h2 class="shop-coupons-title col-12">{{$t('Coupon codes')}}</h2>
            </div>
            <div class="swiper-container2">
                <div class="swiper-wrapper row line flex-nowrap">
                    <template v-for="voucher in shop.vouchers">
                        <voucher-thumbnail :voucher="voucher" :slide="true"></voucher-thumbnail>
                    </template>
                </div>
                <div class="swiper-pagination2"></div>
            </div>
        </article>

        <article class="container-fluid shop-products" id="shop-products" v-if="!_.isEmpty(shop.sneakers)">
            <div class="row line">
                <h2 class="col-12 shop-products-title">{{$t('Products in our shop')}}</h2>
            </div>
            <div class="row line">
                <client-only>
                    <template v-for="sneaker in shop.sneakers">
                        <sneaker-thumbnail :sneaker="sneaker"></sneaker-thumbnail>
                    </template>
                </client-only>
            </div>
            <div class="row line shop-products-footer">
                <nuxt-link class="button-main" :to="redirectUrl" target="_blank" rel="nofollow">
                    <arrow-right path-class/>
                    <span class="button-main-text">{{$t('go-to-shop', {shop: shop.name})}}</span>
                </nuxt-link>
            </div>
        </article>
    </div>
</template>

<script>
    import Swiper                   from 'swiper';
    import SneakerThumbnail         from "../../../components/Sneakers/Thumbnail";
    import VoucherThumbnail         from "../../../components/Sneakers/VoucherThumbnail";
    import StarRating               from 'vue-star-rating';
    import {mapMutations, mapState} from 'vuex'
    import SimpleHeader             from "../../../components/SimpleHeader";
    import staticMetasMixin         from "../../../plugins/staticMetasMixin"
    import ArrowRight               from "../../../components/icons/arrow-right";
    import Breadcrumbs from "../../../components/Breadcrumbs";

    export default {
        name      : 'Shop',
        components: {ArrowRight, SimpleHeader, SneakerThumbnail, VoucherThumbnail, StarRating, Breadcrumbs},
        props     : ['data'],
        mixins    : [staticMetasMixin],
        middleware: 'loadMeta',
        data      : () => {
            return {
                rating    : 0,
                ratingInfo: ''
            };
        },
        async asyncData({store, params, $axios})
        {
            try {
                let {data} = await $axios.get('shops/' + params.shop);
                return {shop: data}
            }
            catch (e) {
                console.log('shop ', e.response ? e.response.status : e)
            }
        },
        methods   : {

            setRating(rating)
            {
                if (!this._.isEmpty(this.user)) {
                    try {
                        this.$axios.post(`shops/rate`, {shop_id: this.shop.id , rating: rating})
                            .then((response) => {
                                this.rating = +response.data.newRating;
                                this.shop.rating = response.data.newRating;
                                this.shop.reviewsCount += 1;
                                this.$auth.fetchUser()
                            });
                    }
                    catch (e) {
                        console.log('shop rate', e.response ? e.response.status : e)
                    }
                }
            },
            canUserRate(shopId)
            {
                /* user can rate only if he logged in & made a purchase in a specific shop & hadn't rate yet*/
                if (this._.isEmpty(this.user)) {
                    /*  user is not signed in */
                    this.ratingInfo = this.$t('only-registered-users-can-rate');
                    return false;
                }
                //TODO: add if user has made a purchase
                // if(this.user.available_shops_for_rating.contains(shopId))
                //     return true;

                let shopsRatings = this.user.shop_ratings;
                for (let index in shopsRatings) {
                    if (shopsRatings[index].shop_id === shopId) {
                        /*  user already rated this shop */
                        this.ratingInfo = this.$t('already-rated-text');
                        return false;
                    }
                }
                this.ratingInfo = '';
                return true;
            },
        },
        computed  : {
            ...mapState({ currentRouteMetas: 'currentRouteMetas'
               , 'user': state=>state.auth.user}),
            hasImage()
            {
                return !this._.isEmpty(this.shop.images)
            },
            description()
            {
                return this._.isEmpty(this.shop.description[this.$i18n.locale.toUpperCase()]) ?
                    this.shop.description[this.$i18n.locale] : ''
            },
            redirectUrl()
            {
                let query = {
                    to: this.linkToShop,
                    partner: this.shop.name,
                    type: 'shop'
                };
                return this.localePath({name: 'go', query: query })
            },
            linkToShop()
            {
                if (!this._.isEmpty(this.shop.affiliate_link)) {
                    if (this._.startsWith(this.shop.affiliate_link, '?')) {
                        return (this.shop.website + this.shop.affiliate_link)
                    }
                    return this.shop.affiliate_link + encodeURI(this.shop.website);
                }
                return this.shop.website;
            },
            breadcrumbItems(){
                return [
                    {text: 'Home', lnk: this.localePath('index')},
                    {text: this.$t('Shops') , lnk: this.localePath('shops')},
                    {
                        text: this.shop.name,
                        jsonText: this.$t('Shops') + ' ' + this.shop.name,
                        lnk: this.localePath('shops')
                    },

                ]
            },

            schemaBreadcrumbs() {
                let bItems = this.breadcrumbItems.map((item, index)=>{
                    return {
                        "@type": "ListItem",
                        "position": index + 1,
                        "item": {
                            "@id": 'https://sneakers123.com' + item.lnk,
                            "name": (item.jsonText ? item.jsonText: item.text)
                        }
                    }
                })
                return {
                    script: [
                        {
                            hid: 'breadcrumbs',
                            type: 'application/ld+json',
                            innerHTML: JSON.stringify({
                                "@context": "http://schema.org",
                                "@type": "BreadcrumbList",
                                "itemListElement": bItems
                            }, null, 2),
                        },
                    ]
                }
            }
        },
        mounted()
        {
            this.rating = +this.shop.rating;

            let swiper = new Swiper('.swiper-container', {
                spaceBetween  : 0,
                centeredSlides: true,
                autoplay      : {
                    delay               : 3500,
                    disableOnInteraction: false,
                },
                pagination    : {
                    el       : '.swiper-pagination',
                    clickable: true,
                }
            });
            let swiper2 = new Swiper('.swiper-container2', {
                slidesPerView: 2,
                pagination   : {
                    el       : '.swiper-pagination2',
                    clickable: true,
                },
                breakpoints  : {
                    576: {
                        slidesPerView: 1
                    }
                }
            });
        }
    }
</script>

<style scoped>
    h3, h4 {
        font-weight: inherit;
    }
</style>
