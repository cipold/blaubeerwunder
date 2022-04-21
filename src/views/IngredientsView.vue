<template>
  <div>
    <PageIntro :image="require('@/assets/icons/ingredients.svg')">
      Wähle deine Form - die Mengen aller<br />
      Zutaten werden automatisch angepasst.
    </PageIntro>

    <ContentDivider />

    <PanSelect class="mb-4" />

    <b-card no-body>
      <b-card-body
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
            <span class="mr-1">{{
              getScaledAmount(
                selectedPan.diameter,
                selectedPan.height,
                ingredient
              )
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
import PanSelect from "@/components/PanSelect";

export default {
  name: "IngredientsView",
  metaInfo: {
    title: "Zutaten",
  },
  components: {
    PanSelect,
  },
  computed: {
    ...mapState("pans", ["pans"]),
    ...mapState("recipe", {
      recipePan: "pan",
      recipeIngredients: "ingredients",
    }),
    ...mapGetters("pans", ["selectedPan"]),
    parts() {
      return this.recipeIngredients.reduce((parts, ingredient) => {
        const part = ingredient.part;
        if (!parts.find((p) => p.part === part)) {
          parts.push({
            part,
            ingredients: [],
          });
        }
        parts.find((p) => p.part === part).ingredients.push(ingredient);
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
