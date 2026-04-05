<script setup>
defineEmits(["click"]);
</script>

<template>
  <button class="back-btn" @click="$emit('click')">
    <i class="backBtn fa-solid fa-chevron-left"></i>
  </button>
</template>

<style scoped>
.back-btn {
  padding: 1rem 1rem;
  border-radius: 0.9375rem;
  color: var(--color-primary-brown);
  background-color: transparent;
  border: none;
}

.back-btn:hover {
  color: var(--color-primary-yellow);
}

.backBtn {
  width: 1.5rem;
  background-color: rgb(0, 0, 0, 0);
  font-size: 1.5rem;
}
</style>
