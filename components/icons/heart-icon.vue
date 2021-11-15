<template>
  <img v-lazy-load class="favorite-svg svg" lazy-default="~/assets/icon-def.svg" data-src="~/assets/icons/heart-icon.svg" src="~/assets/icon-def.svg" alt="icon">
</template>
<script>
    export default {
        name: 'heart-icon',
    }
</script>