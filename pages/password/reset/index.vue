<template>
    <div class="auth signinModal">
        <div class="modal-dialog1">
            <div class="modal-content">
                <div class="modal-header1">
                    <div class="row center">
                        <img class="footer-logo" src="~/assets/img/logo-white.svg" alt="Sneakers">
                    </div>
                    <button type="button" class="close-button p-0" @click="goBack">
                        <arrow-right style="transform: rotate(180deg)"/>
                    </button>
                </div>
                <div class="modal-body container-fluid">
                    <form @submit.prevent="submitForgot">
                        <div class="row">
                            <div class="triangle center"></div>
                        </div>
                        <div class="row">
                            <p class="title center" v-html="isSubmitted ? titles.afterForgot : titles.forgot"></p>
                        </div>
                        <div class="row email-group">
                            <span class="email-icon">@</span>
                            <input id="login-email" class="email-input" type="email" :placeholder="$t('Your email')"
                                   :class="{error: errors.email.status === true, valid: errors.email.status === false}"
                                   :readonly="isSubmitted"
                                   v-model.lazy="model.email">
                            <span class="status-icon"></span>
                            <label id="email-error" class="error" for="login-email">
                                <span v-html="errors.email.message"></span>
                            </label>
                        </div>
                        <div class="row button-row">
                            <button class="primary-button" type="submit" :disabled="errors.email.status || isSubmitted">
                                <arrow-right/>
                                <span class="primary-button-text">{{$t('Send Reset Link')}}</span>
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

    import formMixin from '../../../plugins/formMixin';
    import staticMetasMixin from "../../../plugins/staticMetasMixin"
    import { mapState } from 'vuex';

    export default {
        name: "index",
        components: {ArrowRight},
        mixins: [formMixin, staticMetasMixin],
        middleware: 'loadMeta',
        data() {
            return {
                titles: {
                    forgot: this.$t('Reset Password'),
                    afterForgot: this.$t('We have e-mailed your password reset link!'),
                },
                model: {
                    email: ''
                },
                errors: {
                    email: { status: null , message: null}
                },
                isSubmitted: false
            }
        },
        methods: {
            goBack() {
                window.history.length > 1
                    ? this.$router.go(-1)
                    : this.$router.push('/')
            },
            async submitForgot(){
                if (this.errors.email.status) {
                    return
                }
                this.$nuxt.$loading.start();
                try {
                    await this.$axios.post('/password/email', {email: this.model.email, locale: this.$i18n.locale});
                    this.isSubmitted = true;
                }
                catch (error) {
                    console.log('forgot ', error);
                    console.log(error.response.data.errors);
                    this._.each(error.response.data.errors, (message, input) => {
                        this.errors[input].status = true;
                        this.errors[input].message = this._.join(message, '<br>');
                    })
                }
                this.$nuxt.$loading.finish();
            },
        },
        watch: {
            'model.email': function (val) {
                this.checkEmail(val);
            }
        },
        computed: {
            ...mapState(['currentRouteMetas']),
        }
    }
</script>

<style scoped>

</style>