<template>
    <div class="row product-info">
        <div class="col-12 col-lg-7 product-wrap px-12">
<!--            <div class="product-logo-img">-->
<!--                <l-img :src="brandLogo" w="69" h="36" :alt="$parent.sneaker.brand + ' logo'">-->
<!--                    <strong slot="placeholder">{{$parent.sneaker.brand}}</strong>-->
<!--                </l-img>-->
<!--            </div>-->
<!--        </div>-->
<!--        <div class="col-12 col-lg-6 pl-0 pr-0"></div>-->
<!--        <div class="col-12 col-lg-5 product-wrap px-12">-->
            <h1 class="product-name">{{$parent.sneaker.brand}} {{$parent.sneaker.name}}</h1>
            <h2 class="product-name" style="font-size: 14px;">{{$parent.sneaker.sku}}</h2>
<!--            <h2 class="product-name" style="font-size: 14px;" v-if="getReleasePrice">{{$t('From').toLowerCase()}} {{ getReleasePrice }}</h2>-->
<!--            <div class="attributes">-->
<!--                <span class="attributes-section tags" v-if="$parent.sneaker.vegan || $parent.sneaker.is_trending">-->
<!--                    <vegan v-if="$parent.sneaker.vegan"></vegan>-->
<!--                    <trending v-if="$parent.sneaker.is_trending"></trending>-->
<!--                </span>-->
<!--                <span :style="{'order': !$parent.sneaker.vegan && !$parent.sneaker.is_trending ? '2' : '4'}"-->
<!--                      class="attributes-section mx-0 pr-1 pr-lg-0 my-1" :class="status">{{status | titleCase}}</span>-->
<!--                <span class="attributes-section product-number mx-0 px-1 px-lg-0 my-1">Stylecode (SKU): {{$parent.sneaker.sku}}</span>-->
<!--                <span class="attributes-section release-date mx-0 px-1 px-lg-0 my-1">Release Date: {{$d(Date.parse($parent.sneaker.created_at))}}</span>-->
<!--            </div>-->
        </div>
    </div>
</template>

<script>
    import Vegan    from "./Vegan";
    import Trending from "./Trending";

    export default {
        components: {Trending, Vegan},
        computed  : {
            getReleasePrice()
            {
                return this.releasePrice(this.$parent.sneaker);
            },
            brandLogo()
            {
                let b = this._.snakeCase(this.$parent.sneaker.brand);
                return require(`~/assets/img/brands/${b}.svg`) //'' window.Brands[  ];
            },
            status()
            {
                if (this._.find(this.$parent.sneaker.products, {available: true}))
                    return 'available';
                if (this._.find(this.$parent.sneaker.products, {coming_soon: true}))
                    return 'coming_soon';
                if (this._.find(this.$parent.sneaker.products, {sold_out: true}))
                    return 'sold_out';
            },
        },
    }
</script>
