<template>
  <img v-lazy-load class="barcode-icon svg" lazy-default="~/assets/icon-def.svg" data-src="~/assets/icons/barcode-icon.svg" src="~/assets/icon-def.svg" alt="icon">
</template>
<script>
    export default {
        name: 'barcode-icon',
    }
</script>