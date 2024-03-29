<script lang="ts">
import { type Driver } from '@/mockApi/index'
import { fetchDrivers } from '@/services/drivers'
import { ref, onMounted } from 'vue'

export default {
  setup() {
      let drivers = ref<Driver[]>([])
      const driverForms = ref<Driver[]>([]);

      onMounted(async () => {
          try {
            drivers.value = await fetchDrivers();
            drivers.value.forEach(driver => driverForms.value.push({
                id: driver.id,
                name: driver.name,
                location: driver.location,
            }))
          } catch (error) {
              console.error('Error fetching data:', error);
          }
      });

      const addNewDriverForm = () => {
        driverForms.value.push({
          id: driverForms.value.length + 1,
          name: '',
          location: ''
        })
      }

      const saveDriverForms = (driverFormId: number) => {
        if(drivers.value.find(d => d.id === driverFormId)){
          drivers.value[driverFormId] = driverForms.value[driverFormId];
          return
        }

        drivers.value.push(driverForms.value[driverFormId - 1])
      }

      return {
          drivers,
          driverForms,
          addNewDriverForm,
          saveDriverForms
      }
  },
}
</script>

<template>
  <section>
      <div v-for="driverForm in driverForms" :key="driverForm.id">
        <form @submit.prevent="saveDriverForms(driverForm.id)">
            <label for="name">Customer:</label>
            <input type="text" id="name" v-model="driverForm.name">
            
            <label for="location">location:</label>
            <input type="text" id="location" v-model="driverForm.location">
            
            <button type="submit">Save Driver</button>
        </form>
      </div>
      <button @click="addNewDriverForm()">Add Driver</button>

  </section>
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
