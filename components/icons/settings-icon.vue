<template>
  <img v-lazy-load class="settings-svg svg" lazy-default="~/assets/icon-def.svg" data-src="~/assets/icons/settings-icon.svg" src="~/assets/icon-def.svg" alt="icon">
</template>
<script>
    export default {
        name: 'settings-icon',
    }
</script>