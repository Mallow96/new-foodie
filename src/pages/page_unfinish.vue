<script setup>
import { useRouter } from "vue-router";
import BackBtn from "../components/back_btn.vue";

const router = useRouter();

const handleBackBtn = () => {
  if (window.history.state.back) {
    router.back();
  } else {
    router.push({ name: "test" });
  }
};
</script>

<template>
  <div class="back">
    <BackBtn @click="handleBackBtn()"></BackBtn>
  </div>
  <section>
    <h1>正在建置中</h1>
    <p>此功能尚未完成，敬請期待更多內容上線！</p>
    <p>感謝您的耐心與支持。</p>
  </section>
</template>

<style scoped>
section {
  min-height: 80vh;
  place-content: center;
  h1,
  p {
    text-align: center;
  }
  h1 {
    margin-bottom: 3rem;
  }
}
</style>
