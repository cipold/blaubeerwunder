<template>
  <div>
    <b-list-group>
      <b-list-group-item button @click="allPansVisible = !allPansVisible">
        <PanLine :pan="selectedPan" />
      </b-list-group-item>
    </b-list-group>

    <b-collapse v-model="allPansVisible">
      <b-list-group class="mt-3">
        <b-list-group-item
          v-for="pan in otherPans"
          :key="`pan-${pan.index}`"
          button
          @click="
            select(pan.index);
            allPansVisible = false;
          "
        >
          <PanLine :pan="pan.pan" :active="false" />
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
    </b-collapse>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import PanLine from "@/components/PanLine";

export default {
  name: "PanSelect",
  components: {
    PanLine,
  },
  data() {
    return {
      allPansVisible: false,
    };
  },
  computed: {
    ...mapState("pans", ["pans"]),
    ...mapGetters("pans", ["selectedPan"]),
    otherPans() {
      return this.pans
        .map((pan, index) => ({
          pan,
          index,
        }))
        .filter(({ pan }) => pan !== this.selectedPan);
    },
  },
  methods: {
    ...mapActions("pans", ["select"]),
  },
};
</script>
