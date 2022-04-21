import recipe from "@/assets/data/recipe.json";

// TODO move common recipe functions to store getters

function initialChecked(steps) {
  const checked = {};
  for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
    const part = steps[stepIndex];

    for (
      let instructionIndex = 0;
      instructionIndex < part.instructions.length;
      instructionIndex++
    ) {
      const instruction = part.instructions[instructionIndex];

      checked[`${stepIndex}-${instructionIndex}`] = false;

      if (instruction.ingredients) {
        for (
          let ingredientIndex = 0;
          ingredientIndex < instruction.ingredients.length;
          ingredientIndex++
        ) {
          checked[
            `${stepIndex}-${instructionIndex}-${ingredientIndex}`
          ] = false;
        }
      }
    }
  }
  return checked;
}

export default {
  namespaced: true,
  state: {
    name: recipe.name,
    pan: {
      diameter: recipe.pan.diameter,
      height: recipe.pan.height,
    },
    ingredients: recipe.ingredients,
    steps: recipe.steps,
    checked: initialChecked(recipe.steps),
  },
  getters: {
    checked: (state) => (stepIndex, instructionIndex, ingredientIndex) => {
      const key =
        ingredientIndex !== undefined
          ? `${stepIndex}-${instructionIndex}-${ingredientIndex}`
          : `${stepIndex}-${instructionIndex}`;
      return state.checked[key] === true;
    },
  },
  mutations: {
    initialize(state) {
      const checked = window.localStorage.getItem("vuex/recipe/checked");
      if (checked) {
        Object.assign(state.checked, JSON.parse(checked));
      }
    },
    toggle(state, { stepIndex, instructionIndex, ingredientIndex }) {
      const key =
        ingredientIndex !== undefined
          ? `${stepIndex}-${instructionIndex}-${ingredientIndex}`
          : `${stepIndex}-${instructionIndex}`;
      state.checked[key] = !state.checked[key];

      window.localStorage.setItem(
        "vuex/recipe/checked",
        JSON.stringify(state.checked)
      );
    },
    reset(state) {
      Object.assign(state.checked, initialChecked(recipe.steps));
    },
  },
  actions: {},
};
