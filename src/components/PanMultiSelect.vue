<template>
  <div>
    <div class="list-group">
      <button
        type="button"
        v-for="(pan, index) in pans"
        :key="`pan-${index}`"
        class="list-group-item list-group-item-action"
        @click="toggle(index)"
      >
        <PanLine :pan="pan" :active="pan.active" :show-check="true" />
      </button>
    </div>
    <div class="d-flex mt-1">
      <router-link class="text-muted small ms-auto align-self-center" to="/pans">
        <i class="bi bi-pencil me-1"></i>
        anpassen
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { usePansStore } from '@/stores/pans'
import PanLine from '@/components/PanLine.vue'

const pansStore = usePansStore()
const pans = computed(() => pansStore.pans)

function toggle(index) {
  pansStore.toggle(index)
}
</script>
