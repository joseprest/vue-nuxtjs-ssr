<template>
    <div class="cookies-banner" v-if="!$store.state.cookiesAccept">
        <span >{{$t('We use Cookies')}}</span>
        <b-btn variant="danger" size="sm" @click="$store.commit('acceptCookies')">OK</b-btn>
    </div>
</template>

<script>
    export default {
        name: "cookiesBanner"
    }
</script>