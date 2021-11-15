export default {
    methods: {
        shippingRule(product)
        {
            let countryCode = this.$store.state.location.code;
            let euu = this.$store.state.location.euu;
            let rules = product.shop.shipping_rules;

            if (this._.isEmpty(rules)) {
                return undefined;
            } else {
                rules = this._.groupBy(rules, 'country_code');
                if (rules[countryCode]) {
                    return this.getShippingCostOf(product, rules[countryCode]);
                }
                if (euu && rules['EUU']) {
                    return this.getShippingCostOf(product, rules['EUU']);
                }
                if (rules['WW']) {
                    return this.getShippingCostOf(product, rules['WW']);
                }
            }
        },
        getShippingCostOf(product, rules)
        {
            let currency = !this._.isEmpty(this.$store.state.user) ? this.$store.state.user.currency : product.shop.currency;
            let productPrice = product.sale_price ? product['sale_price_' + currency.toLowerCase()] : product['price_' + currency.toLowerCase()];
            let rule = this._.first(this._.sortBy(this._.filter(rules, function (item) {
                return item['minimum_' + currency.toLowerCase()] <= productPrice
            }), 'costs'));

            if (!rule)
                return undefined;

            if (rule.costs === 0)
                return 'free'; // Free Shipping

            return this.price(rule['costs_' + currency.toLowerCase()], currency);
        }
    }
}