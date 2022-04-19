<template>
  <div>
    <img alt="page intro image" :src="image" class="intro-image" />
    <p class="mb-3 text-center">
      <em>
        <slot></slot>
      </em>
    </p>
  </div>
</template>

<script>
export default {
  name: "PageIntro",
  props: { image: String },
};
</script>

<style scoped>
.intro-image {
  display: block;
  width: 100px;
  height: 100px;
  margin: 0 auto 20px auto;
}
</style>
