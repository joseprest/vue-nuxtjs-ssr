import Vue         from 'vue';
import axios from 'axios';
import {each, get, remove, isArray, set, orderBy, isEmpty, indexOf} from "lodash-core";

export const state = () => ({
    loadedSneakers       : {},
    loadingMoreSneakers  : false,
    currency             : 'eur',
    onceLoggedIn         : false,
    location             : {},
    currencies           : {USD: '$ US Dollar', EUR: '€ Euro', JPY: '¥ Yen', GBP: '£ Pound'},
    searchString         : '',
    queries              : {
        filters: [],
        gender : [],
        sizes  : [],
        color  : [],
        brands : [],
        category: [],
        discount_from: 0,
        page   : 1,
        sort   : 'relevant'
    },
    landingQuery        :{

    },
    sizeFormat           : 'eu',
    brands               : [{"brand":"Nike","clicks":474,"slug":"nike"},{"brand":"Adidas","clicks":307,"slug":"adidas"},{"brand":"Jordan","clicks":109,"slug":"jordan"},{"brand":"Asics","clicks":95,"slug":"asics"},{"brand":"Diadora","clicks":34,"slug":"diadora"},{"brand":"Puma","clicks":21,"slug":"puma"},{"brand":"Vans","clicks":16,"slug":"vans"},{"brand":"New Balance","clicks":15,"slug":"new-balance"},{"brand":"Reebok","clicks":14,"slug":"reebok"},{"brand":"Converse","clicks":13,"slug":"converse"},{"brand":"Timberland","clicks":11,"slug":"timberland"},{"brand":"Saucony","clicks":8,"slug":"saucony"},{"brand":"Clarks","clicks":6,"slug":"clarks"},{"brand":"Filling Pieces","clicks":3,"slug":"filling-pieces"},{"brand":"Veja","clicks":0,"slug":"veja"},{"brand":"Toms","clicks":0,"slug":"toms"},{"brand":"On","clicks":0,"slug":"on"}],
    landingsMenu         : [{"url":"limited-editions","title":"Limited Editions"}],
    favorites            : [],
    notifications        : [],
    previousSearches     : [],
    chosenFavorite       : {},
    chosenForNotify      : {},
    refreshing           : false,
    totalSneakersCount   : 61114,
    totalShopsCount      : 203,
    currentRouteMetas    : {},
    sneakerRouteHeader   : {},
    viewedSneakers       : [],
    cookiesAccept        : false,
    clipboardText        : '',
    serverError: false,
    serverErrorObj: {status: false},
    ttl: 0,
    categoryLanding: false,
    forceScrollTop: false,
    headerTopClass: []
});

export const mutations = {
    setLoadedSneakers(state, data)
    {
      state.loadedSneakers = data;
    },
    setLoadingMoreSneakers(state, data)
    {
      state.loadingMoreSneakers = data;
    },
    setHeaderTopClass(state, data)
    {
        state.headerTopClass = remove(state.headerTopClass, data.remove);
        if(indexOf(state.headerTopClass, data.add) === -1)
            state.headerTopClass.push(data.add);
    },
    setCategoryLanding(state, data)
    {
       state.categoryLanding = data;
    },
    setCurrency(state, data)
    {
      if(data && get(state.currencies, data.toUpperCase()))
          state.currency = data.toLowerCase();
    },
    acceptCookies(state) {
        state.cookiesAccept = true;
    },
    addViewedSneaker(state, data) {
        let viewedIndex = state.viewedSneakers.findIndex(el => el.slug === data.slug);
        if (viewedIndex > -1) {
            state.viewedSneakers.splice(viewedIndex, 1);
        }
        state.viewedSneakers.unshift(data);
        if (state.viewedSneakers.length > 20) {
            state.viewedSneakers.pop();
        }
    },
    setRouteMetas(state, data) {
        each(data, (value, key)=>{
            state.currentRouteMetas[key] = value;
        })
    },
    setSearchString(state, str) {
        state.searchString = str;
        state.queries.page = 1;
    },
    setSizeFormat(state, format) {
        state.sizeFormat = format
    },
    setForceScrollTop(state, data) {
        state.forceScrollTop = data;
    },
    changeQuery(state, data) {

        if(data.field === 'q')
            state.searchString = data.data;
        else
            set(state.queries, data.field, data.data);

        if (data.field !== 'page') state.queries.page = 1;
    },
    setQueryPage(state, data)
    {
        state.queries.page = (data ? data: 1);
    },
    setLandingQuery(state, data) {
       state.landingQuery = data;
    },
    setNextPage(state) {
        state.queries.page++
    },
    resetQueries(state) {
        state.queries = {
            filters: [],
            gender : [],
            sizes  : [],
            color  : [],
            brands : [],
            category: [],
            discount_from: 0,
            page   : 1,
            sort   : 'relevant'
        };
        state.searchString = '';
    },
    setLandingsMenu(state, data)
    {
        state.landingsMenu = data;
    },
    addMetas(state, data) {
        state[data.type][data.url] = {...state[data.type][data.url], ...data.data};
    },
    setOnceLoggedIn(state)
    {
        state.onceLoggedIn = true;
    },
    addFavorite(state, data) {
        state.favorites.push(data)
    },
    setFavorites(state, data) {
        state.favorites = data.map(el => el.slug)
    },
    removeFavorite(state, index) {
        state.favorites.splice(index, 1);
    },
    addNotification(state, data) {
        state.notifications.push(data);
    },
    setNotifications(state, data) {
        state.notifications = data.map(el => el.slug);
    },
    removeNotification(state, index) {
        state.notifications.splice(index, 1);
    },
    setChosenFavorite(state, data) {
        state.chosenFavorite = {...data};
    },
    setChosenForNotify(state, data) {
        state.chosenForNotify = {...data};
    },
    setPreviousSearches(state, data) {
        if (data) {
            if (state.previousSearches.includes(data)) {
                let index = state.previousSearches.indexOf(data);
                if (index > -1)
                    state.previousSearches.splice(index, 1);
            }
            state.previousSearches.unshift(data);
            if (state.previousSearches.length > 6) {
                state.previousSearches.pop();
            }
        }
    },
    clearPreviousSearches(state) {
        state.previousSearches = [];
    },
    setBrands(state, data) {
        state.brands = data;
    },
    addBrandClick(state, brand) {
        let index = state.brands.findIndex((item) => {
            return item.brand === brand;
        });
        state.brands[index].clicks++;
        state.brands = orderBy(state.brands, 'clicks', 'desc')
    },
    setVisitorLocation(state, data) {
        state.location = {...data}
    },
    setTotalSneakersCount(state, data) {
        state.totalSneakersCount = data;
    },
    setTotalShopsCount(state, data) {
        state.totalShopsCount = data;
    },
    setRefreshing(state, data) {
        state.refreshing = data;
    },
    setTTL(state, data) {
        state.ttl = (new Date()).getTime() + (data-1)* 1000;
    },
    setClipboardText(state, data) {
        state.clipboardText = data;
    },
    setServerError(state, data) {
        state.serverError = data.status;
        state.serverErrorObj = {...data};
    },
    setSneakerPagesHeader(state, data)
    {
        state.sneakerRouteHeader = data;
    },

};

