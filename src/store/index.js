import Vue from "vue";
import Vuex from "vuex";
import pans from "./pans";
import recipe from "./recipe";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {
    initialize() {
      this.dispatch("pans/initialize", undefined, { root: true });
    },
  },
  modules: {
    pans,
    recipe,
  },
});
