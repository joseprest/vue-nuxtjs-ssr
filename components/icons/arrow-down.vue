<template>
  <img v-lazy-load class="arrow-svg svg" lazy-default="~/assets/icon-def.svg" data-src="~/assets/icons/arrow-down.svg" src="~/assets/icon-def.svg" alt="icon">
</template>
<script>
    export default {
        name: 'arrow-down',
    }
</script>