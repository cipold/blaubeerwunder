<template>
  <div>
    <b-card no-body>
      <b-card-header class="d-flex" header-bg-variant="light">
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
          @click="toggle(index)"
        >
          <div class="d-flex">
            <BIconCheckCircleFill
              class="align-self-center mr-3 active-pan"
              v-if="pan.active"
            ></BIconCheckCircleFill>
            <BIconCheckCircle
              class="align-self-center mr-3 inactive-pan"
              v-else
            ></BIconCheckCircle>
            <h4
              :class="
                'd-inline mr-4 mb-0 ' +
                (pan.active ? 'active-pan' : 'inactive-pan')
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
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "PanMultiSelect",
  computed: {
    ...mapState("pans", ["pans"]),
    ...mapGetters("pans", ["activePans"]),
  },
  methods: {
    ...mapActions("pans", ["toggle"]),
  },
};
</script>
