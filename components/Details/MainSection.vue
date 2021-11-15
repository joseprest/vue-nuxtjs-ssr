<template>
    <div class="row product-main">
        <div class="col-12 col-lg-1 image-picker" v-if="hasGallery">
            <div id="scrollBlock1" class="scroll-block ontop first" ref="scrollBlock1" :class="[scrollBlock, scrollBlock1]">
                <product-photo-radio :alt="$parent.sneaker.brand + ' ' + $parent.sneaker.name"
                                     index="0" :image="$parent.sneaker.image"></product-photo-radio>
                <template v-for="(img, index) in $parent.sneaker.gallery">
                    <product-photo-radio :alt="$parent.sneaker.brand + ' ' + $parent.sneaker.name"
                                         :index="index+1" :image="img"></product-photo-radio>
                </template>
            </div>
        </div>
        <div class="col-12 product-main-photo mt--90" :class="hasGallery ? 'col-lg-6' : 'col-lg-7'">
            <div id="scrollBlock2" class="scroll-block ontop second" ref="scrollBlock2"  :class="[scrollBlock, scrollBlock2]">
                <div class="trending-block" v-if="$parent.sneaker.is_trending">
                    <trending></trending>
                </div>
                <l-img  w="800" h="800" img-class="product-main-img" :src="sneakerImage" :alt="$parent.sneaker.brand + ' ' + $parent.sneaker.name + ' ' + $parent.sneaker.sku" />
