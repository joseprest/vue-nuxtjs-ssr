<template>
    <p class="shipping" v-if="$store.state.location.code && rule">
		 <span class="shipping-text">
			 <shipping-car/>
			 {{(rule === "free" ?  $t('Free Shipping') : $t('labels.shipping', {costs: rule, country: countryName}))}}
		 </span>
    </p>
</template>

<script>
    import shippingMixin from '../../plugins/shippingMixin';
    import ShippingCar   from "../icons/shipping-car";

    export default {
        components: {ShippingCar},
        props     : ['product'],
        mixins    : [shippingMixin],
        data()
        {
            return {
                rule: ''
            }
        },
        computed  : {
            countryName()
            {
                return this.$store.state.location.names[this.$i18n.locale] || this.$store.state.location.names.en;
            },
        },
        mounted()
        {
            this.rule = this.shippingRule(this.product);
        },

    }
</script>
