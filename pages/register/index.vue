<template>
    <div class="auth signinModal">
        <div class="modal-dialog1">
            <div class="modal-content">
                <div class="modal-header1">
                    <div class="row center">
                        <img class="footer-logo" v-lazy-load data-src="~/assets/img/logo-white.svg" alt="Sneakers">
                    </div>
                    <button type="button" class="close-button p-0" @click="goBack">
                        <arrow-right style="transform: rotate(180deg)"/>
                    </button>
                </div>
                <div class="modal-body container-fluid">
                    <template v-if="registrationComplete">
                        <div class="row">
                            <div class="triangle center"></div>
                        </div>
                        <div class="row">
                            <p class="title center" v-html="titles.afterReg"></p>
                        </div>
                        <div class="row underform-line">
                            <span class="info-message">{{$t('Please check you E-Mail and confirm your account')}}</span>
                        </div>
                    </template>
                    <form @submit.prevent="registerSubmit" v-else autocomplete="off">
                        <div class="row">
                            <div class="triangle center"></div>
                        </div>
                        <div class="row">
                            <p class="title center" v-html="titles.signIn"></p>
                        </div>
                        <div class="row email-group">
                            <span class="email-icon">@</span>
                            <input id="reg-email" class="email-input" type="email" :placeholder="$t('Your email')"
                                   :class="{error: errors.email.status === true, valid: errors.email.status === false}"
                                   onfocus="this.removeAttribute('readonly');" readonly autocomplete="off"
                                   v-model.lazy="model.email">
                            <span class="status-icon"></span>
                            <label id="email-error" class="error" for="reg-email">
                                <span v-html="errors.email.message"></span>
                            </label>
                        </div>
                        <div class="row password-group">
                            <span class="lock-icon">
                                <protect-icon/>
                            </span>
                            <input id="reg-password" class="password-input" type="password" :placeholder="$t('Password (min 6 characters)')"
                                   :class="{error: errors.password.status === true, valid: errors.password.status === false}"
                                   onfocus="this.removeAttribute('readonly');" readonly autocomplete="off"
                                   v-model.lazy="model.password">
                            <span class="status-icon"></span>
                            <label id="password-error1" class="error" for="reg-password">
                                <span v-html="errors.password.message"></span>
                            </label>
                        </div>
                        <div class="row">
                            <div class="container-box center mb-3">
                                <label :class="{invalid: errors.terms.status}">
                                    <link-parser :content="$t('Accept Terms & Conditions', termsLinkParams)"></link-parser>
                                    <input type="checkbox" name="termsAndConditions" v-model="model.terms">
                                    <span class="checkmark"></span>
                                </label>

                            </div>
                        </div>
                        <div class="row">
                            <div class="container-box center">
                                <label :class="{invalid: errors.terms.status}">{{$t('subscribe-newsletter')}}
                                    <input type="checkbox" name="termsAndConditions" v-model="model.subscribe">
                                    <span class="checkmark"></span>
                                </label>
                            </div>
                        </div>

                        <p class="custom-error-text" v-if="errors.recaptcha_token.status === true">
                            {{ 'Recaptcha error: ' + errors.recaptcha_token.message }}
                        </p>

                        <div class="row button-row">
                            <button class="primary-button" type="submit" :disabled="isDisable">
                                <arrow-right></arrow-right>
                                <span class="primary-button-text">{{submitTexts.signIn}}</span>
                            </button>
                        </div>
