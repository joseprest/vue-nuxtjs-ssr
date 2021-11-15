<template>
    <div class="shop-coupon" :id="getId" v-if="voucher">
        <span class="coupon-text">{{ $t('copy-code') }}</span>
        <div class="coupon-number" v-on:click="copyToClipboard" :class="{countdown: isCountDown}">{{voucher.code}}</div>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'

    export default {
        props     : ['voucher', 'isCountDown'],
        computed  : {
            ...mapState(['clipboardText']),

            getId()
            {
                if (this.voucher)
                    return 'shopCoupon' + this.voucher.code;
            }
        },
        methods   : {
            ...mapMutations(['setClipboardText']),

            copyToClipboard()
            {
                let isiOSDevice = navigator.userAgent.match(/ipad|iphone/i);
                let parent = document.getElementById(this.getId);
                let el = document.createElement('input');
                el.value = this.voucher.code;

                if (isiOSDevice) {
                    el.contentEditable = true;
                    el.readOnly = false;
                    let range = document.createRange();
                    range.selectNodeContents(el);

                    let selection = window.getSelection();
                    selection.removeAllRanges();
                    selection.addRange(range);

                    parent.appendChild(el);
                    el.setSelectionRange(0, 999);
                }

                if (!isiOSDevice) {
                    parent.appendChild(el);
                    el.select();
                }
                document.execCommand("copy");
                parent.removeChild(el);

                this.setClipboardText(this.$t('copied-to-clipboard'));
                setTimeout(() => {
                    this.setClipboardText('');
                }, 2000);
            }
        }
    }
</script>
