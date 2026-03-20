<script setup>
import Map_Main from "../components/map_main.vue";
import Map_Aside from "../components/map_aside.vue";
</script>

<template>
  <div class="content">
    <Map_Aside class="aside" />
    <Map_Main class="main" />
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

.content > * {
  height: 100%;
}

.main {
  width: 100%;
  position: relative;
  z-index: 5;
  /* background-color: rgb(170, 170, 170); */
}

.aside {
  position: absolute;
  z-index: 10;
  background-color: rgba(81, 81, 81, 0.2);
  padding-top: var(--header-height);
}
</style>
