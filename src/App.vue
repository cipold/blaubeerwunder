<template>
  <div id="app" class="pt-3 d-flex flex-column">
    <header>
      <h1 class="main-title">
        <router-link to="/">{{ recipeName }}</router-link>
      </h1>
      <nav>
        <router-link to="/ingredients">Zutaten</router-link>
        |
        <router-link to="/shopping-list">Einkaufsliste</router-link>
        |
        <router-link to="/preparation">Zubereitung</router-link>
      </nav>
    </header>
    <b-container class="p-4 flex-grow-1">
      <router-view />
    </b-container>
    <footer class="footer text-center text-muted">
      Mit
      <BIconHeart></BIconHeart>
      von Michael für Gryta
    </footer>
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
