<template>
  <div class="d-flex align-items-center">
    <BIconCheckCircleFill class="mr-2 pan active" v-if="showCheck && active" />
    <BIconCheckCircle class="mr-2 pan" v-if="showCheck && !active" />
    <div
      class="d-flex align-items-center flex-grow-1 flex-wrap d-flex justify-content-around"
      style="column-gap: 10px"
    >
      <span :class="['h4', 'mb-0', 'pan', 'flex-shrink-0', { active: active }]">
        {{ pan.label }}
      </span>
      <div class="d-flex">
        <span class="text-muted mr-1 small flex-shrink-0">
          <BIconSlashCircle class="mr-1" />{{ pan.diameter
          }}<span class="ml-1">cm</span>
        </span>
        <span class="text-muted small flex-shrink-0">
          <BIconChevronExpand class="mr-1" />{{ pan.height
          }}<span class="ml-1">cm</span>
        </span>
      </div>
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
