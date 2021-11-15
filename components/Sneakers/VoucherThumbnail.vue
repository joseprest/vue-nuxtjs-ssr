<template>
    <section :class="'col-12 col-sm-6 ' + (slide? 'swiper-slide':'')">
        <div class="coupon">
            <div class="coupon-top">
                <div class="coupon-number-wraper">
                    <div :class="'coupon-number '+ cls" v-html="amount"></div>
                </div>
                <div class="coupon-top-text">
                    <span class="coupon-name">{{voucher.shop_name}}</span>
                    <span class="coupon-date">{{voucher.date_title}}</span>
                </div>
            </div>
            <div class="coupon-mid">
                <img class="coupon-img" :src="image" :alt="'Coupon '+voucher.shop_name">
                <h2 class="coupon-title" v-html="title"></h2>
            </div>
            <div class="coupon-text-wraper">
                <div class="coupon-text-fake"></div>
                <h3 class="coupon-text" v-html="desc"></h3>
            </div>
            <div class="coupon-bottom">
                <coupon :voucher="voucher"></coupon>
            </div>
        </div>
    </section>
</template>

<script>
    import {mapState} from 'vuex'
    import Coupon       from "../../components/Details/Coupon";

    export default {
        name      : "VoucherThumbnail",
        props     : ['voucher', 'slide'],
        components: {Coupon},
        computed  : {
            desc()
            {
                return this.voucher.description[this.$i18n.locale];
            },
            image()
            {
                try {
                    if (this.voucher.image)
                        return this.voucher.image;

                    return require('~/assets/img/coupons.jpg');
                } catch (e) {
                    return require('~/assets/img/coupons.jpg');
                }
            },
            amount()
            {
                if (this.voucher.type == 'Percentage')
                    return this.percentage.to(this.voucher.amount);
                if (this.voucher.type == 'Specific Amount')
                    return this.$root.price(this.voucher.amount, this._.lowerCase(this.voucher.currency), true);
                return 'free<br>shipping';
            },
            cls()
            {
                if (this.voucher.type == 'Shipping')
                    return 'freeship';
                return '';
            },
            title()
            {
                if (this.voucher.type == 'Percentage')
                    return '-' + this.percentage.to(this.voucher.amount) + ' off<br>everything';
                if (this.voucher.type == 'Specific Amount')
                    return '-' + this.$root.price(this.voucher.amount, this._.lowerCase(this.voucher.currency), true) + ' off<br>everything';
                return 'Free shiping';
            }

        }
    }
</script>
