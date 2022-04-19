<template>
  <div>
    <img
      alt="ingredients"
      src="../assets/icons/invoice.svg"
      class="header-image"
    />
    <p class="mb-3 text-center">
      <em>
        Wähle alle Formen aus, für die du<br />
        Zutaten einkaufen möchtest.
      </em>
    </p>

    <ContentDivider />

    <PanMultiSelect class="mb-4" />

    <b-card no-body>
      <b-card-body
        :key="section.section"
        v-for="(section, index) in shoppingList"
        :class="{ 'pt-0': index }"
      >
        <h4 class="headline">{{ section.section }}</h4>
        <ul class="ingredients">
          <li :key="ingredient.name" v-for="ingredient in section.ingredients">
            <span class="mr-1">{{
              presentAmount(ingredient.amount, ingredient.unit)
            }}</span>
            <span class="mr-1" v-if="ingredient.unit">{{
              ingredient.unit
            }}</span>
            <strong>{{ ingredient.name }}</strong>
          </li>
        </ul>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import PanMultiSelect from "@/components/PanMultiSelect";

export default {
  name: "ShoppingListView",
  metaInfo: {
    title: "Einkaufsliste",
  },
  components: {
    PanMultiSelect,
  },
  computed: {
    ...mapState("recipe", {
      recipePan: "pan",
      recipeIngredients: "ingredients",
    }),
    ...mapGetters("pans", ["activePans"]),
    shoppingList() {
      return this.recipeIngredients.reduce((parts, ingredient) => {
        const section = ingredient.store;
        if (section) {
          if (!parts.find((p) => p.section === section)) {
            parts.push({
              section: section,
              ingredients: [],
            });
          }
          let amount = 0;
          for (const pan of this.activePans) {
            amount += this.getScaledAmount(
              pan.diameter,
              pan.height,
              ingredient
            );
          }

          const ingredients = parts.find(
            (p) => p.section === section
          ).ingredients;
          const existingIngredient = ingredients.find(
            (i) => i.name === ingredient.name
          );
          if (
            existingIngredient &&
            existingIngredient.unit === ingredient.unit
          ) {
            existingIngredient.amount += amount;
          } else {
            const copy = Object.assign({}, ingredient);
            copy.amount = amount;
            ingredients.push(copy);
          }
        }
        return parts;
      }, []);
    },
  },
  methods: {
    getScaledAmount: function (diameter, height, ingredient) {
      let amount = ingredient.amount;
      if (ingredient.scalesWith === "volume") {
        const getVolume = (diameter, height) =>
          0.25 * diameter * diameter * height;
        const recipePanVolume = getVolume(
          this.recipePan.diameter,
          this.recipePan.height
        );
        const panVolume = getVolume(diameter, height);
        amount *= panVolume / recipePanVolume;
      } else if (ingredient.scalesWith === "area") {
        const getArea = (diameter) => 0.25 * diameter * diameter;
        const recipePanArea = getArea(this.recipePan.diameter);
        const panArea = getArea(diameter);
        amount *= panArea / recipePanArea;
      }

      return this.presentAmount(amount, ingredient.unit);
    },
    presentAmount(amount, unit) {
      if (unit === "Prise" || amount > 5) {
        return Math.round(amount);
      }
      return parseFloat(amount.toFixed(1));
    },
  },
};
</script>

<style scoped>
.ingredients {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
</style>
