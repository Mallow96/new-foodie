<script setup>
import { computed } from "vue";

const props = defineProps({
  rating: {
    tyepe: [Number, String],
    default: 0,
    validator: (value) => {
      const num = Number(value);

      return isNaN(num) || (num >= 0 && num <= 5);
    },
  },
  reviewCount: {
    type: [Number, String],
    default: 0,
  },
});

const formattedRating = computed(() => {
  const num = Number(props.rating);

  return isNaN(num) ? "0" : num.toFixed(1);
});
</script>

<template>
  <div
    class="rating"
    :aria-label="`評分：${formattedRating} 顆星，共 ${reviewCount} 則評論`"
  >
    <span class="rating-score">{{ formattedRating }}</span>

    <div class="stars-outer" :style="{ '--rating': formattedRating }">
      ★★★★★
      <div class="stars-inner">★★★★★</div>
    </div>
    <span class="score-amount">({{ reviewCount }})</span>
  </div>
</template>

<style scoped>
.rating {
  display: flex;
  align-items: center;
  gap: 8px;
}

.rating-score {
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.score-amount {
  color: #966f53;
  font-size: 16px;
  font-weight: 600;
}

/* 1. 外層容器：顯示空心星 (作為背景) */
.stars-outer {
  /* 確保元素可以設定寬度，且不換行 */
  display: inline-block;
  position: relative;

  /* 設置星星的字體大小和顏色 */
  font-size: 18px; /* 調整這個值來改變星星的大小 */
  color: lightgray; /* 空心星（背景）的顏色 */
  line-height: 1; /* 防止星星因為行高被撐開 */
  letter-spacing: 2px; /* 調整星星間距 */

  /* 讓 CSS 變數 --rating 可以在這裡被使用 */
  --rating: 0;
}

/* 2. 內層容器：顯示實心星 (作為前景覆蓋) */
.stars-inner {
  /* 絕對定位，讓它疊加在外層空心星上方 */
  position: absolute;
  top: 0;
  left: 0;

  /* **關鍵技巧：只顯示指定寬度範圍內的內容** */
  overflow: hidden;
  white-space: nowrap; /* 確保星星不會換行 */

  /* 實心星（前景）的顏色 */
  color: var(--color-primary-yellow);

  /* *** 魔法公式：根據分數計算寬度百分比 *** */
  /* (評分 / 總分 5) * 100% = 實心星需要覆蓋的寬度 */
  width: calc(var(--rating) / 5 * 100%);
}
</style>
