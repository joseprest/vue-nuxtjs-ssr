<template>
  <div class="card border-dark black-friday-item">
    <nuxt-link :to="localePath({name: 'go',query: query })" rel="nofollow" target="_blank">
      <l-img class="card-img-top" :src="item.image" :alt="item.shop.name +  ' Black Friday' " />
      <l-img :src="item.shop.logo" :alt="item.shop.name" class="shop-logo" />
    </nuxt-link>
    <div class="card-body">
      <small class="text-muted">{{ item.shop.name }}</small>
      <h5 class="card-title">{{ item.the_title }}</h5>
      <p class="card-text">{{ item.the_description }}</p>
      <div class="text-center">
        <nuxt-link v-if="!item.code" :to="localePath({name: 'go',query: query })" rel="nofollow" target="_blank" class="button-main btn-block">
          {{$t('to_shop_button', {shop: item.shop.name})}}
        </nuxt-link>
        <button v-else class="button-main btn-block" @click="showCodeModal">{{$t('Check Code')}}</button>
      </div>
    </div>
<!--    <div class="card-footer bg-transparent"><small class="text-muted">{{ item.date_range }}</small></div>-->
  </div>
</template>

<script>
import redirectMixin from "@/plugins/redirectMixin";
export default {
  name: "BlackFridayThumbnail",
  props: ['item'],
  mixins: [redirectMixin],
  computed: {
    lnk() {
      return this.item.url
    },
  },
  methods: {
    showCodeModal()
    {
      this.$parent.$refs.codeModal.item = this.item
      this.$root.$emit('bv::show::modal','codeModal');
    }
  }
}
</script>