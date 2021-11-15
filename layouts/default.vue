<template>
    <div class="d-flex flex-column justify-content-between content-main">
        <div>
            <b-nav-bar/>
            <nuxt/>
           <client-only>
                <to-top-btn />
                <favorites-modal />
                <notification-modal />
                <alert-modal />
                <cookies-banner />
    <!--            <barcode-modal v-if="barcodeScanner" ref="barcodeModal"></barcode-modal>-->
                <bottom-banner />
           </client-only>
        </div>
        <footer-component/>
    </div>
</template>

<script>
    import FooterComponent   from "../components/footerComponent";
    import BNavBar           from "../components/b-nav-bar";
    export default {
        components: {
            BarcodeModal : () => import("../components/Modals/BarcodeModal"),
            CookiesBanner: () => import("../components/cookiesBanner"),
            BottomBanner: () => import("../components/bottomBanner"),
            AlertModal: () => import("../components/Modals/alertModal"),
            NotificationModal: () => import("../components/Modals/notificationModal"),
            FavoritesModal: () => import("../components/Modals/favoritesModal"),
            ToTopBtn: () => import("../components/toTopBtn"),
            BNavBar,
            FooterComponent
        },
        head() {
            const hid = `mainSchema`;
            const lang = this.$i18n.locale;
            const i18nSeo = this.$nuxtI18nSeo();
            let rootPath = this.localePath('index');
            rootPath = rootPath === '/' ? '': rootPath;
            const mainSchema =  {
                "@context"        : "http://schema.org",
                "@type"           : "Organization",
                "name"            : "Sneakers123",
                "description"     :  this.$t('Sneaker Search Engine. Search over 100 sneaker shops at once.'),
                "url"             : 'https://sneakers123.com'+ rootPath,
                "logo"            : 'https://sneakers123.com'+ require('~/assets/img/logo/sneakers123-logo-'+this.$i18n.locale+'.svg'),
                "sameAs": [
                    "https://www.facebook.com/Sneakers123com",
                    "https://www.instagram.com/sneakers123com/",
                ]
            };
            return {
                htmlAttrs: {
                    ...i18nSeo.htmlAttrs
                },
                link: [
                        {
                            rel: 'canonical',
                            href: 'https://sneakers123.com' + this.$route.path
                        },
                    ...i18nSeo.link
                    ],
                meta : [
                    {hid: 'og:url', property: 'og:url', content: 'https://sneakers123.com' + this.switchLocalePath(this.$i18n.locale)},
                    ...i18nSeo.meta
                ],
                script: [
                    {
                        hid: 'mainSchema',
                        type: 'application/ld+json',
                        innerHTML: JSON.stringify(mainSchema, null, 2),
                    },
                    {
                        hid: 'wecantrack',
                        type: 'text/javascript',
                        innerHTML: `
                               (function(w, c, t, u) {
                                        w._wct = w._wct || {}; w._wct = u; var s = c.createElement(t); s.type = 'text/javascript'; s.async = true; s.src = 'https://cdn.wecantrack.com/wct.js'; var r = c.getElementsByTagName(t)[0]; r.parentNode.insertBefore(s, r);
                                    }(window, document, 'script', {
                                        'uid' : 'r4qi87',
                                \t'google_tracking_id' : 'UA-72543924-12'
                                    }));
                            `
                    }
                ],
                __dangerouslyDisableSanitizersByTagID: {
                    mainSchema: 'innerHTML',
                    wecantrack: 'innerHTML'
                },
            }
        }
    }
</script>

<style>

</style>