<template>
    <footer id="footer">
        <div class="container-fluid">
            <div class="row primary-footer justify-content-center">
                <div class="col-md-3 d-flex justify-content-md-center align-content-md-center">
                    <ul class="list-unstyled">
                        <li class="first-child">
                            <a @click.prevent="toggleCollapse('aboutCollapse')" >
                                <strong>{{$t('About Sneakers123')}}</strong>
                            </a>
                        </li>
                        <b-collapse id="aboutCollapse" v-model="aboutCollapse">
                            <li><router-link :to="localePath('story')">{{$t('Story')}}</router-link></li>
                            <li><router-link :to="localePath('contact')">{{$t('Contact')}}</router-link></li>
                        </b-collapse>
                    </ul>
                </div>
                <div class="col-md-3 d-flex justify-content-md-center align-content-md-center">
                    <ul class="list-unstyled">
                        <li class="first-child">
                            <a @click.prevent="toggleCollapse('legalCollapse')">
                                <strong>{{$t('Legal')}}</strong>
                            </a>

                        </li>
                        <b-collapse id="legalCollapse" v-model="legalCollapse">
                            <li><router-link :to="localePath('data-protection')">{{$t('Data Protection')}}</router-link></li>
                            <li><router-link :to="localePath('terms')">{{$t('Terms and Conditions')}}</router-link></li>
                            <li><router-link :to="localePath('imprint')">{{$t('Imprint')}}</router-link></li>
                        </b-collapse>
                    </ul>
                </div>
                <div class="col-md-3 d-flex justify-content-md-center align-content-md-center">
                    <ul class="list-unstyled">
                        <li class="first-child">
                            <a @click.prevent="toggleCollapse('otherCollapse')">
                                <strong>{{$t('Other')}}</strong>
                            </a>
                        </li>
                        <b-collapse id="otherCollapse" v-model="otherCollapse">
                            <li><a href="/blog" v-if="$i18n.locale === 'de'">{{$t('Blog')}}</a></li>
                            <li><router-link :to="localePath('models')">{{$t('All Models')}}</router-link></li>
                            <li><router-link :to="localePath('black-friday')">{{$t('Black Friday')}}</router-link></li>
                            <li><a href="https://fussballschuhe123.com/" target="_blank">Fussballschuhe123.com</a></li>
                            <!--<li><router-link :to="localePath('jobs')">{{$t('Jobs')}}</router-link></li>-->
                        </b-collapse>
                    </ul>
                </div>
                <div class="col-md-3 d-flex justify-content-md-center align-content-md-center">
                    <ul class="list-unstyled">
                        <li class="first-child">
                            <a @click.prevent="toggleCollapse('mediaCollapse')">
                                <strong>{{$t('Social Media')}}</strong>
                            </a>
                        </li>
                        <b-collapse id="mediaCollapse" v-model="mediaCollapse">
                            <li><a href="https://www.facebook.com/Sneakers123com" target=”_blank” rel="nofollow">Facebook</a></li>
                            <li><a href="https://www.instagram.com/sneakers123com/" target=”_blank” rel="nofollow">Instagram</a></li>
                            <!--<li><a href="https://twitter.com/">Twitter</a></li>-->
                        </b-collapse>
                    </ul>
                </div>
            </div>
        </div>
        <div class="app-footer">
                <span>Download Sneakers123 APP</span>
                <a href="https://apps.apple.com/us/app/sneakers123-find-sneakers/id1015070329" target="_blank">
                    <img v-lazy-load data-src="~/assets/images/logo-appstore.png" alt="Sneakers123 iOS App">
                </a>
        </div>
        <div class="container-fluid secondary-footer">
            <div class="row align-items-center footer-text">
                <span class="col-12">© 2015 - 2020 {{appName}} • {{$t('All rights reserved')}} • {{$t('Made in Vienna')}}</span>
            </div>
        </div>
    </footer>
</template>

<script>
    export default {
        name: "footerComponent",
        data() {
            return {
                appName: process.env.appName,
                isMobile: false,
                mediaCollapse: true,
                otherCollapse: true,
                legalCollapse: true,
                aboutCollapse: true
            }
        },
        mounted() {
            const checkStates = () => {
                this.isMobile = window.innerWidth < 767;
                this.mediaCollapse = this.otherCollapse = this.legalCollapse = this.aboutCollapse = !this.isMobile
            }
            // this.isMobile = window.innerWidth < 767;
            checkStates();
            window.addEventListener('resize', () => {
                checkStates();
            })
        },
        methods: {
            toggleCollapse(id) {
                if (this.isMobile) {
                    let init = this[id];
                    this.mediaCollapse = this.otherCollapse = this.legalCollapse = this.aboutCollapse = false;
                    this[id] = !init
                }
            },
        }
    }
</script>
