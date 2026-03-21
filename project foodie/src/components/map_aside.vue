<script setup>
import { ref } from "vue";

const isExpanded = ref(true);

const toggleAside = () => {
  isExpanded.value = !isExpanded.value;
};
</script>

<template>
  <aside :class="{ 'aside-expanded': isExpanded }" class="aside">
    <h2>this is map aside</h2>

    <button class="toggle-aside"></button>
  </aside>
</template>

<style scoped>
.aside {
  background-color: var(--color-beige-50);
  padding: var(--header-height) 1rem;
  padding-bottom: 0;
  width: 25rem;

  position: relative;
}

.toggle-aside {
  position: absolute;
}
</style>
