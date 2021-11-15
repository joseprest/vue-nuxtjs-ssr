<template>
    <footer-link-page/>
</template>

<script>
    import FooterLinkPage from "../components/footerLinkPage";

    export default {
        name: "data-protection",
        components: {FooterLinkPage},
        middleware: 'loadMeta',
    }
</script>
