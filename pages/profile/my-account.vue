<template>
    <div class="col-lg-6 row mr-0 ml-0 pl-0 pr-0">
        <h2 class="col-12 my-pairs-title">{{$t('My account')}}</h2>
        <section class="col-12 account-form">
            <form id="myAccount" method="post" @submit.prevent="submitForm" autocomplete="off">
                <h3 class="formgroup-label">{{$t('Personal')}}</h3>
                <div class="row form-group">
                    <input :class="inputClass('email')" id="email" name="email" type="email" v-model.lazy="user.email"
                           onfocus="this.removeAttribute('readonly');" readonly autocomplete="off">
                    <label for="email">
                        <span>{{$t('E-Mail')}}</span>
                        <span class="error" v-html="errors.email.message"></span>
                    </label>
                    <span class="status-icon"></span>
                </div>
                <div class="row form-group">
                    <input :class="inputClass('name')" id="name" name="name" v-model="user.name" type="text">
                    <label for="name">
                        <span>{{$t('Name')}}</span>
                        <span class="error" v-html="errors.name.message"></span>
                    </label>
                    <span class="status-icon"></span>
                </div>
                <div class="row form-group">
                    <input :class="inputClass('afterName')" id="afterName" name="last_name" v-model="user.last_name" type="text">
                    <label for="afterName">
                        <span>{{$t('Last name')}}</span>
                        <span class="error" v-html="errors.last_name.message"></span>
                    </label>
                    <span class="status-icon"></span>
                </div>
                <div class="row form-group">
                    <div class="form-dropdown">
                        <select class="form-select" id="country" name="country" v-model="user.country">
                            <option v-for="country in countries" :key="country.alpha2Code" :value="country.alpha2Code">
                                {{countryName(country)}}
                            </option>
                        </select>
                        <label for="country">
                            <span>{{$t('Country')}}</span>
                        </label>
                        <span class="arrow-icon">
                            <arrow-down/>
                        </span>
                    </div>
                    <div class="form-dropdown form-dropdown_right">
                        <select class="form-select" id="currency" name="currency" v-model="user.currency">
                            <option v-for="(cur,sym) in currencies" v-bind:key="sym" :value="sym">{{cur}}</option>
                        </select>
                        <label for="currency">
                            <span>{{$t('Favorite Currency')}}</span>
                        </label>
                        <span class="arrow-icon">
                            <arrow-down/>
                        </span>
                    </div>
                </div>
                <div v-if="user.has_password">
                    <h3 class="formgroup-label">{{$t('Change Password')}}</h3>
                    <div class="row form-group">
                        <input :class="inputClass('old_password')" id="cur_password" name="old_password"
                               onfocus="this.removeAttribute('readonly');" readonly autocomplete="off"
                               :type="password1 ? 'password' : 'text'" v-model="passwords.old_password">
                        <label for="cur_password">
                            <span>{{$t('Current Password')}}</span>
                            <span class="error" v-html="errors.old_password.message"></span>
                        </label>
                        <span class="showpass-icon" id="toggler_cur_password" @click="password1 = !password1">
                        <eye-icon/>
                    </span>
                    </div>
                    <div class="row form-group">
                        <input :class="inputClass('new_password')" id="new_password" name="new_password"
                               onfocus="this.removeAttribute('readonly');" readonly autocomplete="off"
                               :type="password2 ? 'password' : 'text'" v-model.lazy="passwords.new_password">
                        <label for="new_password">
                            <span>{{$t('New Password')}}</span>
                            <span class="error" v-html="errors.new_password.message"></span>
                        </label>
                        <span class="showpass-icon" id="toggler_new_password" @click="password2 = ! password2">
                        <eye-icon/>
                    </span>
                    </div>
                    <div class="row form-group">
                        <input :class="inputClass('password_repeat')" id="rep_password" name="password_repeat"
                               onfocus="this.removeAttribute('readonly');" readonly autocomplete="off"
                               :type="password3 ? 'password' : 'text'" v-model.lazy="passwords.password_repeat">
                        <label for="rep_password">
                            <span>{{$t('Repeat New Password')}}</span>
                            <span class="error" v-html="errors.password_repeat.message"></span>
                        </label>
                        <span class="showpass-icon" id="toggler_rep_password" @click="password3 = !password3">
                        <eye-icon/>
                    </span>
                    </div>
                </div>

                <h3 class="formgroup-label">{{$t('Newsletter')}}</h3>
                <span class="newsletter-info">
                    {{$t('Get all your news and infos about upcoming sneaker releases and discounts in just one monthly email')}}
                </span>
                <div class="row newsletter-checkbox">
                    <label class="container-box center">{{$t('subscribe-newsletter')}}
                        <input type="checkbox" id="termsAndConditions" name="termsAndConditions" v-model="user.newsletter" v-on:change="toggleSubscription">
                        <span class="checkmark"></span>
                    </label>
                </div>
                <div class="row button-row">
                    <button class="primary-button" type="submit" :disabled="isLoading">
                        <arrow-right/>
                        <span class="primary-button-text">{{$t('Save Changes')}}</span>
                    </button>
                </div>
                <div class="success-message" v-if="successUpdate">{{successMessage}}</div>
                <b-alert dismissible :variant="subscription.status === 'success' || subscription.status === 'unsubscribed' ? 'success' : 'danger'"
                         :show="getSubscriptionStatus" v-if="getSubscriptionStatus">{{ subscription.message }}
                </b-alert>
            </form>
        </section>

        <confirmation-modal @changeStatus="changeStatus"/>
    </div>
