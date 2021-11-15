<template>

    <article id="ads">
        <div class="container-fluid">
            <div class="line col-md-12 headline">
                <h2>{{$t('All different styles')}}</h2>
                <p>{{$t('Find the hottest sneakers quickly and easily')}}</p>
            </div>
        </div>

        <div class="row line d-md-flex">
            <div class="col-md-6">
                <div class="sneaker-card">
                    <div class="sneaker-card-body d-flex flex-column">
                        <h2>
                            <nuxt-link class="text-dark" :to="sneakerLocalePath('nike')" title="Nike Sneakers">{{$t('Nike Sneakers')}}</nuxt-link>
                        </h2>
                        <div class="mb-1 text-muted">{{$t('Top Models')}}</div>
                        <ul class="list-group">
                            <li><nuxt-link :to="sneakerLocalePath('nike/air-max-1')" title="Nike Air Max 1">Nike Air Max 1</nuxt-link></li>
                            <li><nuxt-link :to="sneakerLocalePath('nike/air-force')" title="Nike Air Force">Nike Air Force</nuxt-link></li>
                            <li><nuxt-link :to="sneakerLocalePath('nike/dunk')" title="Nike Dunk<">Nike Dunk</nuxt-link></li>
                            <li><nuxt-link :to="sneakerLocalePath('nike/blazer')" title="Nike Blazer">Nike Blazer</nuxt-link></li>
                            <li><nuxt-link :to="sneakerLocalePath('nike/daybreak')" title="Nike Daybreak">Nike Daybreak</nuxt-link></li>
                        </ul>
                    </div>
                    <nuxt-link :to="sneakerLocalePath('nike')">
                        <l-img class="card-img-right d-lg-block" src="~/assets/img/nike-sneakers.png" data-holder-rendered="true"
                             alt="nike sneakers" />
                    </nuxt-link>
                </div>
            </div>

            <div class="col-md-6">
                <div class="sneaker-card">
                    <div class="sneaker-card-body d-flex flex-column">
                        <h2>
                            <nuxt-link class="text-dark" :to="sneakerLocalePath('adidas')" title="Adidas Sneakers">{{$t('Adidas Sneakers')}}</nuxt-link>
                        </h2>
                        <div class="mb-1 text-muted">{{$t('Top Models')}}</div>
                        <ul class="list-group">
                            <li><nuxt-link :to="sneakerLocalePath('yeezy')" title="adidas Yeezy">adidas Yeezy</nuxt-link></li>
                            <li><nuxt-link :to="sneakerLocalePath('adidas/continental80')" title="adidas Continental 80">adidas Continental 80</nuxt-link></li>
                            <li><nuxt-link :to="sneakerLocalePath('adidas/ultra-boost')" title="adidas Ultra Boost">adidas Ultra Boost</nuxt-link></li>
                            <li><nuxt-link :to="sneakerLocalePath('adidas/gazelle')" title="adidas Gazelle">adidas Gazelle</nuxt-link></li>
                            <li><nuxt-link :to="sneakerLocalePath('adidas/stan-smith')" title="adidas Stan Smith">adidas Stan Smith</nuxt-link></li>
                        </ul>
                    </div>
                    <nuxt-link :to="sneakerLocalePath('adidas')">
                        <l-img class="card-img-right d-lg-block" src="~/assets/img/adidas-sneakers.png" data-holder-rendered="true"
                             alt="adidas sneakers" />
                    </nuxt-link>
                </div>
            </div>

            <div class="col-md-6">
                <div class="sneaker-card">
                    <div class="sneaker-card-body d-flex flex-column">
                        <h2>
                            <nuxt-link class="text-dark" :to="sneakerLocalePath('jordan')" title="Jordan Sneakers">{{$t('Jordan Sneakers')}}</nuxt-link>
                        </h2>
                        <div class="mb-1 text-muted">{{$t('Top Models')}}</div>
                        <ul class="list-group">
                            <li><nuxt-link :to="sneakerLocalePath('jordan/1')" title="Air Jordan 1">Air Jordan 1</nuxt-link></li>
                            <li><nuxt-link :to="sneakerLocalePath('jordan/5-retro')" title="Air Jordan 5">Air Jordan 5</nuxt-link></li>
                            <li><nuxt-link :to="sneakerLocalePath('jordan/air-jordan-6')" title="Air Jordan 6">Air Jordan 6</nuxt-link></li>
                            <li><nuxt-link :to="sneakerLocalePath('jordan/11-retro')" title="Air Jordan 11">Air Jordan 11</nuxt-link></li>
                            <li><nuxt-link :to="sneakerLocalePath('jordan/12-retro')" title="Air Jordan 12">Air Jordan 12</nuxt-link></li>
                        </ul>
                    </div>
                    <nuxt-link :to="sneakerLocalePath('jordan')">
                        <l-img class="card-img-right d-lg-block" src="~/assets/img/jordan-sneakers.png" data-holder-rendered="true"
                             alt="jordan sneakers" />
                    </nuxt-link>
                </div>
            </div>

            <div class="col-md-6">
                <div class="sneaker-card">
                    <div class="sneaker-card-body d-flex flex-column">
                        <h2>
                            <nuxt-link class="text-dark" :to="sneakerLocalePath('limited-editions')" title="Limited Edition Sneakers">{{$t('Limited edition')}}</nuxt-link>
                        </h2>
                        <div class="mb-1 text-muted">{{$t('Top Models')}}</div>
                        <ul class="list-group">
                            <li><nuxt-link :to="sneakerLocalePath('adidas/yeezy-boost-350')" title="Yeezy Boost 350">Yeezy Boost 350</nuxt-link></li>
                            <li><nuxt-link :to="sneakerLocalePath('adidas/yeezy-boost-700')" title="Yeezy Boost 700">Yeezy Boost 700</nuxt-link></li>
                            <li><nuxt-link :to="sneakerLocalePath('nike/off-white')" title="Off-White">Virgil Abloh Off-White</nuxt-link></li>
                            <li><nuxt-link :to="sneakerLocalePath('', {q:'converse comme des garcons'})" title="converse comme des garcons">Converse CDG</nuxt-link></li>
                            <li><nuxt-link :to="sneakerLocalePath('nike/fear-of-god')" title="Nike Fear of God">Nike Fear of God</nuxt-link></li>
                        </ul>
                    </div>
                    <nuxt-link :to="sneakerLocalePath('limited-editions')">
                        <l-img class="card-img-right d-lg-block" src="~/assets/img/limited-edition-sneakers.png" data-holder-rendered="true"
                             alt="limited edition sneakers" />
                    </nuxt-link>
                </div>
            </div>


        </div>
    </article>


</template>


