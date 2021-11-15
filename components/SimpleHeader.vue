<template>
    <header class="header" id="header">
        <div class="h-60 hidden-on-mobile">
            <search-bar></search-bar>
        </div>
        <div class="header-bg-img" v-lazy-background :lazy-background="headerData.image" v-if="headerData.image">
            <div class="header-bg-mask">
                <h1 class="header-name">{{ headerData.title }}</h1>
              <h3 class="sub-header" v-if="subHeader.text">{{subHeader.text}}
              </h3>
              <h3 class="sub-header" v-else>
                  {{$t('sub-header-text', {
                      totalCount: subHeader.totalCount,
                      shopsCount: subHeader.shopsCount,
                      minPrice: price(subHeader.minPrice, $store.getters.currency)
                  })}}
                  <button class="btn btn-warning btn-sm text-white ml-2 mb-1" @click="scrollIt">{{$t('Show all')}}</button>
              </h3>
            </div>
        </div>
    </header>
</template>

<script>
    import SearchBar from "./SearchBar";
    export default {
        name      : 'SimpleHeader',
        props     : {
            headerData: {
                type   : Object,
                default: () => {return {
                    title: '',
                    image: ''
                }}
            },
            subHeader: {
                type: Object,
                default: () => {return {}}
            },
        },
        methods:{
            scrollIt(){
                document.getElementById("sorting").scrollIntoView({behavior: "smooth"});
            } ,
        },
        components: {SearchBar},
    }
</script>
