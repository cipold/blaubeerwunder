<template>
  <div class="d-flex">
    <BIconCheckCircleFill
      class="align-self-center mr-3 pan active"
      v-if="showCheck && active"
    />
    <BIconCheckCircle
      class="align-self-center mr-3 pan"
      v-if="showCheck && !active"
    />
    <span :class="['h4', 'mr-4', 'mb-0', 'pan', { active: active }]">
      {{ pan.label }}
    </span>
    <div class="align-self-center ml-auto">
      <span class="text-muted small">
        <BIconSlashCircle class="mr-1" />{{ pan.diameter }} cm
      </span>
      <span class="text-muted ml-1 small">
        <BIconChevronExpand class="mr-1" />{{ pan.height }} cm
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "PanLine",
  props: {
    pan: Object,
    active: {
      type: Boolean,
      default: true,
    },
    showCheck: Boolean,
  },
};
</script>

<style scoped>
.pan {
  font-family: "Send Flowers", cursive;
  font-weight: bold;
  color: var(--lighter);
}

/*noinspection CssUnusedSymbol*/
.pan.active {
  color: var(--medium);
}
</style>
