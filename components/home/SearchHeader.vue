<template>
    <form class="header-search col-md-6 col-sm-10 col-12" @submit.prevent="submitSearchForm" :action="rootUrl">
        <type-ahead input-class="search-field"
                    v-on:search="search"
                    :placeholder="$t('placeholders.searchbar', {total: $store.state.totalSneakersCount})">

        </type-ahead>
        <button class="search-button" type="submit">
            <search-icon></search-icon>
        </button>

    </form>
</template>

<script>
    import SearchIcon from "../icons/search-icon";
    import BarcodeIcon from "../icons/barcode-icon";
    import TypeAhead from "../TypeAhead";

    export default {
        name    : 'SearchHeader',
        components: {
            TypeAhead, BarcodeIcon, SearchIcon,
        },
        data()
        {
            return {
                rootUrl: (this.sneakerRootPage()).path
            }
        },
        methods: {
            search(q){
                if (!q) {
                    this.$router.push(this.sneakerRootPage());
                }else
                    this.$router.push(this.sneakerRootPage({q: q}))
            },
            submitSearchForm(event)
            {
                this.search(event.target.elements.q.value)
            }
        }

    }
</script>