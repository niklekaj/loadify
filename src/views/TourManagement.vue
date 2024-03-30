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
                tours.value.forEach(tour => tourForms.value.push({
                    id: tour.id,
                    customer: tour.customer,
                    shipmentDate: tour.shipmentDate,
                    locationFrom: tour.locationFrom,
                    locationTo: tour.locationTo,
                    assignedDriver: {
                        id: tour.id,
                        name: tour.assignedDriver.name
                    },
                }))
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
        const saveTourForms = (tourFormId: number) => {
            tours.value[tourFormId] = tourForms.value[tourFormId];
        }

        return {
            tours,
            drivers,
            tourForms,
            deleteTourForm,
            updateTourFormDriverField,
            allowedDriversForTour,
            saveTourForms
        }
    },
}
</script>

<template>
  <section>
        <form v-for="(tourForm, index) in tourForms" :key="index" @submit.prevent="saveTourForms(index)" class="tour">
            <div class="tour_field">
                <label class="tour_field-label" for="customer">Customer:</label>
                <input type="text" id="customer" v-model="tourForm.customer">
            </div>
            
            <div class="tour_field">
                <label class="tour_field-label" for="shipmentDate">Shipment Date:</label>
                <input type="text" id="shipmentDate" v-model="tourForm.shipmentDate">
            </div>
            
            <div class="tour_field">
                <label class="tour_field-label" for="locationFrom">Location From:</label>
                <input type="text" id="locationFrom" v-model="tourForm.locationFrom">
            </div>

            <div class="tour_field">
                <label class="tour_field-label" for="locationTo">Location To:</label>
                <input type="text" id="locationTo" v-model="tourForm.locationTo">
            </div>

            <div class="tour_field">
                <label class="tour_field-label" for="assignedDriverName">Assigned driver:</label>
                <select @input="updateTourFormDriverField($event, index)">
                    <option v-for="(driver, index) in allowedDriversForTour(tourForm.locationFrom)" :key="index" :value="driver.name" id="driverName">{{ driver.name }}</option>
                </select>
            </div>
            
            <div class="tour_buttons">
                <button type="submit">Save Tour</button>
                <button type="button" @click="deleteTourForm(tourForm.id)">Delete Tour</button>
            </div>
            <hr class="tour_horizontal-line" />
        </form>

  </section>
</template>

<style scoped lang="scss">
  @import "./TourManagement.scss"
</style>
