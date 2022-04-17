const state = {
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
  selectedPan: 0,
};
const getters = {
  pans: (state) => state.pans,
  selectedPan: (state) => state.pans[state.selectedPan],
  activePans: (state) => state.pans.filter((pan) => pan.active),
};
const mutations = {
  setPans: (state, pans) => (state.pans = pans),
  newPan: (state) =>
    state.pans.push({
      label: "Form",
      diameter: 20.0,
      height: 8.0,
      active: false,
    }),
  removePan: (state, index) => {
    if (index <= state.selectedPan) {
      state.selectedPan--;
    }
    state.pans.splice(index, 1);
  },
  setSelectedPan: (state, index) => (state.selectedPan = index),
  panActive: (state, index) =>
    (state.pans[index].active = !state.pans[index].active),
};
const actions = {
  setPans({ commit }, pans) {
    commit("setPans", pans);
  },
  newPan({ commit }) {
    commit("newPan");
  },
  removePan({ commit }, index) {
    commit("removePan", index);
  },
  setSelectedPan({ commit }, index) {
    commit("setSelectedPan", index);
  },
  togglePanActive({ commit }, index) {
    commit("panActive", index);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
