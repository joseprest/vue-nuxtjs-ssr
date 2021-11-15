<template>
  <aside class="col-lg-3 col-12 profile-sidebar">
    <b-dropdown
            variant="none"
            no-flip
            menu-class="sidebar-menu"
            toggle-class="sidebar-menu-button"
            boundary="window">
      <template slot="button-content">
        {{$t(btnText)}}
        <arrow-right/>
      </template>
        <b-dropdown-item class="sidebar-link" :to="localePath({name: 'profile-my-favorites'})" active-class="active">
          <heart-icon/>
          <span class="item-text">{{$t('My favorite pairs')}}</span>
        </b-dropdown-item>
        <b-dropdown-item class="sidebar-link" :to="localePath({name: 'profile-my-notifications'})" active-class="active">
          <bell-icon/>
          <span class="item-text">{{$t('My notifications')}}</span>
        </b-dropdown-item>
        <b-dropdown-item class="sidebar-link" :to="localePath({name: 'profile-my-account'})" active-class="active">
          <settings-icon/>
          <span class="item-text">{{$t('My account')}}</span>
        </b-dropdown-item>
    </b-dropdown>
  </aside>
</template>

<script>
    import {mapState} from 'vuex'
    import HeartIcon from "../icons/heart-icon";
    import BellIcon from "../icons/bell-icon";
    import SettingsIcon from "../icons/settings-icon";
    import ArrowRight from "../icons/arrow-right";

    export default {
		name : 'ProfileSideMenu',
        components: {SettingsIcon, BellIcon, HeartIcon, ArrowRight},
        computed: {
            btnText() {
                let page = this.$route.path.split('/').pop();
                switch (page) {
                    case 'my-favorites':
                        return 'My favorite sneakers';
                    case 'my-notifications':
                        return 'My notifications';
                    default:
                        return 'My account'
                }
            }
        }
    }
</script>
