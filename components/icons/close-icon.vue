<template>
  <img v-lazy-load class="close-icon svg" lazy-default="~/assets/icon-def.svg" data-src="~/assets/icons/close-icon.svg" src="~/assets/icon-def.svg" alt="icon">
</template>
<script>
    export default {
        name: 'close-icon',
    }
</script>