export const actions = {
    async addViewedSneaker({state, commit}, data) {
        let viewedIndex = state.viewedSneakers.findIndex(el => el.slug === data.slug);
        if (viewedIndex === -1) {
            try {
                await this.$axios.post('view', {slug: data.slug})
            } catch (e) {
                console.log(e);
            }
        }
        commit('addViewedSneaker', data)
    },
    async refreshToken({state, commit, dispatch}) {
        commit('setRefreshing', true);
        try {
            if (process.client) {
                const oldToken = localStorage.getItem('auth._token.local');
                this.$axios.setHeader('Authorization', oldToken);
            }
            let {data} = await this.$axios.get('refresh');
            commit('setTTL', data.expires_in)
            commit('setRefreshing', false);
            return data.access_token;

        } catch (e) {
            console.log('refresh ', e.response ? e.response.status : e);
            commit('setRefreshing', false);
            dispatch('logout');
            return false;
        }

    },
    setSearchString({commit, dispatch}, data) {
        commit('resetQueries');
        commit('setSearchString', data);
        commit('setPreviousSearches', data);
    },
    async nuxtServerInit({state, commit, dispatch}, {req}) {
        try {
        ///    // let {data} = await axios.get(process.env.apiUrl + 'init');
      //    //  let data = {"landingsMenu":[{"url":"limited-editions","title":"Limited Editions"}],"brands":[{"brand":"Nike","clicks":474,"slug":"nike"},{"brand":"Adidas","clicks":307,"slug":"adidas"},{"brand":"Jordan","clicks":109,"slug":"jordan"},{"brand":"Asics","clicks":95,"slug":"asics"},{"brand":"Diadora","clicks":34,"slug":"diadora"},{"brand":"Puma","clicks":21,"slug":"puma"},{"brand":"Vans","clicks":16,"slug":"vans"},{"brand":"New Balance","clicks":15,"slug":"new-balance"},{"brand":"Reebok","clicks":14,"slug":"reebok"},{"brand":"Converse","clicks":13,"slug":"converse"},{"brand":"Timberland","clicks":11,"slug":"timberland"},{"brand":"Saucony","clicks":8,"slug":"saucony"},{"brand":"Clarks","clicks":6,"slug":"clarks"},{"brand":"Filling Pieces","clicks":3,"slug":"filling-pieces"},{"brand":"Veja","clicks":0,"slug":"veja"},{"brand":"Toms","clicks":0,"slug":"toms"},{"brand":"On","clicks":0,"slug":"on"}],"releasesTotal":61114,"shopsTotal":203};
      //      // commit('setLandingsMenu', data.landingsMenu);
      //      // commit('setBrands', data.brands);
       //     // commit('setTotalSneakersCount', data.releasesTotal);
       //     // commit('setTotalShopsCount', data.shopsTotal);

            // if (!state.location.code) {
            //     const botRegex = /bot|googlebot|crawler|spider|robot|crawling/i
            //     const isBot = req.headers['user-agent'] && botRegex.test(req.headers['user-agent'])
            //
            //     if(!isBot) {
            //         const ip = req.headers['x-real-ip'];
            //         await dispatch('getUserLocation', ip);
            //     }
            //     else
            //         await dispatch('getCountryInfo','DE');
            // }
            // commit('setInitLoaded');
        } catch (e) {
            console.log('init ', e.response ? e.response : e);
        }
    },
    async logout({state, commit}, local) {
        commit('setTTL', 0);
        if (local === true) {
            this.$auth.ctx.app.$axios.setHeader('Authorization', false);
            this.$auth.reset();
        } else {
            this.$auth.logout()
        }
    },

    async addFavourites({state, getters, commit, dispatch}, data) {
        const index = $nuxt._.indexOf(state.favorites, data.slug);
        if (index === -1) {
            try {
                await this.$axios.post('favorites', {
                    slug: data.slug
                });
                commit('addFavorite', data.slug);
            } catch (e) {
                console.log('fav ', e.response ? e.response.status : e);
                return Promise.reject(e);
            }
        } else {
            try {
                await this.$axios.delete('favorites/' + data.slug);
                commit('removeFavorite', index);
            } catch (e) {
                console.log('fav ', e.response ? e.response.status : e);
            }
        }
    },
    async removeNotification({state, commit, getters, dispatch}, slug) {
        try {
            await this.$axios.delete('price-alerts/' + slug);
            commit('removeNotification', $nuxt._.indexOf(state.notifications, slug))
        } catch (e) {
            console.log('alerts ', e.response ? e.response.status : e);
            return Promise.reject(e)
        }
    },
    async addSuggestionClick({state, commit, getters}, suggestionId) {
        try {
            await this.$axios.post(`suggestions/${suggestionId}/clicks/add`);
        } catch (e) {
            console.log('sugg click ', e.response ? e.response.status : e)
        }
    },
    async addBrandClick({state, commit, getters}, brand) {
        try {
            await this.$axios.post(`brands/${brand}/clicks/add`);
            commit('addBrandClick', brand)
        } catch (e) {
            console.log('brand click ', e.response ? e.response.status : e)
        }
    },
    async getUserLocation({dispatch}, ip) {
        let countryCode = 'DE';
        // const ipApiKey = process.env.ipApiKey;
        // let ipApiUrl = 'https://api.ipapi.com/'+ip+'?access_key=';
        // if(ip === '127.0.0.1')
        //     ipApiUrl = 'https://api.ipapi.com/check?access_key=';
        //
        // try {
        //     let location = await axios.get(ipApiUrl + ipApiKey,);
        //     let locationData = location.data;
        //     countryCode = locationData.country_code
        // } catch (e) {
        //     console.log('ipapi ', e.response ? e.response.status : e);
        // }

        await dispatch('getCountryInfo', countryCode)
    },
    async getCountryInfo({commit}, countryCode = 'DE') {
        try {
            let response, countryInfo;
            if (countryCode === 'DE') {
                countryInfo = require('../plugins/Germany').default;

                if (!process.client)
                    commit('setCurrency', countryInfo.currencies[0].code);
            } else {
                if (process.client) {
                    response = await fetch('https://restcountries.eu/rest/v2/alpha/' + countryCode, {
                        method: 'GET',
                        headers: {'X-Requested-With': 'XMLHttpRequest'}
                    });
                    countryInfo = await response.json();
                } else {
                    response = await axios.get('https://restcountries.eu/rest/v2/alpha/' + countryCode);
                    countryInfo = response.data;
                    commit('setCurrency', countryInfo.currencies[0].code);
                }
            }

            let location = {
                code: countryCode,
                currency: countryInfo.currencies[0].code,
                euu: countryInfo.regionalBlocs.findIndex(el => el.acronym === 'EU') > -1,
                language: countryInfo.languages[0].iso639_1,
                names: {
                    en: countryInfo.name,
                    ...countryInfo.translations
                }
            };
            commit('setVisitorLocation', location);
        } catch (e) {
            console.log('restcountries (' + countryCode + ')', e.response ? e.response.status : e);
        }
    },
}

export const getters = {
    currency(state) {
        return state.currency
    },
    getSneakersQueryParams(state, getters) {
        let params = {
            currency: getters.currency,
            page    : state.queries.page,
            location: state.location.code,
            lang    : state.i18n.locale
        };
        if (state.queries.sort !== 'relevant') {
            params.sort = state.queries.sort;
        }
        if (state.queries.filters.length > 0) {
            state.queries.filters.forEach(el => {
                params[el] = true;
            });
        }
        for (let key in state.queries) {
            if (key !== 'filters' && key !== 'sort' && isArray(state.queries[key]) && state.queries[key].length > 0) {
                params[key] = state.queries[key].join(',')
            }
        }
        if(state.queries.discount_from > 1 ) {
            params['discount_from'] = state.queries.discount_from;
        }

        if (state.searchString) {
            params.q = state.searchString
        }
        return params
    },
}