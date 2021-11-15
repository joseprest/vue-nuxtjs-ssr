<template>
  <img v-lazy-load class="search-svg svg" lazy-default="~/assets/icon-def.svg" data-src="~/assets/icons/search-icon.svg" src="~/assets/icon-def.svg" alt="icon">
</template>
<script>
    export default {
        name: 'search-icon',
    }
</script>