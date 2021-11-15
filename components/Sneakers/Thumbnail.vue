<template>
    <section ref="thumb" :class="'sneaker-thumbnail col-6 col-md-3 ' + (results ? '' : 'col-xl-3') + ' mp6'" class="card-container"
             @mouseover="handleProductHover"
             @mouseleave="handleProductLeave">
        <nuxt-link no-prefetch :to="localePath({name: 'product', params : { product : selectedSneaker.slug}, query: query })" class="card">
            <div class="card-buttons">
                <p class="discount" v-if="sneaker.sale">
                    <span class="discount-number">{{sneaker.percentage}}</span>%
                </p>
                <alert-button :sneaker="sneaker" v-show="!sneaker.sold_out"></alert-button>
                <favorite-button :sneaker="sneaker"/>
            </div>
            <div class="product-photo" >
                    <client-only>
                        <img class="product-photo-img" :data-src="thumb(selectedSneaker)" v-lazy-load
                             :alt="selectedSneaker.brand + ' ' + selectedSneaker.name + ' ' + selectedSneaker.sku">
                        <img class="product-photo-img" src="~/assets/img/sneakers123-thumb.jpg" slot="placeholder">
                    </client-only>
            </div>
            <div class="transition-info-container" :style="getTransformStyles">
                <div class="product-names">
                    <div class="product-title">{{sneaker.brand}}</div>
                    <div class="product-series">{{selectedSneaker.name}}</div>
                    <div class="product-mark">{{selectedSneaker.sku}}</div>
                </div>
                <div class="product-properties product-icons">
                    <div>
                        <p>{{$t('Found at')}}<br>
                            <span class="card-product-footer shop-count" :class="{'red': selectedSneaker.sold_out, 'orange': selectedSneaker.coming_soon}">
                          {{selectedSneaker.sold_out ? $t('sold-out') : selectedSneaker.shop_count + ' ' + $t('shops')}}
                      </span>
                        </p>
                    </div>
                    <div>
                        <p>{{$t('Price from')}}<br>
                            <span class="card-product-footer price-info">{{releasePrice(selectedSneaker)}}</span>
                        </p>
                    </div>
                </div>
                <div class="product-details" :style="getProductStyles" @mouseleave="handleRelatedLeave" @mo>
                    <div class="related-products-container">
                        <span class="related-item" v-for="relatedProduct in sneaker.related"
                              @mouseover="handleRelatedHover($event, relatedProduct)">
                            <nuxt-link no-prefetch :to="localePath({name: 'product', params : { product : relatedProduct.slug}, query: query })">
                                <img v-lazy-load :data-src="relatedProduct.thumbnail_url" />
                            </nuxt-link>
                        </span>
                    </div>
                    <span class="available-sizes-text mt-1 mb-2" v-if="hasManyAvailableSizes">
                        {{ $t('several-sizes-available') }}
                    </span>
                    <span class="d-inline-block mb-2" v-else>
                        <span class="small-size-container" v-for="size in getAvailableSizes">
<!--                            <nuxt-link no-prefetch :to="localePath({name: 'product', params : { product : selectedSneaker.slug}, query: sizeQuery(size) })">-->
                                {{ size }}
<!--                            </nuxt-link>-->
                        </span>
                    </span>
                </div>
            </div>
        </nuxt-link>
    </section>
</template>

<script>
    import AlertButton    from "./AlertButton";
    import FavoriteButton from "./FavoriteButton";
    import {mapState}     from "vuex";

    export default {
        name      : 'SneakerThumbnail',
        props     : ['sneaker', 'results'],
        components: {FavoriteButton, AlertButton},
        data      : () => {
            return {
                transformContainerStyles: {},
                productDetailsStyles    : {},
                selectedRelatedInfo     : null,
            }
        },
        computed  : {
            ...mapState(['sizeFormat']),
            query()
            {
                let query = {};
                if (this.$route.query.sizes)
                    query.sizes = this.$route.query.sizes;
                return query;
            },
            hasManyAvailableSizes()
            {
                return (this.selectedSneaker.sizes_eu.length >= 6 || this.selectedSneaker.sizes_us.length >= 6 || this.selectedSneaker.sizes_uk.length >= 6) ||
                    this.selectedSneaker.sizes_eu.length === 0 && this.selectedSneaker.sizes_us.length === 0 && this.selectedSneaker.sizes_uk.length === 0;
            },
            getAvailableSizes()
            {
                let roundedSizes = [];
                let sizes = this.selectedSneaker['sizes_' + this.sizeFormat];
                for (let size in sizes) {
                    let roundedSize = Math.floor(sizes[size]);
                    if (!roundedSizes.includes(roundedSize))
                        roundedSizes.push(roundedSize);
                }
                return roundedSizes;
            },
            selectedSneaker()
            {
                return this.selectedRelatedInfo ? this.selectedRelatedInfo : this.sneaker;
            },
            getProductStyles()
            {
                return this.productDetailsStyles;
            },
            getTransformStyles()
            {
                return this.transformContainerStyles;
            },
        },
        mounted(){
            if(this.$device.isDesktop) {
                let observer = new IntersectionObserver(this.handleIntersection);
                this.$nextTick(() => {
                    observer.observe(this.$refs.thumb);
                })
            }
        },
        methods   : {
            handleIntersection(entries, observer) {
                entries.map((entry) => {
                    if (entry.isIntersecting) {
                        this.loadRelated();
                        observer.unobserve(entry.target);
                    }
                });
            },
            loadRelated(){
                this.$axios.get('releases/related/' + this.sneaker.slug,
                    { progress: false }).then(({data})=>{
                    this.sneaker.related = data;
                })
            },
            sizeQuery(size)
            {
                let query = {};
                let existingSizes = this.$route.query.sizes || [];
                if (!existingSizes.includes(size))
                    query.sizes = !this._.isEmpty(existingSizes)
                        ? existingSizes + ',' + this.sizeFormat + size
                        : this.sizeFormat + size;
                else
                    query.sizes = existingSizes;
                return query;
            },
            handleProductHover(event)
            {
                if (event.currentTarget.className.includes("card-container")) {
                    if (window.innerWidth > 991.98) {
                        this.transformContainerStyles = {'transform': this._.isEmpty(this.sneaker.related) ? 'translateY(-30px)' : 'translateY(-64px)'};
                        this.productDetailsStyles = {'height': this._.isEmpty(this.sneaker.related) ? '-30px' : '-64px'};
                    }
                }
            },
            handleProductLeave(event)
            {
                if (event.currentTarget.className.includes("card-container")) {
                    this.transformContainerStyles = {};
                    this.productDetailsStyles = {};
                }
            },
            handleRelatedHover(event, product)
            {
                if (event.currentTarget.className.includes("related-item"))
                    this.selectedRelatedInfo = product;
            },
            handleRelatedLeave(event)
            {
                if (event.currentTarget.className.includes("product-details"))
                    this.selectedRelatedInfo = null;
            },
        },
    }
</script>
