<template>
    <a :href="getBannerLink" target="_blank" class=" col-6 col-md-3 col-xl-3 mp6 advertisement-margin" v-if="banner && banner.image" @click="increaseClicksNumber">
        <div :style="{ 'background-image': 'url(' + banner.image + ')'  }" class="advertisement-image">
        </div>
    </a>
</template>

<script>
    import {mapState} from "vuex";
    export default {
        name    : "AdvertisementThumbnail",
        props   : ['banner'],
        computed: {
            getBannerLink()
            {
                if(this.banner.link.includes('https://sneakers123.com'))
                    return 'https://sneakers123.com/' + this.$i18n.locale + this.banner.link.substring('https://sneakers123.com'.length + 3)
                return this.banner.link;
            }
        },
        mounted()
        {
            if (this.banner && this.banner.image)
                this.increaseViewsNumber();
        },
        methods : {
            async increaseViewsNumber()
            {
                try {
                    await this.$axios.post(`banners/${this.banner.id}/views/plus`);
                }
                catch (e) {
                    console.log('adv', e.response ? e.response.status : e)
                }
            },
            async increaseClicksNumber()
            {
                try {
                    await this.$axios.post(`banners/${this.banner.id}/clicks/plus`);
                }
                catch (e) {
                    console.log('adv', e.response ? e.response.status : e)
                }
            }
        },
        watch   : {
            'banner': function (val) {
                if (val && val.image)
                    this.increaseViewsNumber();
            },
        }
    }
</script>
