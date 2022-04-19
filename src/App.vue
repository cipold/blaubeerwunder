<template>
  <div class="scrollbar-counter">
    <div id="app" class="pt-3 d-flex flex-column">
      <header>
        <h1 class="main-title">
          <router-link to="/">{{ recipeName }}</router-link>
        </h1>
        <nav class="text-center mb-4">
          <router-link to="/ingredients">Zutaten</router-link>
          <span class="mx-3">|</span>
          <router-link to="/shopping-list">Einkaufsliste</router-link>
          <span class="mx-3">|</span>
          <router-link to="/preparation">Zubereitung</router-link>
        </nav>
      </header>
      <b-container class="px-4 flex-grow-1">
        <router-view />
      </b-container>
      <footer class="footer text-center text-muted">
        <ContentDivider class="mb-0 mt-5" />
        Mit
        <BIconHeart></BIconHeart>
        von Michael für Gryta
      </footer>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "App",
  metaInfo() {
    return {
      title: "Willkommen",
      titleTemplate: "%s - " + this.recipeName,
      htmlAttrs: {
        lang: "de-DE",
      },
      meta: [
        {
          name: "description",
          content:
            'Rezepte-App für die Torte "Blaubeerwunder". Nie wieder Frust mit den Mengenangaben!',
        },
      ],
    };
  },
  computed: {
    ...mapState("recipe", { recipeName: "name" }),
  },
};

// TODO add info page referencing open source content
</script>

<style lang="scss" scoped>
.scrollbar-counter {
  padding-left: calc(100vw - 100%);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #3e3e3e;
  max-width: 440px;
  margin: 0 auto;
  background-color: white;
  min-height: 100vh;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.5);
  border-left: var(--secondary) solid 5px;
  border-right: var(--secondary) solid 5px;
}

.main-title {
  font-family: "Send Flowers", cursive;
  font-weight: bold;
  color: var(--primary);
  text-align: center;
  text-shadow: 2px 2px var(--secondary);

  a,
  a:hover {
    text-decoration: none;
  }
}

nav {
  font-family: "Send Flowers", cursive;
  font-weight: bold;
  font-size: 1.2rem;
  border-top: var(--light) solid 1px;
  border-bottom: var(--light) solid 1px;

  a {
    font-weight: bold;
    color: var(--medium);

    &.router-link-exact-active {
      color: var(--primary);
    }
  }
}

.footer {
  line-height: 3em;
}
</style>
