<template>
    <section class="shops-list" id="shops-list">
        <div class="switch-filters line mb-3" v-show="notFeaturedCount">
            <h3 class="font-weight-bold">{{$t('Available at', {count: notFeaturedCount})}}</h3>
        </div>
        <transition-group tag="div" class="line" name="list">
            <template v-for="product in $parent.$parent.notFeatured">
                <product-thumbnail :product="product" v-bind:key="product.id"></product-thumbnail>
            </template>
        </transition-group>
    </section>
</template>

<script>
    import ProductThumbnail       from "./ProductThumbnail";
    import {mapGetters, mapState} from "vuex";
    import ArrowRight from "../icons/arrow-right";

    export default {
        name      : 'ShopsList',
        components: {ArrowRight, ProductThumbnail},
        computed  : {
            shopsAvailable() {
                return this.$parent.$parent.featured.length + this.$parent.$parent.notFeatured.length;
            },
            notFeaturedCount() {
                return this.$parent.$parent.notFeatured.length;
            },
            // listLength() {
            //     return this.$auth.loggedIn ? this.$parent.$parent.notFeatured.length : 8 - this.$parent.$parent.featured.length
            // },
        },
    }
</script>
