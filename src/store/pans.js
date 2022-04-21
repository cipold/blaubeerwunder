const clone = (obj) => JSON.parse(JSON.stringify(obj));

const defaultState = {
  pans: [
    {
      label: "Kleine Form",
      diameter: 16.5,
      height: 8.0,
      active: true,
    },
    {
      label: "Große Form",
      diameter: 24.5,
      height: 8.0,
      active: false,
    },
  ],
  selected: 0,
};

export default {
  namespaced: true,
  state: {
    pans: [],
    selected: 0,
  },
  getters: {
    selectedPan: (state) => state.pans[state.selected],
    activePans: (state) => state.pans.filter((pan) => pan.active),
  },
  mutations: {
    set: (state, pans) => {
      state.pans = pans;
      state.selected = Math.max(
        Math.min(state.selected, state.pans.length - 1),
        0
      );
    },
    add: (state) =>
      state.pans.push({
        label: "Neue Form",
        diameter: 20.0,
        height: 8.0,
        active: false,
      }),
    remove: (state, index) => {
      state.pans.splice(index, 1);

      if (index < state.selected) {
        state.selected--;
      }
      state.selected = Math.max(
        Math.min(state.selected, state.pans.length - 1),
        0
      );
    },
    select: (state, index) => (state.selected = index),
    update: (state, { index, key, value }) => (state.pans[index][key] = value),
    toggle: (state, index) =>
      (state.pans[index].active = !state.pans[index].active),
    initialize: (state) => {
      const storageState = window.localStorage.getItem("vuex/pans");
      if (storageState) {
        Object.assign(state, JSON.parse(storageState));
      } else {
        Object.assign(state, clone(defaultState));
      }
    },
  },
  actions: {
    add({ commit }) {
      commit("add");
    },
    remove({ commit }, index) {
      commit("remove", index);
    },
    select({ commit }, index) {
      commit("select", index);
    },
    toggle({ commit }, index) {
      commit("toggle", index);
    },
    update({ commit }, { index, key, value }) {
      commit("update", { index, key, value });
    },
    reset({ commit }) {
      commit("set", clone(defaultState.pans));
      commit("select", 0);
    },
  },
};
