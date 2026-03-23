<script setup>
import ContentTeaser from '../components/ContentTeaser.vue'
import cakeIcon from '../assets/icons/cake.svg'
import panIcon from '../assets/icons/pan.svg'
import ingredientsIcon from '../assets/icons/ingredients.svg'
import invoiceIcon from '../assets/icons/invoice.svg'
import preparationIcon from '../assets/icons/preparation.svg'
</script>

<template>
  <div>
    <PageIntro :image="cakeIcon">
      Nie wieder Frust mit den Mengen<br />
      bei der Geburtstagstorte!
    </PageIntro>

    <ContentDivider />

    <ContentTeaser label="Formen" to="/pans" :image="panIcon">
      Passe das Rezept auf genau die
      <router-link to="/pans">Formen</router-link>
      an, die du verwenden möchtest.
    </ContentTeaser>

    <ContentDivider />

    <ContentTeaser label="Zutaten" to="/ingredients" :image="ingredientsIcon">
      Plane die Mengen der
      <router-link to="/ingredients">Zutaten</router-link>
      für deine Formen.
    </ContentTeaser>

    <ContentDivider />

    <ContentTeaser label="Einkaufsliste" to="/shopping-list" :image="invoiceIcon">
      Erstelle deine
      <router-link to="/shopping-list">Einkaufsliste</router-link>
      mit genau den Mengen, die du für deine Formen brauchst.
    </ContentTeaser>

    <ContentDivider />

    <ContentTeaser label="Zubereitung" to="/preparation" :image="preparationIcon">
      Wenn es so weit ist, dann tippe auf
      <router-link to="/preparation">Zubereitung</router-link>
      und los geht's!
    </ContentTeaser>
  </div>
</template>
