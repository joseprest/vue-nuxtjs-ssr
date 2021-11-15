<!--<template>-->
<!--    <div class="row text-center mb-3">-->
<!--        <b-btn variant="none" class="fb-btn mx-auto" @click="fbLogin">-->
<!--            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 216 216" class="_5h0m" color="#FFFFFF" width="24px" height="24px">-->
<!--                <path fill="#FFFFFF" d="M204.1 0H11.9C5.3 0 0 5.3 0 11.9v192.2c0 6.6 5.3 11.9 11.9-->
<!--              11.9h103.5v-83.6H87.2V99.8h28.1v-24c0-27.9 17-43.1 41.9-43.1-->
<!--              11.9 0 22.2.9 25.2 1.3v29.2h-17.3c-13.5 0-16.2 6.4-16.2-->
<!--              15.9v20.8h32.3l-4.2 32.6h-28V216h55c6.6 0 11.9-5.3-->
<!--              11.9-11.9V11.9C216 5.3 210.7 0 204.1 0z"></path>-->
<!--            </svg>-->
<!--            <span class="mx-3 text-white">{{title}}</span>-->
<!--        </b-btn>-->
<!--        <b-modal v-model="modalShow" content-class="fbRegEmail" size="md" centered :title="$t('Please enter email to complete registration')">-->
<!--            <template slot="modal-footer">-->
<!--                <div class="row justify-content-end modal-buttons">-->
<!--                    <b-btn variant="link" @click="modalShow = false">{{$t('Cancel')}}</b-btn>-->
<!--                    <b-btn class="ml-2" variant="link" @click="modalClose" :disabled="errors.email.status">{{$t('Complete Registration')}}</b-btn>-->
<!--                </div>-->
<!--            </template>-->
<!--            <b-form-input id="email" type="email" v-model="fbUser.email" class="mt-3"></b-form-input>-->
<!--        </b-modal>-->
<!--    </div>-->
<!--</template>-->

<!--<script>-->
<!--    import { mapState, mapMutations } from 'vuex';-->
<!--    import formMixin from '../../plugins/formMixin';-->
<!--    //TODO: fix this bullshit-->
<!--    export default {-->
<!--        name   : "fb-login",-->
<!--        props: ['title'],-->
<!--        mixins: [formMixin],-->
<!--        data() {-->
<!--            return {-->
<!--                modalShow: false,-->
<!--                fbUser: {-->
<!--                    id: null,-->
<!--                    email: ''-->
<!--                },-->
<!--                errors: {-->
<!--                    email: {status: true, message: null}-->
<!--                }-->
<!--            }-->
<!--        },-->
<!--        computed: {-->
<!--            ...mapState(['protectedPage', 'location']),-->
<!--        },-->
<!--        methods: {-->
<!--            ...mapMutations(['setUserInfo']),-->
<!--            async fbLogin() {-->
<!--                if (!this.fbUser.id) {-->
<!--                    // console.log('fb login');-->
<!--                    await this.$fb.sdk.login(response => {-->
<!--                        // console.log(response);-->
<!--                        this.fbUser.id = response.authResponse.userID;-->
<!--                        this.loadFBUserInfo();-->
<!--                    }, {scope:"public_profile,email,user_friends"});-->
<!--                    //fb_user_id, email, first_name, last_name-->
<!--                } else {-->
<!--                    this.loadFBUserInfo();-->
<!--                }-->
<!--                try {-->
<!--                    const {data} = await this.$axios.post('facebook/login', {-->
<!--                        fb_user_id: this.fbUser.id,-->
<!--                        email: this.fbUser.email-->
<!--                    });-->
<!--                    // console.log(data);-->
<!--                    if (data.status === "not found") {-->
<!--                        if (!!this.fbUser.email) {-->
<!--                            this.fbRegister();-->
<!--                        } else {-->
<!--                            this.modalShow = true;-->
<!--                        }-->
<!--                    } else {-->
<!--                        this.setUserInfo({data: data.user.original});-->
<!--                        this.$router.push(this.localePath(this.protectedPage))-->
<!--                    }-->
<!--                }-->
<!--                catch (e) {-->
<!--                    console.log('fb login ', e.response ? e.response.status : e);-->
<!--                }-->
<!--            },-->
<!--            checkLoginState() {-->
<!--                this.$fb.sdk.getLoginStatus(response => {-->
<!--                    // console.log(response);-->
<!--                    if (response.status === 'connected') {-->
<!--                        this.fbUser.id = response.authResponse.userID;-->
<!--                    }-->
<!--                })-->
<!--            },-->
<!--            async loadFBUserInfo() {-->
<!--                await this.$fb.sdk.api(-->
<!--                    `/me`,-->
<!--                    {"fields":"email,first_name,last_name,picture.type(normal)"},-->
<!--                    resp => {-->
<!--                        // console.log('logged in as:');-->
<!--                        // console.log(resp);-->
<!--                        this.fbUser= {...resp}-->
<!--                    })-->
<!--            },-->
<!--            async fbRegister() {-->
<!--                try {-->
<!--                    const newUser = await this.$axios.post('facebook/register', {-->
<!--                        fb_user_id: this.fbUser.id,-->
<!--                        email: this.fbUser.email,-->
<!--                        first_name: this.fbUser.first_name,-->
<!--                        last_name: this.fbUser.last_name,-->
<!--                        location: this.location.code,-->
<!--                        // photo: this.fbUser.picture.data.url-->
<!--                    });-->
<!--                    // console.log(newUser);-->
<!--                    this.setUserInfo({data: newUser.data.user.original});-->
<!--                    this.$router.push(this.protectedPage)-->
<!--                }-->
<!--                catch (e) {-->
<!--                    console.log('fb reg ', e.response ? e.response.status : e);-->
<!--                }-->
<!--            },-->
<!--            modalClose() {-->
<!--                this.modalShow = false;-->
<!--                this.fbRegister();-->
<!--            }-->
<!--        },-->
<!--        mounted() {-->
<!--            if (this.$fb.sdk) {-->
<!--                this.checkLoginState()-->
<!--            } else {-->
<!--                window.addEventListener('fb-sdk-ready', () => {-->
<!--                    // console.log('fb-sdk-ready');-->
<!--                    this.checkLoginState();-->
<!--                })-->
<!--            }-->
<!--        },-->
<!--        watch: {-->
<!--            'fbUser.email': function (val) {-->
<!--                this.checkEmail(val)-->
<!--            }-->
<!--        }-->
<!--    }-->
<!--</script>-->

<!--&lt;!&ndash;<style scoped>&ndash;&gt;-->
<!--&lt;!&ndash;    .fb-btn {&ndash;&gt;-->
<!--&lt;!&ndash;        background: #4267b2;&ndash;&gt;-->
<!--&lt;!&ndash;        padding: 8px;&ndash;&gt;-->
<!--&lt;!&ndash;    }&ndash;&gt;-->
<!--&lt;!&ndash;    .modal-buttons button:hover {&ndash;&gt;-->
<!--&lt;!&ndash;        text-decoration: none;&ndash;&gt;-->
<!--&lt;!&ndash;    }&ndash;&gt;-->
<!--&lt;!&ndash;</style>&ndash;&gt;-->