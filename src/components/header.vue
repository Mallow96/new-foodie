<script setup>
import Btn_Logo from "./btn_logo.vue";
</script>

<template>
  <div class="header">
    <Btn_Logo />

    <nav class="nav-group">
      <div class="icons">
        <router-link :to="{ name: 'developing' }" class="unfinished clickables">
          <i class="fa-solid fa-bell"></i>
        </router-link>

        <router-link :to="{ name: 'account' }" class="clickables">
          <i class="fa-solid fa-user"></i>
        </router-link>
      </div>
    </nav>
  </div>
</template>

<style scoped>
.header {
  width: 100%;
  height: var(--header-height);

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  pointer-events: none;
}

.header * {
  pointer-events: none;
}

.header .nav-group,
.header .nav-group * {
  pointer-events: auto;
}

.header .logo,
.header .logo * {
  pointer-events: auto;
}

.icons {
  display: flex;
  align-items: center;
  gap: 2rem;

  a {
    :hover {
      color: var(--color-primary-orange);
    }

    i {
      font-size: 2rem;
      color: var(--color-primary-brown);
    }
  }
}
</style>
