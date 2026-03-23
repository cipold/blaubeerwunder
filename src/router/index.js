import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PansView from '../views/PansView.vue'
import IngredientsView from '../views/IngredientsView.vue'
import ShoppingListView from '../views/ShoppingListView.vue'
import PreparationView from '../views/PreparationView.vue'
import InfoView from '../views/InfoView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: HomeView },
    { path: '/pans', component: PansView },
    { path: '/ingredients', component: IngredientsView },
    { path: '/shopping-list', component: ShoppingListView },
    { path: '/preparation', component: PreparationView },
    { path: '/info', component: InfoView },
  ],
})

export default router
