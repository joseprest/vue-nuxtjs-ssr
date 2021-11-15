<template>
    <div class="slider col-12 brands-slider">
        <div class="swiper-button-next">
            <arrow-right pathClass/>
        </div>
        <div class="swiper-button-prev">
            <arrow-right pathClass/>
        </div>
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <template v-for="brand in brands">
                    <a class="swiper-slide" :href="brandPath(brand.brand)" @click.prevent="brandClick(brand)">
                        <img class="slider-icon" v-lazy-load :data-src="svg(brand.slug)" :alt="brand.brand">
                    </a>
                </template>
            </div>
            <div class="swiper-pagination"></div>
        </div>
    </div>
</template>

<script>
    import Swiper       from 'swiper'
    import {mapActions} from 'vuex'
    import ArrowRight from "../icons/arrow-right";

    export default {
        name   : "brandsSwiper",
        components: {ArrowRight},
        props  : ['brands'],
        mounted()
        {
            let swiper = new Swiper('.swiper-container', {
                slidesPerView: 6,
                spaceBetween : 10,
                loop         : true,
                autoHeight   : true,
                navigation   : {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                pagination   : {
                    el       : '.swiper-pagination',
                    clickable: true,
                },
                breakpoints  : {
                    1024: {
                        slidesPerView: 4,
                        spaceBetween : 24,
                    },
                    767 : {
                        slidesPerView: 2,
                        spaceBetween : 24,
                    },
                    584 : {
                        slidesPerView: 2,
                        spaceBetween : 12,
                    },
                    320 : {
                        slidesPerView: 2,
                        spaceBetween : 12,
                    }
                }
            });
        },
        methods: {
            ...mapActions(['addBrandClick']),
            brandClick(brand)
            {
              //  this.addBrandClick(brand.brand)
                this.$router.push( this.sneakerLocalePath(brand.slug))
            }
        }
    }
</script>

<style scoped>

</style>