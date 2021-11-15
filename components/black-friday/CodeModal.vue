<template>
    <b-modal id="codeModal" centered hide-footer hide-header no-close-on-esc>

      <div v-if="!_.isEmpty(item)">
        <div class="row">
          <div class="col-3">
            <figure class="image is-2by1">
              <l-img :src="item.shop.logo" :alt="item.shop.name" />
            </figure>
          </div>
          <div class="col">
            <small class="text-muted">{{item.shop.name}}</small>
            <h2 class="title">{{item.the_title}}</h2>
            <p class="subtitle">{{item.the_description}}</p>
          </div>
        </div>
        <div class="field">
          <div class="form-group">
            <input type="text" class="form-control-lg form-control text-center" :value="item.code" readonly="" />
          </div>
        </div>
        <div class="control text-center">
          <nuxt-link :to="localePath({name: 'go',query: query })" rel="nofollow" target="_blank" class="button-main btn-block">
            {{$t('to_shop_button', {shop: item.shop.name})}}
          </nuxt-link>
        </div>
      </div>
    </b-modal>
</template>

<script>

    import CloseIcon from "@/components/icons/close-icon";
    import redirectMixin from "@/plugins/redirectMixin";
    export default {
        name: "CodeModal",
      components: {CloseIcon},
      mixins: [redirectMixin],
      computed: {
        lnk() {
          return this.item.url
        },
      },
      data() {
          return {
            item : {}
          }
      }
    }
</script>

<style scoped>

</style>