<template>
  <header class="header home-header" id="header">
    <div class="header-bg" ref="head" lazy-default="~/assets/icon-def.svg" v-lazy-background
         :lazy-background="$device.isDesktop? $parent.headerBck: ''" v-lazy-load>
      <h1 class="header-title" v-html="$t('home-header-title')"></h1>
      <h2 class="header-subheadline">{{$t('Search over 100 sneaker shops at once')}}</h2>
      <div class="mobile-head-bg d-md-none">
        <img class="img-fluid" src="~/assets/img/sneakers123-bg.jpg" alt="bg"/>
      </div>
    </div>

    <search-header></search-header>

  </header>
</template>

<script>
    import SearchHeader from './SearchHeader'
    export default {
      name: "homeHeader",
      components: {SearchHeader},
    }
</script>

<style scoped>
</style>
