<template>
  <div>
    <home-header/>
    <lazy-hydrate when-visible>
      <ads/>
    </lazy-hydrate>
<!--    <lazy-hydrate when-visible>-->
<!--      <models :models="home.bestStyles"/>-->
<!--    </lazy-hydrate>-->
    <lazy-hydrate when-visible>
      <gender/>
    </lazy-hydrate>
    <lazy-hydrate when-visible>
      <brands/>
    </lazy-hydrate>
    <lazy-hydrate when-visible>
     <user-suggestions :data="home.user_suggestions"/>
    </lazy-hydrate>
    <lazy-hydrate when-visible>
      <trending :data="home.trending"/>
    </lazy-hydrate>
    <lazy-hydrate when-visible>
      <home-shops :data="home.shops"/>
    </lazy-hydrate>
    <lazy-hydrate when-visible>
      <blog :posts="home.blog" v-show="$i18n.locale === 'de'"></blog>
    </lazy-hydrate>
    <lazy-hydrate when-visible>
      <stories/>
    </lazy-hydrate>
    <lazy-hydrate when-visible>
     <section class="info-description py-5 col-12" v-show="home.metas.seo_description">
        <div class="row line">
          <div class="container">
            <link-parser :content="seoHTML"/>
          </div>
        </div>
      </section>
    </lazy-hydrate>
  </div>
</template>

<script>
  import { mapState, mapActions, mapGetters } from 'vuex';
  import Stories from "../components/home/stories";
  import HomeHeader from "../components/home/homeHeader";
  import staticMetasMixin from "../plugins/staticMetasMixin"
  import LinkParser from "../components/linkParser";
  import {random} from "lodash-core";

  export default {
    components: {
      LinkParser,
      HomeHeader,
      Stories,
      UserSuggestions: ()=> import("../components/home/user-suggestions"),
      HomeShops: ()=> import("../components/home/homeShops"),
      Trending: ()=> import("../components/home/trending"),
      Gender: ()=> import("../components/home/gender"),
      Ads: ()=> import("../components/home/ads"),
      Brands: () =>import( "../components/home/brands"),
      // Models: ()=> import( "../components/home/models"),
      Blog: ()=> import( "../components/home/blog"),
    },
    mixins: [staticMetasMixin],
    computed: {
      ...mapState([ 'currentRouteMetas', 'totalSneakersCount', 'totalShopsCount']),
      seoHTML() {
         return this.replaceShopAndSneakerCount(this.home.metas.seo_description)
      },
      pageTitle() {
        return this.replaceShopAndSneakerCount(this.home.metas.title)
      },
      pageDescription() {
        return  this.replaceShopAndSneakerCount(this.home.metas.description);
      }
    },
    async asyncData({app, $axios}){

        let headerBck =  require('~/assets/images/sneakers123-bg-' + random(1,6)+'.jpg')
      try{
        let {data} = await $axios.get('home', {params: {locale: app.i18n.locale}});
        return {
          headerBck : headerBck,
          home : data
        }
      }catch(e){
          console.log('Home error:', e.response ? e.response.status : e);
          return {
            headerBck: headerBck,
            home : {
              trending: [],
              shops: [],
              user_suggestions: []
            }
          }
      }

    }
  }
</script>

<style>

</style>

