<template>
  <div>
    <b-card no-body>
      <b-card-header class="d-flex">
        <span class="card-header-title">Formen</span>
        <router-link
          class="text-muted small ml-auto align-self-center"
          to="/pans"
        >
          <BIconPencil class="mr-1"></BIconPencil>
          anpassen
        </router-link>
      </b-card-header>
      <b-list-group flush>
        <b-list-group-item
          v-for="(pan, index) in pans"
          :key="`pan-${index}`"
          button
          @click="togglePanActive(index)"
        >
          <div class="d-flex">
            <BIconCheckCircleFill
              class="align-self-center mr-3 text-primary"
              v-if="pan.active"
            ></BIconCheckCircleFill>
            <BIconCheckCircle
              class="align-self-center mr-3 text-secondary"
              v-else
            ></BIconCheckCircle>
            <h4
              :class="
                'part d-inline mr-4 mb-0 ' + (pan.active ? 'active-pan' : '')
              "
            >
              {{ pan.label }}
            </h4>
            <div class="align-self-center ml-auto">
              <span class="text-muted">
                <BIconSlashCircle></BIconSlashCircle> {{ pan.diameter }} cm
              </span>
              <span class="text-muted ml-1">
                <BIconChevronExpand></BIconChevronExpand> {{ pan.height }} cm
              </span>
            </div>
          </div>
        </b-list-group-item>
      </b-list-group>
    </b-card>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "PanMultiSelect",
  computed: {
    ...mapGetters(["pans", "activePans"]),
  },
  methods: {
    ...mapActions(["togglePanActive"]),
  },
};
</script>

<style lang="scss" scoped>
.active-pan {
  font-family: "SendFlowers", cursive;
  font-weight: bold;
  color: var(--primary);
  text-shadow: 1px 1px var(--secondary);
}
</style>
