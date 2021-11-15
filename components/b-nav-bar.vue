<template>
  <b-navbar
    toggleable="lg"
    variant="none"
    class="p-0 line"
    :class="{ 'hide-search': getRouteBaseName() === 'index' }"
  >
    <b-navbar-brand
      class="col-lg-3 col-6 navbar-brand mr-0"
      :to="localePath({ name: 'index' })"
    >
      <img :src="logo" class="logo" alt="Sneakers123" />
    </b-navbar-brand>

    <nuxt-link
      no-prefetch
      :to="localePath({ name: 'profile-my-account' })"
      class="profile-mobile-link"
      v-if="loggedIn"
    >
      <surface-icon />
    </nuxt-link>
    <nuxt-link
      no-prefetch
      :to="localePath({ name: onceLoggedIn ? 'login' : 'register' })"
      class="profile-mobile-link"
      v-else
    >
      <login-icon />
    </nuxt-link>

    <b-navbar-toggle target="nav_collapse">
      <template slot="default">
        <span></span>
      </template>
    </b-navbar-toggle>

    <mobile-search
      @toggle-search-bar="toggleMobileSearchBar"
      :show="showMobileSearch"
      :key="$store.state.searchString"
    ></mobile-search>

    <b-collapse
      is-nav
      id="nav_collapse"
      class="collapse navbar-collapse col-lg-9 col-12 pr-0"
      :class="{ 'hide-search': getRouteBaseName() === 'index' }"
    >
      <div class="col-lg-8 col-12 pl-0">
        <b-navbar-nav class="main justify-content-between">
          <b-nav-item class="pl-0 pr-0" exact :to="sneakerRootPage()"
            >Sneaker</b-nav-item
          >
          <b-nav-item class="pl-0 pr-0" exact :to="sneakerLocalePath('sale')"
            >Sale%</b-nav-item
          >
          <!-- <b-nav-item class="pl-0 pr-0 bf-link" exact :to="localePath('black-friday')">Black Friday</b-nav-item> -->
          <b-nav-item
            class="pl-0 pr-0"
            exact
            :to="sneakerLocalePath('top-trends')"
            >{{ $t("filters.trending") }}</b-nav-item
          >
          <b-nav-item
            v-for="page in landingsMenu"
            :key="page.url"
            class="pl-0 pr-0"
            :to="sneakerLocalePath(page.url)"
          >
            {{ $t(page.title) }}
          </b-nav-item>
          <b-nav-item class="pl-0 pr-0" :to="localePath({ name: 'shops' })">{{
            $t("Shops")
          }}</b-nav-item>
        </b-navbar-nav>
      </div>
      <div class="col-lg-4 col-12 pr-0 signin-wraper">
        <b-navbar-nav
          class="navbar-nav justify-content-lg-end justify-content-between signin-nav"
        >
          <lang-bar />
          <user-button />
        </b-navbar-nav>
      </div>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import LangBar from "./langBar";
import UserButton from "./UserButton";
import MobileSearch from "./Sneakers/mobileSearch";
import SettingsIcon from "../components/icons/settings-icon";
import SurfaceIcon from "./icons/surface-icon";
import LoginIcon from "./icons/login-icon";
import BarcodeIcon from "./icons/barcode-icon";

export default {
  name: "b-nav-bar",
  components: {
    BarcodeIcon,
    LoginIcon,
    SurfaceIcon,
    MobileSearch,
    UserButton,
    LangBar,
    SettingsIcon,
  },
  data() {
    return {
      showMobileSearch: false,
    };
  },
  computed: {
    ...mapState(["landingsMenu", "onceLoggedIn"]),
    logo() {
      return require("~/assets/img/logo/sneakers123-logo-" +
        this.$store.state.i18n.locale +
        ".svg");
    },
  },
  methods: {
    toggleMobileSearchBar({ value }) {
      this.showMobileSearch = value;
    },
  },
};
</script>

<style scoped></style>