<!--                <img class="product-main-img" :src="sneakerImage" :alt="$parent.sneaker.brand + ' ' + $parent.sneaker.name + ' ' + $parent.sneaker.sku">-->
                <div class="product-buttons">
                    <template>
                        <favorite-button :sneaker="$parent.sneaker"></favorite-button>
                        <span class="mr40">{{$t('Save this pair')}}</span>
                    </template>
                    <template v-if="findReleasePrice($parent.sneaker)">
                        <alert-button :sneaker="$parent.sneaker"></alert-button>
                        {{$t('Notify me about prices')}}
                    </template>
                </div>
            </div>
        </div>
        <div class="col-12 col-lg-5 product-infomation" :class="{ 'with-margin-top ': hasGallery }">
            <h3 class="ml-1 other-colors">{{$t('Other colors')}}:</h3>
            <div class="related mb-3" v-if="!isEmpty(related)">
                <template v-for="elem in related">
                    <n-link :to="localePath({name: 'product', params : { product : elem.slug}})" class="info-related">
                        <img :src="thumb(elem)" width="50" height="50" />
                    </n-link>
                </template>
            </div>
            <transition-group tag="div" name="list">
                <template v-for="f in $parent.featured">
                    <div class="shops-list featured" :key="f.id">
                        <product-thumbnail :product="f"  :featured="true"></product-thumbnail>
                    </div>
                </template>
            </transition-group>
            <div class="toggle-block">
                <span @click="toggleSizeMenu" class="btn btn-sm" :class="showSizeMenu? '': 'btn-primary btn-filter'">
                  <close-icon v-if="showSizeMenu" style="color:white;"></close-icon>
                  <span v-else>Filter sizes</span>
                </span>
            </div>
            <transition>
                <div class="size-menu" v-if="$store.state.auth.loggedIn" v-show="(availableSizes.eu.length || availableSizes.uk.length || availableSizes.us.length) && showSizeMenu">
                    <div class="filter-size">
                        <p class="filter-size-title">{{$t('Select size(s)')}}:</p>
                        <size-format-selector></size-format-selector>

                        <template v-for="size in availableSizes[sizeFormat]">
                            <label class="container-size">
                                <input type="checkbox" name="group3[]" :value="size" v-model="$parent['sizes_' + sizeFormat]">
                                <span class="label-text" v-html="sizeHtml(size)"></span>
                                <span class="checkmark"></span>
                            </label>
                        </template>
                    </div>
                    <div class="selected-sizes" v-if="showSizes">
                        <p class="filter-size-title">{{$t('Selected sizes')}}:</p>
                        <ul class="selected-sizes-list">
                            <template v-for="size in $parent.sizes_eu">
                                <selected-size :size="size" format="eu"></selected-size>
                            </template>
                            <template v-for="size in $parent.sizes_us">
                                <selected-size :size="size" format="us"></selected-size>
                            </template>
                            <template v-for="size in $parent.sizes_uk">
                                <selected-size :size="size" format="uk"></selected-size>
                            </template>
                        </ul>
                    </div>
                </div>
                <div v-else class="size-menu" v-show="showSizeMenu">
                  <div class="size-not-registered">
                    {{$t('size-register-required-text')}}
                    <nuxt-link class="btn btn-primary btn-sm" :to="onceLoggedIn? localePath('login'): localePath('register')">{{onceLoggedIn? $t('Sign in'): $t('Register')}}</nuxt-link>
                  </div>
                </div>
            </transition>

            <shops-list></shops-list>
        </div>
        <div class="col-12 product-table-info">
            <h3 class="font-weight-bold">{{ $parent.sneaker.brand }} {{ $parent.sneaker.name }} Details</h3>
            <div class="row">
                <div class="col-12 col-lg-6 image" >
                    <l-img w="800" h="800" class="product-main-img"
                           :src="sneakerImage" :alt="$parent.sneaker.brand + ' ' + $parent.sneaker.name + ' ' + $parent.sneaker.sku" />
                </div>
                <div class="col-12 col-lg-5 table">
                    <table>
                        <tbody>
                        <tr>
                            <td>Brand</td>
                            <td><nuxt-link :to="sneakerLocalePath(_.kebabCase($parent.sneaker.brand))">{{ $parent.sneaker.brand }}</nuxt-link></td>
                        </tr>
                        <tr>
                            <td>Model</td>
                            <td><nuxt-link :to="model.url">{{model.title}}</nuxt-link></td>
                        </tr>
                        <tr>
                            <td>Style Code</td>
                            <td>{{ $parent.sneaker.sku }}</td>
                        </tr>
                        <tr>
                            <td>{{$t('Gender')}}</td>
                            <td><span v-for="g in gender" :key="g.text">
                                <nuxt-link class="separated-links" :to="g.link">{{g.text}}</nuxt-link>
                            </span></td>
                        </tr>
                        <tr v-if="sneakerColors">
                            <td>{{$t('Color')}}</td>
                            <td><span v-for="g in sneakerColors" :key="g.text">
                                <nuxt-link class="separated-links" :to="g.link">{{g.text}}</nuxt-link>
                            </span></td>
                        </tr>
                        <tr>
                            <td>{{$t('Date added')}}</td>
                            <td>{{$parent.sneaker.created}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import Vegan                    from "./Vegan";
    import Trending                 from "./Trending";
    import ProductPhotoRadio        from "./ProductPhotoRadio";
    import AlertButton              from "../Sneakers/AlertButton";
    import SizeFormatSelector       from "../Sneakers/SizeFormat";
    import {mapState, mapMutations} from 'vuex';
    import SelectedSize             from "./SelectedSize";
    import ShopsList                from "./ShopsList";
    import FavoriteButton           from "../Sneakers/FavoriteButton";
    import {isEmpty, capitalize,map} from                "lodash-core";
    import ProductThumbnail from "./ProductThumbnail";
    import CloseIcon from "~/components/icons/close-icon";

    export default {
        data()
        {
            return {
                initRootSizeFormat: true,
                showSizeMenu: false,
                scrollBlock:  '',
                scrollBlock1: '',
                scrollBlock2: '',
                scrBlk2Left: 0
            }
        },
        name      : "mainSection",
        methods   : {
            toggleSizeMenu(){

                // if(this.$store.state.auth.loggedIn)
                    this.showSizeMenu = !this.showSizeMenu;
                // else {
                //     this.setClipboardText(this.$t('To view sizes, please create an account or log in.'));
                //     setTimeout(() => {
                //         this.setClipboardText('');
                //     }, 2000);
                // }
            },
            isEmpty : isEmpty,
            ...mapMutations(['setSizeFormat', 'setClipboardText']),
            // flat,unique,sort
            fus(array)
            {
                return this._.filter(this._.sortBy(this._.uniq(this._.flatten(array)), n => {return parseFloat(n)}), s => {
                    return !this._.isEmpty(s);
                });
            },
            scrollSpy()
            {
                let prMain = document.getElementsByClassName('product-main');
                let prTable = document.getElementsByClassName('product-table-info');
                let prInfo = document.getElementsByClassName('product-infomation');
                let prImg = document.getElementsByClassName('product-main-img');
                let scrollBlock2 = document.getElementById('scrollBlock2');
                if (prMain.length && window.innerWidth >= 992) {
                    prMain = prMain[0];
                    prInfo = prInfo[0];
                    prImg = prImg[0];
                    prTable = prTable[0];
                    let scroll = window.scrollY;
                    let start = prMain.offsetTop - 95;
                    let end = prInfo.offsetHeight - prTable.offsetHeight - 50;
                    let onBottomTop = prInfo.offsetHeight
                        - prImg.offsetHeight
                        - parseInt(getComputedStyle(prImg).marginTop)
                        - parseInt(getComputedStyle(prImg).marginBottom)
                        + parseInt(getComputedStyle(prInfo).marginTop);
                    let onscrollTop = 0;
                    if (scroll < start) {
                        this.scrollBlock = 'ontop top-0';
                        scrollBlock2.style.left = 'auto';
                        this.scrollBlock1 = '';
                        this.scrollBlock2 = '';
                    } else if ((scroll >= start) && (scroll < end)) {
                        this.scrollBlock1 = 'top-65';
                        this.scrollBlock2 = 'top-65';
                        this.scrollBlock = 'onscroll';
                        scrollBlock2.style.left = this.scrBlk2Left + 'px';
                    } else {
                        this.scrollBlock1 = '';
                        this.scrollBlock2 = '';
                        this.scrollBlock  = 'onbottom';
                        scrollBlock2.style.left = 'auto';
                        if(this.hasGallery)
                            this.$refs.scrollBlock1.style.top = onBottomTop + 'px';
                        scrollBlock2.style.top = onBottomTop + 'px';
                    }
                }
            },
            showSelectedSizes()
            {
                let sizesQuery = this.$route.query.sizes;
                if (sizesQuery) {
                    let sizes = sizesQuery.split(',');
                    let selectedFormats = [];
                    for (let index in sizes) {
                        let format = sizes[index].substr(0, 2);
                        let value = sizes[index].substr(2);

                        if (!selectedFormats.includes(format))
                            selectedFormats.push(format);

                        if (!this.$parent['sizes_' + format].includes(value)) {
                            let availableSizes = this.availableSizes[format];
                            let allAvailableSizes = availableSizes.filter(item => { return item.indexOf(value) > -1});
                            this.$parent['sizes_' + format] = this.$parent['sizes_' + format].concat(allAvailableSizes);
                        }
                    }
                    if (this.initRootSizeFormat)
                        this.setRootSizeFormat(selectedFormats);
                }
            },
            setRootSizeFormat(selectedFormats)
            {
                if (selectedFormats.includes('eu'))
                    this.setSizeFormat('eu');
                else if (selectedFormats.includes('us'))
                    this.setSizeFormat('us');
                else if (selectedFormats.includes('uk'))
                    this.setSizeFormat('uk');
                this.initRootSizeFormat = false;
            }
        },
        mounted()
        {
            let scrollBlock2 = document.getElementById('scrollBlock2');
            let scrollBlock1 = document.getElementById('scrollBlock1');
            if(scrollBlock1)
                this.scrBlk2Left = scrollBlock1.offsetWidth;

            let container = document.getElementsByClassName('product-section')[0];
            let containerStyle = container.currentStyle || window.getComputedStyle(container);
            this.scrBlk2Left += scrollBlock2.offsetLeft + parseInt(containerStyle.marginLeft);

            this.$nextTick(()=>{
                window.addEventListener('scroll', this.scrollSpy);
            })
        },
        destroyed() {
            window.removeEventListener('scroll', this.scrollSpy);
        },
        computed  : {
            ...mapState(['sizeFormat', 'onceLoggedIn']),
            sneakerColors(){
               return map(this.$parent.sneaker.colorways, (g)=>{
                   return {text: capitalize(g),
                            link: this.sneakerLocalePath('', {q:g})}});
            },
            gender()
            {
                let genders = isEmpty(this.$parent.sneaker.gender) ? ['men', 'women'] : this.$parent.sneaker.gender;
                return map(genders, (g)=>{
                    return { text: this.$t('filters.'+g), 'link': this.sneakerLocalePath(g)};
                });
            },
            model()
            {
              if(!isEmpty(this.$parent.sneaker.category)){
                return {
                  title: this.$parent.sneaker.category.title,
                  url: this.sneakerLocalePath(this.$parent.sneaker.category.url)
                }
              }else
              {
                  return { title: this.$parent.sneaker.name, url: this.sneakerRootPage({q: this.$parent.sneaker.name})}
              }
            },
            sneakerImage()
            {
                if (this.$parent.currentImageIndex == 0) {
                    // return this.$parent.sneaker.image ? this.$parent.sneaker.image :
                    //     require('~/assets/img/placeholder.png');
                    return this.thumb(this.$parent.sneaker, 'big');
                } else {
                    return this.$parent.sneaker.gallery[(this.$parent.currentImageIndex - 1)];

                }
            },
            showSizes()
            {
                if (this.initRootSizeFormat)
                    this.showSelectedSizes();

                return !this._.isEmpty(this.$parent.sizes_eu)
                    || !this._.isEmpty(this.$parent.sizes_us)
                    || !this._.isEmpty(this.$parent.sizes_uk)
            },
            availableSizes()
            {
                return {
                    eu: this.fus(this._.map(this.$parent.sneaker.products, p => { return p.sizes.eu })),
                    uk: this.fus(this._.map(this.$parent.sneaker.products, p => { return p.sizes.uk })),
                    us: this.fus(this._.map(this.$parent.sneaker.products, p => { return p.sizes.us })),
                }
            },
            hasGallery()
            {
                return this.$parent.sneaker.image && !this._.isEmpty(this.$parent.sneaker.gallery);
            },
            related() {
               return this.$parent.sneaker.colorway;
            }
        },
        components: {
          CloseIcon,
            ProductThumbnail,
            FavoriteButton,
            ShopsList,
            SelectedSize,
            SizeFormatSelector,
            AlertButton,
            ProductPhotoRadio,
            Trending,
            Vegan

        }
    }
</script>

<style scoped>
    .separated-links{
        margin-right: 5px;
    }
</style>