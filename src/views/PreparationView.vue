<template>
  <div>
    <PageIntro :image="preparationIcon">
      Wähle deine Form und los geht's!<br />
      Hake erledigte Schritte ab, indem du drauftippst.
    </PageIntro>

    <ContentDivider />

    <PanSelect class="mb-4" />

    <div :key="`step-${stepIndex}`" v-for="(step, stepIndex) in recipeSteps">
      <h4 class="headline">{{ step.part }}</h4>
      <ul class="instructions mb-4">
        <li
          :key="`instruction-${stepIndex}-${instructionIndex}`"
          v-for="(instruction, instructionIndex) in step.instructions"
          :class="[
            'mb-3',
            {
              'instruction-checked': checked(stepIndex, instructionIndex),
            },
          ]"
        >
          <div @click="toggle({ stepIndex, instructionIndex })" class="d-flex cursor-pointer">
            <img
              v-if="instruction.icon === 'timer'"
              alt="instruction icon"
              :src="bellIcon"
              class="me-3 align-self-center instruction-icon"
            />
            <span class="align-self-center flex-grow-1">
              {{ instruction.text }}
            </span>
          </div>
          <ul class="instruction-ingredients">
            <li
              v-for="(ingredient, ingredientIndex) in instruction.ingredients"
              :key="`ingredient-${stepIndex}-${instructionIndex}-${ingredientIndex}`"
              :class="[
                'cursor-pointer',
                {
                  'ingredient-checked': checked(stepIndex, instructionIndex, ingredientIndex),
                },
              ]"
              @click="toggle({ stepIndex, instructionIndex, ingredientIndex })"
            >
              <span class="me-1">{{
                getScaledAmount(parts[step.part][ingredient.name], ingredient.relativeAmount)
              }}</span>
              <span class="me-1" v-if="parts[step.part][ingredient.name].unit">{{
                parts[step.part][ingredient.name].unit
              }}</span>
              <strong>{{ parts[step.part][ingredient.name].name }}</strong>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="text-center mt-4">
      <img alt="cake" class="complete-image" :src="cakeIcon" />
    </div>
    <div class="text-center mt-4">
      <button
        type="button"
        class="btn btn-link btn-sm text-muted p-0 text-decoration-none"
        @click="reset()"
      >
        <i class="bi bi-x-circle me-1"></i>Rezept zurücksetzen
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { usePansStore } from '@/stores/pans'
import { useRecipeStore } from '@/stores/recipe'
import PanSelect from '@/components/PanSelect.vue'
import preparationIcon from '@/assets/icons/preparation.svg'
import bellIcon from '@/assets/icons/bell.svg'
import cakeIcon from '@/assets/icons/cake.svg'

const pansStore = usePansStore()
const recipeStore = useRecipeStore()

const recipeSteps = computed(() => recipeStore.steps)
const recipeIngredients = computed(() => recipeStore.ingredients)
const recipePan = computed(() => recipeStore.pan)
const selectedPan = computed(() => pansStore.selectedPan)

const checked = (stepIndex, instructionIndex, ingredientIndex) => {
  return recipeStore.getChecked(stepIndex, instructionIndex, ingredientIndex)
}

const parts = computed(() => {
  const ingredientsByPart = recipeIngredients.value.reduce((partsMap, ingredient) => {
    if (!partsMap[ingredient.part]) {
      partsMap[ingredient.part] = {}
    }
    partsMap[ingredient.part][ingredient.name] = ingredient
    return partsMap
  }, {})

  for (const part of recipeSteps.value) {
    for (const { ingredients } of part.instructions) {
      if (!ingredients) continue
      for (const ingredient of ingredients) {
        if (ingredient.addsTo) {
          const originalIngredient = ingredientsByPart[part.part][ingredient.name]
          if (!ingredientsByPart[part.part][ingredient.addsTo]) {
            ingredientsByPart[part.part][ingredient.addsTo] = {
              name: ingredient.addsTo,
              amount: 0,
              unit: 'g',
              part: part.part,
              scalesWith: originalIngredient.scalesWith,
            }
          }
          const addsToIngredient = ingredientsByPart[part.part][ingredient.addsTo]
          let amount = originalIngredient.amount
          if (originalIngredient.unit !== 'g') {
            if (originalIngredient.amountInG) {
              amount = originalIngredient.amountInG
            }
          }
          addsToIngredient.amount +=
            amount * (ingredient.relativeAmount ? ingredient.relativeAmount : 1)
        }
      }
    }
  }

  return ingredientsByPart
})

function toggle(payload) {
  recipeStore.toggle(payload)
}

function reset() {
  recipeStore.reset()
}

function getScaledAmount(ingredient, relativeAmount) {
  let amount = ingredient.amount * (relativeAmount ? relativeAmount : 1)
  if (ingredient.scalesWith === 'volume') {
    const getVolume = (d, h) => 0.25 * d * d * h
    const recipePanVolume = getVolume(recipePan.value.diameter, recipePan.value.height)
    const panVolume = getVolume(selectedPan.value.diameter, selectedPan.value.height)
    amount *= panVolume / recipePanVolume
  } else if (ingredient.scalesWith === 'area') {
    const getArea = (d) => 0.25 * d * d
    const recipePanArea = getArea(recipePan.value.diameter)
    const panArea = getArea(selectedPan.value.diameter)
    amount *= panArea / recipePanArea
  }

  return presentAmount(amount, ingredient.unit)
}

function presentAmount(amount, unit) {
  if (unit === 'Prise' || amount > 5) {
    return Math.round(amount)
  }
  return parseFloat(amount.toFixed(1))
}
</script>

<style lang="scss" scoped>
.instruction-checked,
.ingredient-checked {
  text-decoration: line-through;
  color: #a0a0a0;

  img {
    filter: grayscale(100%) opacity(50%);
  }
}

.instructions {
  list-style-type: none;
  padding-left: 0;
  padding-right: 0;
}

.instruction-ingredients {
  list-style-type: none;
  padding-left: 15px;
}

.instruction-icon {
  width: 32px;
  height: 32px;
}

.complete-image {
  width: 100px;
  height: 100px;
}

.cursor-pointer {
  cursor: pointer;
}
</style>
