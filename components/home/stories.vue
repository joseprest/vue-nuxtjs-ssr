<template>
    <article class="container-fluid story" id="story">
        <div class="row line d-none d-md-flex">
            <div class="col-md-4 story-item">
                <div class="icon-cover">
                  <img class="search-icon" id="search-icon" v-lazy-load :data-src="searchIcon" alt="search"
                       :src="placeholder"
                       :lazy-default="placeholder"
                       @mouseover="animIcon('searchHover')" @mouseleave="fixIcon('searchHover')">
                </div>
                <h2 class="story-title">{{$t('Search')}}.</h2>
                <p class="story-text">{{$t('homepage.search')}}</p>
            </div>
            <div class="col-md-4 story-item">
                <div class="icon-cover">
                  <img class="find-icon" id="sneakers-icon" v-lazy-load :data-src="sneakerIcon" alt="find"
                       :src="placeholder"
                       :lazy-default="placeholder"
                       @mouseover="animIcon('sneakerHover')" @mouseleave="fixIcon('sneakerHover')">
                </div>
                <h2 class="story-title">{{$t('Find')}}.</h2>
                <p class="story-text">{{$t('homepage.find')}}</p>
            </div>
            <div class="col-md-4 story-item">
                <div class="icon-cover">
                  <img class="buy-icon" id="box-icon" v-lazy-load :data-src="boxIcon" alt="buy"
                       :src="placeholder"
                       :lazy-default="placeholder"
                       @mouseover="animIcon('boxHover')" @mouseleave="fixIcon('boxHover')">
                </div>
                <h2 class="story-title">{{$t('Buy')}}.</h2>
                <p class="story-text">{{$t('homepage.buy')}}</p>
            </div>
        </div>
        <div class="d-md-none w-100">
            <div class="swiper-container" ref="storiesSwiper">
                <div class="swiper-wrapper">
                    <div class="swiper-slide story-item">
                        <div class="stories-height">
                            <img class="w-100 search-icon img-fluid position-relative" id="search-icon1" v-lazy-load :data-src="searchIcon" alt="search"
                                 :src="placeholder"
                                 :lazy-default="placeholder"
                                 @mouseover="animIcon('searchHover')" @mouseleave="fixIcon('searchHover')">
                        </div>
                        <h2 class="story-title">{{$t('Search')}}.</h2>
                        <p class="story-text">{{$t('homepage.search')}}</p>
                    </div>
                    <div class="swiper-slide story-item">
                        <div class="stories-height">
                            <img class="w-100 find-icon img-fluid position-relative" id="sneakers-icon1" v-lazy-load :data-src="sneakerIcon" alt="find"
                                 :src="placeholder"
                                 :lazy-default="placeholder"
                                 @mouseover="animIcon('sneakerHover')" @mouseleave="fixIcon('sneakerHover')">
                        </div>
                        <h2 class="story-title">{{$t('Find')}}.</h2>
                        <p class="story-text">{{$t('homepage.find')}}</p>
                    </div>
                    <div class="swiper-slide story-item">
                        <div class="stories-height">
                            <img class="w-100 buy-icon img-fluid position-relative" id="box-icon1" v-lazy-load :data-src="boxIcon" alt="buy"
                                 :src="placeholder"
                                 :lazy-default="placeholder"
                                 @mouseover="animIcon('boxHover')" @mouseleave="fixIcon('boxHover')">
                        </div>
                        <h2 class="story-title">{{$t('Buy')}}.</h2>
                        <p class="story-text">{{$t('homepage.buy')}}</p>
                    </div>
                </div>
                <div class="story-swiper-pagination d-flex justify-content-between w-25 mx-auto position-relative"></div>
            </div>
        </div>
    </article>
</template>

<script>
    import Swiper from 'swiper'

    export default {
        name: "stories",
        data() {
            return {
                placeholder: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 330 "%3E%3C/svg%3E',
                searchHover: false,
                sneakerHover: false,
                boxHover: false,
            }
        },
        computed: {
            searchIcon() {
              return this.searchHover ? require(`~/assets/img/001.gif`) : require(`~/assets/img/story_search.png`)
            },
            sneakerIcon() {
              return this.sneakerHover ? require(`~/assets/img/002.gif`) : require(`~/assets/img/story_sneakers.png`)
            },
            boxIcon() {
              return this.boxHover ? require(`~/assets/img/003.gif`) : require(`~/assets/img/story_box.png`)
            },

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
            let storiesSwiper = new Swiper(this.$refs.storiesSwiper, {
                spaceBetween  : 20,
                centeredSlides: true,
                loop: true,
                autoplay: {
                    delay: 3500,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: '.story-swiper-pagination',
                    clickable: true,
                }
            });
        }
    }
</script>

<style scoped>

</style>
