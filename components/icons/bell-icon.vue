<template>
  <img v-lazy-load class="notification-svg svg" lazy-default="~/assets/icon-def.svg" data-src="~/assets/icons/bell-icon.svg" src="~/assets/icon-def.svg" alt="icon">
</template>
<script>
    export default {
        name: 'bell-icon',
    }
</script>