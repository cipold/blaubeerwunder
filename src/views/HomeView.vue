<template>
  <div>
    <img alt="cake" src="../assets/icons/cake.svg" class="header-image" />
    <p class="text-center">
      <em>Nie wieder Frust mit den Mengen<br />bei der Geburtstagstorte!</em>
    </p>

    <div class="divider"></div>

    <ContentTeaser
      label="Formen"
      to="pans"
      :image="require('../assets/icons/pan.svg')"
    >
      Passe das Rezept auf genau die
      <router-link to="pans">Formen</router-link>
      an, die du verwenden möchtest.
    </ContentTeaser>

    <div class="divider"></div>

    <ContentTeaser
      label="Zutaten"
      to="ingredients"
      :image="require('../assets/icons/ingredients.svg')"
    >
      Plane die Mengen der
      <router-link to="ingredients">Zutaten</router-link>
      für deine Formen.
    </ContentTeaser>

    <div class="divider"></div>

    <ContentTeaser
      label="Einkaufsliste"
      to="shopping-list"
      :image="require('../assets/icons/invoice.svg')"
    >
      Erstelle deine
      <router-link to="shopping-list">Einkaufsliste</router-link>
      mit genau den Mengen, die du für deine Formen brauchst.
    </ContentTeaser>

    <div class="divider"></div>

    <ContentTeaser
      label="Zubereitung"
      to="preparation"
      :image="require('../assets/icons/preparation.svg')"
    >
      Wenn es so weit ist, dann tippe auf
      <router-link to="preparation">Zubereitung</router-link>
      und los geht's!
    </ContentTeaser>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ContentTeaser from "@/components/ContentTeaser";

export default {
  name: "HomeView",
  components: {
    ContentTeaser,
  },
  metaInfo() {
    return {
      title: this.recipeName,
      titleTemplate: null,
    };
  },
  computed: {
    ...mapState("recipe", { recipeName: "name" }),
  },
};
</script>
