<template>
    <div class="auth signinModal">
        <div class="modal-dialog1">
            <div class="modal-content">
                <div class="modal-header1">
                    <div class="row center">
                        <img class="footer-logo" src="~/assets/img/logo-white.svg" alt="Sneakers">
                    </div>
                    <button type="button" class="close-button p-0" @click="goBack()">
                        <arrow-right style="transform: rotate(180deg)"/>
                    </button>
                </div>
                <div class="modal-body container-fluid">
                    <div class="row">
                        <div class="triangle center"></div>
                    </div>
                    <div class="row">
                        <p class="title center" v-html="$route.query.reset ? titles.afterReset : titles.login"></p>
                    </div>
                    <form @submit.prevent="submitLogin">
                        <div class="row email-group">
                            <span class="email-icon">@</span>
                            <input id="login-email" class="email-input" type="email" :placeholder="$t('Your email')"
                                   :class="{error: errors.email.status === true, valid: errors.email.status === false}"
                                   v-model.lazy="model.email">
                            <span class="status-icon"></span>
                            <label id="email-error" class="error" for="login-email">
                                <span v-html="errors.email.message"></span>
                            </label>
                        </div>
                        <div class="row password-group">
                            <span class="lock-icon">
                                <protect-icon/>
                            </span>
                            <input id="login-password" class="password-input" type="password" :placeholder="$t('Password (min 6 characters)')"
                                   :class="{error: errors.password.status === true, valid: errors.password.status === false}"
                                   v-model.lazy="model.password">
                            <span class="status-icon"></span>
                            <label id="password-error" class="error" for="login-password">
                                <span v-html="errors.password.message"></span>
                            </label>
                        </div>
                        <div class="row underform-line">
                            <nuxt-link :to="localePath({name: 'password-reset'})" class="forgot-pass">
                                {{$t('Forgot Password?')}}
                            </nuxt-link>
                        </div>

                        <p class="custom-error-text" v-if="errors.recaptcha_token.status === true">
                            {{ 'Recaptcha error: ' + errors.recaptcha_token.message }}
                        </p>

                        <div class="row button-row">
                            <button class="primary-button" type="submit"
                                    :disabled="errors.email.status || errors.password.status">
                                <arrow-right></arrow-right>
                                <span class="primary-button-text">{{submitTexts.login}}</span>
                            </button>
                        </div>
<!--                        <div class="text-center my-3">{{$t('Or')}}</div>-->
<!--                        <fb-login :title="$t('Login with Facebook')" disabled/>-->
                        <div class="row">
                            <nuxt-link class="right-link" :to="localePath({name: 'register'})">
                                {{$t('Register new account')}}
                            </nuxt-link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapState, mapMutations} from 'vuex'
    import ArrowRight from "../components/icons/arrow-right";
    import ProtectIcon from "../components/icons/protect-icon";
    import CloseIcon from "../components/icons/close-icon";
    import formMixin from '../plugins/formMixin';
    import staticMetasMixin from "../plugins/staticMetasMixin"

    export default {
        name: "login",
        components: {CloseIcon, ProtectIcon, ArrowRight},
        mixins: [formMixin, staticMetasMixin],
        middleware: ['loadMeta','guest'],
        data() {
            return {
                back : 'index',
                model: {
                    email: '',
                    password: ''
                },
                titles: {
                    login: ('<span class="atention">'+this.$t('Hey!')+'</span> '+ this.$t('Welcome Back')),
                    forgot: this.$t('Reset Password'),
                    afterForgot: this.$t('We have e-mailed your password reset link!'),
                    reset: this.$t('Reset Password'),
                    afterReset: ('<span class="atention">'+this.$t('Perfect!')+'</span> '+this.$t('Your password has changed!')),
                },
                errors: {
                    email: { status: null , message: null},
                    password: { status: null , message: null},
                    recaptcha_token: { status: null , message: null},
                },
                submitTexts: {
                    login : this.$t('Login to your account'),
                },
            }
        },
        beforeRouteEnter(to, from, next) {
            let back = 'index'
            if(from.name)
                back = false
            next((vm)=>vm.setBack(back));
        },
        computed: {
            ...mapState(['onceLoggedIn', 'currentRouteMetas']),
            schemaBreadcrumbs() {
                return {}
            }
        },
        methods: {
            ...mapMutations(['setTTL', 'setOnceLoggedIn']),
            async submitLogin() {
                if (!this.checkForm()) {
                    return
                }
                const reToken = await this.submitRecaptcha();

                this.$auth.loginWith('local', {
                    data: {
                       recaptcha_token: reToken,
                        ...this.model
                       }
                    }).then(()=>{
                        this.setTTL(process.env.tokenTTL)
                        this.setOnceLoggedIn()
                        this.$store.dispatch('getCountryInfo', this.$store.state.auth.user.country)
                        this.$store.commit('setCurrency', this.$store.state.auth.user.currency)
                        this.goBack()

                }).catch(e => {
                         console.log('login page', e);
                         this._.each(e.response.data.errors, (message, input) => {
                             this.errors[input].status = true;
                             this.errors[input].message = this._.join(message, '<br>');
                         })
                     })

            },
            checkForm() {
                this.checkEmail(this.model.email);
                this.checkPassword(this.model.password);
                return !this.errors.email.status && !this.errors.password.status
            },
            async submitRecaptcha() {
                let token = null;
                try {
                    token = await this.$recaptcha.execute('login');
                    // console.log('ReCaptcha login token:', token);
                } catch (error) {
                    console.log('ReCaptcha error:', error);
                }
                return token;
            },
            goBack()
            {
                if(this.back)
                    return this.$router.replace(this.localePath(this.back))
                this.$router.go(-1)
            }
            ,setBack(data)
            {
                this.back= data;
            }
        },
        watch: {
            'model.email': function (val) {
                if (this.model.password) {
                    this.checkForm()
                } else {
                    this.checkEmail(val);
                }
            },
            'model.password': function (val) {
                if (this.model.email) {
                    this.checkForm()
                } else {
                    this.checkPassword(val);
                }
            }
        },
        async mounted() {
            await this.$recaptcha.init()
        },
    }
</script>
