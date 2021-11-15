<template>
    <div>
        <simple-header/>
        <div>
            <section id="product-detail">
                <breadcrumbs :items="breadcrumbItems"></breadcrumbs>
                <div class="container-fluid line product-section">
                    <info></info>
                    <main-section/>
                    <div class="info-description py-5 col-12" v-if="sneaker.metas.seo_description">
                        <div class="row line">
                            <link-parser :content="sneaker.metas.seo_description"/>
                        </div>
                    </div>
                </div>
            </section>
            <lazy-hydrate when-visible>
                <article class="suggestion" id="suggestion">
                    <div class="line">
                        <h2 class="suggestion-title">{{$t('You might also like')}}</h2>
                    </div>
                    <div class="line row">
                        <template v-for="related in sneaker.related">
                            <sneaker-thumbnail :sneaker="related"></sneaker-thumbnail>
                        </template>
                    </div>
                </article>
            </lazy-hydrate>
        </div>
    </div>
</template>

<script>
    import Info from "../../components/Details/Info";
    import SneakerThumbnail from "../../components/Sneakers/Thumbnail";
    import MainSection from "../../components/Details/MainSection";
    import Breadcrumbs from "../../components/Breadcrumbs";
    import SimpleHeader from "../../components/SimpleHeader";
    import {mapGetters, mapState, mapMutations, mapActions} from "vuex";
    import shippingMixin from '../../plugins/shippingMixin';
    import productDetailsSchema from '../../plugins/product-details-schema';
    import {isEmpty} from "lodash-core";
    import LinkParser from "../../components/linkParser";

    export default {
        name      : "index",
        validate ({ params }) {
            return (/-/.test(params.product) && !/\//.test(params.product))
        },
        mixins    : [shippingMixin],
        components: {LinkParser, SimpleHeader, Breadcrumbs, SneakerThumbnail, Info, MainSection},
        async asyncData({store, params, $axios, app, redirect, error})
        {
            try {
                let {data} = await $axios.get('releases/' + params.product + `?locale=${app.i18n.locale}&location=${store.state.location.code}`);
                return {sneaker: data, products: data.products}
            }
            catch (e) {
                console.log('prod ', e.response ? e.response.status : e);
            }
        },
        data()
        {
            return {
                sizes_eu         : [],
                sizes_us         : [],
                sizes_uk         : [],
                products         : [],
                filters          : {
                    featured   : [],
                    notFeatured: []
                },
                shipping         : {
                    free    : false,
                    country : false,
                    included: false
                },
                loadMore         : false,
                currentImageIndex: 0,
            }
        },
        created(){
            this.setSneaker();
        },
        mounted()
        {
            this.addLastViewed();
        },
        methods   : {
            filter()
            {
                this.resetFilters();
                //this.setProducts();
                this.filterSize();
                // this.filterShipping();
            },
            filterSize()
            {
                if (!this._.isEmpty(this.sizes_eu) || !this._.isEmpty(this.sizes_us) || !this._.isEmpty(this.sizes_uk)) {
                    let filter = (p) => {
                        let intersectionResultEu = false;
                        let intersectionResultUs = false;
                        let intersectionResultUk = false;
                        for (let index in this.sizes_eu) {
                            if (this.sizes_eu[index])
                                intersectionResultEu = intersectionResultEu || this._.intersection(p.sizes.eu, [this.sizes_eu[index].toString()]).length;
                        }
                        for (let index in this.sizes_us) {
                            if (this.sizes_us[index])
                                intersectionResultUs = intersectionResultUs || this._.intersection(p.sizes.us, [this.sizes_us[index].toString()]).length;
                        }
                        for (let index in this.sizes_uk) {
                            if (this.sizes_uk[index])
                                intersectionResultUk = intersectionResultUk || this._.intersection(p.sizes.uk, [this.sizes_uk[index].toString()]).length;
                        }
                        return intersectionResultEu || intersectionResultUs || intersectionResultUk;
                    };
                    this.addFilter('featured', filter);
                    this.addFilter('notFeatured', filter);
                }
            },
            filterShipping()
            {
                this._.each(this.shipping, (key, value)=>{
                    if (value) {
                        if (key === 'free')
                            this.filterFreeShipping();
                        // if (key === 'included')
                        //     this.filterIncludedShipping();
                        if (key === 'country')
                            this.filterShippingInMyCountry();
                    }
                });
            },
            filterShippingInMyCountry()
            {
                this.products = this._.filter(this.products, (p) => {
                    let countryCode = this.$store.state.location.code;
                    let rules = p.shop.shipping_rules;
                    rules = this._.filter(rules, (rule) => {
                        return rule.country_code === countryCode;
                    });
                    return rules.length > 0;
                });
            },
            filterFreeShipping()
            {
                this.products = this._.filter(this.products, (p) => {
                    let countryCode = this.$store.state.location.code;
                    let rules = p.shop.shipping_rules;
                    let currentProductPrice = p.sale_price ? p.sale_price : p.price;

                    this._.filter(rules, (rule) => {
                        if (rule.country_code === countryCode) {
                            if (rule.minimum === 0 && rule.costs > 0)
                                return false;
                            if (rule.minimum !== 0 && currentProductPrice >= rule.minimum)
                                return true;
                        }
                    });
                    return false;
                });
            },
            applyFilter(collection, product)
            {
                let result = true;
                this._.each(this.filters[collection], (filter) => {
                    if (!filter(product))
                        result = false
                });

                return result;
            },
            addFilter(collection, filter)
            {
                this.filters[collection].push(filter);
            },
            resetFilters()
            {
                this.filters.featured = [];
                this.filters.notFeatured = [];
            },
            setSneaker()
            {
                this.filter();
                this.loadMore = false;
                this.currentImageIndex = 0;

            },
            // setProducts()
            // {
            //     this.products = this._.orderBy(this.sneaker.products, ['available', p => {
            //         let rank = 0;
            //         if (p.shop.position === 'Featured')
            //             rank += 50;
            //         if (p.shop.position === 'Top')
            //             rank += 40;
            //         if (p.shop.position === 'Highlighted')
            //             rank += 10;
            //         return rank;
            //     }, 'price_eur', 'sold_out'], ['desc', 'desc', 'asc', 'asc'])
            // },
            customFilteredProducts(result)
            {
                //
                let availableResult = result.filter((element) => !element.sold_out && !element.coming_soon);
                let sortedResult = availableResult.sort((a, b) => {

                    let currency = this.$store.state.currency;
                    let salePriceProp = 'sale_price_' + currency;
                    let priceProp = 'price_' + currency;
                    let priceA = a[salePriceProp] != 0 ? a[salePriceProp] : a[priceProp];
                    let priceB = b[salePriceProp] != 0 ? b[salePriceProp] : b[priceProp];

                    return (priceB > priceA) ? -1 : (priceB < priceA ? 1 : 0);
                });
                sortedResult = sortedResult.sort((a, b) => {
                    if (a.shop.countdowns.length > 0 && a.shop.countdowns[0].is_active &&
                        (a.shop.countdowns[0].brand === this.sneaker.brand ||
                            a.shop.countdowns[0].release_id === this.sneaker.id))
                        return -1
                });
                return sortedResult.concat(result.filter((element) => element.coming_soon), result.filter((element) => element.sold_out));
            },
            countDownOffers() {
                let result = this._.filter(this.products, (p) => {
                    return ((p.shop.countdowns.length > 0) &&  p.shop.countdowns[0].is_active)
                });
                return result // this.customFilteredProducts(result);
            },
            async addLastViewed()
            {
                await  this.$store.restored;
                this.$store.dispatch('addViewedSneaker', {
                    brand         : this.sneaker.brand,
                    name          : this.sneaker.name,
                    image         : this.sneaker.image,
                    priceRangeEur : this.priceRange(this.sneaker, 'eur'),
                    priceRangeUsd : this.priceRange(this.sneaker, 'usd'),
                    priceRangeJpy : this.priceRange(this.sneaker, 'jpy'),
                    priceRangeGbp : this.priceRange(this.sneaker, 'gbp'),
                    numberOfOffers: this._.size(this.sneaker.products),
                    slug          : this.sneaker.slug
                });
            }
        },
        computed  : {
            breadcrumbItems()
            {
                let snkr = this.sneaker || {};
                let name = snkr.name;
                let sku = snkr.sku;
                let brand = snkr.brand;
                let category = snkr.category;
                let bcrumbs =  [
                    {
                        text: 'Home', lnk: this.localePath({name:'index'})
                    },
                    {
                        text: 'Sneakers', lnk: this.sneakerRootPage().path
                    },
                    {
                        text: brand, jsonText: brand + ' Sneakers', lnk: this.brandPath(brand)
                    }
                ];
                if(!isEmpty(category)) {
                    bcrumbs.push({
                        text: category.title.replace(brand, '').trim(),
                        jsonText: brand + ' ' + category.title.replace(brand, '').trim() + ' Sneakers',
                        lnk: this.sneakerLocalePath(category.url)
                    })
                }

                bcrumbs.push({
                    text: name + ' ' + sku ,
                    jsonText: brand+ ' ' + name + ' ' + sku ,
                    lnk: this.$route.path});
                return bcrumbs;
            },
            countDownOffer() {
                let result = this._.filter(this.products, (p) => {
                    return (p.shop.countdowns.length > 0) // && p.available
                });
                result = this._.filter(result, p => {
                    return ((p.shop.countdowns[0].brand === this.sneaker.brand ||
                        p.shop.countdowns[0].release_id === this.sneaker.id)
                        && p.shop.countdowns[0].is_active)
                });
                return result // this.customFilteredProducts(result);
            },
            featured() {
                let result = this._.filter(this.products, (p) => {
                    return (this.applyFilter('featured', p) && ((p.shop.position === 'Featured' && p.available)))
                });
                return this.customFilteredProducts(result);
            },
            notFeatured() {
                let result = this._.filter(this.products, (p) => {
                    return  (this.applyFilter('notFeatured', p) && (p.shop.position !== 'Featured' || !p.available))
                });
                return this.customFilteredProducts(result);
            },
            fullName()
            {
                return this.sneaker.brand + ' ' + this.sneaker.name;
            },
            priceText() {
                return this.releasePrice(this.sneaker) ?
                    this.$t('From').toLowerCase() + ' ' + this.releasePrice(this.sneaker) : ' '
            },
            pageTitle() {
                return this.sneaker.metas.title ? this.sneaker.metas.title :
                     this.fullName + ' ' + this.sneaker.sku + ' ' + this.priceText;
            },
            pageDescription() {
                if(this.sneaker.metas.description)
                    return this.sneaker.metas.description;

                let msg =this.$t('product-page-description') || 'sneakers123.com';
                const params = {
                    fullName: this.fullName,
                    sku: this.sneaker.sku,
                    price: this.releasePrice(this.sneaker) || ' ',
                    shopsCount: this.featured.length + this.notFeatured.length,
                    brand: this.sneaker.brand
                };
                for (let key in params) {
                    msg = msg.replace(`%{${key}}`, params[key]);
                }
                return msg
                // this.$t('product-page-description', )
            },
        },
        watch     : {
            'shipping': {
                handler()
                {
                    this.filter();
                },
                deep: true
            },
            'sizes_eu'()
            {
                this.filter();
            },
            'sizes_uk'()
            {
                this.filter();
            },
            'sizes_us'()
            {
                this.filter();
            },
        },
        head() {
            let product = {
                ...this.sneaker,
                url: 'https://sneakers123.com' + this.$route.path,
                description: this.pageDescription
            };
            const hid = 'productSchema';
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
                title: this.pageTitle,
                meta: [
                    {hid: 'description', name: 'description', content: this.pageDescription},
                    {hid: 'og:title', property: 'og:title', content: this.pageTitle},
                    {hid: 'og:description', property: "og:description", content: this.pageDescription},
                    {hid: 'og:image', property: "og:image", content: this.sneaker.image},
                    {hid: 'og:image:width', property: "og:image:width", content: 800},
                    {hid: 'og:image:height', property: "og:image:height", content: 800},
                    { hid: 'robots', name: 'robots', content: (this.sneaker.seo_index ? 'all':'noindex') }
                ],
                link: this.alternateLinks,
                script: [
                    {
                        hid,
                        type: 'application/ld+json',
                        innerHTML: JSON.stringify(productDetailsSchema(product,this.$store.state.currency), null, 2),
                    },
                    {
                        hid: 'breadcrumbs',
                        type: 'application/ld+json',
                        innerHTML: JSON.stringify({
                            "@context": "http://schema.org",
                            "@type": "BreadcrumbList",
                            "itemListElement": bItems
                        }, null, 2),
                    },
                ],
                __dangerouslyDisableSanitizers: ['script']
            }
        },
        beforeRouteUpdate(to, from, next)
        {
            this.addLastViewed();
            next();
        }
    }
</script>

<style scoped>

</style>
