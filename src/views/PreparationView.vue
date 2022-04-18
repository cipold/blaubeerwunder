<template>
  <div>
    <img
      alt="preparation"
      src="../assets/preparation.svg"
      class="header-image"
    />
    <p class="mb-3 text-center">
      <em>
        Wähle deine Form und los geht's!<br />
        Hake erledigte Schritte ab, indem du drauf tippst.
      </em>
    </p>

    <div class="divider"></div>

    <PanSelect class="mb-4" />

    <div :key="step.part" v-for="step in recipeSteps">
      <h4 class="part">{{ step.part }}</h4>
      <ul class="instructions mb-4">
        <li
          :key="instruction.text"
          v-for="instruction in step.instructions"
          :class="'mb-2' + (instruction.checked ? ' instruction-checked' : '')"
        >
          <div v-on:click="toggle(instruction)" class="d-flex">
            <span class="align-self-center">{{ instruction.text }}</span>
            <img
              v-if="instruction.icon === 'timer'"
              alt="instruction icon"
              src="../assets/bell.svg"
              class="ml-auto align-self-center instruction-icon"
            />
          </div>
          <ul class="instruction-ingredients">
            <li
              v-for="(ingredient, index) in instruction.ingredients"
              :key="step.part + instruction.text + ingredient.name + index"
              :class="ingredient.checked ? ' ingredient-checked' : ''"
              @click="toggle(ingredient)"
            >
              <span class="mr-1">{{
                getScaledAmount(
                  parts[step.part][ingredient.name],
                  ingredient.relativeAmount
                )
              }}</span>
              <span
                class="mr-1"
                v-if="parts[step.part][ingredient.name].unit"
                >{{ parts[step.part][ingredient.name].unit }}</span
              >
              <strong>{{ parts[step.part][ingredient.name].name }}</strong>
              <span
                class="ml-1 text-muted"
                v-if="parts[step.part][ingredient.name].hint"
                >({{ parts[step.part][ingredient.name].hint }})</span
              >
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <img alt="preparation" src="../assets/cake.svg" class="header-image" />
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import PanSelect from "@/components/PanSelect";

export default {
  name: "PreparationView",
  metaInfo: {
    title: "Zubereitung",
  },
  components: {
    PanSelect,
  },
  computed: {
    ...mapState("pans", ["pans"]),
    ...mapState("recipe", {
      recipeSteps: "steps",
      recipeIngredients: "ingredients",
      recipePan: "pan",
    }),
    ...mapGetters("pans", ["selectedPan"]),
    parts() {
      const ingredientsByPart = this.recipeIngredients.reduce(
        (parts, ingredient) => {
          if (!parts[ingredient.part]) {
            parts[ingredient.part] = {};
          }
          parts[ingredient.part][ingredient.name] = ingredient;
          return parts;
        },
        {}
      );

      for (const part of this.recipeSteps) {
        for (const { ingredients } of part.instructions) {
          if (!ingredients) continue;
          for (const ingredient of ingredients) {
            if (ingredient.addsTo) {
              const originalIngredient =
                ingredientsByPart[part.part][ingredient.name];
              if (!ingredientsByPart[part.part][ingredient.addsTo]) {
                ingredientsByPart[part.part][ingredient.addsTo] = {
                  name: ingredient.addsTo,
                  amount: 0,
                  unit: "g",
                  part: part.part,
                  scalesWith: originalIngredient.scalesWith,
                };
              }
              const addsToIngredient =
                ingredientsByPart[part.part][ingredient.addsTo];
              if (
                addsToIngredient.scalesWith !== originalIngredient.scalesWith
              ) {
                console.debug(
                  "Scaling of ingredient '" +
                    addsToIngredient.name +
                    "' (" +
                    addsToIngredient.scalesWith +
                    ") is not consistent with scaling of ingredient '" +
                    originalIngredient.name +
                    "' (" +
                    originalIngredient.scalesWith +
                    ") in part '" +
                    part.part +
                    "'"
                );
              }
              let amount = originalIngredient.amount;
              if (originalIngredient.unit !== "g") {
                if (originalIngredient.amountInG) {
                  amount = originalIngredient.amountInG;
                } else {
                  console.debug(
                    "Ingredient '" +
                      originalIngredient.name +
                      "' has no amountInG property and will be ignored"
                  );
                }
              }
              addsToIngredient.amount +=
                amount *
                (ingredient.relativeAmount ? ingredient.relativeAmount : 1);
            }
          }
        }
      }

      return ingredientsByPart;
    },
  },
  methods: {
    getScaledAmount: function (ingredient, relativeAmount) {
      let amount = ingredient.amount * (relativeAmount ? relativeAmount : 1);
      if (ingredient.scalesWith === "volume") {
        const getVolume = (diameter, height) =>
          0.25 * diameter * diameter * height;
        const recipePanVolume = getVolume(
          this.recipePan.diameter,
          this.recipePan.height
        );
        const panVolume = getVolume(
          this.selectedPan.diameter,
          this.selectedPan.height
        );
        amount *= panVolume / recipePanVolume;
      } else if (ingredient.scalesWith === "area") {
        const getArea = (diameter) => 0.25 * diameter * diameter;
        const recipePanArea = getArea(this.recipePan.diameter);
        const panArea = getArea(this.selectedPan.diameter);
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
    toggle: function (part) {
      part.checked = !(part.checked === true);
    },
  },
};

// TODO make addsTo visible in recipe steps
</script>

<style scoped>
/*noinspection CssUnusedSymbol*/
.instruction-checked,
.ingredient-checked {
  text-decoration: line-through;
  color: #a0a0a0;
}

.instructions {
  list-style-type: decimal;
  padding-left: 30px;
  padding-right: 10px;
}

.instruction-ingredients {
  list-style-type: disc;
  padding-left: 20px;
}

.instruction-icon {
  width: 32px;
  height: 32px;
}
</style>
