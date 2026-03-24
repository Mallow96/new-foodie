<script setup>
import { ref, computed } from "vue";

const isTextExpanded = ref(true);
const textIconSwitch = ref(null);
const isTextAllOn = ref(true);

const toggleTextExpand = () => {
  isTextExpanded.value = !isTextExpanded.value;
};
</script>

<template>
  <section class="text-notifications">
    <div class="section-head" @click="toggleTextExpand()">
      <h5>簡訊通知</h5>
      <i
        :class="
          isTextExpanded ? 'fa-solid fa-angle-up' : 'fa-solid fa-angle-down'
        "
      ></i>
    </div>

    <div class="text-items" :class="{ 'text-items-toggle': !isTextExpanded }">
      <div class="text-content" :class="{ 'content-toggle': !isTextExpanded }">
        <p>開啟全部</p>
        <label class="custom-switch">
          <input type="checkbox" v-model="isProfilePublic" />
          <span class="slider"></span>
        </label>
      </div>
    </div>
  </section>
</template>

<style scoped>
h5 {
  margin: 0;
}

section {
  border: 2px solid var(--color-brown-200);
  background-color: white;
  padding: 1rem;
  border-radius: 1rem;

  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
}

.custom-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.custom-switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 26px;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  border-radius: 34px;
  transition: 0.4s;
}

.slider::before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  border-radius: 50%;
  transition: 0.4s;
}

.custom-switch input:checked + .slider {
  background-color: var(--color-orange-600);
}

.custom-switch input:checked + .slider::before {
  transform: translateX(24px);
}

.section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.section-head:hover {
  cursor: pointer;
}

.text-items {
  display: flex;

  opacity: 1;
  transform: translateX(0);
  transition-delay: 0.1s;
}

.content-toggle {
  opacity: 0;
  transform: translateX(-20px);
  transition: all 0.3s ease 0.1s;
  transition-delay: 0s;
}

.text-items-toggle {
  display: none;
}

.text-content {
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
</style>
