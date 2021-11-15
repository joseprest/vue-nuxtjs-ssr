<template>
    <article id="brands">
        <div class="container-fluid">
            <div class="line col-md-12 headline">
                <h2>🔥 {{$t('Top Sneaker Brands')}}</h2>
                <p>{{$t('The most important brands on Sneakers123')}}</p>
            </div>
        </div>
        <div class="container-fluid d-none d-lg-block d-md-block">
            <div class="row line brand-box-row margin20">
            <div class="col-md-2 col-xs-3 col-sm-3 col-3">
                <nuxt-link no-prefetch :to="sneakerLocalePath('nike')" title="Nike Sneakers" class="brand">
                    <div class="brand-box text-center">
                        <l-img imgClass="img-fluid"  src="~/assets/img/brands/nike.svg" alt="Nike Sneakers"/>
                    </div>
                </nuxt-link>
            </div>
            <div class="col-md-2 col-xs-3 col-sm-3 col-3">
                <nuxt-link no-prefetch :to="sneakerLocalePath('adidas')" title="adidas Sneakers" class="brand">
                    <div class="brand-box text-center">
                        <l-img imgClass="img-fluid"  src="~/assets/img/brands/adidas.svg" alt="Adidas Sneakers"/>
                    </div>
                </nuxt-link>
            </div>
            <div class="col-md-2 col-xs-3 col-sm-3 col-3">
                <nuxt-link no-prefetch :to="sneakerLocalePath('jordan')" title="Jordan Sneakers" class="brand">
                    <div class="brand-box text-center">
                        <l-img imgClass="img-fluid"  src="~/assets/img/brands/jordan.svg" alt="Jordan Sneakers"/>
                    </div>
                </nuxt-link>
            </div>
            <div class="col-md-2 col-xs-3 col-sm-3 col-3">
                <nuxt-link no-prefetch :to="sneakerLocalePath('asics')" title="asics Sneakers" class="brand">
                    <div class="brand-box text-center">
                        <l-img imgClass="img-fluid"  src="~/assets/img/brands/asics.svg" alt="Asics Sneakers"/>
                    </div>
                </nuxt-link>
            </div>
            <div class="col-md-2">
                <nuxt-link no-prefetch :to="sneakerLocalePath('vans')" title="Vans Sneakers" class="brand">
                    <div class="brand-box text-center">
                        <l-img imgClass="img-fluid"  src="~/assets/img/brands/vans.svg" alt="Vans Sneakers"/>
                    </div>
                </nuxt-link>
            </div>
            <div class="col-md-2">
                <nuxt-link no-prefetch :to="sneakerLocalePath('veja')" title="Veja Sneakers" class="brand">
                    <div class="brand-box text-center">
                        <l-img imgClass="img-fluid"  src="~/assets/img/brands/veja.svg" alt="Veja Sneakers"/>
                    </div>
                </nuxt-link>
            </div>
        </div>
            <div class="row line brand-box-row margin20">
                <div class="col-md-2">
                    <nuxt-link no-prefetch :to="sneakerLocalePath('puma')" title="Puma Sneakers" class="brand">
                        <div class="brand-box text-center">
                           <l-img imgClass="img-fluid"  src="~/assets/img/brands/puma.svg" alt="Puma Sneakers"/>
                        </div>
                    </nuxt-link>
                </div>
                <div class="col-md-2">
                    <nuxt-link no-prefetch :to="sneakerLocalePath('new-balance')" title="New Balance Sneakers" class="brand">
                        <div class="brand-box text-center">
                            <l-img imgClass="img-fluid"  src="~/assets/img/brands/new_balance.svg" alt="New Balance Sneakers"/>
                        </div>
                    </nuxt-link>
                </div>
                <div class="col-md-2">
                    <nuxt-link no-prefetch :to="sneakerLocalePath('converse')" title="Converse Sneakers" class="brand">
                        <div class="brand-box text-center">
                            <l-img imgClass="img-fluid"  src="~/assets/img/brands/converse.svg" alt="Converse Sneakers"/>
                        </div>
                    </nuxt-link>
                </div>
                <div class="col-md-2">
                    <nuxt-link no-prefetch :to="sneakerLocalePath('toms')" title="Toms Sneakers" class="brand">
                        <div class="brand-box text-center">
                            <l-img imgClass="img-fluid"  src="~/assets/img/brands/toms.svg" alt="Toms Sneakers"/>
                        </div>
                    </nuxt-link>
                </div>
                <div class="col-md-2">
                    <nuxt-link no-prefetch :to="sneakerLocalePath('saucony')" title="Saucony Sneakers" class="brand">
                        <div class="brand-box text-center">
                            <l-img imgClass="img-fluid"  src="~/assets/img/brands/saucony.svg" alt="Saucony Sneakers"/>
                        </div>
                    </nuxt-link>
                </div>
                 <div class="col-md-2">
                     <nuxt-link no-prefetch :to="sneakerLocalePath('filling-pieces')" title="Filling Pieces Sneakers" class="brand">
                        <div class="brand-box text-center">
                            <l-img imgClass="img-fluid"  src="~/assets/img/brands/filling_pieces.svg" alt="Filling Pieces Sneakers"/>
                        </div>
                     </nuxt-link>
                 </div>
            </div>
        </div>


        <div class="container-fluid d-md-none w-100">
            <div class="swiper-container" ref="genderSwiper">
                <div class="swiper-wrapper">
                    <div class="swiper-slide story-item">
                        <div class="gender-height">
                            <nuxt-link no-prefetch :to="sneakerLocalePath('nike')" title="Nike Sneakers" class="brand">
                                <div class="brand-box text-center">
                                    <l-img imgClass="img-fluid"  src="~/assets/img/brands/nike.svg" alt="Nike Sneakers"/>
                                </div>
                            </nuxt-link>
                        </div>
                    </div>
                    <div class="swiper-slide story-item">
                        <div class="gender-height">
                            <nuxt-link no-prefetch :to="sneakerLocalePath('adidas')" title="adidas Sneakers" class="brand">
                                <div class="brand-box text-center">
                                    <l-img imgClass="img-fluid"  src="~/assets/img/brands/adidas.svg" alt="Adidas Sneakers"/>
                                </div>
                            </nuxt-link>
                        </div>
                    </div>
                    <div class="swiper-slide story-item">
                        <div class="gender-height">
                            <nuxt-link no-prefetch :to="sneakerLocalePath('jordan')" title="Jordan Sneakers" class="brand">
                                <div class="brand-box text-center">
                                    <l-img imgClass="img-fluid"  src="~/assets/img/brands/jordan.svg" alt="Jordan Sneakers"/>
                                </div>
                            </nuxt-link>
                        </div>
                    </div>
                    <div class="swiper-slide story-item">
                        <div class="gender-height">
                            <nuxt-link no-prefetch :to="sneakerLocalePath('asics')" title="asics Sneakers" class="brand">
                                <div class="brand-box text-center">
                                    <l-img imgClass="img-fluid"  src="~/assets/img/brands/asics.svg" alt="Asics Sneakers"/>
                                </div>
                            </nuxt-link>
                        </div>
                    </div>
                    <div class="swiper-slide story-item">
                        <div class="gender-height">
                            <nuxt-link no-prefetch :to="sneakerLocalePath('vans')" title="Vans Sneakers" class="brand">
                                <div class="brand-box text-center">
                                    <l-img imgClass="img-fluid"  src="~/assets/img/brands/vans.svg" alt="Vans Sneakers"/>
                                </div>
                            </nuxt-link>
                        </div>
                    </div>
                    <div class="swiper-slide story-item">
                        <div class="gender-height">
                            <nuxt-link no-prefetch :to="sneakerLocalePath('veja')" title="Veja Sneakers" class="brand">
                                <div class="brand-box text-center">
                                    <l-img imgClass="img-fluid"  src="~/assets/img/brands/veja.svg" alt="Veja Sneakers"/>
                                </div>
                            </nuxt-link>
                        </div>
                    </div>
                    <div class="swiper-slide story-item">
                        <div class="gender-height">
                            <nuxt-link no-prefetch :to="sneakerLocalePath('puma')" title="Puma Sneakers" class="brand">
                                <div class="brand-box text-center">
                                    <l-img imgClass="img-fluid"  src="~/assets/img/brands/puma.svg" alt="Puma Sneakers"/>
                                </div>
                            </nuxt-link>
                        </div>
                    </div>
                    <div class="swiper-slide story-item">
                        <div class="gender-height">
                            <nuxt-link no-prefetch :to="sneakerLocalePath('new-balance')" title="New Balance Sneakers" class="brand">
                                <div class="brand-box text-center">
                                    <l-img imgClass="img-fluid"  src="~/assets/img/brands/new_balance.svg" alt="New Balance Sneakers"/>
                                </div>
                            </nuxt-link>
                        </div>
                    </div>
                    <div class="swiper-slide story-item">
                        <div class="gender-height">
                            <nuxt-link no-prefetch :to="sneakerLocalePath('converse')" title="Converse Sneakers" class="brand">
                                <div class="brand-box text-center">
                                    <l-img imgClass="img-fluid"  src="~/assets/img/brands/converse.svg" alt="Converse Sneakers"/>
                                </div>
                            </nuxt-link>
                        </div>
                    </div>
                    <div class="swiper-slide story-item">
                        <div class="gender-height">
                            <nuxt-link no-prefetch :to="sneakerLocalePath('toms')" title="Toms Sneakers" class="brand">
                                <div class="brand-box text-center">
                                    <l-img imgClass="img-fluid"  src="~/assets/img/brands/toms.svg" alt="Toms Sneakers"/>
                                </div>
                            </nuxt-link>
                        </div>
                    </div>
                    <div class="swiper-slide story-item">
                        <div class="gender-height">
                            <nuxt-link no-prefetch :to="sneakerLocalePath('saucony')" title="Saucony Sneakers" class="brand">
                                <div class="brand-box text-center">
                                    <l-img imgClass="img-fluid"  src="~/assets/img/brands/saucony.svg" alt="Saucony Sneakers"/>
                                </div>
                            </nuxt-link>
                        </div>
                    </div>
                    <div class="swiper-slide story-item">
                        <div class="gender-height">
                            <nuxt-link no-prefetch :to="sneakerLocalePath('filling-pieces')" title="Filling Pieces Sneakers" class="brand">
                                <div class="brand-box text-center">
                                    <l-img imgClass="img-fluid"  src="~/assets/img/brands/filling_pieces.svg" alt="Filling Pieces Sneakers"/>
                                </div>
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
                slidesPerView: 3,
                slidesPerColumn: 2,
                spaceBetween : 10,
                loop         : true,
                pagination   : {
                    clickable: true,
                },
                autoplay: {
                    delay: 3500,
                    disableOnInteraction: false,
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
