<template>
  <div class="d-flex align-items-center m-1">
    <i class="bi bi-check-circle-fill me-3 pan active" v-if="showCheck && active"></i>
    <i class="bi bi-check-circle me-3 pan" v-if="showCheck && !active"></i>
    <div class="d-flex align-items-center flex-grow-1 flex-wrap justify-content-between">
      <span :class="['h4', 'mb-0', 'me-3', 'pan', 'flex-shrink-0', { active: active }]">
        {{ pan.label }}
      </span>
      <div class="d-flex flex-shrink-0">
        <span class="text-muted me-1 small flex-shrink-0">
          <i class="bi bi-slash-circle me-1"></i>{{ pan.diameter }}<span class="ms-1">cm</span>
        </span>
        <span class="text-muted small flex-shrink-0">
          <i class="bi bi-chevron-expand me-1"></i>{{ pan.height }}<span class="ms-1">cm</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  pan: Object,
  active: {
    type: Boolean,
    default: true,
  },
  showCheck: Boolean,
})
</script>

<style scoped>
.pan {
  font-family: 'Send Flowers', cursive;
  font-weight: bold;
  color: var(--lighter);
}

/*noinspection CssUnusedSymbol*/
.pan.active {
  color: var(--medium);
}
</style>
