<template>
  <img v-lazy-load class="filter-icon svg" lazy-default="~/assets/icon-def.svg" data-src="~/assets/icons/filter-icon.svg" src="~/assets/icon-def.svg" alt="icon">
</template>
<script>
    export default {
        name: 'filter-icon',
    }
</script>