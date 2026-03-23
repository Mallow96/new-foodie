<script setup>
import BackBtn from "../components/back_btn.vue";
import accountAside from "../components/account_aside.vue";

import { computed, onMounted } from "vue";
import { useFoodStore } from "../store/foodie_store";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const useStore = useFoodStore();

// 透過 Getter 取得登入使用者的乾淨資料
const userInfo = computed(() => useStore.getLoggedInUserBasicInfo);
const currentTab = computed(() => route.meta.tab || "account");

// 格式化日期時間的函式
const formatDateTime = (isoString) => {
  if (!isoString) return "N/A";
  const date = new Date(isoString);
  return date.toLocaleString("zh-TW", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

onMounted(() => {
  if (!route.meta.tab) {
    router.replace({ name: "SettingsAccount" }); // replace 不新增歷史記錄
  }
});
</script>

<template>
  <div class="back"><BackBtn></BackBtn></div>

  <div class="row">
    <aside class="col-3">
      <accountAside></accountAside>
    </aside>
    <main class="col-9">
      <div class="tabs">
        <router-link
          to="/account-setting/account"
          class="tab"
          :class="{ active: $route.meta.tab === 'account' }"
          >帳號設定</router-link
        >
        <router-link
          to="/account-setting/privacy"
          class="tab"
          :class="{ active: $route.meta.tab === 'privacy' }"
          >隱私設定</router-link
        >
        <router-link
          to="/account-setting/notifications"
          class="tab"
          :class="{ active: $route.meta.tab === 'notifications' }"
          >通知設定</router-link
        >
      </div>
      <router-view></router-view>
    </main>
  </div>
</template>

<style scoped>
main {
  min-height: 70vh;
  padding: 0 1rem;
}
</style>
