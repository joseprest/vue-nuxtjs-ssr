<template>
  <section class="col-6 col-sm-4 col-md-3 col-lg-2 shopcard">
	  <nuxt-link no-prefetch :to="redirectUrl" class="shopcard-button" target="_blank" rel="nofollow">
		<div class="shopcard-header">
		  <img src="~/assets/icon-def.svg" class="shopcard-logo" v-lazy-load :data-src="shop.logo" :alt="shop.name +' logo'">
		</div>
		<div class="shopcard-footer">
		  <h3 class="shopcard-name">{{shop.name}}</h3>
		  <h4 class="shopcard-country">{{ $t('countries-abbr.' + shop.country) }}</h4>
		  <!-- <h4 class="shopcard-products-number">{{ (shop.products_count || 0) + ' ' + $t('opportunities') }}</h4> -->
		</div>
	  </nuxt-link>
	</section>
</template>

<script>
const btoaImplementation = str => {
  try {
    return btoa(str);
  } catch(err) {
    return Buffer.from(str).toString('base64')
  }
};
    export default {
    	name: 'shopThumbnail',
		props: ['shop'],
      computed: {
        redirectUrl()
        {
          let query = {
            to: btoaImplementation(this.linkToShop),
            partner: this.shop.name,
            type: 'shop'
          };
          return this.localePath({name: 'go', query: query })
        },
        linkToShop()
        {
          if (!this._.isEmpty(this.shop.affiliate_link)) {
            if (this._.startsWith(this.shop.affiliate_link, '?')) {
              return (this.shop.website + this.shop.affiliate_link)
            }
            return this.shop.affiliate_link + encodeURI(this.shop.website);
          }
          return this.shop.website;
        },
      }
    }
</script>
