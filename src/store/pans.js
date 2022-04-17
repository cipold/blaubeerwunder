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
    set: (state, pans) => (state.pans = pans),
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
    toggle: (state, index) =>
      (state.pans[index].active = !state.pans[index].active),
  },
  actions: {
    initialize({ commit }) {
      commit("set", [
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
      ]);

      commit("select", 0);
    },
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
  },
};
