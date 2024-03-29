<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/tours">Tour Management</RouterLink>
        <RouterLink to="/drivers">Driver Management</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped lang="scss">
  nav {
    display: flex;
    justify-content: space-between;
  }
</style>
