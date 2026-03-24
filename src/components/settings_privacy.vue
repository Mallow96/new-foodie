<script setup>
import { ref } from "vue";

const isProfilePublic = ref(true);
const recommendationsOn = ref(true);
</script>

<template>
  <section class="privacy">
    <div class="privacy-block">
      <h5>公開「我的主頁」</h5>
      <label class="custom-switch">
        <input type="checkbox" v-model="isProfilePublic" />
        <span class="slider"></span>
      </label>
    </div>
    <div class="privacy-block">
      <h5>開啟個人化推薦</h5>
      <label class="custom-switch">
        <input type="checkbox" v-model="recommendationsOn" />
        <span class="slider"></span>
      </label>
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

.privacy-block {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 2rem;
}
</style>
