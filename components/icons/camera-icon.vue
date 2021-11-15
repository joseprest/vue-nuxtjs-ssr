<template>
  <img v-lazy-load class="camera-icon svg" lazy-default="~/assets/icon-def.svg" data-src="~/assets/icons/camera-icon.svg" src="~/assets/icon-def.svg" alt="icon">
</template>
<script>
    export default {
        name: 'camera-icon',
    }
</script>