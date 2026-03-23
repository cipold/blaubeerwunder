<template>
  <div>
    <PageIntro :image="ingredientsIcon">
      Wähle deine Form - die Mengen aller<br />
      Zutaten werden automatisch angepasst.
    </PageIntro>

    <ContentDivider />

    <PanSelect class="mb-4" />

    <div class="card">
      <div
        class="card-body m-1"
        :key="`part-${partIndex}`"
        v-for="(part, partIndex) in parts"
        :class="{ 'pt-0': partIndex }"
      >
        <h4 class="headline">{{ part.part }}</h4>
        <ul class="ingredients">
          <li
            :key="`ingredient-${ingredientIndex}`"
            v-for="(ingredient, ingredientIndex) in part.ingredients"
          >
            <span class="me-1">{{
              getScaledAmount(selectedPan.diameter, selectedPan.height, ingredient)
            }}</span>
            <span class="me-1" v-if="ingredient.unit">{{ ingredient.unit }}</span>
            <strong>{{ ingredient.name }}</strong>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { usePansStore } from '@/stores/pans'
import { useRecipeStore } from '@/stores/recipe'
import PanSelect from '@/components/PanSelect.vue'
import ingredientsIcon from '@/assets/icons/ingredients.svg'

const pansStore = usePansStore()
const recipeStore = useRecipeStore()

const selectedPan = computed(() => pansStore.selectedPan)
const recipePan = computed(() => recipeStore.pan)
const recipeIngredients = computed(() => recipeStore.ingredients)

const parts = computed(() => {
  return recipeIngredients.value.reduce((parts, ingredient) => {
    const partName = ingredient.part
    let part = parts.find((p) => p.part === partName)
    if (!part) {
      part = {
        part: partName,
        ingredients: [],
      }
      parts.push(part)
    }
    part.ingredients.push(ingredient)
    return parts
  }, [])
})

function getScaledAmount(diameter, height, ingredient) {
  let amount = ingredient.amount
  if (ingredient.scalesWith === 'volume') {
    const getVolume = (d, h) => 0.25 * d * d * h
    const recipePanVolume = getVolume(recipePan.value.diameter, recipePan.value.height)
    const panVolume = getVolume(diameter, height)
    amount *= panVolume / recipePanVolume
  } else if (ingredient.scalesWith === 'area') {
    const getArea = (d) => 0.25 * d * d
    const recipePanArea = getArea(recipePan.value.diameter)
    const panArea = getArea(diameter)
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

<style scoped>
.ingredients {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
</style>
