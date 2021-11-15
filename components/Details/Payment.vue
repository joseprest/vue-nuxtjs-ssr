<template>
    <div class="payment">
        <template v-for="method in methods">
            <client-only>
            <img lazy-default="~/assets/icon-def.svg" :class="method" class="payment-image" v-lazy-load :data-src="img(method)" :alt="method | u">
                <small slot="placeholder">{{method}}</small>
            </client-only>
        </template>
    </div>
</template>

<script>
    import {capitalize} from "lodash-core";

    export default {
        props  : ['methods'],
        methods: {
            img(m)
            {
                try {
                    if (m === 'amazon pay' || m === 'alipay' || m === 'sofort' || m === 'eps')
                        return require('~/assets/img/' + this._.capitalize(m).replace(' ', '-') + '.png');
                    else
                        return require('~/assets/img/' + this._.capitalize(m).replace(' ', '-') + '.svg');

                } catch(e) {
                    console.error(e);
                }
            }
        },
        filters: {
            u(w)
            {
                return capitalize(w);
            }
        }
    }
</script>
