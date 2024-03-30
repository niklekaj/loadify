<script lang="ts">
import { ref, onMounted } from 'vue'
import { type Tour, type Driver, } from '@/mockApi/index'
import { fetchTours } from '@/services/tours'
import { fetchDrivers } from '@/services/drivers'
import AddButton from '@/components/AddButton.vue';

export default {
    components: {
        AddButton
    },
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
            tourForms.value[tourFormId - 1].assignedDriver.name = target.value;
            tourForms.value[tourFormId - 1].assignedDriver.id = drivers.value.find(d => d.name === target.value)?.id || null;
        }

        const allowedDriversForTour = (tourLocationFrom: string) => {
            return drivers.value.filter(driver => driver.location === tourLocationFrom)
        }

        const saveTourForms = (tourFormId: number) => {
            if(tours.value.find(d => d.id === tourFormId)){
                tours.value = tours.value.filter(d => d.id !== tourFormId);
                tours.value.push({...tourForms.value[tourFormId - 1]});
                return;
            }

            tours.value.push({...tourForms.value[tourFormId - 1]})
        }

        const addNewTourForm = () => {
        tourForms.value.push({
            id: tourForms.value.length + 1,
            customer: '',
            shipmentDate: '',
            locationFrom: '',
            locationTo: '',
            assignedDriver: {
                id: null,
                name: ''
            },
        })
      }

        return {
            tours,
            drivers,
            tourForms,
            deleteTourForm,
            updateTourFormDriverField,
            allowedDriversForTour,
            saveTourForms,
            addNewTourForm
        }
    },
}
</script>

<template>
  <section>
        <form v-for="(tourForm, index) in tourForms" :key="index" @submit.prevent="saveTourForms(tourForm.id)" class="tour">
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
                <select @input="updateTourFormDriverField($event, tourForm.id)">
                    <option value="" disabled :selected="!tourForm.assignedDriver.name">Select an option</option>
                    <option v-for="(driver, index) in allowedDriversForTour(tourForm.locationFrom)" :key="index" :value="driver.name" id="driverName">{{ driver.name }}</option>
                </select>
            </div>
            
            <div class="tour_buttons">
                <button type="submit">Save Tour</button>
                <button type="button" @click="deleteTourForm(tourForm.id)">Delete Tour</button>
            </div>
            <hr class="tour_horizontal-line" />
        </form>
        <!-- <button @click="addNewTourForm()">Add Tour</button> -->
        <AddButton @add="addNewTourForm()" buttonText="Add Tour" />

  </section>
</template>

<style scoped lang="scss">
  @import "./TourManagement.scss"
</style>
