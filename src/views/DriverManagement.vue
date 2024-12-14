<script lang="ts">
import { ref, onMounted } from 'vue'
import { type Driver } from '@/mockApi/index'
import { fetchDrivers } from '@/services/drivers'
import AddButton from '@/components/AddButton.vue'

export default {
  components: {
    AddButton
  },
  setup() {
    let drivers = ref<Driver[]>([])
    const driverForms = ref<Driver[]>([])

    onMounted(async () => {
      try {
        drivers.value = await fetchDrivers()
        drivers.value.forEach((driver) =>
          driverForms.value.push({
            id: driver.id,
            name: driver.name,
            location: driver.location
          })
        )
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    })

    const addNewDriverForm = () => {
      driverForms.value.push({
        id: driverForms.value.length + 1,
        name: '',
        location: ''
      })
    }

    const saveDriverForms = (driverFormId: number) => {
      if (drivers.value.find((d) => d.id === driverFormId)) {
        drivers.value = drivers.value.filter((d) => d.id !== driverFormId)
        drivers.value.push({ ...driverForms.value[driverFormId - 1] })

        return
      }

      drivers.value.push({ ...driverForms.value[driverFormId - 1] })
    }

    return {
      drivers,
      driverForms,
      addNewDriverForm,
      saveDriverForms
    }
  }
}
</script>

<template>
  <section>
    <form
      v-for="driverForm in driverForms"
      :key="driverForm.id"
      @submit.prevent="saveDriverForms(driverForm.id)"
      class="driver"
    >
      <div class="driver_field">
        <label class="driver_field-label" for="name">Driver:</label>
        <input type="text" id="name" v-model="driverForm.name" />
      </div>

      <div class="driver_field">
        <label class="driver_field-label" for="location">Location:</label>
        <input type="text" id="location" v-model="driverForm.location" />
      </div>

      <button class="driver--save" type="submit">Save Driver</button>
      <hr class="driver_horizontal-line" />
    </form>
    <AddButton @add="addNewDriverForm()" buttonText="Add Driver" />
  </section>
</template>

<style scoped lang="scss">
@import './DriverManagement.scss';
</style>
