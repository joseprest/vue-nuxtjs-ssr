<template>
    <section class="shops" id="shops">
        <div class="line col-md-12 headline">
            <h2>{{$t('We are proud of our shops')}}</h2>
            <p>{{$t('Over 150 of the hottest sneaker stores worldwide')}}</p>
        </div>
        <div class="row line justify-content-center justify-content-lg-start d-none d-md-flex">
            <div class="col-6 col-md-4 col-lg-2 logo-wrap" v-for="(shop, index) in data" :key="index">
                <nuxt-link no-prefetch :to="localePath({name:'shops-shop', params:{shop:  shop.slug}})">
                    <l-img img-class="shop-logo" :src="shop.logo" :alt="shop.name"></l-img>
                </nuxt-link>
            </div>
        </div>

        <div class="container-fluid d-md-none w-100">
            <div class="swiper-container" ref="shopsSwiper">
                <div class="swiper-wrapper">
                    <div class="swiper-slide story-item" v-for="(shop, index) in data" :key="index">
                        <div class="gender-height">
                            <nuxt-link no-prefetch :to="localePath({name:'shops-shop', params:{shop:  shop.slug}})">
                                <div class="brand-box text-center">
                                    <l-img class="slider-icon" :src="shop.logo" :alt="shop.name"></l-img>
                                </div>
                            </nuxt-link>
                        </div>
                    </div>
                </div>
            </div>
            <div class="swiper-pagination"></div>
        </div>
        <div class="row line trending-footer">
            <nuxt-link no-prefetch tag="button" class="button-main" :to="localePath({name: 'shops'})">
                <arrow-right path-class/>
                <span class="button-main-text">{{$t('View all our shops')}}</span>
            </nuxt-link>
        </div>
    </section>
</template>

<script>
    import {mapState, mapActions} from 'vuex';
    import Swiper                 from 'swiper'
    import ArrowRight             from "../icons/arrow-right";

    export default {
        name      : "homeShops",
        props     : {
            data: {
                type    : Array,
                default: []
            }
        },
        components: {ArrowRight},
        mounted()
        {
            let swiper = new Swiper(this.$refs.shopsSwiper, {
                slidesPerView: 3,
                slidesPerColumn: 2,
                spaceBetween : 10,
                loop         : true,
                pagination   : {
                    clickable: true,
                },
                breakpoints  : {
                    767: {
                        slidesPerView: 4,
                        spaceBetween : 12,
                    },
                    500: {
                        slidesPerView: 3,
                        spaceBetween : 12,
                    },
                    380: {
                        slidesPerView: 2,
                        spaceBetween : 12,
                    }
                }
            });
        }
    }
</script>
