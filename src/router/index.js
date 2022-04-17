import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import PansView from "../views/PansView.vue";
import IngredientsView from "../views/IngredientsView.vue";
import ShoppingListView from "../views/ShoppingListView.vue";
import PreparationView from "../views/PreparationView.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    { path: "/", component: HomeView },
    { path: "/pans", component: PansView },
    { path: "/ingredients", component: IngredientsView },
    { path: "/shopping-list", component: ShoppingListView },
    { path: "/preparation", component: PreparationView },
  ],
});

export default router;
