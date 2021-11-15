<template>
    <article id="gender">
        <div class="container-fluid">
            <div class="line col-md-12 headline">
                <h2>{{$t('Sneakers for Him and Her')}}</h2>
                <p>{{$t('Thousands of models for men and women at the best price')}}</p>
            </div>
        </div>
        <div class="container-fluid d-none d-lg-block d-md-block">
            <div class="row line d-md-flex">
                <div class="col-md-6 col-sm-6">
                    <nuxt-link no-prefetch :to="sneakerLocalePath('men')" class="img-box">
                        <div class="img-box-content visible">
                            <h2>{{$t("Mens Sneakers")}}</h2>
                            <div class="btn btn-default btn-group-lg">{{$t('Show all')}}</div>
                        </div>
                        <div v-lazy-background lazy-background="~assets/images/mens-sneakers-min.jpg" class="img-box-background men-sneakers-bck"></div>
                    </nuxt-link>
                </div>
                <div class="col-md-6 col-sm-6">
                    <nuxt-link no-prefetch :to="sneakerLocalePath('women')" class="img-box">
                        <div class="img-box-content visible">
                            <h2>{{$t("Womens Sneakers")}}</h2>
                            <div class="btn btn-default btn-group-lg">{{$t('Show all')}}</div>
                        </div>
                        <div v-lazy-background lazy-background="~assets/images/womens-sneakers-min.jpg" class="img-box-background women-sneakers-bck"></div>
                    </nuxt-link>
                </div>
            </div>
        </div>
        <div class="container-fluid d-md-none w-100">
            <div class="swiper-container" ref="genderSwiper">
                <div class="swiper-wrapper">
                    <div class="swiper-slide story-item">
                        <div class="gender-height">
                            <nuxt-link no-prefetch :to="sneakerLocalePath('men')" class="img-box">
                                <div class="img-box-content visible">
                                    <h2>{{$t("Mens Sneakers")}}</h2>
                                    <div class="btn btn-default btn-group-lg">{{$t('Show all')}}</div>
                                </div>
                                <div v-lazy-background lazy-background="~assets/images/mens-sneakers-min.jpg" class="img-box-background men-sneakers-bck"></div>
                            </nuxt-link>
                        </div>
                    </div>
                    <div class="swiper-slide story-item">
                        <div class="gender-height">
                            <nuxt-link no-prefetch :to="sneakerLocalePath('women')" class="img-box">
                                <div class="img-box-content visible">
                                    <h2>{{$t("Womens Sneakers")}}</h2>
                                    <div class="btn btn-default btn-group-lg">{{$t('Show all')}}</div>
                                </div>
                                <div v-lazy-background lazy-background="~assets/images/womens-sneakers-min.jpg" class="img-box-background women-sneakers-bck"></div>
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
        name: "gender",
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
                slidesPerView: 1.2,
                centeredSlides: true,
                spaceBetween: 10,
                loop: true,
                autoplay: {
                    delay: 3500,
                    disableOnInteraction: false,
                },
                pagination: {
                    clickable: true,
                }
            });
        }
    }
</script>
