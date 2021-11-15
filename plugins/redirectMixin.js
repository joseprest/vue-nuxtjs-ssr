const btoaImplementation = str => {
    try {
        return btoa(str);
    } catch(err) {
        return Buffer.from(str).toString('base64')
    }
};
export default {
    computed: {
        query() {

            let clickRefValue = this.$auth.loggedIn && this.$auth.user.uuid ? this.$auth.user.uuid : 'blank';
            let add = this.lnk.indexOf('?') !== -1 ? '&clickref=' + clickRefValue : '?clickref=' + clickRefValue;

            let resultLink = this.lnk;

            if (resultLink.includes("awin1")) {
                resultLink = resultLink.replace('&clickref=', add);
            } else if (resultLink.includes("webgains")) {
                resultLink = resultLink.replace('&wgtarget=', add + '&wgtarget=');
            } else if (resultLink.includes('linksynergy') && this.$auth.loggedIn) {
                resultLink = resultLink.replace('&murl', `&u1=${clickRefValue}&murl`)
            } else if (resultLink.includes('belboon') && this.$auth.loggedIn) {
                resultLink = resultLink.replace('&deeplink', `subid=${clickRefValue}&deeplink`)
            }

            resultLink = btoaImplementation(resultLink);
            return { url: this.url, partner: this.partner, to: resultLink}
        },
    }
}