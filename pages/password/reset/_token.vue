<template>
    <div class="auth signinModal">
        <div class="modal-dialog1">
            <div class="modal-content">
                <div class="modal-header1">
                    <div class="row center">
                        <img class="footer-logo" src="~/assets/img/logo-white.svg" alt="Sneakers">
                    </div>
                </div>
                <div class="modal-body container-fluid">
                    <form @submit.prevent="submitReset">
                        <div class="row">
                            <div class="triangle center"></div>
                        </div>
                        <div class="row">
                            <p class="title center" v-html="titles.reset"></p>
                        </div>
                        <div class="row email-group">
                            <span class="email-icon">@</span>
                            <input id="reset-email" class="email-input" type="email" :placeholder="$t('Your email')"
                                   :class="{error: errors.email.status === true, valid: errors.email.status === false}"
                                   readonly v-model="model.email">
                            <span class="status-icon"></span>
                            <label id="email-error" class="error" for="reset-email">
                                <span v-html="errors.email.message"></span>
                            </label>
                        </div>
                        <div class="row password-group">
                            <span class="lock-icon">
                                <protect-icon/>
                            </span>
                            <input id="reset-password" class="password-input" type="password" :placeholder="$t('Password (min 6 characters)')"
                                   :class="{error: errors.password.status === true, valid: errors.password.status === false}"
                                   onfocus="this.removeAttribute('readonly');" readonly autocomplete="off"
                                   v-model.lazy="model.password">
                            <span class="status-icon"></span>
                            <label id="password-error1" class="error" for="reset-password">
                                <span v-html="errors.password.message"></span>
                            </label>
                        </div>
                        <div class="row password-group">
                            <span class="lock-icon">
                                <protect-icon/>
                            </span>
                            <input id="confirm-resetPassword" class="password-input" type="password" :placeholder="$t('Password (min 6 characters)')"
                                   :class="{error: errors.passwordConfirm.status === true, valid: errors.passwordConfirm.status === false}"
                                   onfocus="this.removeAttribute('readonly');" readonly autocomplete="off"
                                   v-model.lazy="model.confirmPassword">
                            <span class="status-icon"></span>
                            <label id="password-error2" class="error" for="confirm-resetPassword">
                                <span v-html="errors.passwordConfirm.message"></span>
                            </label>
                        </div>
                        <div class="row button-row">
                            <button class="primary-button" type="submit"
                                    :disabled="errors.password.status || errors.passwordConfirm.status || isSubmitted">
                                <arrow-right/>
                                <span class="primary-button-text">{{$t('Reset Password')}}</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ArrowRight from "../../../components/icons/arrow-right";
    import ProtectIcon from "../../../components/icons/protect-icon";

    import formMixin from '../../../plugins/formMixin';
    import { mapState } from 'vuex';

    export default {
        name: "token",
        components: {ProtectIcon, ArrowRight},
        mixins: [formMixin],
        data() {
            return {
                titles: {
                    reset: this.$t('Reset Password'),
                    afterReset: ('<span class="atention">' + this.$t('Perfect!') + '</span> ' + this.$t('Your password has changed!')),
                },
                errors: {
                    email: {status: null, message: null},
                    password: {status: null, message: null},
                    passwordConfirm: {status: null, message: null},
                },
                model: {
                    email: this.$route.query.email,
                    password: '',
                    confirmPassword: '',
                },
                isSubmitted: false
            }
        },
        methods: {
            async submitReset() {
                if (this.errors.email.status || this.errors.password.status || this.errors.passwordConfirm.status) {
                    return
                }
                this.$nuxt.$loading.start();
                try {
                    let reset = await this.$axios.post('/password/reset', {
                        email: this.model.email,
                        password:this.model.password,
                        password_confirmation: this.model.confirmPassword,
                        token: this.$route.params.token});
                    this.isSubmitted = true;
                    // console.log(reset);
                    this.$router.push(this.localePath({name: 'login', query: {reset: true}}));
                }
                catch (e) {
                    console.log('reset ', e.response ? e.response.status : e);
                    // console.log(e.response.data.errors);
                    this._.each(e.response.data.errors, (message, input) => {
                        this.errors[input].status = true;
                        this.errors[input].message = this._.join(message, '<br>');
                    })
                }
                this.$nuxt.$loading.finish();
            }
        },
        watch: {
            'model.password': function (val) {
                this.checkPassword(val);
            },
            'model.confirmPassword': function (val) {
                this.checkConfirmPassword(val);
            }
        },
    }
</script>

<style scoped>

</style>