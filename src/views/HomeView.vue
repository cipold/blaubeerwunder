<template>
  <div>
    <img alt="cake" src="../assets/cake.svg" class="header-image" />
    <p class="text-center">
      <em>Nie wieder Frust mit den Mengen<br />bei der Geburtstagstorte!</em>
    </p>

    <div class="divider"></div>

    <h5 class="mt-0 text-center">
      <router-link to="pans" class="part">Formen</router-link>
    </h5>
    <b-media vertical-align="center">
      <template #aside>
        <img alt="pan" width="64" src="../assets/pan.svg" />
      </template>
      <p class="mb-0">
        Passe das Rezept auf genau die
        <router-link to="pans">Formen</router-link> an, die du verwenden
        möchtest.
      </p>
    </b-media>

    <div class="divider"></div>

    <h5 class="mt-0 text-center">
      <router-link to="ingredients" class="part">Zutaten</router-link>
    </h5>
    <b-media vertical-align="center">
      <template #aside>
        <img alt="ingredients" width="64" src="../assets/ingredients.svg" />
      </template>
      <p class="mb-0">
        Plane die Mengen der
        <router-link to="ingredients">Zutaten</router-link> für deine Formen.
      </p>
    </b-media>

    <div class="divider"></div>

    <h5 class="mt-0 text-center">
      <router-link to="shopping-list" class="part">Einkaufsliste</router-link>
    </h5>
    <b-media vertical-align="center">
      <template #aside>
        <img alt="shopping-list" width="64" src="../assets/invoice.svg" />
      </template>
      <p class="mb-0">
        Erstelle deine
        <router-link to="shopping-list">Einkaufsliste</router-link> mit genau
        den Mengen, die du für deine Formen brauchst.
      </p>
    </b-media>

    <div class="divider"></div>

    <h5 class="mt-0 text-center">
      <router-link to="preparation" class="part">Zubereitung</router-link>
    </h5>
    <b-media vertical-align="center">
      <template #aside>
        <img alt="preparation" width="64" src="../assets/preparation.svg" />
      </template>
      <p class="mb-0 mt-2">
        Wenn es so weit ist, dann tippe auf
        <router-link to="preparation">Zubereitung</router-link>
        und los geht's!
      </p>
    </b-media>
  </div>
</template>
