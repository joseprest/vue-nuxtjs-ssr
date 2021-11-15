<template>
    <b-modal id="confirmationModal" modal-class="confirmationModal" centered hide-footer>
        <div slot="modal-header">
            {{ $t('confirm-unsubscribe') }}
        </div>
        <div class="row button-row" style="justify-content: center">
            <button class="primary-button mx-20" @click="confirmUnsubscribe">
                <span class="primary-button-text px-20">{{$t('Yes')}}</span>
            </button>
            <button class="primary-button mx-20" @click="revertUnsubscribe">
                <span class="primary-button-text px-20">{{$t('No')}}</span>
            </button>
        </div>
    </b-modal>
</template>

<script>
    import CloseIcon                            from "../icons/close-icon";
    import {mapState, mapMutations} from 'vuex';

    export default {
        name      : "confirmationModal",
        components: {CloseIcon},
        computed  : {
            ...mapState({storeUser: store=> store.auth.user}),
        },
        methods   : {

            confirmUnsubscribe()
            {
                this.$axios.post('mailchimp/unsubscribe', {'email': this.storeUser.email})
                    .then((response) => {
                        this.$emit('changeStatus', 'unsubscribed');
                        this.$auth.fetchUser()
                    })
                    .catch((e) => {
                        this.$emit('changeStatus', 'fail');
                    });
                this.closeModal();
            },
            revertUnsubscribe()
            {
                this.closeModal();
            },
            closeModal()
            {
                this.$root.$emit('bv::hide::modal', 'confirmationModal');
            }
        },
    }
</script>

<style scoped>

</style>