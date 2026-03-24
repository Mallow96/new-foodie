<script setup>
import { computed } from "vue";
import { useFoodStore } from "../store/foodie_store";

const useStore = useFoodStore();
const userInfo = computed(() => useStore.getLoggedInUserBasicInfo);
</script>

<template>
  <section class="profile">
    <div class="profile-info">
      <h3>您的會員資料</h3>

      <div class="info-grid">
        <div class="name profile-block">
          <h5>姓名</h5>
          <p>{{ userInfo.realName }}</p>
        </div>
        <div class="honorific profile-block">
          <h5>稱謂</h5>
          <p>先生 / 小姐 / 其他</p>
        </div>
        <div class="phone profile-block">
          <h5>連絡電話</h5>
          <p>{{ userInfo.phone }}</p>
        </div>
        <div class="email profile-block">
          <h5>電子郵件</h5>
          <p>{{ userInfo.email }}</p>
        </div>
      </div>
    </div>
    <div class="edit-btn profile-block btn-mr">
      <button>編輯會員資料</button>
    </div>
  </section>

  <section class="password">
    <div class="pw-left">
      <h5>密碼</h5>
      <p>password</p>
    </div>
    <div class="pw-right btn-mr">
      <button class="edit-btn-sm">修改密碼</button>
    </div>
  </section>

  <section class="link-accounts">
    <div class="link-block">
      <div class="link-left">
        <i class="fa-brands fa-facebook"></i>
        <h5>Facebook</h5>
        <p>未綁定</p>
      </div>
      <div class="link-right btn-mr">
        <button class="edit-btn-sm">綁定</button>
      </div>
    </div>
    <div class="link-block">
      <div class="link-left">
        <i class="fa-brands fa-google"></i>
        <h5>Google</h5>
        <p>已綁定</p>
      </div>
      <div class="link-right btn-mr">
        <button class="edit-btn-sm">解除綁定</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
h5,
p {
  margin: 0;
}

section {
  border: 2px solid var(--color-brown-200);
  background-color: white;
  padding: 1rem;
  border-radius: 1rem;

  display: flex;
  gap: 2rem;
}

.profile-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  flex: 1;
}

.profile-block {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.profile-block h5 {
  font-weight: bolder;
}

.edit-btn {
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn-mr {
  margin-right: 2rem;
}

.edit-btn button {
  background-color: var(--color-yellow-400);
  color: var(--color-primary-dbrown);
  border-radius: 10rem;
  padding: 0.5rem 1rem;
  font-weight: bolder;

  border: none;
}

.edit-btn button:hover {
  background-color: var(--color-yellow-200);
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
}

.pw-left {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.pw-right {
  display: flex;
  justify-content: center;
  align-items: center;
}

.edit-btn-sm {
  background-color: var(--color-beige-500);
  color: var(--color-dbrown-300);
  border: none;
  border-radius: 10rem;

  padding: 0.5rem 1rem;
}

.link-accounts {
  display: flex;
  flex-direction: column;
}

.link-block {
  display: flex;
}

.link-left {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
}
</style>
