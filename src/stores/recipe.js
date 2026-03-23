import { defineStore } from 'pinia'
import recipeData from '@/assets/data/recipe.json'

function initialChecked(steps) {
  const checked = {}
  for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
    const part = steps[stepIndex]

    for (
      let instructionIndex = 0;
      instructionIndex < part.instructions.length;
      instructionIndex++
    ) {
      const instruction = part.instructions[instructionIndex]

      checked[`${stepIndex}-${instructionIndex}`] = false

      if (instruction.ingredients) {
        for (
          let ingredientIndex = 0;
          ingredientIndex < instruction.ingredients.length;
          ingredientIndex++
        ) {
          checked[`${stepIndex}-${instructionIndex}-${ingredientIndex}`] = false
        }
      }
    }
  }
  return checked
}

export const useRecipeStore = defineStore('recipe', {
  state: () => ({
    name: recipeData.name,
    pan: {
      diameter: recipeData.pan.diameter,
      height: recipeData.pan.height,
    },
    ingredients: recipeData.ingredients,
    steps: recipeData.steps,
    checked: initialChecked(recipeData.steps),
  }),
  getters: {
    getChecked: (state) => (stepIndex, instructionIndex, ingredientIndex) => {
      const key =
        ingredientIndex !== undefined
          ? `${stepIndex}-${instructionIndex}-${ingredientIndex}`
          : `${stepIndex}-${instructionIndex}`
      return state.checked[key] === true
    },
  },
  actions: {
    initialize() {
      const checked = window.localStorage.getItem('vuex/recipe/checked')
      if (checked) {
        try {
          Object.assign(this.checked, JSON.parse(checked))
        } catch {
          // ignore
        }
      }

      this.$subscribe((mutation, state) => {
        window.localStorage.setItem('vuex/recipe/checked', JSON.stringify(state.checked))
      })
    },
    toggle({ stepIndex, instructionIndex, ingredientIndex }) {
      const key =
        ingredientIndex !== undefined
          ? `${stepIndex}-${instructionIndex}-${ingredientIndex}`
          : `${stepIndex}-${instructionIndex}`
      this.checked[key] = !this.checked[key]
    },
    reset() {
      this.checked = initialChecked(recipeData.steps)
    },
  },
})
