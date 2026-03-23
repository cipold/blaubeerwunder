<template>
  <div class="scrollbar-counter">
    <div id="app" class="pt-3 d-flex flex-column">
      <header>
        <h1 class="main-title">
          <RouterLink to="/">{{ recipeName }}</RouterLink>
        </h1>
        <nav class="text-center mb-4">
          <RouterLink to="/ingredients">Zutaten</RouterLink>
          <span class="mx-3">|</span>
          <RouterLink to="/shopping-list">Einkaufsliste</RouterLink>
          <span class="mx-3">|</span>
          <RouterLink to="/preparation">Zubereitung</RouterLink>
        </nav>
      </header>
      <div class="container px-4 flex-grow-1">
        <RouterView />
      </div>
      <footer class="footer text-center text-muted">
        <ContentDivider class="mb-0 mt-5" />
        Mit
        <i class="bi bi-heart"></i>
        von <a href="https://cipold.de" class="text-muted">Michael</a> für
        <a href="https://tatoryte.com" class="text-muted">Gryta</a> |
        <RouterLink to="/info">Info</RouterLink>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { computed, onBeforeMount } from 'vue'
import { useRecipeStore } from '@/stores/recipe'
import { usePansStore } from '@/stores/pans'

const recipeStore = useRecipeStore()
const pansStore = usePansStore()

const recipeName = computed(() => recipeStore.name)

onBeforeMount(() => {
  pansStore.initialize()
  recipeStore.initialize()
})
</script>

<style lang="scss" scoped>
.scrollbar-counter {
  padding-left: calc(100vw - 100%);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #3e3e3e;
  max-width: 440px;
  margin: 0 auto;
  background-color: white;
  min-height: 100vh;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.5);
  border-left: var(--secondary) solid 5px;
  border-right: var(--secondary) solid 5px;
}

.main-title {
  font-family: 'Send Flowers', cursive;
  font-weight: bold;
  color: var(--primary);
  text-align: center;
  text-shadow: 2px 2px var(--secondary);

  a,
  a:hover {
    text-decoration: none;
  }
}

nav {
  font-family: 'Send Flowers', cursive;
  font-weight: bold;
  font-size: 1.2rem;
  border-top: var(--light) solid 1px;
  border-bottom: var(--light) solid 1px;

  a {
    font-weight: bold;
    color: var(--medium);

    &.RouterLink-exact-active {
      color: var(--primary);
    }
  }
}

.footer {
  line-height: 3em;
}
</style>
