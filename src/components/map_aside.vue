<script setup>
import BackBtn from "./back_btn.vue";
import { useFoodStore } from "../store/foodie_store";
import { defineAsyncComponent, ref } from "vue";

import Stars from "./stars.vue";
import Tabs from "./map-aside-tabs.vue";
import AsideInfo from "./map-aside-info.vue";
import AsidePhoto from "./map-aside-photo.vue";
import AsideReviews from "./map-aside-reviews.vue";
const AsideResv = defineAsyncComponent(
  () => import("./reservation_calendar.vue"),
);

const isExpanded = ref(true);
// const iconSwitch = ref(null);

const store = useFoodStore();

const props = defineProps({
  restaurants: {
    type: Array,
    default: () => [],
  },
});

const toggleAside = () => {
  isExpanded.value = !isExpanded.value;
};

const tabs = ref([
  { name: "info", label: "資訊" },
  { name: "photo", label: "照片" },
  { name: "reviews", label: "評論" },
  { name: "resv", label: "預訂" },
]);

const currentTab = ref("info");
const handleTabChange = (tabName) => {
  currentTab.value = tabName;
  console.log("切換到tab:", tabName);
};

const componentMap = {
  info: AsideInfo,
  photo: AsidePhoto,
  reviews: AsideReviews,
  // resv: AsideResv,
};
</script>

<template>
  <aside :class="{ 'aside-expanded': isExpanded }" class="aside">
    <div class="scroll-container">
      <div :class="{ 'content-toggle': isExpanded }" class="aside-content">
        <!-- 搜尋欄，aside上方固定 -->
        <div class="aside-row">
          <div class="row-wrapper">
            <BackBtn class="back-btn"></BackBtn>
            <form action="" class="search-bar">
              <i class="fa-solid fa-magnifying-glass"></i>
              <input
                type="text"
                class="search-input"
                placeholder="請輸入關鍵字"
              />
            </form>
            <button class="advance-search">
              <i class="fa-solid fa-filter"></i>
              <span>篩選</span>
            </button>
          </div>
        </div>

        <!-- 餐廳列表 -->
        <div class="res-list">
          <ol>
            <li
              v-for="res in props.restaurants"
              :key="res.id"
              class="list-card"
              @click="store.setSelectedRestaurant(res)"
            >
              <img
                v-if="res.image"
                :src="res.image"
                alt="餐廳圖片"
                class="card-img"
              />
              <div class="card-info">
                <h3 class="card-name">{{ res.name }}</h3>
                <div class="card-data">
                  <Stars :rating="res.rating" :reviewCount="res.reviewCount" />
                  <p>{{ res.priceRange }}</p>
                  <p>{{ res.address }}</p>
                </div>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </div>

    <!-- aside 隱藏/顯示 -->
    <button
      v-if="!store.selectedRestaurant"
      class="toggle-aside"
      @click="toggleAside()"
    >
      <i
        :class="
          isExpanded ? 'fa-solid fa-caret-left' : 'fa-solid fa-caret-right'
        "
      ></i>
    </button>

    <!-- 顯示特定餐廳資訊 -->
    <div v-if="store.selectedRestaurant" class="detail-container">
      <button class="close-btn" @click="store.clearSelectedRestaurant()">
        <i class="fa-solid fa-close"></i>
      </button>

      <img
        :src="store.selectedRestaurant.image"
        alt="餐廳圖片"
        class="detail-res-image"
      />
      <div class="detail-body">
        <!-- 名稱 (餐廳頁面連結) -->
        <routerLink
          class="detail-title"
          :to="`/restaurant/${store.selectedRestaurant.id}`"
        >
          <h2 class="detail-name">{{ store.selectedRestaurant.name }}</h2>
          <i class="more-icon fa-solid fa-angle-right"></i>
        </routerLink>

        <!-- 評論、價位 -->
        <div class="detail-subtitle">
          <Stars
            :rating="store.selectedRestaurant.rating"
            :reviewCount="store.selectedRestaurant.reviewCount"
          />
          <p class="price-range">
            TWD$ {{ store.selectedRestaurant.priceRange }} / 人
          </p>
        </div>

        <!-- tab切換 -->
        <div class="tabs">
          <Tabs :tabs="tabs" @change="handleTabChange($event)" />
        </div>

        <!-- tab內容切換 -->
        <KeepAlive>
          <component :is="componentMap[currentTab]"></component>
        </KeepAlive>
      </div>
    </div>
  </aside>
</template>

<style scoped>
h2,
h3,
p {
  margin: 0;
  padding: 0;
}

.aside {
  background-color: var(--color-beige-50);
  width: 0;
  position: relative;
  transition: width 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
}

.scroll-container {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  scrollbar-color: var(--color-orange-600) var(--color-beige-50);
}

.aside-expanded {
  width: 30rem;
}

.toggle-aside {
  background-color: var(--color-yellow-400);
  color: var(--color-primary-dbrown);
  font-size: 1rem;
  padding: 0;
  border: none;
  border-radius: 0 0.5rem 0.5rem 0;

  width: 1.5rem;
  height: 3rem;

  position: absolute;
  right: -1.5rem;
  top: calc((100% - 3rem) / 2);
}

.aside-content {
  padding: 0 1rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  opacity: 0;
  transform: translateX(-20px);
  transition: all 0.3s ease 0.1s;
  transition-delay: 0s;
}

.content-toggle {
  opacity: 1;
  transform: translateX(0);
  transition-delay: 0.1s;
}

.aside-row {
  width: 100%;
  position: sticky;

  padding: 1rem 0;
  top: 0rem;
  background-color: var(--color-beige-50);
  z-index: 10;
}

.row-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.back-btn {
  padding: 0.5rem;
  display: inline-block;
}

.search-bar {
  border: 2px solid var(--color-brown-300);
  padding: 0.75rem 1rem;
  border-radius: 10rem;
  color: var(--color-primary-brown);
}

.search-input {
  border: none;
}

.search-bar:focus-within {
  border-color: var(--color-primary-brown);
}

.advance-search {
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 10rem;
  display: flex;
  justify-items: center;
  align-items: center;
  gap: 0.75rem;

  background-color: var(--color-primary-beige);
  color: var(--color-primary-dbrown);
}

.advance-search:hover {
  background-color: var(--color-beige-300);
}

.list-card {
  display: flex;
  height: 12rem;
  background-color: var(--color-beige-300);
  border-radius: 0.5rem;
  overflow: hidden;
}

.card-img {
  width: 12rem;
  height: 100%;
  object-fit: cover;
}

.card-info {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
  gap: 0.5rem;

  padding: 0.5rem;
}

.detail-container {
  width: 24rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  right: -24.5rem;

  background-color: var(--color-beige-50);
}

.detail-container .close-btn {
  background-color: var(--color-beige-300);
  border: none;
  color: var(--color-dbrown-300);
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}

.detail-body {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.detail-body .price-range {
  font-size: 0.875rem;
  color: var(--color-brown-300);
}

.detail-title {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.75rem;
  cursor: pointer;
  color: var(--color-primary-dbrown);
}

.detail-title:hover {
  .detail-name {
    text-decoration: underline;
  }
}

.detail-title .more-icon {
  font-size: 1.5rem;
}

.detail-subtitle {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.tabs ol {
  list-style: none;
}
</style>
