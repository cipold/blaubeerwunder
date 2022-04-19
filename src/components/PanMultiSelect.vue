<template>
  <div>
    <b-list-group>
      <b-list-group-item
        v-for="(pan, index) in pans"
        :key="`pan-${index}`"
        button
        @click="toggle(index)"
      >
        <PanLine :pan="pan" :active="pan.active" :show-check="true" />
      </b-list-group-item>
    </b-list-group>
    <div class="d-flex mt-1">
      <router-link
        class="text-muted small ml-auto align-self-center"
        to="/pans"
      >
        <BIconPencil class="mr-1" />
        anpassen
      </router-link>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState } from "vuex";
import PanLine from "@/components/PanLine";

export default {
  name: "PanMultiSelect",
  components: { PanLine },
  computed: {
    ...mapState("pans", ["pans"]),
    ...mapGetters("pans", ["activePans"]),
  },
  methods: {
    ...mapActions("pans", ["toggle"]),
  },
};
</script>
