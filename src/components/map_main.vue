<script setup>
import { onMounted, onBeforeMount, ref } from "vue";
import L from "leaflet";

const props = defineProps({
  restaurants: {
    type: Array,
    default: () => {},
  },
});

let map;

onMounted(() => {
  // 1. center on Taipei
  map = L.map("map", {
    center: [25.033, 121.5654],
    zoom: 13,
    zoomControl: false,
  });

  // 2. OSM底圖
  const osmLayer = L.tileLayer(
    "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  //3. 開新的 zoom control 調整位置
  L.control
    .zoom({
      position: "bottomright",
    })
    .addTo(map);
});

onBeforeMount(() => {
  if (map) {
    map.remove();
  }
});
</script>

<template>
  <main>
    <!-- <h2>this is map main</h2> -->
    <div class="map-wrapper">
      <div class="map" id="map"></div>
    </div>
  </main>
</template>

<style scoped>
.map-wrapper {
  width: 100%;
  height: 100%;

  overflow: hidden;
}

.map {
  width: 100%;
  height: 100%;
}
</style>
