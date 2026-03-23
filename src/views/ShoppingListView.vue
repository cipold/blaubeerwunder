<template>
  <div>
    <PageIntro :image="invoiceIcon">
      Wähle alle Formen aus, für die du<br />
      Zutaten einkaufen möchtest.
    </PageIntro>

    <ContentDivider />

    <PanMultiSelect class="mb-4" />

    <div class="card">
      <div
        class="card-body m-1"
        :key="`section-${sectionIndex}`"
        v-for="(section, sectionIndex) in shoppingList"
        :class="{ 'pt-0': sectionIndex }"
      >
        <h4 class="headline">{{ section.section }}</h4>
        <ul class="ingredients">
          <li
            :key="`ingredient-${ingredientIndex}`"
            v-for="(ingredient, ingredientIndex) in section.ingredients"
          >
            <span class="me-1">{{ presentAmount(ingredient.amount, ingredient.unit) }}</span>
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
import PanMultiSelect from '@/components/PanMultiSelect.vue'
import invoiceIcon from '@/assets/icons/invoice.svg'

const pansStore = usePansStore()
const recipeStore = useRecipeStore()

const recipePan = computed(() => recipeStore.pan)
const recipeIngredients = computed(() => recipeStore.ingredients)
const activePans = computed(() => pansStore.activePans)

const shoppingList = computed(() => {
  return recipeIngredients.value.reduce((parts, ingredient) => {
    const section = ingredient.store
    if (section) {
      if (!parts.find((p) => p.section === section)) {
        parts.push({
          section: section,
          ingredients: [],
        })
      }
      let amount = 0
      for (const pan of activePans.value) {
        amount += getScaledAmount(pan.diameter, pan.height, ingredient)
      }

      const ingredients = parts.find((p) => p.section === section).ingredients
      const existingIngredient = ingredients.find((i) => i.name === ingredient.name)
      if (existingIngredient && existingIngredient.unit === ingredient.unit) {
        existingIngredient.amount += amount
      } else {
        const copy = { ...ingredient, amount }
        ingredients.push(copy)
      }
    }
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
