<template>
  <img v-lazy-load class="logout-svg svg" lazy-default="~/assets/icon-def.svg" data-src="~/assets/icons/logout-icon.svg" src="~/assets/icon-def.svg" alt="icon">
</template>
<script>
    export default {
        name: 'logout-icon',
    }
</script>