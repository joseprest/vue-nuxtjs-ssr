<template>
    <footer-link-page/>
</template>

<script>
    import FooterLinkPage from "../components/footerLinkPage";

    export default {
        name: "two-m-two-m",
        components: {FooterLinkPage},
        middleware: 'loadMeta'
    }
</script>
