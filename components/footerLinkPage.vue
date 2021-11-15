<template>
    <div>
        <simple-header/>
        <article class="container-fluid px-0 py-5">
            <div class="line">
                <link-parser  :content="seoHTML"/>
            </div>
        </article>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import staticMetasMixin from "../plugins/staticMetasMixin"
    import SimpleHeader from "./SimpleHeader";
    import LinkParser from "./linkParser";

    export default {
        name: "footerLinkPage",
        components: {LinkParser, SimpleHeader},
        mixins: [staticMetasMixin],
        computed: {
            ...mapState(['currentRouteMetas', 'totalSneakersCount', 'totalShopsCount']),
            seoHTML() {
                return this.replaceShopAndSneakerCount(this.currentRouteMetas.seo_description)
            },
            schemaBreadcrumbs() {
                return {
                    script: [
                        {
                            hid: 'breadcrumbs',
                            type: 'application/ld+json',
                            innerHTML: JSON.stringify({
                                "@context": "http://schema.org",
                                "@type": "BreadcrumbList",
                                "itemListElement": [
                                    {
                                        "@type": "ListItem",
                                        "position": 1,
                                        "item": {
                                            "@id": 'https://sneakers123.com' + this.localePath('index'),
                                            "name": this.$t('Sneaker Search Engine')
                                        }
                                    },
                                    {
                                        "@type": "ListItem",
                                        "position": 2,
                                        "item": {
                                            "@id": 'https://sneakers123.com' + this.$route.path,
                                            "name": this.switchLocalePath('de')
                                        }
                                    },
                                ]
                            }, null, 2),
                        },
                    ]
                }
            }
        }
    }
</script>

<style scoped>

</style>