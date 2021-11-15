<template>
    <div class="auth signinModal">
        <div class="modal-dialog1" v-if="$route.params.token">
            <div class="modal-content">
                <div class="modal-header1">
                    <div class="row center">
                        <img class="footer-logo" src="~/assets/img/logo-white.svg" alt="Sneakers">
                    </div>
                </div>
                <div class="modal-body container-fluid">
                    <div class="row">
                        <div class="triangle center"></div>
                    </div>
                    <div class="row">
                        <p class="title center" v-html="titles[stage]"></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    import CloseIcon from "../../../components/icons/close-icon";
    import ArrowRight from "../../../components/icons/arrow-right";

    export default {
        name: "token",
        components: {ArrowRight, CloseIcon},
        data() {
            return {
                titles: {
                    afterReg: ('<span class="atention">'+this.$t('Perfect!')+'</span> '+this.$t('Never miss a pair again')),
                    verify: this.$t('Your email is being verified'),
                    afterVerify: ('<span class="atention">'+this.$t('Perfect!')+'</span> '+this.$t('Your email is verified!')),
                },
                stage: 'verify'
            }
        },
        mounted() {
            this.$nextTick(async () => {
                if (this.$route.params.token) {
                    this.$nuxt.$loading.start();
                    try {
                        let resp = await this.$axios.post('register/verify', {
                            token: this.$route.params.token
                        });
                        this.stage = 'afterVerify';
                        this.$auth.setUserToken(resp.data.access_token);
                    } catch (e) {
                        console.log('verify ', e.response.data.errors);
                    }
                    setTimeout(() => {
                        this.$router.push(this.localePath({name: 'index'}))
                    }, 500);
                    this.$nuxt.$loading.finish();
                }
                this.$router.push(this.localePath({name: 'index'}))
            })
        },
    }
</script>

<style scoped>

</style>