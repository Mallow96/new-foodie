<script setup>
import { computed } from "vue";
import { useFoodStore } from "../store/foodie_store";

const useStore = useFoodStore();
const userInfo = computed(() => useStore.getLoggedInUserBasicInfo);
</script>

<template>
  <h3>您的會員資料</h3>

  <div class="row">
    <div class="col">
      <h5>姓名</h5>
      <p>{{ userInfo.realName }}</p>
    </div>
    <div class="col">
      <h5>稱謂</h5>
      <p>先生 / 小姐 / 其他</p>
    </div>
  </div>

  <div class="row">
    <div class="col">
      <h5>連絡電話</h5>
      <p>{{ userInfo.phone }}</p>
    </div>
    <div class="col">
      <h5>電子郵件</h5>
      <p>{{ userInfo.email }}</p>
    </div>
  </div>
</template>

<style scoped></style>
