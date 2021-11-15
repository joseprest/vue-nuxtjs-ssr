<template>
    <li class="nav-item signin narrow-btn-container" :class="{'dropdown signin-dropdown': loggedIn}">
        <a class="nav-link pr-0 pl-0 primary-button primary-button__center primary-button__signin my-1" v-if="!loggedIn"
           @click="itemClick(onceLoggedIn ? 'login' : 'register')">
            <arrow-right/>
            <span class="primary-button-text">{{onceLoggedIn ? $t('Sign in') : $t('Register')}}</span>
        </a>

        <b-dropdown
                v-else
                toggle-class="nav-link pr-0 pl-0"
                menu-class="user-dropdown-menu dropup"
                variant="none"
                id="navbarDropdownUser"
                :popperOpts="ignorePopperStyles"
                boundary="window">
            <template slot="button-content">
               <avatar v-lazy-background :lazy-background="$store.state.auth.user.avatar" :src="require('~/assets/icon-def.svg')" :size="52" :username="$store.state.auth.user.name ?
                 $store.state.auth.user.name : 's'"
                        class="user-avatar"></avatar>
                <arrow-down/>
                <span class="my-account">
                    <!--{{$t('My account')}}-->
                </span>
            </template>
            <b-dropdown-item class="user-menu-link" @click="itemClick('profile-my-favorites')">
                <heart-icon/>
                <span class="item-text">{{$t('My favorite pairs')}}</span>
            </b-dropdown-item>
            <b-dropdown-item class="user-menu-link" @click="itemClick('profile-my-notifications')">
                <bell-icon/>
                <span class="item-text">{{$t('My notifications')}}</span>
            </b-dropdown-item>
            <b-dropdown-item class="user-menu-link" @click="itemClick('profile-my-account')">
                <settings-icon/>
                <span class="item-text">{{$t('My account')}}</span>
            </b-dropdown-item>
            <b-dropdown-item class="user-menu-link" @click="() => {logout(); $root.$emit('bv::toggle::collapse', 'nav_collapse');}">
                <logout-icon/>
                <span class="item-text">{{$t('Logout')}}</span>
            </b-dropdown-item>
        </b-dropdown>
    </li>
</template>

<script>
    import {mapState, mapActions} from 'vuex';
    import ArrowRight               from "./icons/arrow-right";
    import Avatar                   from "vue-avatar";
    import ArrowDown                from "./icons/arrow-down";
    import HeartIcon                from "./icons/heart-icon";
    import BellIcon                 from "./icons/bell-icon";
    import SettingsIcon             from "./icons/settings-icon";
    import LogoutIcon               from "./icons/logout-icon";

    export default {
        name      : "UserButton",
        components: {SettingsIcon, BellIcon, HeartIcon, ArrowDown, Avatar, ArrowRight, LogoutIcon},
        computed  : {
            ...mapState(['onceLoggedIn']),
        },
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
        methods   : {
            logout(){
                this.$store.dispatch('logout');
                this.$router.push(this.localePath('index'))
            },
            itemClick(name)
            {
                this.$router.push(this.localePath({name: name}));
                this.$root.$emit('bv::toggle::collapse', 'nav_collapse')
            }
        }
    }
</script>

<style scoped>

</style>