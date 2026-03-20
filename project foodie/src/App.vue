<script setup>
import Header from "./components/header.vue";
import Footer from "./components/footer.vue";
import Loading from "./components/loading.vue";
import { useFoodStore } from "./store/foodie_store";
import { onMounted, watch } from "vue";
import { storeToRefs } from "pinia";

//取得store
const store = useFoodStore();
const { currentUsername, isLoading } = storeToRefs(store);

//storeToRefs可保持響應性
const { hasLoadedMembers } = storeToRefs(store);

//fetch資料
onMounted(async () => {
  await store.fetchAllData();
});
</script>

<template>
  <header>
    <Header v-if="!$route.meta.hideHeader" />
  </header>
  <div class="container">
    <div v-if="isLoading">
      <Loading />
    </div>
    <div v-else>
      <router-view></router-view>
    </div>
  </div>

  <footer>
    <Footer v-if="!$route.meta.hideFooter" />
  </footer>
</template>

<style scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  margin: 0;
  padding: 0;
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); */
  z-index: 100;
}

footer {
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
  margin: 0;
  padding: 0;
}

.container {
  min-height: calc(100vh - var(--footer-height) - var(--header-height));
}

.container > * {
  height: 100%;
}
</style>
