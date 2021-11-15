<template>
    <div class="shop-price-section">
        <div class="price-section-wrap">
            <template v-if="product.sale_price">
                <h5 class="sale-price"><span class="old-price">{{ getProductPrice }}</span> {{ getSalePrice }}</h5>
            </template>
            <template v-else>
                <!--<h5 class="new-price">{{// $root.price(product.price, user.currency)}}</h5>-->
                <h5 class="new-price">{{ getProductPrice }}</h5>
            </template>
            <!--<span class="user-price" v-if="userPrice">~ {{userPrice}}</span>-->
        </div>
        <shipping :product="product"></shipping>
    </div>
</template>

<script>
    import Shipping   from "./Shipping";
    import {mapState, mapGetters} from 'vuex'

    export default {
        props     : ['product'],
        components: {Shipping},
        computed  : {
           // ...mapState(['user']),
            ...mapGetters(['currency']),

            // userPrice()
            // {
            //     let cur = this.$store.getters.currency;
            //     if (this.product.shop.currency != cur.toUpperCase()) {
            //         return this.$root.price(this.product['price_' + cur], cur)
            //     }
            // },
            getProductPrice()
            {
                let currency = this.currency;

                let convertedPrice = this.product['price_' + currency.toLowerCase()];
                if (convertedPrice != false || convertedPrice != undefined)
                    return this.$root.price(convertedPrice, currency);

                return '-';
            },
            getSalePrice()
            {
                let currency = this.currency;
                let convertedSalePrice = this.product['sale_price_' + currency.toLowerCase()];
                if (convertedSalePrice != false || convertedSalePrice != undefined)
                    return this.$root.price(convertedSalePrice, currency);

                return '-';
            },
        }
    }
</script>
