<template>
  <img v-lazy-load class="mobile-search-icon svg" lazy-default="~/assets/icon-def.svg" data-src="~/assets/icons/mobile-search-icon.svg" src="~/assets/icon-def.svg" alt="icon">
</template>
<script>
    export default {
        name: 'mobile-search-icon',
    }
</script>