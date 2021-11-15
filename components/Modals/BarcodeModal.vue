<!--<template>-->
<!--    <b-modal id="barcodeModal" centered hide-footer-->
<!--             @hidden="destroyScanner" @shown="initScanner" :title="$t('Barcode Scanner')">-->
<!--        <client-only>-->
<!--            <v-scanner :onDetected="detected"-->
<!--                      :readerTypes="['upc_reader', 'ean_reader']" ref="scanner"></v-scanner>-->
<!--        </client-only>-->

<!--    </b-modal>-->
<!--</template>-->

<!--<script>-->
<!--    import Vue from 'vue'-->
<!--    if(process.client) {-->
<!--        let Scanner = require('./../Scanner').default-->
<!--        Vue.component('v-scanner', Scanner);-->
<!--    }-->
<!--    import {mapMutations} from 'vuex'-->
<!--    export default {-->
<!--        name      : "BarcodeModal",-->
<!--        data(){-->
<!--            return {-->
<!--                detecting : false-->
<!--            }-->
<!--        },-->
<!--        methods   : {-->
<!--            ...mapMutations(['setClipboardText']),-->
<!--            closeModal()-->
<!--            {-->
<!--                this.$root.$emit('bv::hide::modal', 'barcodeModal');-->
<!--            },-->
<!--            detected(res)-->
<!--            {-->
<!--                if(this.detecting)-->
<!--                    return;-->
<!--                this.detecting = true;-->
<!--                this.pauseScanner()-->
<!--                this.$axios.get('barcode?barcode=' + res.codeResult.code ).then(({data})=>{-->
<!--                    this.destroyScanner();-->
<!--                    this.$router.push( this.localePath({name: 'product', params: {product: data.slug}}), ()=>{-->
<!--                        this.detecting = false;-->
<!--                        this.closeModal();-->
<!--                    },()=>{-->
<!--                        this.detecting = false;-->
<!--                        this.closeModal();-->
<!--                    })-->

<!--                }).catch(e=>{-->
<!--                    this.setClipboardText(this.$t('product-not-found'))-->
<!--                    setTimeout(() => {-->
<!--                        this.setClipboardText('');-->
<!--                        this.startScanner();-->
<!--                        this.detecting = false;-->
<!--                    }, 2000);-->
<!--                })-->

<!--            },-->
<!--            initScanner()-->
<!--            {-->
<!--                this.$refs.scanner.init()-->
<!--            },-->
<!--            startScanner()-->
<!--            {-->
<!--                this.$refs.scanner.start()-->
<!--            },-->
<!--            destroyScanner()-->
<!--            {-->
<!--                this.$refs.scanner.destroy()-->
<!--            },-->
<!--            pauseScanner()-->
<!--            {-->
<!--                this.$refs.scanner.pause()-->
<!--            }-->
<!--        },-->

<!--    }-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->