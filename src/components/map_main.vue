<script setup>
import { onMounted, onUnmounted, ref, watch } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
// import { useFoodStore } from "../store/foodie_store";
import { useRouter, useRoute } from "vue-router";

// const store = useFoodStore();
const router = useRouter();
const route = useRoute();

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
const mapContainer = ref(null);
let resizeObserver = null;

//focus地標
const focusOnRestaurant = (lat, lng) => {
  if (!map) return;

  const targetZoom = 16;
  const currentZoom = map.getZoom() || 13;
  const finalZoom = Math.max(currentZoom, targetZoom);

  map.flyTo([lat, lng], finalZoom, { duration: 0.8 });
};

//圖釘
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

      marker.on("click", () => {
        // store.setSelectedRestaurant(res);
        // focusOnRestaurant(res.lat, res.lng);

        router.push({
          name: "mapRestaurantDetail",
          params: {
            id: res.id,
            tab: "info",
          },
        });
      });

      markerGroup.addLayer(marker);
      count++;
    }
  });

  console.log(`--> 成功加到地圖上的圖釘數量: ${count}`);
};

onMounted(() => {
  map = L.map(mapContainer.value, {
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

  resizeObserver = new ResizeObserver(() => {
    if (map) {
      map.invalidateSize();
    }
  });

  if (mapContainer.value) {
    resizeObserver.observe(mapContainer.value);
  }
});

//watch props
watch(
  () => props.restaurants,
  (newRestaurants) => {
    console.log("--> watch 觸發了，收到新資料:", newRestaurants.length, "筆");

    if (markerGroup) {
      markerGroup.clearLayers();
    }
    renderMarkers(newRestaurants);
  },
  { deep: true },
);

//watch store
// watch(
//   () => store.selectedRestaurant,
//   (newRestaurant) => {
//     if (newRestaurant && newRestaurant.lat && newRestaurant.lng) {
//       console.log(`--> 側邊點擊了 ${newRestaurant.name}，畫面轉移`);
//       focusOnRestaurant(newRestaurant.lat, newRestaurant.lng);
//     }
//   },
// );

//watch route
watch(
  () => route.params.id,
  (newId) => {
    if (newId) {
      const targetRes = props.restaurants.find(
        (r) => String(r.id) === String(newId),
      );

      if (targetRes && targetRes.lat && targetRes.lng) {
        console.log(`--> 網址切換到 ${targetRes.name}，畫面轉移`);
        focusOnRestaurant(targetRes.lat, targetRes.lng);
      }
    }
  },
  { immediate: true },
);

onUnmounted(() => {
  if (map) {
    map.remove();
  }

  if (resizeObserver) {
    resizeObserver.disconnect();
  }
});
</script>

<template>
  <main>
    <!-- <h2>this is map main</h2> -->
    <div class="map-wrapper">
      <div class="map" id="map" ref="mapContainer"></div>
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
