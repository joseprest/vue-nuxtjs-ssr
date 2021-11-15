<template>
  <img v-lazy-load class="protect-icon svg" lazy-default="~/assets/icon-def.svg" data-src="~/assets/icons/protect-icon.svg" src="~/assets/icon-def.svg" alt="icon">
</template>
<script>
    export default {
        name: 'protect-icon',
    }
</script>