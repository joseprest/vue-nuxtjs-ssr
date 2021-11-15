require('dotenv').config()
const CriticalPlugin = require('./plugins/critical');

module.exports = {
    router:{
        prefetchLinks: false
    },
        auth: {
            redirect: false,
            strategies: {
                local: {
                    endpoints: {
                        login: {
                            url: process.env.apiUrl + 'login',
                            method: 'post',
                            propertyName: 'access_token'
                        },
                        logout: {
                            url: process.env.apiUrl  + 'logout',
                            method: 'post'
                        },
                        user: {
                            url: process.env.apiUrl  + 'user',
                            method: 'get',
                            propertyName: false
                        },
                    },
                    tokenRequired: true,
                    tokenType: 'Bearer',
                },
            }
        },

        /*
        ** Headers of the page
        */
        head: {
            title: 'sneakers123.com',
            meta: [
                {charset: 'utf-8'},
                {'http-equiv': 'X-UA-Compatible', content: 'IE=edge'},
                {name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'},
                {hid: 'description', name: 'description', content: 'sneakers123.com'},
                {hid: 'og:title', property: "og:title", content: 'sneakers123.com'},
                {hid: 'og:description', property: "og:description", content: 'sneakers123.com'},
                {hid: 'og:image', property: "og:image", content: 'https://sneakers123.com/overview.jpg'},
                {hid: 'og:image:width', property: "og:image:width", content: 971},
                {hid: 'og:image:height', property: "og:image:height", content: 509},
                {hid: 'robots', name: 'robots', content: 'all'},
            ],
            link: [
                {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
                // {
                //     rel: 'preload',
                //     as: 'style',
                //     href: 'https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,400i,600,700,700i,900,900i'
                // },
                // {
                //     rel: 'stylesheet',
                //     href: 'https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,400i,600,700,700i,900,900i&display=swap'
                // },
                // {
                //     rel: 'preload',
                //     as: 'style',
                //     href: 'https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i,800,800i&display=swap'
                // },
                // {
                //     rel: 'stylesheet',
                //     href: 'https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i,800,800i&display=swap'
                // }
            ],
            __dangerouslyDisableSanitizersByTagID: {
                breadcrumbs: 'innerHTML',
                offerCatalog: 'innerHTML',
                'product-schema': 'innerHTML'
            },
        },
        buildModules: [
            '@nuxtjs/gtm',
            '@nuxtjs/dotenv',
            'nuxt-purgecss',
            '@bazzite/nuxt-optimized-images',
        ],
        modules: [
            'nuxt-webfontloader',
            // provide path to the file with resources
            ['nuxt-lazy-load', {
                // These are the default values
                images: true,
                videos: true,
                audios: true,
                iframes: true,
                polyfill: true,
                directiveOnly: true,

                // Default image must be in the static folder
                defaultImage: '/sneakers123-thumb.jpg',

                // To remove class set value to false
                loadedClass: 'isLoaded',
                appendClass: 'lazyLoad',

                observerConfig: {
                    rootMargin: '20px 20px 20px 20px',
                    threshold: 0.1
                }
            }],
            ['@nuxtjs/device'],
            ['@nuxtjs/redirect-module'],
            ['nuxt-sass-resources-loader', '~/assets/sass/app.scss'],
            ['@nuxtjs/recaptcha', {
                hideBadge: true,
                siteKey: process.env.NODE_ENV === 'production' ? '6LeorZsUAAAAAIy-9z-JL0U640IAlo3ZaKamm1Wk' : '6LeEPZsUAAAAAB17Hlp3YAOwjvkLylOxZQCOPHs6',
                version: 3,
            }],
            '@nuxtjs/browserconfig',
            ['bootstrap-vue/nuxt',{css:false}],
            'cookie-universal-nuxt',
            '@nuxtjs/axios',
            '@nuxtjs/auth',
            'cookie-universal-nuxt',
            '@nuxtjs/pwa',
            ['@nuxtjs/component-cache', {
                maxAge: 1000 * 60 * 15
            }],
            'nuxt-i18n',
        ],
        browserconfig: {
            TileColor: '#3f51b5',
            square150x150logo: {'@': {src: '/mstile-150x150.png'}}
        },
        manifest: {
            name: "Sneakers123",
            short_name: "Sneakers123",
            start_url: "/",
            icons: [
                {
                    src: "/android-chrome-192x192.png",
                    sizes: "192x192",
                    type: "image/png"
                },
                {
                    src: "/android-chrome-256x256.png",
                    sizes: "256x256",
                    type: "image/png"
                }
            ],
            theme_color: "#ffffff",
            background_color: "#ffffff",
            display: "standalone",
            crossorigin: "use-credentials",
        },
        axios: {
            baseURL: process.env.apiUrl
        },
        css: [
            {src: '~/assets/sass/app.scss', lang: 'sass'},
        ],
        store: true,
        // Plagins
        plugins: [
            '~plugins/vuex-persist.js',
            '~plugins/mixins.js',
            '~plugins/numbers.js',
            '~plugins/axios.js',
        ],
        server: {
            port: 8080, // default: 3000
            host: '0.0.0.0' // default: localhost
        },
        /*
        ** Customize the progress bar color
        */
        loading: {color: '#29d'},
        /*
        ** Build configuration
        */
        build: {
           // analyze: true,
            extractCSS: true,
            cssSourceMap: true,
            /*
            ** Run ESLint on save'axios',
            */
            extend(config, {isDev, isClient, loaders: { vue } }) {
                // if (isClient) {
                    vue.transformAssetUrls['l-img'] = ['src']
                // }
                // if (isDev && isClient) {
                //   config.module.rules.push({
                //     enforce: 'pre',
                //     test: /\.(js|vue)$/,
                //     loader: 'eslint-loader',
                //     exclude: /(node_modules)/
                //   })
                // }
                if (isClient) {
                    config.plugins.unshift(new CriticalPlugin());
                }
            }
        },
    redirect: [
        { from: '^/sneaker$', to: '/sneaker/' },
        {from: '^/de/(.*)', to: '/$1'},
        {from: '^/de', to: '/'}
     ],
    optimizedImages: {
        inlineImageLimit: -1,
        handleImages: ['jpeg', 'png', 'svg', 'webp', 'gif'],
        optimizeImages: true,
        optimizeImagesInDev: false,
        defaultImageLoader: 'img-loader',
        mozjpeg: {
            quality: 85
        },
        optipng: false,
        pngquant: {
            speed: 7,
            quality: [0.65, 0.8]
        },
        webp: {
            quality: 85
        }
    },
    bootstrapVue: {
        bootstrapCSS: false, // Or `css: false`
        bootstrapVueCSS: false,
        componentPlugins: [
            'LayoutPlugin',
            'BreadcrumbPlugin',
            'ButtonPlugin',
            'CardPlugin',
            'CollapsePlugin',
            'DropdownPlugin',
            'ButtonToolbarPlugin',
            'NavPlugin',
            'NavbarPlugin',
            'PaginationNavPlugin',
            'ProgressPlugin',
            'ModalPlugin',
            'AlertPlugin',
            'FormInputPlugin',
            'ListGroupPlugin',
        ],
    },

    purgeCSS: {
        paths: [
            'components/**/*.vue',
            'layouts/**/*.vue',
            'pages/**/*.vue',
            'plugins/**/*.js',
            'node_modules/bootstrap-vue/src/components/**/*.vue',
            'node_modules/bootstrap-vue/src/components/**/*.js',
            'node_modules/bootstrap-vue/src/**/*.vue',
            'node_modules/bootstrap-vue/src/**/*.js',
            'node_modules/bootstrap-vue/es/**/*.js',
            'node_modules/bootstrap-vue/es/**/*.vue',
        ],
        styleExtensions: ['.css'],
        whitelist: ['body', 'html', 'nuxt-progress', 'b-navbar','home-header',
            'header-search', 'header','.list-group-item','list-group-item-action' ,'vbt-autcomplete-list'],
    },
    i18n: {
        locales: [
            {
                code: "en",
                name: "English",
                iso: "en",
                file: "en-US.js",
            },
            {
                code: "de",
                name: "Deutsch",
                iso: "de",
                file: "de-DE.js",
            },
            {
                code: "fr",
                name: "français",
                iso: "fr",
                file: "fr-FR.js",
            },
            {
                code: "es",
                name: "Español",
                iso: "es",
                file: "es-ES.js",
            },
            {
                code: "pt",
                name: "Português",
                iso: "pt",
                file: "pt-PT.js",
            },
            {
                code: "it",
                name: "Italiano",
                iso: "it",
                file: "it-IT.js",
            },
            {
                code: "nl",
                name: "Nederlands",
                iso: "nl",
                file: "nl-NL.js",
            },
            {
                code: "pl",
                name: "polski",
                iso: "pl",
                file: "pl-PL.js",
            },
            {
                code: "ru",
                name: "Русский",
                iso: "ru",
                file: "ru-RU.js",
            },
            {
                code: "ro",
                name: "Română",
                iso: "ro",
                file: "ro-RO.js",
            },
            // {
            //     code: "ko",
            //     name: "한국어",
            //     iso: "ko",
            //     file: "ko-KO.js",
            // },
            {
                code: "zh",
                name: "中文",
                iso: "zh",
                file: "zh-CN.js",
            },
            {
                code: "ja",
                name: "日本語",
                iso: "ja",
                file: "ja-JP.js",
            },
        ],
        baseUrl: 'https://sneakers123.com',
        lazy: true,
        langDir: 'lang/',
        strategy: 'prefix_except_default',
        defaultLocale: 'de',
        detectBrowserLanguage: false,
        seo: false,
        vueI18n: {
            fallbackLocale: 'en',
            silentFallbackWarn: true,
            silentTranslationWarn: true,
        },
        vuex: {
            // Module namespace
            moduleName: 'i18n',
            syncLocale: true,
        },

    },
    webfontloader: {
        custom: {
            families: [
                'Source+Sans+Pro:400,400i,600,700,700i,900,900i',
                'Open+Sans:300,300i,400,400i,600,600i,700,700i,800,800i'
            ],
            urls: [
                'https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,400i,600,700,700i,900,900i&display=swap',
                'https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i,800,800i&display=swap'
            ]
        }
    },
    gtm: {
        dev: false,
        id: 'GTM-PFHBRS8',
        scriptDefer: false,
    }
}