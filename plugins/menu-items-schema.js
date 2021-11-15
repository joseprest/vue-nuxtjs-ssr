export default (lang = 'en') => {
    let prefix = '';
    if(lang !== 'de')
        prefix = lang + '/';

    const links = [
        {
            url : 'sneakers123.com/' + prefix + 'sneaker',
            name: 'Home'
        },
        {
            url : 'sneakers123.com/' + prefix + 'shops',
            name: 'Shops'
        },
        {
            url : 'sneakers123.com/' + prefix + 'sneaker/sale',
            name: 'Sale'
        },
        {
            url : 'sneakers123.com/' + prefix + 'sneaker/top-trends',
            name: 'Top Trends'
        },
        {
            url : 'sneakers123.com/' + prefix + 'sneaker/limited-editions',
            name: 'Limited Editions'
        },
    ]
    let linksList = links.map((link, index) => ({
        "@type"   : "ListItem",
        "position": index + 1,
        "item"    : {
            "@id" : link.url,
            "name": link.name
        }
    }))

    return {
        "@context"       : "http://schema.org",
        "@type"          : "BreadcrumbList",
        "itemListElement": linksList
    }
}


