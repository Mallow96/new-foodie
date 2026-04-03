<script setup>
import BackBtn from "./back_btn.vue";
import { useFoodStore } from "../store/foodie_store";
import { ref } from "vue";

import Stars from "./stars.vue";

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
</script>

<template>
  <aside :class="{ 'aside-expanded': isExpanded }" class="aside">
    <div :class="{ 'content-toggle': isExpanded }" class="aside-content">
      <div class="aside-row">
        <BackBtn class="back-btn"></BackBtn>
        <form action="" class="search-bar">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input type="text" class="search-input" placeholder="請輸入關鍵字" />
        </form>
        <button class="advance-search">
          <i class="fa-solid fa-filter"></i>
          <span>篩選</span>
        </button>
      </div>

      <div v-if="!store.selectedRestaurant" class="res-list">
        <p class="result-count">共 {{ props.restaurants.length }} 家餐廳</p>
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
                <div>
                  <Stars :rating="res.rating" :reviewCount="res.reviewCount" />
                  | {{ res.priceRange }}
                </div>
                <p>{{ res.address }}</p>
              </div>
            </div>
          </li>
        </ol>
      </div>

      <div v-else class="detail-container">
        <button @click="store.clearSelectedRestaurant()">
          <i class="fa-solid fa-arrow-left"></i>
        </button>
        <img
          :src="store.selectedRestaurant.image"
          alt="餐廳圖片"
          class="detail-res-image"
        />
        <div class="detail-body">
          <h2 class="detail-name">{{ store.selectedRestaurant.name }}</h2>
          <p>{{ store.selectedRestaurant.rating }}</p>
          <p>{{ store.selectedRestaurant.address }}</p>
        </div>
      </div>
    </div>

    <button class="toggle-aside" @click="toggleAside()">
      <i
        :class="
          isExpanded ? 'fa-solid fa-caret-left' : 'fa-solid fa-caret-right'
        "
      ></i>
    </button>
  </aside>
</template>

<style scoped>
.aside {
  background-color: var(--color-beige-50);
  width: 0;
  position: relative;
  transition: width 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
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

.toggle-aside {
  position: absolute;
}

.aside-content {
  padding: 1.5rem;

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
</style>
