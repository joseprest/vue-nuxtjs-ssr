export default function ({ app, redirect, store }) {
    if(store.state.auth.loggedIn)
        redirect(app.localePath('index'))
}