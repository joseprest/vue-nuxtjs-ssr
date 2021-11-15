<template>
    <div class="bottom-banner" v-if="clipboardText">
        {{clipboardText}}
    </div>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        name    : "bottomBanner",
        computed: {
            ...mapState(['clipboardText']),
        }
    }
</script>

<style scoped>
</style>