import VuexPersistence from 'vuex-persist'

export default ({ app, store }) => {
    const storage = {
        setItem: app.$cookies.set,
        getItem: app.$cookies.get,
        removeItem: app.$cookies.remove,
    }

    let date = new Date;
    date.setDate(date.getDate() + 7);

    new VuexPersistence({
        storage: storage,
        restoreState: (key, storage) => app.$cookies.get(key),
        saveState: (key, state, storage) =>
            app.$cookies.set(key, state, {
                expires: date,
                maxAge: 60 * 60 * 24 * 7,
                path: '/'
            }),
        reducer: (state) => ({
            onceLoggedIn: state.onceLoggedIn,
            location: state.location,
            cookiesAccept: state.cookiesAccept,
            ttl : state.ttl,
            currency : state.currency
        }),
    }).plugin(store);

    if (process.client) {
        window.onNuxtReady(() => {
            new VuexPersistence({
                reducer: (state) => ({
                    favorites: state.favorites,
                    notifications: state.notifications,
                    previousSearches: state.previousSearches,
                    viewedSneakers: state.viewedSneakers,
                })
            }).plugin(store);
        });
    }
}