<template>
  <figure class="lazy-image-component">
    <client-only>
      <picture>
          <img v-lazy-load :data-src="src" :alt="alt" :class="imgClass"/>
      </picture>
      <slot v-if="placeholder" name="placeholder" slot="placeholder"><img :src="plc" :class="imgClass" :alt="alt"/></slot>
    </client-only>
    <noscript inline-template><img :class="imgClass" :src="src" :alt="alt"/></noscript>
  </figure>
</template>

<script>

export default {
  name: 'LazyImg',
  props: {
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String
    },
    imgClass: {
      type: String
    },
    placeholder: {
      type: String
    },
    w:{
      type : String
    },
    h: {
      type : String
    }
  },
  data(){
    return{
      plc: this.placeholder ? this.placeholder : require('~/assets/img/sneakers123-thumb.jpg')
    }
  },
  methods:{
    svgPlc:  (width, height) => `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"%3E%3C/svg%3E`
  }
}
</script>
<style scoped>

</style>