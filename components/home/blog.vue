<template>
    <article class="container-fluid blog" id="blog">
        <div class="line col-md-12 headline">
            <h2>{{$t('Sneakers123 Blog')}}</h2>
            <p>{{$t('Die neuesten Releases, Deals und Sneaker Guides')}}</p>
        </div>
        <div class="swiper-container row line d-md-flex" ref="blogSwipper">
            <div class="swiper-wrapper card-deck">
                <div class="swiper-slide col-md-4" v-for="post in posts" :key="post.ID">
                    <img class="card-img-top"  v-lazy-load :data-src="post.image" :alt="post.title" />
                    <div class="card-body">
                        <p class="card-text"><small class="text-muted">{{ $d(Date.parse(post.date), 'short')}}</small></p>
                        <h3 class="card-title">{{(post.title)}}</h3>
                        <p class="card-text">{{post.content}}</p>
                        <a :href="post.link" class="button-main stretched-link">{{$t('Read more')}}</a>
                    </div>
                </div>
            </div>
        </div>
    </article>
</template>

<script>
    import Swiper from 'swiper'

    export default {
        name: "blog",
        props: {
            'posts': {
                type: Array,
                default: []
            }
        },
        mounted() {
            this.$i18n.setDateTimeFormat('de', {
                short: {
                    year: 'numeric', month: 'short', day: 'numeric'
                }
                }
            );
            if(this.$device.isMobile) {
                let blogSwiper = new Swiper(this.$refs.blogSwipper, {
                    spaceBetween: 20,
                    centeredSlides: true,
                    loop: true,
                    autoplay: {
                        delay: 3500,
                        disableOnInteraction: false,
                    },
                });
            }
        }
    }
</script>

<style scoped>

</style>
