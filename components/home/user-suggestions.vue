<template>
    <div>
        <article class="container-fluid trending" id="users-suggestion" v-if="data.length > 0">
            <div class="row line">
                <h2 class="col-12 primary-title primary-title__center primary-title__trending">{{$t('homepage.suggestions')}}</h2>
            </div>
            <div class="row line">
                <sneaker-thumbnail :sneaker='sneaker' v-for="sneaker in data" :key="sneaker.slug"></sneaker-thumbnail>
            </div>
        </article>
    </div>
</template>

<script>
    import SneakerThumbnail from "../Sneakers/Thumbnail";

    export default {
        name: "user-suggestions",
        props     : {
            data: {
                type    : Array,
                default: []
            }
        },
        components: {SneakerThumbnail},
    }
</script>

<style scoped>

</style>
