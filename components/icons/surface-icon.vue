<template>
  <img v-lazy-load class="surface-icon svg" lazy-default="~/assets/icon-def.svg" data-src="~/assets/icons/surface-icon.svg" src="~/assets/icon-def.svg" alt="icon">
</template>
<script>
    export default {
        name: 'surface-icon',
    }
</script>