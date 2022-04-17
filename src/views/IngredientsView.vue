<template>
  <div>
    <img
      alt="ingredients"
      src="../assets/ingredients.svg"
      class="header-image"
    />
    <p class="mb-3 text-center">
      <em>
        Wähle deine Form - die Mengen aller<br />
        Zutaten werden automatisch angepasst.
      </em>
    </p>

    <div class="divider"></div>

    <PanSelect />

    <div class="divider"></div>

    <b-card no-body header="">
      <b-card-header class="d-flex">
        <span class="card-header-title">Zutaten</span>
      </b-card-header>
      <b-card-body
        :key="part.part"
        v-for="(part, index) in parts"
        :class="index ? 'pt-0' : ''"
      >
        <h4 class="part">{{ part.part }}</h4>
        <ul class="ingredients">
          <li :key="ingredient.name" v-for="ingredient in part.ingredients">
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
            <span class="ml-1 text-muted" v-if="ingredient.hint"
              >({{ ingredient.hint }})</span
            >
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
  components: { PanSelect },
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
