<template>
  <div>
    <PageIntro :image="require('@/assets/icons/preparation.svg')">
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
          <div
            v-on:click="toggle({ stepIndex, instructionIndex })"
            class="d-flex"
          >
            <img
              v-if="instruction.icon === 'timer'"
              alt="instruction icon"
              src="@/assets/icons/bell.svg"
              class="mr-3 align-self-center instruction-icon"
            />
            <span class="align-self-center flex-grow-1">
              {{ instruction.text }}
            </span>
          </div>
          <ul class="instruction-ingredients">
            <li
              v-for="(ingredient, ingredientIndex) in instruction.ingredients"
              :key="`ingredient-${stepIndex}-${instructionIndex}-${ingredientIndex}`"
              :class="{
                'ingredient-checked': checked(
                  stepIndex,
                  instructionIndex,
                  ingredientIndex
                ),
              }"
              @click="toggle({ stepIndex, instructionIndex, ingredientIndex })"
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
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="text-center mt-4">
      <img alt="cake" class="complete-image" src="@/assets/icons/cake.svg" />
    </div>
    <div class="text-center mt-4">
      <b-link class="text-muted small" @click="reset()">
        <BIconXCircle class="mr-1" />Rezept zurücksetzen
      </b-link>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapMutations } from "vuex";
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
    ...mapState("pans", ["pans", { selectedPanIndex: "selected" }]),
    ...mapState("recipe", {
      recipeSteps: "steps",
      recipeIngredients: "ingredients",
      recipePan: "pan",
    }),
    ...mapGetters("pans", ["selectedPan"]),
    ...mapGetters("recipe", ["checked"]),
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
              let amount = originalIngredient.amount;
              if (originalIngredient.unit !== "g") {
                if (originalIngredient.amountInG) {
                  amount = originalIngredient.amountInG;
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
    ...mapMutations("recipe", ["toggle", "reset"]),
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
  },
};
</script>

<style lang="scss" scoped>
/*noinspection CssUnusedSymbol*/
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
</style>
