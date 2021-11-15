<template>
    <footer-link-page/>
</template>

<script>
    import FooterLinkPage from "../components/footerLinkPage";

    export default {
        name: "story",
        components: {FooterLinkPage},
        middleware: 'loadMeta',
    }
</script>
