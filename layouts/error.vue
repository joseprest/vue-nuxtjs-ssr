<template>
    <div class="container mt-5 pt-5 text-center">
        <h1 v-if="err.statusCode === 404">Page not found</h1>
        <h1 v-else>{{err.message ? err.message : 'Something went wrong'}}</h1>
        <h2>Error - {{err.statusCode}}</h2>
        <nuxt-link :to="localePath({name: 'index'})" v-if="err.statusCode !== 429">
            <img src="~/assets/img/Sneakers.svg" alt="sneakers123"/>
        </nuxt-link>
        <br>
    </div>
</template>

<script>
    export default {
        props: ['error'],
        computed: {
            err() {
                return this.$store.state.serverErrorObj.status ? this.$store.state.serverErrorObj : this.error
            }
        }
    }
</script>

<style scoped>

</style>