</template>

<script>
    import {mapState, mapMutations, mapActions} from 'vuex'
    import staticMetasMixin from "../../plugins/staticMetasMixin"
    import formMixin                            from '../../plugins/formMixin';
    import ArrowRight                           from "../../components/icons/arrow-right";
    import ArrowDown                            from "../../components/icons/arrow-down";
    import EyeIcon                              from "../../components/icons/eye-icon";
    import ConfirmationModal                    from "../../components/Modals/confirmationModal";

    export default {
        name      : "my-account",
        components: {EyeIcon, ArrowDown, ArrowRight, ConfirmationModal},
        mixins    : [formMixin, staticMetasMixin],
        middleware: ['loadMeta','auth'],
        data() {
            return {
                errors: {
                    email: {status: null, message: null},
                    name: {status: null, message: null},
                    last_name: {status: null, message: null},
                    old_password: {status: null, message: null},
                    new_password: {status: null, message: null},
                    password_repeat: {status: null, message: null},
                },
                currencies: this.$store.state.currencies,
                password1: true,
                password2: true,
                password3: true,
                passwords: {
                    old_password: null,
                    new_password: null,
                    password_repeat: null,
                },
                successMessage: this.$t('Changes saved successfully!'),
                successUpdate: false,
                isLoading: false,
                subscription: {
                    status: '',
                    message: ''
                },
                countries : {}
            }
        },
        computed: {
            ...mapState(['currentRouteMetas', 'location']),
            ...mapState({storeUser: store=>store.auth.user}),
            getSubscriptionStatus() {
                return this.subscription.status === 'unsubscribed' || this.subscription.status === 'success' || this.subscription.status === 'fail';
            },
            user() {
                return {...this.storeUser}
            },
            inputClass() {
                return (name) => 'form-input ' + (
                    this.errors[name] === undefined ? '' :
                        this.errors[name].status === null ? '' :
                            (this.errors[name].message ? 'error' : 'valid'))
            },
            schemaBreadcrumbs() {
                return {}
            }
        },
        methods: {
            ...mapActions(['getCountryInfo']),
            changeStatus(value) {
                this.subscription.status = value;
                if (value === 'unsubscribed')
                    this.subscription.message = this.$t('unsubscription-success');
                else
                    this.subscription.message = this.$t('subscription-error');
            },
            async toggleSubscription(e) {
                if (e.target.checked) {
                    await this.$axios.post('mailchimp/subscribe', {'email': this.storeUser.email})
                        .then((response) => {
                            this.$auth.fetchUser()
                            this.subscription.status = 'success';
                            this.subscription.message = this.$t('subscription-success');
                        })
                        .catch((event) => {
                            if (event.response && (event.response.status === 422 || event.response.status === 500)) {
                                this.subscription.status = 'fail';
                                this.subscription.message = this.$t('subscription-error');
                            }
                        });
                } else {
                    this.$root.$emit('bv::show::modal', 'confirmationModal');
                }
            },
            countryName(country) {
                let name = country.translations[this.$i18n.locale.toLowerCase()];
                return name ? name : country.name
            },
            async submitForm() {
                if (!this.checkForm()) {
                    return
                }
                this.successUpdate = false;
                this.isLoading = true;
                this.$nuxt.$loading.start();
                try {
                    let response = await this.$axios.post('profile', this._.merge(this.user, this.passwords, {locale: this.$i18n.locale}));

                    await this.$auth.fetchUser();
                    this.successUpdate = true;
                    this.$store.dispatch('getCountryInfo', this.$store.state.auth.user.country)
                    this.$store.commit('setCurrency', this.$store.state.auth.user.currency)
                } catch (error) {
                    console.log('Account: ' + error)
                    this._.each(error.response.data.errors, (message, input) => {
                        if (!(input in this.errors)) {
                            this.errors[input] = {}
                        }
                        this.errors[input].status = true;
                        this.errors[input].message = this._.join(message, '<br>');
                    })
                }
                this.$nuxt.$loading.finish();
                this.isLoading = false;
            },
            checkConfirmPassword(val) {
                if (val !== this.passwords.new_password) {
                    this.errors.password_repeat.status = true;
                    this.errors.password_repeat.message = this.$t('Please enter equal password');
                } else {
                    this.errors.password_repeat.status = false;
                    this.errors.password_repeat.message = '';
                }
            },
            checkNewPassword(val) {
                if (val === null) return;
                this.errors.new_password.status = (!val || val.length < 6);
                this.errors.new_password.message = this.errors.new_password.status === true ?
                    (val ? this.$t('Please enter at least 6 characters') : this.$t('Please enter your password')) : null;
            },
            checkForm() {
                for (let err in this.errors) {
                    if (this.errors[err].status) {
                        return false
                    }
                }
                return true
            }
        },
        mounted() {
            if (!this.countries.length) {
                try {
                    fetch('https://restcountries.eu/rest/v2/all', {
                        method : 'GET',
                        headers: {'X-Requested-With': 'XMLHttpRequest'}
                    }).then( (response)=>{
                       response.json().then((data)=>{
                          this.countries = data;
                       })
                    });

                } catch (e) {
                    console.log('restcountries ', e.response ? e.response.status : e);
                }
            }
        },
        watch: {
            'user.email': function (val) {
                this.checkEmail(val);
            },
            'passwords.new_password': function (val) {
                this.checkNewPassword(val);
            },
            'passwords.password_repeat': function (val) {
                this.checkConfirmPassword(val);
            }
        }
    }
</script>

<style scoped>

</style>