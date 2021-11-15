<template>
    <footer-link-page/>
</template>

<script>
    import FooterLinkPage from "../components/footerLinkPage";

    export default {
        name: "terms",
        components: {FooterLinkPage},
        middleware: 'loadMeta'
    }
</script>
