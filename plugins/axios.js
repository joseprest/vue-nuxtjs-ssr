import { cacheAdapterEnhancer, throttleAdapterEnhancer } from 'axios-extensions'

export default function ({ $axios, redirect, store, error, app }) {
    $axios.setHeader('X-Requested-With', 'XMLHttpRequest');
    const defaults = $axios.defaults;

    defaults.adapter = throttleAdapterEnhancer(cacheAdapterEnhancer(defaults.adapter, { enabledByDefault: false}));

    // $axios.onRequest(async config => {
    //     if(store.state.refreshing){
    //         return config
    //     }
    //
    //     if (process.client && (store.state.auth.loggedIn || config.url === (process.env.apiUrl + 'user') ) &&
    //         ((new Date()).getTime() >= store.state.ttl)
    //     ) {
    //         console.log('here we are');
    //         const new_token = await store.dispatch('refreshToken');
    //         if(new_token) {
    //             const tokenValue = 'Bearer ' + new_token
    //             app.$auth.setToken('local', tokenValue);
    //             app.$auth.syncToken('local');
    //             app.$auth.ctx.app.$axios.setHeader('Authorization', tokenValue)
    //             // app.$auth.setUserToken(new_token)
    //             config.headers['Authorization'] = tokenValue;
    //         }else {
    //             console.log('Token refresh failed. Log in again')
    //             await  store.dispatch('logout',true);
    //         }
    //     }
    //
    //
    //     return config
    // })

    $axios.onError(e => {
        console.log(e)
        const code = parseInt(e.response && e.response.status);
        const msg = e.response ? e.response.data.message : 'error';
        if(e.response.config.url.includes('releases/')){
            if(code === 404 && e.response.data.redirect)
            {
                let data = e.response.data;
                let code = data.code || 301;
                let path = data.type === 'index' ? app.localePath({name:'sneaker-all',  params: {pathMatch:data.redirect}}):
                                    app.localePath({name:'product',  params: {product:data.redirect}});
                let query =  data.type === 'index' ? {not_found: data.product} : {};
                redirect(code,path,query)
            }
        }
        if (e.response && e.response.config.method === 'get'
            && e.response.config.url.includes(process.env.apiUrl)
            && !e.response.config.url.includes('barcode')
            && !e.response.config.url.includes('refresh')
        ) {
            if (code !== 401) {
                console.log(msg);
                error({status: true, statusCode: code, message: msg});
            }else{
               store.dispatch('logout',true);
            }
        }
    })
    $axios.onResponse(response => {
        // console.log('onResponse');
        //store.commit('setServerError', {status: false});
    })
}

