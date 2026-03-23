<template>
  <div>
    <div class="list-group">
      <button
        type="button"
        class="list-group-item list-group-item-action"
        data-bs-toggle="collapse"
        data-bs-target="#panSelectCollapse"
      >
        <PanLine :pan="selectedPan" />
      </button>
    </div>

    <div id="panSelectCollapse" class="collapse">
      <div class="list-group mt-3">
        <button
          type="button"
          v-for="pan in otherPans"
          :key="`pan-${pan.index}`"
          class="list-group-item list-group-item-action"
          @click="select(pan.index)"
          data-bs-toggle="collapse"
          data-bs-target="#panSelectCollapse"
        >
          <PanLine :pan="pan.pan" :active="false" />
        </button>
      </div>
      <div class="d-flex mt-1">
        <router-link class="text-muted small ms-auto align-self-center" to="/pans">
          <i class="bi bi-pencil me-1"></i>
          anpassen
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { usePansStore } from '@/stores/pans'
import PanLine from '@/components/PanLine.vue'

const pansStore = usePansStore()

const selectedPan = computed(() => pansStore.selectedPan)
const pans = computed(() => pansStore.pans)

const otherPans = computed(() => {
  return pans.value
    .map((pan, index) => ({
      pan,
      index,
    }))
    .filter(({ pan }) => pan !== selectedPan.value)
})

function select(index) {
  pansStore.select(index)
}
</script>
