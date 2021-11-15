import Vue       from 'vue'
import lodash from 'lodash-core';
import {isEmpty,replace, capitalize, toLower, startCase, upperFirst, keys, difference} from 'lodash-core'
Vue.prototype._ = lodash;

import LazyImg from "../components/LazyImg";
Vue.component('l-img', LazyImg);

import LazyHydrate from "vue-lazy-hydration";
Vue.component('lazy-hydrate', LazyHydrate);

Vue.mixin({
    data(){
      return{
          barcodeScanner: false
      }
    },
    computed: {
        alternateLinks()
        {
            let path = this.switchLocalePath('de')
            return [
                {hid: 'x-default', rel: 'alternate', hreflang: 'x-default', href: 'https://sneakers123.com' + path},
            ]
        },
        robotsMeta() {
            return (isEmpty(this.$route.query) || isEmpty(difference(keys(this.$route.query),['not_found']))) ? 'all' : 'noindex,follow';
        },
        loggedIn() {
            return this.$store.state.auth.loggedIn;
        }
    },
    mounted()
    {
      if(window.innerWidth < 769)
          this.barcodeScanner = true
    },
    methods : {
        // svgPlaceholder(width,height){
        //
        //   return `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"%3E%3C/svg%3E`
        // },
        // soldSvgPlaceholder(width,height, bck)
        // {
        //     let bckText = bck ? `style="background-color=${bck};"`: '';
        //     return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width} ${height}'%3E%3Crect width='100%25' height='100%25' fill='${bck}'/%3E%3C/svg%3E`
        // },
        thumb(sneaker, size = 'small')
        {
            let thumb = sneaker.thumbnail_url || sneaker.image;
            try {
                return this._.isEmpty(thumb)
                    ? require(`~/assets/img/coming-soon-img/${sneaker.brand.toLowerCase().replace(' ', '-')}-coming-soon-${size}-min.jpg`)
                    : thumb
            } catch (e) {
                return require('~/assets/img/placeholder_thumb.png');
            }
        },
        releasePrice: function (release, format) {
            format = (format == undefined) ? this.$store.getters.currency : format;
            let price = release["sale_price_" + format] || release["price_" + format];

            if (price)
                return this.price(price, format);
            else if (price === 0)
                return '-';
            else
                return this.price(this.findReleasePrice(release, format))
        },
        priceRange  : function (release, format) {
            let price = release["sale_price_" + format] || release["price_" + format];
            if (price)
                return this.suffixPrice(price, format);
            else if (price === 0)
                return '-';
            else {
                let min = this.findMinPrice(release, format);
                let max = this.findMaxPrice(release, format);
                return min == max
                    ? (max ? this.suffixPrice(max, format) : '')
                    : (min ? min + ' - ' : '') + (max ? this.suffixPrice(max, format) : '');
            }
        },
        findMaxPrice(release, format)
        {
            format = format != undefined ? format : this.$store.getters.currency;
            return release.indexed_info.max_price[format];
        },
        findMinPrice(release, format)
        {
            format = format != undefined ? format : this.$store.getters.currency;
            return release.indexed_info.min_price[format];
        },
        findReleasePrice(release, format)
        {
            format = format != undefined ? format : this.$store.getters.currency;
            if(release.indexed_info)
                return release.indexed_info['current_price_'+ format];
            return 0;
        },
        suffixPrice : function (price, format) {
            if (format == 'usd' || format == 'jpy')
                return this[format + '_suffix'].to(price);
            return this[format].to(price);
        },
        price       : function (price, format, cutzeros) {
            format = (format === undefined) ? this.$store.getters.currency : format;
            format = this._.toLower(format);
            if (cutzeros !== undefined && cutzeros === true)
                return this[format + '_nz'].to(price);
            if (this[format])
                return this[format].to(price);
        },
        svg(brand)
        {
            try {
                if (brand)
                    // console.log();
                if (this._.includes(brand, '-'))
                    return require('~/assets/img/brands/' + this._.replace(brand, '-', '_').toLowerCase() + '.svg');
                else
                    return require('~/assets/img/brands/' + this._.replace(brand, ' ', '_').toLowerCase() + '.svg');
            } catch (e) {
                return '';
            }
        },
        checkIfSizesAvailable(sizes)
        {
            if (isEmpty(sizes))
                return false;
            else {
                if (isEmpty(sizes.eu) && isEmpty(sizes.us) && isEmpty(sizes.uk))
                    return false;
            }
            return true;
        },
        brandPath(brand)
        {
            return this.sneakerLocalePath(this._.kebabCase(brand))
        },
        sneakerLocalePath(path, query)
        {
            query = isEmpty(query) ? {}: query;
            let name = 'sneaker-all';
            return this.localePath( {name: name, params: {pathMatch: path}, query : query});
        },
        sneakerRootPage(query){
          let base = this.localePath('index', this.$store.state.i18n.locale);
          let url = '';
          if(this._.endsWith(base, '/'))
              url =  base + 'sneaker/';
          else
              url = base + '/sneaker/';
          return {
              path : url,
              query: query
          }
        },
        async navigateSneaker(){
            let route = await this.getSneakerRoute(this.$route.params.pathMatch);
            delete route.query.not_found;
            if(route.name)
                this.$router.push(this.localePath(route, this.$store.state.i18n.locale));
            else
                this.$router.push(this.sneakerRootPage(route.query))
        },
        async getSneakerRoute(pathMatch)
        {
            let {data} = await this.$axios.get('sneaker-routes/route', {
                params:
                    {
                        url: pathMatch,
                        landingQuery: this.$store.state.landingQuery,
                        ...this.$store.state.queries,
                        q : this.$store.state.searchString
                    }
            });
            let routeName = 'sneaker-all';
            if(data.path)
                return  {name: routeName, params: {pathMatch: data.path}, query : data.queries}
            else
                return {query: data.queries}
        },
        brandNameBySlug(slug)
        {
            let brand = this._.find(this.$store.state.brands, (brand)=> { return brand.slug === slug});
            return brand ? brand.brand : slug;
        },
        replaceShopAndSneakerCount(text)
        {
            text = text || '';
            return text.replace(/%{total}/g, this.$store.state.totalSneakersCount)
            .replace(/%{shopsCount}/g, this.$store.state.totalShopsCount);
        },
        openBarcodeScannerModal()
        {
            this.$root.$emit('bv::show::modal','barcodeModal');
        }
    }
});

Vue.filter('upper', function (word) {
    return upperFirst(word);
});

Vue.filter('titleCase', function (word) {
    return startCase(toLower(word));
},);

Vue.filter('capitalize', function (word) {
    return capitalize(word);
});

Vue.prototype.sizeHtml = function (size, format) {
    size = replace(size, '.66', '&#8532;')
    return (format !== undefined ? format.toUpperCase() : '') + replace(size, '.33', '&#8531;')
};