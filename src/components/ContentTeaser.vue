<template>
  <div>
    <p class="h4 mt-0 text-center">
      <router-link :to="to" class="headline">{{ label }}</router-link>
    </p>
    <div class="d-flex">
      <img
        alt="Teaser image"
        :src="image"
        class="teaser-image mr-3 align-self-center"
      />
      <p class="mb-0 align-self-center">
        <slot></slot>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ContentTeaser",
  props: {
    label: String,
    to: String,
    image: String,
  },
};
</script>

<style scoped>
.teaser-image {
  width: 64px;
  height: 64px;
}
</style>
