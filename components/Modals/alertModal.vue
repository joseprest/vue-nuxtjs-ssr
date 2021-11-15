<template>
    <b-modal id="alertModal" modal-class="alertModal" centered hide-footer>
        <span slot="modal-header-close" class="close-button">
            <close-icon/>
        </span>
        <div class="row">
            <img class="alert-img" src="~/assets/img/alert.svg" alt="success">
        </div>
        <div class="row center">
            <span class="col-12 pr-0 pl-0">{{$t('Succesfully added alert')}}</span>
            <span class="col-12 secondary-text center">
                {{$t('You will be informed with your selection when the price reaches the one you set')}}
            </span>
        </div>
        <div class="row button-row">
            <button class="primary-button" @click="btnClick">
                <arrow-right/>
                <span class="primary-button-text">{{$t('Go to account')}}</span>
            </button>
        </div>
    </b-modal>
</template>

<script>
    import {mapGetters, mapState} from 'vuex';
    import CloseIcon from "../icons/close-icon";
    import ArrowRight from "../icons/arrow-right";

    export default {
        name: "alertModal",
        components: {ArrowRight, CloseIcon},
        computed: {
            ...mapState(['onceLoggedIn'])
        },
        methods: {
            btnClick() {
                this.$root.$emit('bv::hide::modal','alertModal');
                this.loggedIn ? this.$router.push(this.localePath({name: 'profile-my-notifications'}))
                    : this.$router.push(this.localePath({name: this.onceLoggedIn ? 'login' : 'register'}))
            }
        }
    }
</script>

<style scoped>

</style>