<template>
   <div>
      <simple-header :key="$store.state.searchString" :headerData="sneakerRouteHeader" :subHeader="subHeader"/>
       <div class="container-fluid line categories-breadcrumbs">
           <breadcrumbs :items="breadcrumbItems"></breadcrumbs>
       </div>
      <!--Introduction-->
      <div class="line col-md-12 headline margin20" v-if="data.introduction">
         <link-parser :content="data.introduction"/>
      </div>

      <!-- Last 4 products -->
      <div class="line col-md-12 headline">
         <h2>{{$t('category-latest-title', data.replacements)}}</h2>
         <p>{{$t('category-latest-subtitle', data.replacements)}}</p>
      </div>

      <div class="row line">
<!--         <client-only>-->
            <sneaker-thumbnail v-for="(sneaker, i) in data.latest" :sneaker="sneaker" :key="sneaker.id">
            </sneaker-thumbnail>
<!--         </client-only>-->
      </div>

      <!-- Automatic text -->
      <div class="row line align-items-center container-fluid">
         <p v-html="$t('category-latest-text_html', data.replacements)">
         </p>
      </div>
      <div class="row line">
         <nuxt-link no-prefetch class="button-main" :to="sneakerLocalePath(data.showAllRoute.path, {sort:'latest', ...data.showAllRoute.query})">
            <arrow-right path-class/>
            <span class="button-main-text">{{$t('Show more')}}</span>
         </nuxt-link>
      </div>

      <!-- best price -->
      <div class="line col-md-12 headline margin20">
         <h2>{{$t('category-cheapest-title', data.replacements)}}</h2>
         <p>{{$t('category-cheapest-subtitle', data.replacements)}}</p>
      </div>

      <div class="row line">
<!--         <client-only>-->
            <sneaker-thumbnail v-for="(sneaker, i) in data.cheapest" :sneaker="sneaker" :key="sneaker.id">
            </sneaker-thumbnail>
<!--         </client-only>-->
      </div>
      <!-- Price chart -->

      <div class="line col-md-12 headline margin20" v-if="data.priceChart.datasets[0].data.length">
         <h2>{{$t('category-price_chart-title', data.replacements)}}</h2>
         <p>{{$t('category-price_chart-subtitle', data.replacements)}}</p>
<!--         <client-only>-->
<!--            <line-chart v-if="showLine" :dataset="data.priceChart" :options="chartOptions" :width="null" :height="null"/>-->
<!--         </client-only>-->
          <client-only>
              <trend-chart class="price-history-chart"
                           :datasets="data.priceChart.datasets"
                           :labels="{
                               xLabels: data.priceChart.labels,
                               yLabels: 5,
                               yLabelsTextFormatter: val=>{return price(val)}
                             }"

                           :grid="{horizontalLines: true}"
              ></trend-chart>
          </client-only>

      </div>
      <div class="row line align-items-center container-fluid">
         <p v-html="$t('category-price_chart-text_html', data.replacements)">
         </p>
      </div>

      <!-- price alarm -->

      <div class="line col-md-12 headline margin20">
         <h2>{{$t('category-price_alert-title', data.replacements)}}</h2>
         <p>{{$t('category-price_alert-subtitle', data.replacements)}}</p>
         <l-img src="~/assets/images/price-alert-screenshot.png" img-class="w-100 img-fluid" />
      </div>

      <div class="row line align-items-center container-fluid">
         <p v-html="$t('category-price_alert-text_html', data.replacements)">
         </p>
      </div>
      <!-- All colors and models -->

      <div class="line col-md-12 headline margin20" id="sorting">
         <h2>{{$t('category-all_models-title', data.replacements)}}</h2>
         <p>{{$t('category-all_models-subtitle', data.replacements)}}</p>
      </div>
      <div class="row line">
<!--         <client-only>-->
            <sneaker-thumbnail v-for="(sneaker, i) in data.all" :sneaker="sneaker" :key="sneaker.id">
            </sneaker-thumbnail>
<!--         </client-only>-->
      </div>
      <div class="row line">
         <nuxt-link no-prefetch class="button-main" :to="sneakerLocalePath(data.showAllRoute.path, data.showAllRoute.query)">
            <arrow-right path-class/>
            <span class="button-main-text">{{$t('Show all')}}</span>
         </nuxt-link>
      </div>

      <!-- shops -->
      <div class="line col-md-12 headline margin20">
         <h2>{{$t('category-shops-title', data.replacements)}}</h2>
         <p>{{$t('category-shops-subtitle', data.replacements)}}</p>
      </div>
      <div class="row line justify-content-center justify-content-lg-start d-none d-md-flex shops">
         <div class="col-6 col-md-4 col-lg-2 logo-wrap" v-for="(shop, index) in data.shops" :key="index">
            <nuxt-link no-prefetch :to="localePath({name:'shops-shop', params:{shop:  shop.slug}})">
                <l-img img-class="shop-logo" :src="shop.logo" :alt="shop.name"></l-img>
            </nuxt-link>
         </div>
      </div>

      <!-- seo text -->
      <div class="info-description py-5 col-12" v-if="currentRouteMetas.seo_description">
         <div class="row line">
            <link-parser :content="currentRouteMetas.seo_description"/>
         </div>
      </div>



   </div>
</template>

<script>
   import SimpleHeader from "../../components/SimpleHeader";
   import SneakerThumbnail from "../../components/Sneakers/Thumbnail";
   import LinkParser             from "../../components/linkParser";
   import ArrowRight        from "../../components/icons/arrow-right"
   import Breadcrumbs from "../../components/Breadcrumbs";
   import TrendChart from "vue-trend-chart";

   export default {
      name: "sneakerCategory",
      components: {SimpleHeader, SneakerThumbnail, LinkParser, ArrowRight, Breadcrumbs,TrendChart},
      props     : {
         data: {
            type: Object,
            default: () => {
            }
         },
          breadcrumbItems: {
             type: Array
          }
      },
      computed: {
         subHeader() {
            if(this.data.replacements) {
               return {
                  minPrice: this.data.replacements.minPrice,
                  shopsCount: this.data.replacements.shops,
                  totalCount: this.data.replacements.totalCount,
               }
            }
         },
      },
      mounted() {
         this.showLine = true;
      },
      data() {
         return {
            currentRouteMetas: this.$store.state.currentRouteMetas,
            sneakerRouteHeader: this.$store.state.sneakerRouteHeader,
            showLine: false,
         }
      },
   }
</script>

<style scoped>

</style>