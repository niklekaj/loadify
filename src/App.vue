<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink active-class="highlight" class="router-link" to="/tours">Tour Management</RouterLink>
        <RouterLink active-class="highlight" class="router-link" to="/drivers">Driver Management</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped lang="scss">
  nav {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
    margin-top: 16px;
    gap: 24px;

  }

  .highlight {
    background-color: #e8f0ed;
    border-radius: 8px;
    padding: 12px;
  }

  .router-link:hover {
    background: transparent;
  }
</style>
