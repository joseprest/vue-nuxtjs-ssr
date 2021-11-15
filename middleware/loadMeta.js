export default function ({ store, route, params, $axios,app }) {
    return $axios.get('meta', { progress: false, params: {
        locale: store.state.i18n.locale,
        url: app.switchLocalePath('de')
    }}).then(({data}) => {
        let metasObj = {
            title:  data.title,
            description: data.description,
            seo_description: data.seo_description
        };
        store.commit('setRouteMetas', metasObj);
         store.commit('setSneakerPagesHeader', {title: data.header_title, image: data.header_image});
    }).catch(e => {
        console.log('meta ', e.response ? e.response.status : e);
    })

}