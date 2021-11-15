<template>
  <div v-if="!$store.state.categoryLanding">
    <sneakers-main
      :brands-slider="rootPage"
      :headerData="sneakerRouteHeader"
      :seo-text="currentRouteMetas.seo_description"
      :breadcrumbItems="breadcrumbItems"
    ></sneakers-main>
  </div>
  <div v-else class="category-landing">
    <sneaker-category
      :data="data"
      :breadcrumbItems="breadcrumbItems"
    ></sneaker-category>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import SneakersMain from "../../components/Sneakers/sneakersMain";
import SneakerCategory from "../../components/Sneakers/category";
import {
  endsWith,
  filter,
  isEmpty,
  startCase,
  toLower,
  merge,
} from "lodash-core";
import axios from "axios";

export default {
  key: "_",
  name: "sneakers",
  components: { SneakerCategory, SneakersMain },
  watchQuery: true,
  scrollToTop: false,
  middleware: "sneakersRoutes",
  beforeMount() {
    if (this.$store.state.forceScrollTop) {
      window.scrollTo(0, 0);
    }
  },
  beforeRouteUpdate(to, from, next) {
    if (this.$store.state.forceScrollTop) {
      window.scrollTo(0, 0);
    }
    next();
  },
  computed: {
    rootPage() {
      return !this.$route.params.pathMatch && this._.isEmpty(this.$route.query);
    },
    breadcrumbItems() {
      let bcrumbs = [
        {
          text: "Home",
          lnk: this.localePath({ name: "index" }),
        },
        {
          text: "Sneakers",
          lnk: this.sneakerRootPage().path,
        },
      ];
      if (this.$route.params.pathMatch) {
        let sections = filter(
          this.$route.params.pathMatch.replace(/page\/.*/gm, "").split("/")
        );
        let title = [];
        let lnk = [];
        sections.forEach((section) => {
          title.push(startCase(toLower(section)));
          lnk.push(section);
          bcrumbs.push({
            lnk: this.sneakerLocalePath(lnk.join("/")),
            jsonText: title.join(" ") + " Sneakers",
            text: startCase(toLower(section)),
          });
        });
      }
      return bcrumbs;
    },
  },
  async asyncData({ from, store, state, params, $axios, app, error }) {
    // category landing
    if (store.state.categoryLanding) {
      try {
        let extraParams = {
          currency: store.getters.currency,
          locale: app.i18n.locale,
        };
        let { data } = await axios.get(
          process.env.apiUrl + "category?url=" + params.pathMatch,
          { params: extraParams }
        );
        return {
          data: data,
        };
      } catch (e) {
        console.log("Category error:", e.response ? e.response.status : e);
      }
    } else {
      try {
        let { data } = await axios.get(process.env.apiUrl + "releases", {
          progress: false,
          params: store.getters.getSneakersQueryParams,
        });
        if (process.client && store.state.loadingMoreSneakers) {
          let loadedSneakers = JSON.parse(JSON.stringify(data));
          loadedSneakers.data = [
            ...store.state.loadedSneakers.data,
            ...data.data,
          ];
          loadedSneakers.current_page = data.current_page;
          store.commit("setLoadingMoreSneakers", false);
          store.commit("setLoadedSneakers", { ...loadedSneakers });
        } else {
          store.commit("setLoadedSneakers", { ...data });
        }
      } catch (e) {
        console.log("Releases error:", e.response ? e.response.status : e);
      }
    }
  },
  data() {
    return {
      currentRouteMetas: this.$store.state.currentRouteMetas,
      sneakerRouteHeader: this.$store.state.sneakerRouteHeader,
    };
  },
  head() {
    let head = {
      title: this.currentRouteMetas.title || "sneakers123.com",
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.currentRouteMetas.description || "sneakers123.com",
        },
        {
          hid: "og:title",
          property: "og:title",
          content: this.currentRouteMetas.title || "sneakers123.com",
        },
        {
          hid: "og:description",
          property: "og:description",
          content: this.currentRouteMetas.description || "sneakers123.com",
        },
        { hid: "robots", name: "robots", content: this.robotsMeta },
      ],
      link: this.alternateLinks,
      script: [],
    };

    let bItems = this.breadcrumbItems.map((item, index) => {
      return {
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@id": "https://sneakers123.com" + item.lnk,
          name: item.jsonText ? item.jsonText : item.text,
        },
      };
    });

    head.script.push({
      hid: "breadcrumbs",
      type: "application/ld+json",
      innerHTML: JSON.stringify(
        {
          "@context": "http://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [bItems],
        },
        null,
        2
      ),
    });

    if (this.$store.state.categoryLanding) {
      head.script.push({
        hid: "offerCatalog",
        type: "application/ld+json",
        innerHTML: JSON.stringify(this.data.offerCatalog, null, 2),
      });
    }
    head["__dangerouslyDisableSanitizers"] = ["script"];
    return head;
  },
};
</script>

<style scoped></style>
