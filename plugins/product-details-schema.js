export default (product, currency) => {
    // let offers = [];
    // for (let index in product.products) {
    //     offers.push({
    //         "@type": "Offer",
    //         "priceCurrency": product.products[index].shop.currency,
    //         "price": product.products[index].sale_price || product.products[index].price,
    //         "itemCondition": "http://schema.org/NewCondition",
    //         "availability": product.products[index].availability === 'InStock' ? "http://schema.org/InStock" : "http://schema.org/OutOfStock",
    //         "seller": {
    //             "@type": "Organization",
    //             "name": product.products[index].shop.name,
    //         }
    //     });
    // }
    let offers  = {
        "@type": "AggregateOffer",
        "availability": product.stock,
        "price": product.indexed_info.min_price[currency],
        "lowPrice": product.indexed_info.min_price[currency],
        "highPrice": product.indexed_info.max_price[currency],
        "priceCurrency": currency.toUpperCase(),
        "offerCount": product.indexed_info.shop_count
    }
    return {
        "@context": "http://schema.org/",
        "@type": "Product",
        "name": product.brand + ' ' + product.name,
        "description": product.description,
        "url": product.url,
        "image": product.image,
        "mpn": product.sku,
        "sku": product.sku,
        "productID": product.id,
        "brand": {
            "@type": "Thing",
            "name": product.brand
        },
        "offers": offers
    }
}


