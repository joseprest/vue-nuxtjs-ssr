<template>
    <li class="nav-item dropdown lang-dropdown">
        <b-dropdown
                toggle-class="nav-link lang-dropdown-toggle lang"
                menu-class="lang-dropdown-menu dropup"
                variant="none"
                :popperOpts="ignorePopperStyles"
                boundary="window">
            <template slot="button-content">
                <div class="lang-button">
                    <img v-lazy-load :data-src="chooseLangImg()"
                         src='data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 20 "%3E%3C/svg%3E'
                         class="img-lang current" :alt="currentLang">
                    <span class="mobile-lang-name">{{ currentLangName  }}</span>
                    <span class="arrow-down">
              <arrow-down/>
            </span>
                </div>
            </template>
            <b-dropdown-item v-for="lang in availableLocales" :key="lang.code" class="lang-dropdown-item" @click.prevent="setLocale(lang.code)">
                <img v-lazy-load :data-src="chooseLangImg(lang.code)" class="img-lang" :alt="lang.code">
                <span class="lang-name">{{ lang.name }}</span>
                <span class="arrow-up" v-if="lang.code === currentLang">
                    <arrow-down/>
                </span>
            </b-dropdown-item>
        </b-dropdown>
    </li>
</template>

<script>
    import {mapState} from 'vuex';
    import ArrowDown                                        from "./icons/arrow-down";

    export default {
        name      : "langBar",
        components: {ArrowDown},
        data()
        {
            return {
                ignorePopperStyles: {
                    modifiers: {
                        applyStyle: {
                            enabled: false,
                        },
                    },
                },
            }
        },
        computed  : {
            ...mapState(['location']),
            currentLang(){
              return this.$i18n.locale
            },
            availableLocales () {
                return this.$i18n.locales
            },
            currentLangName(){

                return this.availableLocales.find((l)=>{ return l.code === this.currentLang}).name
            }
        },
        methods   : {
            chooseLangImg(code = null)
            {
                code = code? code:  this.currentLang;
                return require(`~/assets/img/${code.toUpperCase()}.png`)
            },
            setLocale(lang)
            {
                this.$router.push(this.switchLocalePath(lang));
            }
        }
    }
</script>

<style scoped>

</style>
