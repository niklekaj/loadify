<script lang="ts">
import { type Tour, type Driver, } from '@/mockApi/index'
import { fetchTours } from '@/services/tours'
import { fetchDrivers } from '@/services/drivers'
import { ref, onMounted } from 'vue'

export default {
    setup() {
        let tours = ref<Tour[]>([])
        let drivers = ref<Driver[]>([])

        const tourForms = ref<Tour[]>([]);

        onMounted(async () => {
            try {
                tours.value = await fetchTours();
                drivers.value = await fetchDrivers();
                tourForms.value = tours.value
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        });
        
        const deleteTourForm = (tourFormId: number) => {
            // mocking the communication with the BE since no endpoint is being called and therefore no real response
            tours.value = tours.value.filter(t => t.id !== tourFormId);

            tourForms.value = tours.value;
        };

        const updateTourFormDriverField = (event: Event, tourFormId: number) => {
            const target = event.target as HTMLInputElement;
            tourForms.value[tourFormId].assignedDriver.name = target.value;
        }

        const allowedDriversForTour = (tourLocationFrom: string) => {
            return drivers.value.filter(driver => driver.location === tourLocationFrom)
        }
        const saveForm = (tourFormId: number) => {
            tours.value[tourFormId] = tourForms.value[tourFormId];
        }

        return {
            tours,
            drivers,
            tourForms,
            deleteTourForm,
            updateTourFormDriverField,
            allowedDriversForTour,
            saveForm
        }
    },
}
</script>

<template>
  <section>
      <div v-for="(tourForm, index) in tourForms" :key="index">
        <form @submit.prevent="saveForm(index)">
            <label for="customer">Customer:</label>
            <input type="text" id="customer" v-model="tourForm.customer">
            
            <label for="shipmentDate">shipmentDate:</label>
            <input type="text" id="shipmentDate" v-model="tourForm.shipmentDate">
            
            <label for="locationFrom">locationFrom:</label>
            <input type="text" id="locationFrom" v-model="tourForm.locationFrom">

            <label for="locationTo">locationTo:</label>
            <input type="text" id="locationTo" v-model="tourForm.locationTo">

            <label for="assignedDriverName">Assigned driver:</label>
            <select @input="updateTourFormDriverField($event, index)">
                <option v-for="(driver, index) in allowedDriversForTour(tourForm.locationFrom)" :key="index" :value="driver.name">{{ driver.name }}</option>
            </select>
            
            <button type="submit">Save Tour</button>
            <button type="button" @click="deleteTourForm(tourForm.id)">Delete Tour</button>
        </form>
      </div>

  </section>
</template>
