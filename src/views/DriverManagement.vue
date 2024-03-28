<script lang="ts">
import { type Driver } from '@/mockApi/index'
import { fetchDrivers } from '@/services/drivers'
import { ref, onMounted } from 'vue'

export default {
  setup() {
      let drivers = ref<Driver[]>([])

      onMounted(async () => {
          try {
              drivers.value = await fetchDrivers();
          } catch (error) {
              console.error('Error fetching data:', error);
          }
      });

      return {
          drivers,
      }
  },
}
</script>

<template>
  <div class="driver">
    <ul>
      <li v-for="(driver, index) in drivers" :key="index">
        <div>{{ driver.name}}</div>
        <div>{{ driver.location}}</div>
      </li>
    </ul>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
