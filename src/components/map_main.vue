<script setup>
import { onMounted, onUnmounted, ref, watch } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

//預防圖標失效
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const props = defineProps({
  restaurants: {
    type: Array,
    default: () => [],
  },
});

let map;
let markerGroup;

const renderMarkers = (data) => {
  console.log("--> renderMarkers 收到的資料:", data);

  if (!markerGroup) return;

  let count = 0;
  data.forEach((res) => {
    console.log(
      `檢查 ${res.name}: visible=${res.is_map_visible}, lat=${res.lat}, lng=${res.lng}`,
    );

    //用is_map_visible判斷
    if (res.is_map_visible && res.lat && res.lng) {
      const marker = L.marker([res.lat, res.lng]);

      marker.bindPopup(`
      <div style="text-align: center; min-width: 150px;">
      <h4 style="margin: 0 0 5px 0; font-size: 16px;">${res.name}</h4>
      <p style="margin: 0; color: #666; font-size: 13px">${res.address}</p>  
      </div>`);

      markerGroup.addLayer(marker);
      count++;
    }
  });

  console.log(`--> 成功加到地圖上的圖釘數量: ${count}`);
};

onMounted(() => {
  map = L.map("map", {
    center: [25.033, 121.5654], //center on Taipei
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

  //4. marker group
  markerGroup = L.layerGroup().addTo(map);

  //5. render
  renderMarkers(props.restaurants);
});

watch(
  () => props.restaurants,
  (newRestaurants) => {
    console.log("--> watch 觸發了，收到新資料:", newRestaurants.length, "筆");
    renderMarkers(newRestaurants);
  },
  { deep: true },
);

onUnmounted(() => {
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
