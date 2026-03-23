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
  <div v-if="isLoading">
    <Loading />
  </div>

  <div class="content-view" v-else>
    <header>
      <Header v-if="!$route.meta.hideHeader"></Header>
    </header>
    <div class="container">
      <div>
        <router-view></router-view>
      </div>
    </div>

    <footer>
      <Footer v-if="!$route.meta.hideFooter"></Footer>
    </footer>
  </div>
</template>

<style scoped>
.content-view {
  width: 100%;
}

header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  margin: 0;
  padding: 0;
  z-index: 1;
}

footer {
  bottom: 0;
  left: 0;
  width: 100%;
  margin: 0;
  padding: 0;
  z-index: 100;
  position: relative;
}

.container {
  min-height: calc(100vh - var(--footer-height) - var(--header-height));
}

.container > * {
  height: 100%;
}
</style>
