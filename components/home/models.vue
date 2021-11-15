<template>
    <article id="models">
        <div class="container-fluid">
            <div class="line col-md-12 headline">
                <h2>{{$t('All different styles')}}</h2>
                <p>{{$t('Find the hottest sneakers quickly and easily')}}</p>
            </div>
        </div>
        <div class="container-fluid d-none d-lg-block d-md-block">
            <div class="row">
                <div class="col-md-2 col-sm-2 col-xl-2 text-center" v-for="model in models" :key="model.url">
                    <div>
                        <nuxt-link no-prefetch :to="sneakerLocalePath(model.url)" class="img-box-models">
                            <div class="img-box-content-models visible">
                                <h2>{{model.title}}</h2>
                            </div>
                            <img  src="~/assets/icon-def.svg" v-lazy-load :data-src="model.banner" :alt="model.title" class="img-fluid">
                        </nuxt-link>
                    </div>
                </div>
            </div>
        </div>
        <div class="container-fluid d-md-none w-100" v-if="$device.isMobileOrTablet">
            <div class="swiper-container" ref="genderSwiper">
                <div class="swiper-wrapper">
                    <div class="swiper-slide story-item" v-for="model in models" :key="model.url">
                        <div class="gender-height">
                            <nuxt-link no-prefetch :to="sneakerLocalePath(model.url)" class="img-box-models">
                                <div class="img-box-content-models visible">
                                    <h2>{{model.title}}</h2>
                                </div>
                                <img src="~/assets/icon-def.svg" v-lazy-load :data-src="model.banner" :alt="model.title" class="img-fluid">
                            </nuxt-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </article>
</template>

<script>
    import Swiper from 'swiper'

    export default {
        name: "models",
        props:{
            models: {
                type: Array
            }
        },
        data() {
            return {
                searchHover: false,
                sneakerHover: false,
                boxHover: false,
            }
        },
        methods: {
            animIcon(name) {
                this[name] = true
            },
            fixIcon(name) {
                this[name] = false
            }
        },
        mounted() {
            let genderSwiper = new Swiper(this.$refs.genderSwiper, {
                slidesPerView: 2.1,
                centeredSlides: true,
                spaceBetween: 10,
                loop: true,
                autoplay: {
                    delay: 3500,
                    disableOnInteraction: false,
                },
                pagination: {
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
