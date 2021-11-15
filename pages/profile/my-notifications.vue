<template>
    <div class="col-lg-9 row mr-0 ml-0 pl-0 pr-0">
        <h2 class="col-12 my-notification-title">{{$t('My notifications')}} ({{notifications.length}})</h2>
        <section class="col-12" v-for="sneaker in sneakers" :key="sneaker.slug">
            <div class="notification-card last">
                <div class="notification-photo">
                    <img class="notification-img" :src="thumb(sneaker)" :alt="sneaker.brand + ' ' + sneaker.name">
                </div>
                <div class="info">
                    <span class="top-info">{{sneaker.brand + ' ' + sneaker.name}}{{sneaker.alert.sent? ' ('+$t('Already sent')+')':''}}</span>
                    <span class="bottom-info">
                        {{$t('Price Alert set for')}}
                        <span>{{price(sneaker.alert.minimum, sneaker.alert.currency)}}</span>
                        {{$t('until')}}
                        <span>{{sneaker.alert.readableExpires}}</span>
                    </span>
                </div>
                <button class="secondary-button secondary-button__delete" @click="removeAlert(sneaker.slug)"> <!-- ="$root.removableAlert = "-->
                    <arrow-right/>
                    <span class="secondary-button-text">{{$t('Delete Alert')}}</span>
                </button>
            </div>
        </section>
        <b-modal id="alertRemoveModal" modal-class="alertModal" centered hide-footer ref="alertRemoveModal" @hidden="removable = null">
            <span slot="modal-header-close" class="close-button">
                <close-icon/>
            </span>
            <div class="row center">
                <span class="col-12 pr-0 pl-0">
                    {{$t('Do you really want to remove')}}<br>
                    {{$t('your price alert?')}}
                </span>
            </div>
            <div class="row yes-button-row">
                <button class="primary-button" @click="remove">
                    <arrow-right/>
                    <span class="primary-button-text">{{$t('Yes Please')}}</span>
                </button>
            </div>
        </b-modal>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex'
    import staticMetasMixin from "../../plugins/staticMetasMixin"
    import ArrowRight from "../../components/icons/arrow-right";
    import CloseIcon from "../../components/icons/close-icon";

    export default {
        name: "my-notifications",
        components: {CloseIcon, ArrowRight},
        mixins: [staticMetasMixin],
        middleware: ['loadMeta','auth'],
        data() {
            return {
                removable: null
            }
        },
        async asyncData({$axios, store}){
            try {
                let {data} = await $axios.get('price-alerts');
                store.commit('setNotifications', data);
                return {sneakers: data}
            } catch (e) {
                console.log('alerts ', e.response ? e.response.status : e);
            }
        },
        computed: {
            ...mapState([ 'notifications', 'currentRouteMetas']),
            schemaBreadcrumbs() {
                return {}
            }
        },
        methods: {
            ...mapActions(['removeNotification']),
            removeAlert(item) {
                this.removable = item;
                this.$refs.alertRemoveModal.show();
            },
            async remove() {
                // console.log('to remove - ' + this.removable);
                try {
                    await this.removeNotification(this.removable);
                    let idx = this._.indexOf(this.sneakers, {slug: this.removable})
                    this.sneakers.splice(idx,1)
                }
                catch (e) {
                    console.log(e)
                }
                this.$refs.alertRemoveModal.hide()
            },
        },
    }
</script>

<style scoped>

</style>