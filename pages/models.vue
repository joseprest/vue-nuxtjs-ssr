<template>
    <div>
        <simple-header></simple-header>
        <div class="container-fluid line mt-10">
            <breadcrumbs :items="breadcrumbItems"></breadcrumbs>
        </div>
        <article class="container-fluid models">
            <div class="line">
                <h1>{{$t('All Models')}}</h1>
                <template v-for="(categories, brand) in models">
                    <div :key="brand">
                        <h2>
                            <nuxt-link :to="sneakerLocalePath(brand)" >
                                {{brand | titleCase}}
                            </nuxt-link>
                            <span class="brand-count">{{brandCounts[brand]}}</span>
                        </h2>
                        <ul>
                            <li v-for="category in categories" :key="category.title">
                                <nuxt-link :to="sneakerLocalePath(category.url)" >
                                    {{category.title}}
                                </nuxt-link>
                                <span class="cat-count">{{category.products}}</span>
                            </li>
                        </ul>

                    </div>
                </template>
                <link-parser :add-locale="$i18n.locale" :content="seoHTML"/>
            </div>
        </article>
    </div>
</template>

<script>
    import SimpleHeader from "../components/SimpleHeader";
    import LinkParser from "../components/linkParser";
    import Breadcrumbs from "../components/Breadcrumbs";
    import staticMetasMixin from "../plugins/staticMetasMixin";
    import {mapState} from "vuex";

    export default {
        name: "models",
        components: {Breadcrumbs, LinkParser, SimpleHeader},
        middleware: 'loadMeta',
        mixins: [staticMetasMixin],
        data() {
            return {
                breadcrumbItems: [
                    {text: 'Home', lnk: this.localePath('index')},
                    {text: this.$t('All Models'), lnk: this.localePath('models')},
                ],
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
        async asyncData({$axios})
        {
            try {
                let {data} = await $axios.get('models');
                return {
                    models: data.models,
                    brandCounts: data.brandCounts
                }
            }
            catch (e) {
                console.log('models ', e.response ? e.response.status : e)
            }
        },
    }
</script>