<!--                        <div class="text-center my-3">{{$t('Or')}}</div>-->
<!--                        <fb-login :title="$t('Sign up using Facebook')" disabled/>-->
                        <div class="row">
                            <nuxt-link class="right-link" :to="localePath({name: 'login'})">
                                {{$t('Already have an account?')}}
                            </nuxt-link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapState, mapMutations} from 'vuex';
    import CloseIcon                            from "../../components/icons/close-icon";
    import ProtectIcon                          from "../../components/icons/protect-icon";
    import ArrowRight                           from "../../components/icons/arrow-right";
    import formMixin                            from '../../plugins/formMixin';
    import staticMetasMixin                     from "../../plugins/staticMetasMixin"
    import LinkParser                           from "../../components/linkParser";
    import FbLogin from "../../components/profile/fb-login";

    export default {
        name      : "register",
        components: {FbLogin, LinkParser, ArrowRight, ProtectIcon, CloseIcon},
        mixins    : [formMixin, staticMetasMixin],
        middleware: ['loadMeta', 'guest'],
        data()
        {
            return {
                back : 'index',
                model               : {
                    email          : '',
                    password       : '',
                    confirmPassword: '',
                    terms          : false,
                    subscribe      : false
                },
                titles              : {
                    login      : ('<span class="atention">' + this.$t('Hey!') + '</span> ' + this.$t('Welcome Back')),
                    signIn     : (this.$t('Signing up is absolutely') + ' <span class="atention">' + this.$t('Free!') + '</span>'),
                    afterReg   : ('<span class="atention">' + this.$t('Perfect!') + '</span> ' + this.$t('Never miss a pair again')),
                    verify     : this.$t('Your email is being verified'),
                    afterVerify: ('<span class="atention">' + this.$t('Perfect!') + '</span> ' + this.$t('Your email is verified!')),
                },
                errors              : {
                    email          : {status: null, message: null},
                    password       : {status: null, message: null},
                    // passwordConfirm: {status: null, message: null},
                    terms          : {status: null, message: null},
                    recaptcha_token: {status: null, message: null},
                },
                submitTexts         : {
                    signIn: this.$t('Complete Registration'),
                },
                registrationComplete: false
            }
        },
        watch     : {
            'model.email'          : function (val) {
                this.checkEmail(val);
            },
            'model.password'       : function (val) {
                this.checkPassword(val);
            },
            'model.terms'          : function () {
                this.checkTerms()
            }
        },
        computed  : {
            ...mapState(['protectedPage', 'location', 'currentRouteMetas']),
            isDisable()
            {
                let count = 0;
                for (let err in this.errors) {
                    if (this.errors[err].status === false) {
                        count++
                    }
                }
                return count !== 3
            },
            termsLinkParams()
            {
                return {
                    linkOpen : `<a href="${this.localePath('terms')}">`,
                    linkClose: '</a>'
                }
            },
            schemaBreadcrumbs() {
                return {}
            }
        },
        methods   : {
            goBack()
            {
                if(this.back)
                    return this.$router.replace(this.localePath(this.back))
                this.$router.go(-1)
            },setBack(back)
            {
                this.back = back
            },
            async registerSubmit()
            {
                if (!this.checkForm()) {
                    return
                }
                const reToken = await this.submitRecaptcha();
                this.$axios.post('/register', {
                    email          : this.model.email,
                    password       : this.model.password,
                    subscribe      : this.model.subscribe,
                    location       : this.location.code,
                    locale         : this.$i18n.locale,
                    recaptcha_token: reToken
                }).then(resp => {
                    this.registrationComplete = true;
                }).catch(e => {
                    console.log(e.response.data.errors);
                    this._.each(e.response.data.errors, (message, input) => {
                        this.errors[input].status = true;
                        this.errors[input].message = this._.join(message, '<br>');
                    })
                })
            },
            async submitRecaptcha()
            {
                let token = null;
                try {
                    token = await this.$recaptcha.execute('register');
                    // console.log('ReCaptcha token:', token);
                } catch (error) {
                    console.log('Login error:', error);
                }
                return token;
            },
            checkForm()
            {
                this.checkEmail(this.model.email);
                this.checkPassword(this.model.password);
                // this.checkConfirmPassword(this.model.confirmPassword);
                this.checkTerms();
                for (let err in this.errors) {
                    if (this.errors[err].status) {
                        return false
                    }
                }
                return true
            },
            checkTerms()
            {
                this.errors.terms.status = !this.model.terms;
            },
        },
        beforeRouteEnter(to, from, next) {
            let back = 'index'
            if(from.name)
                back = false
            next((vm)=>vm.setBack(back));
        },
        async mounted()
        {
            await this.$recaptcha.init()
        },
    }
</script>

<style scoped>

</style>