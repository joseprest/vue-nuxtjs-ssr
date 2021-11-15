<template>
    <div>
        <simple-header/>
        <div class="container-fluid line shops-breadcrumbs">
            <breadcrumbs :items="breadcrumbItems"></breadcrumbs>
        </div>
        <article class="container-fluid all-shops pl-0 pr-0" id="all-shops">
            <div class="row line padding">
                <div class="col-12 col-lg-4 pl-0 pr-0 mr-auto">
                    <h2 class="shops-title">{{$t('All shops')}}</h2>
                </div>
                <div class="col-12 col-lg-8 pl-0 pr-0 shops-buttons">
                    <client-only>
                        <b-dropdown class="country"
                                    id="countries"
                                    toggle-class="country-button"
                                    menu-class=""
                                    variant="none">
                            <template slot="button-content">
                                <arrow-right path-class/>
                                <span class="country-button-text">
                                {{(queries.country ? $t('countries-abbr.' + queries.country) : $t('All countries')) | capitalize}}
                            </span>
                            </template>
                            <b-dropdown-item @click.prevent="queries.country = ''">{{$t('All countries')}}</b-dropdown-item>
                            <b-dropdown-item @click.prevent="queries.country = code"
                                       v-for="(name, code) in $t('countries-abbr')" :key="code">
                                {{name}}
                            </b-dropdown-item>
                        </b-dropdown>
                    </client-only>
                    <b-dropdown class="sneakers"
                                id="brands"
                                toggle-class="sneakers-button"
                                menu-class=""
                                variant="none">
                        <template slot="button-content">
                            <arrow-right path-class/>
                            <span class="sneakers-button-text">{{(queries.brand ? queries.brand : $t('All Brands')) | titleCase}}</span>
                        </template>
                        <b-dropdown-item @click.prevent="queries.brand = ''">{{$t('All brands')}}</b-dropdown-item>
                        <b-dropdown-item v-for="brand in brands" @click.prevent="queries.brand = brand.slug" :key="brand.slug">{{brand.brand}}</b-dropdown-item>
                    </b-dropdown>
                    <div class="switcher">
                        <div class="onoffswitch">
                            <input v-model="queries.online_only" type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="myonoffswitch">
                            <label class="onoffswitch-label" for="myonoffswitch">
                                <span class="onoffswitch-inner"></span>
                                <span class="onoffswitch-switch"></span>
                            </label>
                        </div>
                        <p class="switcher-text">{{$t('Online only')}}</p>
                    </div>
                </div>
            </div>
            <div class="row line shopcards">
                <template v-for="shop in shops">
                    <shop-thumbnail :shop="shop"></shop-thumbnail>
                </template>
            </div>
            <div class="info-description my-5 py-5 col-12"
                 v-show="currentRouteMetas.seo_description">
                <div class="row line">
                    <link-parser :content="seoHTML"/>
                </div>
            </div>
        </article>
    </div>

</template>

<script>
    import { mapState, mapActions } from 'vuex'
    import ShopThumbnail from "../../components/ShopThumbnail";
    import SimpleHeader from "../../components/SimpleHeader";
    import ArrowRight from "../../components/icons/arrow-right";
    import staticMetasMixin from "../../plugins/staticMetasMixin"
    import LinkParser from "../../components/linkParser";
    import Breadcrumbs from "../../components/Breadcrumbs";

    export default {
        name: "shops",
        components: {LinkParser, ArrowRight, SimpleHeader, ShopThumbnail, Breadcrumbs},
        mixins: [staticMetasMixin],
        middleware: 'loadMeta',
        data(){
            return {
                queries         : {
                    brand      : '',
                    country    : '',
                    online_only: null,
                    page       : 1
                },
            }
        },
        async asyncData ({store, $axios}) {
            let {data} = await $axios.get('shops', {useCache: true});
            return {
                shops: data.data,
            }
        },
        computed: {
            ...mapState(['brands','currentRouteMetas', 'totalSneakersCount', 'totalShopsCount']),
            seoHTML() {
                return this.replaceShopAndSneakerCount(this.currentRouteMetas.seo_description);
            },
            breadcrumbItems(){
                return [
                    {text: 'Home', lnk: this.localePath('index')},
                    {text: this.$t('Shops') , lnk: this.localePath('shops')},

                ]
            },
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
            }
        },
        watch: {
            'queries': {
                handler() {
                    this.updateShops();
                },
                deep: true
            }
        },
        methods: {
            async updateShops(){
                let {data} = await this.$axios.get('shops', {useCache: true, params: this.queries});
                this.shops = data.data;
            },
        },
    }
</script>

<style scoped>

</style>
