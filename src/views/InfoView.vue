<template>
  <div>
    <h4 class="headline text-center">Info</h4>
    <p class="mb-4">
      Diese App wurde mit folgenden wunderbaren Open Source Werkzeugen und
      Resourcen erstellt.
    </p>

    <div class="d-flex mb-4">
      <img
        alt="wheat"
        src="@/assets/icons/tree.svg"
        class="info-image mr-3 align-self-center"
      />
      <p class="flex-grow-1 align-self-center mb-0">
        Zum Leben erweckt wird die Seite durch
        <a href="https://vuejs.org/">Vue.js</a>,
        <a href="https://router.vuejs.org/">Vue Router</a>,
        <a href="https://vuex.vuejs.org/">Vuex</a>,
        <a href="https://vue-meta.nuxtjs.org/">Vue Meta</a>,
        <a href="https://sass-lang.com/">Sass</a>,
        <a href="https://getbootstrap.com/">Bootstrap</a> und
        <a href="https://bootstrap-vue.org/">BootstrapVue</a>.
      </p>
    </div>

    <div class="d-flex mb-4">
      <p class="flex-grow-1 align-self-center mb-0">
        Das Aussehen der App wird maßgeblich bestimmt durch die tollen Icons der
        <a href="https://www.svgrepo.com/collection/restaurant-3/"
          >Restaurant 3 Collection bei SVG Repo</a
        >, die Schriftart
        <a href="https://fonts.google.com/specimen/Send+Flowers"
          >Send Flowers</a
        >
        und das
        <a href="https://projects.verou.me/css3patterns/#waves"
          >Wellenmuster im Hintergrund</a
        >.
      </p>
      <img
        alt="wheat"
        src="@/assets/icons/salt-and-pepper.svg"
        class="info-image ml-3 align-self-center"
      />
    </div>

    <div class="d-flex">
      <img
        alt="wheat"
        src="@/assets/icons/wheat.svg"
        class="info-image mr-3 align-self-center"
      />
      <p class="flex-grow-1 align-self-center mb-0">
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
      <img
        alt="wheat"
        src="@/assets/icons/bell.svg"
        class="info-image mr-3 align-self-center"
      />
      <p class="flex-grow-1 align-self-center mb-0">
        Bei Fragen oder Anregungen schreibe einfach eine Mail an
        <a href="mailto:blaubeerwunder@cipold.de">blaubeerwunder@cipold.de</a>.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "InfoView",
  metaInfo() {
    return {
      title: "Info",
    };
  },
};
</script>

<style scoped>
.info-image {
  width: 64px;
  height: 64px;
}
</style>
