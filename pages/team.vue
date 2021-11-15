<template>
    <footer-link-page/>
</template>

<script>
    import FooterLinkPage from "../components/footerLinkPage";

    export default {
        name: "team",
        components: {FooterLinkPage},
        middleware: 'loadMeta'
    }
</script>
