<template>
    <div class="selected-filters-container">
        <template v-for="(filter, key) in queries">
            <template v-if="filterIsSelected(filter, key)">
                    <span class="selected-filter-btn" v-for="(item, index) in filter" @click="$emit('remove-filter', {key, item, filter, index})">
                        {{makeFilterName(key, item)}}
                       <close-small-icon></close-small-icon>
                    </span>
            </template>
            <template v-if="key === 'discount_from' && filter > 0">
                    <span class="selected-filter-btn"  @click="$emit('remove-filter', {key,filter})">
                        {{$t('discount-from', {amount: filter})}}
                       <close-small-icon></close-small-icon>
                    </span>
            </template>
        </template>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    import CloseSmallIcon from "../icons/close-small-icon";

    export default {
        name: "appliedFilters",
        components: {CloseSmallIcon},
        props: ['filters'],
        computed: {
            ...mapState(['queries']),
        },
        methods: {
            ...mapActions(['changeQuery']),
            filterIsSelected(filter, key)
            {
                return typeof(filter) === 'object' && this.availableFilters.includes(key)
            },
            makeFilterName(key, item)
            {
                if(key === 'brands')
                    return this.brandNameBySlug(item);
                if(key === 'category' )
                    return item;
                if(key !== 'sizes' )
                    return this.$t('filters.' + item);

                 else
                    return item;
            }
        },
        data() {
            return {
                availableFilters: ['filters', 'gender', 'brands', 'color', 'sizes', 'discount_from', 'category']
            }
        }
    }
</script>

<style scoped>

</style>