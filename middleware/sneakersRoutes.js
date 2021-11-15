import each from "lodash/each"
import startsWith from "lodash/startsWith"
export default async function ({ app, store, error, next, params, query, $axios, from}) {

    try{
        let header =  {title: '', image: ''};
        let {data} = await $axios.get('sneaker-routes/query', { progress: false,params :{
                query: query,
                url : params.pathMatch,
                locale: store.state.i18n.locale,
                currency: store.state.currency
            }});
        if(process.server || (from && from.name && !startsWith( from.name, 'sneaker'))) {

            header =  {title: data.metas.header_title, image: data.metas.header_image};
        }

        store.commit('resetQueries');
        each(data.query, function (value, key) {
            store.commit('changeQuery', {field: key, data: value});
        });
        // store.queries = data.query;
        each(data.landingQuery, function (value, key) {
            store.commit('changeQuery', {field: key, data: value});
        });
        store.commit('setQueryPage', (data.query ? data.query.page : 1));

        store.commit('setLandingQuery',data.landingQuery);
        let metasObj = {
            title:  data.metas.title,
            description: data.metas.description,
            seo_description: data.metas.seo_description
        };
        store.commit('setRouteMetas', metasObj)
        store.commit('setSneakerPagesHeader',header)
        let landingCategory = data.landingCategory;
        if (from && from.name && from.name.includes('sneaker'))
            landingCategory = false;

        if(store.state.categoryLanding !== landingCategory
            || (from && from.name && (from.name.includes('product') || from.name.includes('index'))))
            store.commit('setForceScrollTop',true)
        else
            store.commit('setForceScrollTop',false)

        store.commit('setCategoryLanding',landingCategory)
    }catch (e) {
        console.log('SneakerRoute middleware: ' + e)
        store.commit('setServerError', {status: true, statusCode: 404, message: ''});
        error({status: true, statusCode: 404, message: ''});
    }

}