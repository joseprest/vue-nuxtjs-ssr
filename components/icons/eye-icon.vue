<template>
  <img v-lazy-load class="eye-icon svg" lazy-default="~/assets/icon-def.svg" data-src="~/assets/icons/eye-icon.svg" src="~/assets/icon-def.svg" alt="icon">
</template>
<script>
    export default {
        name: 'eye-icon',
    }
</script>