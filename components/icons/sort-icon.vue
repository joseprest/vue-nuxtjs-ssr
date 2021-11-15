<template>
  <img v-lazy-load class="sort-icon svg" lazy-default="~/assets/icon-def.svg" data-src="~/assets/icons/sort-icon.svg" src="~/assets/icon-def.svg" alt="icon">
</template>
<script>
    export default {
        name: 'sort-icon',
    }
</script>