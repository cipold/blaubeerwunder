<template>
  <div>
    <h5>recipeSteps</h5>
    <div v-for="(item, index) in recipeSteps" :key="`recipe-step-${index}`">
      {{ item }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "DebugView",
  computed: {
    ...mapGetters(["recipeSteps"]),
  },
};
</script>
