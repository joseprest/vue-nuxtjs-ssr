<template>
    <div class="shop-card" :class="{'bordered': product.shop.position === 'Highlighted'}">
        <nuxt-link target="_blank"
                   rel="nofollow"
                   :to="localePath({name: 'go',query: query })">
            <div class="logo">
                <client-only>
                    <img class="shop-logo" v-lazy-load :data-src="product.shop.logo" :alt="product.shop.name + ' logo'" />
                </client-only>
                <noscript  inline-template><strong class="shop-logo">{{product.shop.name}}</strong></noscript>
            </div>
            <div class="main">
                <div class="main-top">
                    <div class="coupon-info" :class="{countdown: isCountDown}" v-if="!_.isEmpty(product.shop.vouchers)">
                        <span v-if="product.shop.vouchers[0].type === 'Percentage'">
                            {{ $t('voucher-code-percentage', {code: product.shop.vouchers[0].code, amount: product.shop.vouchers[0].amount }) }}
                        </span>
                                <span v-else-if="product.shop.vouchers[0].type === 'Specific Amount'">
                            {{ $t('voucher-code-currency', {
                                code: product.shop.vouchers[0].code,
                                amount: product.shop.vouchers[0].amount,
                                currency: product.shop.vouchers[0].currency }) }}
                        </span>
                                <span v-else-if="product.shop.vouchers[0].type === 'Shipping'">
                            {{ $t('voucher-code-shipping', {code: product.shop.vouchers[0].code, amount: product.shop.vouchers[0].amount}) }}
                        </span>
                    </div>

                </div>
                <div class="main-middle">
                    <div class="info">
                        <span class="last-check">{{ $t('last-time-check', {time: product.last_check_human}) }}</span>
                    </div>
                    <div class="sizes" v-if="$store.state.auth.loggedIn">
                        <ul class="available-sizes" v-show="!_.isEmpty(product.sizes)">
                            <li v-for="(size,i) in product.sizes[$store.state.sizeFormat]" :key="i"
                                :class="{selected: selectedSizes(size)}" v-html="sizeHtml(size)"></li>
                        </ul>
                    </div>
                </div>
                <div class="main-bottom">
                    <div class="payment-options" v-if="featured && !_.isEmpty(product.shop.payment_options)">
                        <p>{{$t('Payment options')}}:</p>
                        <div class="bottom-mid">
                            <payment :methods="product.shop.payment_options"></payment>
                        </div>
                    </div>
                    <coupon :voucher="!_.isEmpty(product.shop.vouchers) ? product.shop.vouchers[0] : null" :isCountDown="isCountDown"></coupon>
                </div>
            </div>

            <div class="price top">

                <price :product="product" v-if="product.available"></price>
                <div :class="noCase(status)" v-if="!featured && status !== 'available'">{{status | titleCase}}</div>
            </div>
            <div class="shop-category">
                <go-button :url="url" :featured="featured" :text="true" :available="product.available" :lnk="lnk"
                           :partner="partner" :query="query" :isCountDown="isCountDown" :countDownExpiration="countDownExpiration"></go-button>
            </div>
        </nuxt-link>
    </div>
</template>

<script>
    import {mapState, mapGetters} from 'vuex';
    import Price    from "./Price";
    import Payment  from "./Payment";
    import Coupon   from "./Coupon";
    import GoButton from "./GoButton";
    import redirectMixin from '../../plugins/redirectMixin.js'

    export default {
        props: ['product', 'featured'],
        components: {GoButton, Coupon, Payment, Price},
        mixins: [redirectMixin],
        computed: {
            lnk() {
                return this.product.shop_url
            },
            url() {
                return this.product.url
            },
            partner() {
                return this.product.shop.name
            },
            status()
            {
                if (this.product.available)
                    return 'available';
                if (this.product.coming_soon)
                    return 'coming_soon';
                if (this.product.sold_out)
                    return 'sold_out';
            },
            isCountDown() {
                return (
                    this.product.shop.countdowns.length > 0 &&
                    this.product.shop.countdowns[0].is_active &&
                    (this.product.shop.countdowns[0].brand === this.$parent.$parent.$parent.$parent.sneaker.brand ||
                        this.product.shop.countdowns[0].release_id === this.$parent.$parent.$parent.$parent.sneaker.id)
                )
            },
            countDownExpiration() {
                return this.isCountDown ?  this.product.shop.countdowns[0].expiration : false;
            }
        },
        methods   : {
            selectedSizes(size)
            {
                let selectedSizes = this.$parent.$parent.$parent.$parent['sizes_' + this.$store.state.sizeFormat];
                if (selectedSizes)
                    return selectedSizes.includes(size);
                return false;
            },
            noCase(w)
            {
                return this._.replace(this._.lowerCase(w), ' ', '')
            }
            // redirectUp()
            // {
            //     this.$router.push({name: 'redirecting', query: {redirect: this.lnk}});
            // }
        },
        filters   : {},
    }
</script>
