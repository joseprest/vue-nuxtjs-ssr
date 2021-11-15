<template>
    <nav aria-label="Sneaker navigation">
        <b-pagination-nav
                @input="goToTop"
                :value="$parent.queryPage"
                :number-of-pages="Math.ceil($parent.loadedSneakers.total/$parent.loadedSneakers.per_page)"
                align="center"
                :link-gen="linkGen"
                size="lg"
                use-router
        ></b-pagination-nav>
        <!--                v-model="$parent.queryPage"-->
<!--        :total-rows="$parent.loadedSneakers.total"-->
<!--        :per-page="$parent.loadedSneakers.per_page"-->
    </nav>
</template>

<script>
    import {mapState} from 'vuex'
    import Coupon       from "../../components/Details/Coupon";
    import {debounce, endsWith} from "lodash-core";

    export default {
        name      : "Pagination",
        methods: {
            linkGen(pageNum) {
                let path = this.$route.path.replace(/\/page\/.*/gm, '');
                if((path+'/' === this.sneakerRootPage().path) && pageNum ===1)
                    path = path + '/';

                let pagePath =  pageNum === 1 ? path : path + (endsWith(path, '/') ? '':'/') + 'page/' + pageNum;
                return this.$route.fullPath.replace(this.$route.path, pagePath)
            },
            goToTop(){
                if(!this.$store.state.loadingMoreSneakers)
                    document.getElementById('products-list').scrollIntoView()
            }
        }
    }
</script>
