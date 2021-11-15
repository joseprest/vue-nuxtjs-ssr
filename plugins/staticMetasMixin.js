export default {
    computed: {
        pageTitle() {
            return this.replaceShopAndSneakerCount(this.currentRouteMetas.title)
        },
        pageDescription() {
            return  this.replaceShopAndSneakerCount(this.currentRouteMetas.description);
        }
    },
    head() {
        return {
            title: this.pageTitle || 'sneakers123.com',
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: this.pageDescription || 'sneakers123.com'
                },
                {
                    hid: 'og:title',
                    property: "og:title",
                    content: this.pageTitle || 'sneakers123.com'
                },
                {
                    hid: 'og:description',
                    property: "og:description",
                    content: this.pageDescription || 'sneakers123.com'
                },
                {hid: 'robots', name: 'robots', content: this.robotsMeta}
            ],
            link: this.alternateLinks,
            ...this.schemaBreadcrumbs,
            __dangerouslyDisableSanitizers: ['script']
        }
    },
}