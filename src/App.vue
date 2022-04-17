<template>
  <div id="app" class="pt-3">
    <header>
      <h1 class="main-title">
        <router-link to="/">{{ recipeName }}</router-link>
      </h1>
      <nav>
        <template v-for="(route, index) in routes">
          <span :key="`route-divider-${index}`" v-if="index > 0">|</span>
          <router-link :to="route.path" :key="`route-${index}`">{{
            route.meta.nav
          }}</router-link>
        </template>
      </nav>
    </header>
    <b-container class="content">
      <router-view />
    </b-container>
    <footer class="footer text-center text-muted">
      Mit <BIconHeart></BIconHeart> von Michael für Gryta
    </footer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "App",
  computed: {
    ...mapGetters(["recipeName"]),
    routes() {
      return this.$router.options.routes.filter((route) => route.meta.nav);
    },
  },
  watch: {
    $route: {
      immediate: true,
      handler(to) {
        if (to.meta.title) {
          document.title = `${to.meta.title} - ${this.recipeName}`;
        } else {
          document.title = this.recipeName;
        }
      },
    },
  },
};
</script>
