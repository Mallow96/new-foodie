<script setup>
import { ref } from "vue";

const props = defineProps({
  tabs: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits({
  change: (tabName) => typeof tabName === "string" && tabName.length > 0,
});

const activeIndex = ref(0);

//aside切換tab
const switchTab = (index, tabName) => {
  activeIndex.value = index;
  emit("change", tabName);
};
</script>

<template>
  <ol class="tab-wrapper">
    <li
      :style="{
        width: `calc((100% - 8px) / ${tabs.length || 1})`,
        transform: `translateX(${activeIndex * 100}%)`,
      }"
      class="tab-indicator"
    ></li>

    <li
      v-for="(tab, index) in tabs"
      :key="tab.name"
      class="tab-btn"
      :class="{ 'is-active': activeIndex === index }"
      @click="
        activeIndex = index;
        switchTab(index, tab.name);
      "
    >
      {{ tab.label }}
    </li>
  </ol>
</template>

<style scoped>
ol,
li {
  list-style: none;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.tab-wrapper {
  position: relative;
  display: flex;
  background-color: white;
  border-radius: 8px;
  padding: 4px;
  width: 100%;
}

.tab-btn {
  position: relative;
  z-index: 1;
  flex: 1;
  background: transparent;
  border: none;
  padding: 8px 16px;
  color: var(--color-brown-400);
  user-select: none;
  text-align: center;

  cursor: pointer;
  transition: color 0.3s ease;
}

.tab-btn.is-active {
  color: var(--color-primary-dbrown);
}

.tab-indicator {
  position: absolute;
  border-bottom: 1px solid var(--color-orange-600);

  top: 4px;
  left: 4px;
  z-index: 0;
  height: calc(100% - 8px);
  background-color: var(--color-beige-50);
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
}
</style>
