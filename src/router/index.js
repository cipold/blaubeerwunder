import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import PansView from "../views/PansView.vue";
import IngredientsView from "../views/IngredientsView.vue";
import ShoppingListView from "../views/ShoppingListView.vue";
import PreparationView from "../views/PreparationView.vue";
import DebugView from "../views/DebugView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {},
  },
  {
    path: "/pans",
    name: "pans",
    component: PansView,
    meta: {
      title: "Formen",
    },
  },
  {
    path: "/ingredients",
    name: "ingredients",
    component: IngredientsView,
    meta: {
      nav: "Zutaten",
      title: "Zutaten",
    },
  },
  {
    path: "/shopping-list",
    name: "shopping-list",
    component: ShoppingListView,
    meta: {
      nav: "Einkaufsliste",
      title: "Einkaufsliste",
    },
  },
  {
    path: "/preparation",
    name: "preparation",
    component: PreparationView,
    meta: {
      nav: "Zubereitung",
      title: "Zubereitung",
    },
  },
  {
    path: "/debug",
    name: "debug",
    component: DebugView,
    meta: {
      title: "Debug",
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
