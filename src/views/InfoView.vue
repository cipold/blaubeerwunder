<script setup>
import treeIcon from '@/assets/icons/tree.svg'
import saltIcon from '@/assets/icons/salt-and-pepper.svg'
import wheatIcon from '@/assets/icons/wheat.svg'
import bellIcon from '@/assets/icons/bell.svg'
</script>

<template>
  <div>
    <h4 class="headline text-center">Info</h4>
    <p class="mb-4">
      Diese App wurde mit folgenden wunderbaren Open Source Werkzeugen und Resourcen erstellt.
    </p>

    <div class="d-flex mb-4">
      <img alt="tree" :src="treeIcon" class="info-image me-3 align-self-center" />
      <p class="flex-grow-1 align-self-center mb-0">
        Zum Leben erweckt wird die Seite durch
        <a href="https://vuejs.org/">Vue.js</a>, <a href="https://router.vuejs.org/">Vue Router</a>,
        <a href="https://pinia.vuejs.org/">Pinia</a>, <a href="https://sass-lang.com/">Sass</a>,
        <a href="https://vitejs.dev/">Vite</a> und
        <a href="https://getbootstrap.com/">Bootstrap</a>.
      </p>
    </div>

    <div class="d-flex mb-4">
      <p class="flex-grow-1 align-self-center mb-0">
        Das Aussehen der App wird maßgeblich bestimmt durch die tollen Icons der
        <a href="https://www.svgrepo.com/collection/restaurant-3/"
          >Restaurant 3 Collection bei SVG Repo</a
        >, die Schriftart
        <a href="https://fonts.google.com/specimen/Send+Flowers">Send Flowers</a>
        und das
        <a href="https://projects.verou.me/css3patterns/#waves">Wellenmuster im Hintergrund</a>.
      </p>
      <img alt="salt and pepper" :src="saltIcon" class="info-image ms-3 align-self-center" />
    </div>

    <div class="d-flex">
      <img alt="wheat" :src="wheatIcon" class="info-image me-3 align-self-center" />
      <p class="flex-grow-1 align-self-center mb-0 text-break">
        Den Quelltext dieser App findest du unter
        <a href="https://github.com/cipold/blaubeerwunder"
          >https://github.com/cipold/blaubeerwunder</a
        >.
      </p>
    </div>

    <ContentDivider />

    <h4 class="headline text-center">Kontakt</h4>
    <p>
      Diese App wurde von
      <a href="https://cipold.de">Michael Cipold</a> erstellt.
    </p>

    <div class="d-flex mb-4">
      <img alt="bell" :src="bellIcon" class="info-image me-3 align-self-center" />
      <p class="flex-grow-1 align-self-center mb-0 text-break">
        Bei Fragen oder Anregungen schreibe einfach eine Mail an
        <a href="mailto:blaubeerwunder@cipold.de">blaubeerwunder@cipold.de</a>.
      </p>
    </div>
  </div>
</template>

<style scoped>
.info-image {
  width: 50px;
  height: 50px;
}
</style>
