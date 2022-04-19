<template>
  <div>
    <b-card no-body>
      <b-list-group flush>
        <b-list-group-item
          v-for="(pan, index) in pans"
          :key="`pan-${index}`"
          button
          @click="toggle(index)"
        >
          <div class="d-flex">
            <BIconCheckCircleFill
              class="align-self-center mr-3 pan-multi-select active"
              v-if="pan.active"
            ></BIconCheckCircleFill>
            <BIconCheckCircle
              class="align-self-center mr-3 pan-multi-select"
              v-else
            ></BIconCheckCircle>
            <p
              :class="[
                'h4',
                'd-inline',
                'mr-4',
                'mb-0',
                'pan-multi-select',
                { active: pan.active },
              ]"
            >
              {{ pan.label }}
            </p>
            <div class="align-self-center ml-auto">
              <span class="text-muted small">
                <BIconSlashCircle></BIconSlashCircle> {{ pan.diameter }} cm
              </span>
              <span class="text-muted ml-1 small">
                <BIconChevronExpand></BIconChevronExpand> {{ pan.height }} cm
              </span>
            </div>
          </div>
        </b-list-group-item>
      </b-list-group>
    </b-card>
    <div class="d-flex mt-1">
      <router-link
        class="text-muted small ml-auto align-self-center"
        to="/pans"
      >
        <BIconPencil class="mr-1"></BIconPencil>
        anpassen
      </router-link>
    </div>
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

<style scoped>
.pan-multi-select {
  font-family: "Send Flowers", cursive;
  font-weight: bold;
  color: var(--lighter);
}

.pan-multi-select.active {
  color: var(--medium);
}
</style>
