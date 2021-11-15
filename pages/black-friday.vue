<template>
  <div>
    <simple-header :headerData="sneakerRouteHeader" :sub-header="{text: $t('black-friday-subheader')}"/>
    <div class="container-fluid line mt-10">
<!--      <breadcrumbs :items="breadcrumbItems"></breadcrumbs>-->
    </div>
    <div class="container-fluid">
      <div class="line">
        <article id="shop-coupons" class="container-fluid pl-0 pr-0">
         <div class="card-columns">
            <black-friday-thumbnail :item="item" v-for="item in items" v-bind:key="item.id"></black-friday-thumbnail>
          </div>
        </article>
        <link-parser class="info-description py-5 col-12 no-background" :add-locale="$i18n.locale" :content="seoHTML" />
      </div>
    </div>
    <code-modal ref="codeModal"></code-modal>
  </div>
</template>

<script>
    import FooterLinkPage from "../components/footerLinkPage";
    import Breadcrumbs from "@/components/Breadcrumbs";
    import LinkParser from "@/components/linkParser";
    import SimpleHeader from "@/components/SimpleHeader";
    import staticMetasMixin from "@/plugins/staticMetasMixin";
    import {mapState} from "vuex";
    import BlackFridayThumbnail from "@/components/black-friday/Thumbnail";
    import CodeModal from "@/components/black-friday/CodeModal";

    export default {
      name: "black-friday",
      components: {CodeModal, BlackFridayThumbnail, Breadcrumbs, LinkParser, SimpleHeader},
      middleware: 'loadMeta',
      mixins: [staticMetasMixin],
      data() {
        return {
          breadcrumbItems: [
            {text: 'Home', lnk: this.localePath('index')},
            {text: this.$t('Black Friday'), lnk: this.localePath('black-friday')},
          ],
          sneakerRouteHeader: this.$store.state.sneakerRouteHeader,
        }
      },
      computed:{
        ...mapState(['currentRouteMetas']),
        schemaBreadcrumbs()  {
          let bItems = this.breadcrumbItems.map((item, index)=>{
            return {
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@id": 'https://sneakers123.com' + item.lnk,
                "name": (item.jsonText ? item.jsonText: item.text)
              }
            }
          })
          return {
            script: [
              {
                hid: 'breadcrumbs',
                type: 'application/ld+json',
                innerHTML: JSON.stringify({
                  "@context": "http://schema.org",
                  "@type": "BreadcrumbList",
                  "itemListElement": bItems
                }, null, 2),
              },
            ]
          }
        },
        seoHTML() {
          return this.replaceShopAndSneakerCount(this.currentRouteMetas.seo_description)
        }
      },
      async asyncData({$axios, app})
      {
        try {
          let {data} = await $axios.get('black-friday', {params: {locale: app.i18n.locale}});
          return {
            items: data,
          }
        }
        catch (e) {
          console.log('black-friday ', e.response ? e.response.status : e)
        }
      },
    }
</script>
