<script setup>
import Map_Main from "../components/map_main.vue";
import Map_Aside from "../components/map_aside.vue";

import { useFoodStore } from "../store/foodie_store";

const store = useFoodStore();
</script>

<template>
  <div class="content">
    <Map_Aside class="aside" :restaurants="store.restaurants" />
    <Map_Main class="main" :restaurants="store.restaurants" />
  </div>
</template>

<style scoped>
.content {
  display: flex;
  position: absolute;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100vw;
}

.btn-logo {
  position: absolute;
  z-index: 11;
  top: 1rem;

  left: calc((100vw - 8.75rem) / 2);
}

.aside,
.main {
  height: 100%;
}

.main {
  width: 100%;
  position: relative;
  z-index: 5;
}

.aside {
  position: absolute;
  z-index: 10;
}
</style>
