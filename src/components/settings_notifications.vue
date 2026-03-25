<script setup>
import { ref, computed } from "vue";

const isTextExpanded = ref(true);
const isEmailExpanded = ref(true);

const isTextResvOn = ref(true);
const isTextPromoOn = ref(true);
const isTextNewsletterOn = ref(true);
const isTextAllOn = computed({
  get: () =>
    isTextResvOn.value && isTextPromoOn.value && isTextNewsletterOn.value,

  set: (newValue) => {
    isTextResvOn.value = newValue;
    isTextPromoOn.value = newValue;
    isTextNewsletterOn.value = newValue;
  },
});

const isEmailResvOn = ref(true);
const isEmailPromoOn = ref(true);
const isEmailNewsletterOn = ref(true);
const isEmailAllOn = computed({
  get: () =>
    isEmailResvOn.value && isEmailPromoOn.value && isEmailNewsletterOn.value,

  set: (newValue) => {
    isEmailResvOn.value = newValue;
    isEmailPromoOn.value = newValue;
    isEmailNewsletterOn.value = newValue;
  },
});

const toggleTextExpand = () => {
  isTextExpanded.value = !isTextExpanded.value;
};

const toggleEmailExpand = () => {
  isEmailExpanded.value = !isEmailExpanded.value;
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

    <div class="expand-wrapper" :class="{ 'is-expanded': isTextExpanded }">
      <div class="text-items">
        <div class="text-content">
          <div class="switch-group switch-profile">
            <p>開啟全部</p>
            <label class="custom-switch">
              <input type="checkbox" v-model="isTextAllOn" />
              <span class="slider"></span>
            </label>
          </div>
          <div class="switch-group switch-reserve">
            <p>開啟預訂相關通知</p>
            <label class="custom-switch">
              <input type="checkbox" v-model="isTextResvOn" />
              <span class="slider"></span>
            </label>
          </div>
          <div class="switch-group switch-promo">
            <p>開啟優惠通知</p>
            <label class="custom-switch">
              <input type="checkbox" v-model="isTextPromoOn" />
              <span class="slider"></span>
            </label>
          </div>
          <div class="switch-group switch-newsletter">
            <p>開啟電子報</p>
            <label class="custom-switch">
              <input type="checkbox" v-model="isTextNewsletterOn" />
              <span class="slider"></span>
            </label>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="email-notifications">
    <div class="section-head" @click="toggleEmailExpand()">
      <h5>電子郵件通知</h5>
      <i
        :class="
          isTextExpanded ? 'fa-solid fa-angle-up' : 'fa-solid fa-angle-down'
        "
      ></i>
    </div>

    <div class="expand-wrapper" :class="{ 'is-expanded': isEmailExpanded }">
      <div class="text-items">
        <div class="text-content">
          <div class="switch-group switch-profile">
            <p>開啟全部</p>
            <label class="custom-switch">
              <input type="checkbox" v-model="isEmailAllOn" />
              <span class="slider"></span>
            </label>
          </div>
          <div class="switch-group switch-reserve">
            <p>開啟預訂相關通知</p>
            <label class="custom-switch">
              <input type="checkbox" v-model="isEmailResvOn" />
              <span class="slider"></span>
            </label>
          </div>
          <div class="switch-group switch-promo">
            <p>開啟優惠通知</p>
            <label class="custom-switch">
              <input type="checkbox" v-model="isEmailPromoOn" />
              <span class="slider"></span>
            </label>
          </div>
          <div class="switch-group switch-newsletter">
            <p>開啟電子報</p>
            <label class="custom-switch">
              <input type="checkbox" v-model="isEmailNewsletterOn" />
              <span class="slider"></span>
            </label>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
h5,
p {
  margin: 0;
}

section {
  border: 2px solid var(--color-brown-200);
  background-color: white;
  /* padding: 1rem; */
  border-radius: 1rem;

  display: flex;
  flex-direction: column;
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
  height: 24px;
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
  height: 1rem;
  width: 1rem;
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
  padding: 1rem;
}

.section-head:hover {
  cursor: pointer;
}

.expand-wrapper {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  overflow: hidden;
}

.expand-wrapper.is-expanded {
  grid-template-rows: 1fr;
}

.text-items {
  overflow: hidden;

  opacity: 1;
  transform: translateX(0);
}

.is-expanded .text-items {
  transition:
    opacity 0.3s ease 0.1s,
    transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.text-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;

  padding-left: 2rem;
  padding-right: 1rem;
  padding-bottom: 1rem;
}

.switch-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
