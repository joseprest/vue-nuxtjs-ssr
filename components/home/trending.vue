<template>
    <article class="container-fluid trending" id="trending">
        <div class="line col-md-12 headline">
            <h2>{{$t(title)}}</h2>
            <p>{{$t('The hottest sneakers at a glance')}}</p>
        </div>
        <div class="row line">
            <sneaker-thumbnail :sneaker='sneaker' v-for="(sneaker, index) in data" :key="index"></sneaker-thumbnail>
        </div>
        <div class="row line trending-footer">
            <nuxt-link no-prefetch tag="button" class="button-main" :to="sneakerLocalePath('top-trends')">
                <arrow-right path-class/>
                <span class="button-main-text">{{$t('All trending sneakers')}}</span>
            </nuxt-link>
        </div>
    </article>
</template>

<script>
    import {mapState}       from 'vuex'
    import SneakerThumbnail from "../Sneakers/Thumbnail";
    import ArrowRight       from "../icons/arrow-right";

    export default {
        name      : "trending",
        components: {SneakerThumbnail, ArrowRight},
        props     : {
            title: {
                type   : String,
                default: 'Trending right now'
            },
            data: {
                type    : Array,
                default: []
            }
        },
    }
</script>

<style scoped>

</style>
