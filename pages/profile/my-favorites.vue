<template>
    <div class="col-lg-9 row mr-0 ml-0 pl-0 pr-0">
        <h2 class="col-12 my-pairs-title">{{$t('My favorite pairs')}} ({{$store.state.favorites.length}})</h2>

            <template v-for="sneaker in favorites">
                <sneaker-thumbnail :sneaker="sneaker" :results="true"
                                   v-if="$store.state.favorites.indexOf(sneaker.slug) > -1">
                ></sneaker-thumbnail>
            </template>

    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex'
    import staticMetasMixin from "../../plugins/staticMetasMixin"
    import SneakerThumbnail from "../../components/Sneakers/Thumbnail";

    export default {
        name: "my-favorites",
        components: {SneakerThumbnail},
        mixins: [staticMetasMixin],
        middleware: ['loadMeta','auth'],
        async asyncData({$axios, store}){
            try{
                let {data} = await $axios.get('favorites');
                store.commit('setFavorites', data);
                return {favorites: data}
            }
            catch(e) {
                console.log('fav ', e.response ? e.response.status : e);
            }
        },
        computed: {
            ...mapState(['currentRouteMetas']),
            schemaBreadcrumbs() {
                return {}
            }
        }
    }
</script>

<style scoped>

</style>