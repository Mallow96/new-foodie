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
  <div class="back">
    <BackBtn></BackBtn>
  </div>

  <div class="row settings-page">
    <aside class="col-3">
      <accountAside></accountAside>
    </aside>
    <main class="col-9">
      <div class="tabs">
        <router-link
          to="/account-setting/account"
          class="tab account-tab"
          :class="{ active: $route.meta.tab === 'account' }"
          >帳號設定</router-link
        >
        <router-link
          to="/account-setting/privacy"
          class="tab privacy-tab"
          :class="{ active: $route.meta.tab === 'privacy' }"
          >隱私設定</router-link
        >
        <router-link
          to="/account-setting/notifications"
          class="tab notifications-tab"
          :class="{ active: $route.meta.tab === 'notifications' }"
          >通知設定</router-link
        >
      </div>
      <div class="settings-content">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<style scoped>
main {
  height: 43rem;
  padding: 0 1rem;
}

.settings-page {
  margin-bottom: 3rem;
}

.tabs {
  display: flex;
  justify-items: center;
  align-items: center;
  height: 3.5rem;

  box-sizing: border-box; /* This is the key property */
}

.tab,
.settings-content {
  color: var(--color-primary-dbrown);
  border: 2px solid var(--color-brown-200);
}

.tab {
  font-size: 1.5rem;
  padding: 0.5rem 0;
  background-color: var(--color-brown-100);

  margin-right: -2px;

  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;

  flex: 1;

  display: inline-block;
  text-align: center;
}

.tab:last-child {
  margin-right: 0;
}

.active {
  background-color: var(--color-beige-100);
  border-bottom: 0;
  margin-bottom: -2px;
}

.settings-content {
  padding: 1rem;
  border-top: 0;
  height: calc(100% - 3.5rem);

  display: flex;
  flex-direction: column;
  gap: 1rem;

  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
}
</style>
