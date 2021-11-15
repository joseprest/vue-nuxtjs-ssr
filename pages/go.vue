<template>
    <article class="container-fluid">
        <img src="~/assets/img/sneakers-loading.gif" alt="Sneakers123.com loading..." class="logo img-fluid" style="width: 300px;">
        <br>
        <br>
        <br>
        <h2>{{$t('We are redirecting you to our partner')}} <a :href="to">{{$route.query.partner}}</a></h2>
    </article>
</template>

<script>
    import atob from 'atob';
    export default {
        name    : 'Redirecting',
        head()
        {
            return {
                title: 'redirecting',
                meta : [
                    {hid: 'robots', name: 'robots', content: 'noindex,follow'},
                    {hid: 'partner', name: 'partner', content: this.$route.query.partner}
                ],
                script: [
                    {
                        hid: 'wecantrack',
                        type: 'text/javascript',
                        innerHTML: `
                               (function(w, c, t, u) {
                                        w._wct = w._wct || {}; w._wct = u; var s = c.createElement(t); s.type = 'text/javascript'; s.async = true; s.src = 'https://cdn.wecantrack.com/wct.js'; var r = c.getElementsByTagName(t)[0]; r.parentNode.insertBefore(s, r);
                                    }(window, document, 'script', {
                                        'uid' : 'r4qi87',
                                \t'google_tracking_id' : 'UA-72543924-12',
                                'expect_ga': false
                                    }));
                            `
                    }
                ]
            }
        },
        computed: {
            to()
            {
                return atob(this.$route.query.to);
            }
        },
        mounted()
        {
            if (this.$route.query.url) {
                setTimeout(() => {
                    if (this.loggedIn) {
                        try {
                            this.$axios.post('/click', {product: this.$route.query.url}).then().catch().then(() => {
                                this.redirect(this.to);
                            });
                        }
                        catch (e) {
                            console.log('go page', e.response ? e.response.status : e);
                            this.$router.go(-1)
                        }
                    } else {
                        this.redirect(this.to);
                    }
                }, 500);
            } else if (this.$route.query.to && !this.$route.query.url) {
                setTimeout(() => {
                    this.redirect(this.to);
                }, 500);
            } else {
                this.$router.go(-1)
            }
        },
        methods: {
            getTrackingURL(affiliateUrl) {
                if (typeof _wct !== "undefined" && _wct.getTrackingURL !== undefined) {
                    let trackingLink = _wct.getTrackingURL(affiliateUrl);
                    if (trackingLink) return trackingLink;
                }
                console.log('wecantrack error!');
                return affiliateUrl;
            },

                redirect(to) {
                   let tTo = this.getTrackingURL(to);
                   //console.log(tTo);
                   window.location.replace(tTo);
                }
        },

    }
</script>

<style scoped>
    article.container-fluid {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 2000;
        background-color: white;
        text-align: center;
        padding: 100px 1rem;
    }
</style>