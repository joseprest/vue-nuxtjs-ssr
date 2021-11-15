<template>
    <div class="auth signinModal">
        <div class="modal-dialog1">
            <div class="modal-content">
                <div class="modal-header1">
                    <div class="row center">
                        <img class="footer-logo" src="~/assets/img/logo-white.svg" alt="Sneakers">
                    </div>
                    <button type="button" class="close-button p-0" @click="$router.push(localePath('index'))">
                        <arrow-right style="transform: rotate(180deg)"/>
                    </button>
                </div>
                <div class="modal-body container-fluid">
                    <div class="row">
                        <div class="triangle center"></div>
                    </div>
                    <div class="row">
                        <p class="title center">
                            {{$t('You have been unsubscribed from this price alert.')}}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ArrowRight from "../../components/icons/arrow-right";
    export default {
        name: "remove-alert",
        components: {ArrowRight},
        data(){
          return {
              success: true
          }
        },
        async asyncData({params, $axios}) {
            try {
                await $axios.$delete('price-alerts/destroy-uid/'+ params.uid);
                return {success: true}
            }catch(e){
                console.log('Error removing alert.')
                return {success: false}
            }

        },
        head(){
            return {
                meta: [
                    {hid: 'robots', name: 'robots', content: 'noindex'}
                ],
            }
        }

    }
</script>

<style scoped>

</style>