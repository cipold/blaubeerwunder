import Vue from "vue";
import Vuex from "vuex";
import pans from "./pans";
import recipe from "./recipe";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    pans,
    recipe,
  },
  plugins: [
    (store) => {
      store.subscribe((mutation, { pans }) => {
        window.localStorage.setItem("vuex/pans", JSON.stringify(pans));
      });
    },
  ],
});

// TODO ask for permission to use localStorage / cookie dialog?
