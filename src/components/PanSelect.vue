<template>
  <div>
    <b-collapse v-model="allPansVisible">
      <b-list-group>
        <b-list-group-item
          v-for="(pan, index) in pans"
          :key="`pan-${index}`"
          button
          @click="
            select(index);
            allPansVisible = false;
          "
        >
          <PanLine :pan="pan" :active="pan === selectedPan" />
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

    <b-collapse v-model="allPansInvisible">
      <b-list-group>
        <b-list-group-item button @click="allPansVisible = !allPansVisible">
          <PanLine :pan="selectedPan" />
        </b-list-group-item>
      </b-list-group>
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
    allPansInvisible: {
      get() {
        return !this.allPansVisible;
      },
      set(value) {
        this.allPansVisible = !value;
      },
    },
  },
  methods: {
    ...mapActions("pans", ["select"]),
  },
};
</script>
