<template>
    <div class="slider col-12">
        <div class="swiper-button-next">
            <arrow-right pathClass/>
        </div>
        <div class="swiper-button-prev">
            <arrow-right pathClass/>
        </div>
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <template v-for="suggestion in suggestions">
                    <nuxt-link no-prefetch :to="sneakerLocalePath(suggestion.url)" class="swiper-slide" @click.native="addSuggestionClick(suggestion.id)" >
                        <img class="slider-icon" src="~/assets/icon-def.svg" v-lazy-load :data-src="suggestion.image" :alt="suggestion.title">
                        <div class="slider-text">
                            <span>{{suggestion.title}}</span>
                            <span>
                              <arrow-down/>
		                    </span>
                        </div>
                    </nuxt-link>
                </template>
            </div>
        </div>
        <div class="swiper-pagination"></div>
    </div>
</template>

<script>
    import {mapMutations, mapActions} from 'vuex'
    import Swiper                     from 'swiper'
    import ArrowRight from "../icons/arrow-right";
    import ArrowDown from "../icons/arrow-down";

    export default {
        name   : "suggestionsSwiper",
        components: {ArrowDown, ArrowRight},
        props  : ['suggestions'],
        mounted()
        {
            let swiper = new Swiper('.swiper-container', {
                slidesPerView: 3,
                spaceBetween : 24,
                loop         : false,
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
                        slidesPerView: 3,
                        spaceBetween : 24,
                    },
                    767 : {
                        slidesPerView: 2,
                        spaceBetween : 24,
                    },
                    584 : {
                        slidesPerView: 1,
                        spaceBetween : 12,
                    },
                    320 : {
                        slidesPerView: 1,
                        spaceBetween : 12,
                    }
                }
            });
        },
        methods: {
            ...mapActions(['addSuggestionClick']),
        }
    }
</script>

<style scoped>

</style>