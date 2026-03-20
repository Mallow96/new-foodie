<script setup>
import Map_Main from "../components/map_main.vue";
import Map_Aside from "../components/map_aside.vue";
</script>

<template>
  <h2 class="text-center">this is map page</h2>
  <div class="content">
    <Map_Aside />
    <Map_Main />
  </div>
</template>

<style scoped>
.content {
  display: flex;
}
</style>
