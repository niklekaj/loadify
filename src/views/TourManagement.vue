<script lang="ts">
import { type Tour, type Driver, } from '@/mockApi/index'
import { fetchTours } from '@/services/tours'
import { fetchDrivers } from '@/services/drivers'
import { ref, onMounted } from 'vue'


export default {
    setup() {
        let tours = ref<Tour[]>([])
        let drivers = ref<Driver[]>([])

        const getAssignedDriverNameForTour = (driverId: number | null): string => {
            return drivers.value.find(driver => driver.id === driverId)?.name ?? '---';
        }

        onMounted(async () => {
            try {
                tours.value = await fetchTours();
                drivers.value = await fetchDrivers();
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        });

        return {
            tours,
            drivers,
            getAssignedDriverNameForTour
        }
    },
}
</script>

<template>
  <main>
    <ul>
      <li v-for="(tour, index) in tours" :key="index">
        <div>{{ tour.customer}}</div>
        <div>{{ tour.shipmentDate}}</div>
        <div>{{ tour.locationFrom}}</div>
        <div>{{ tour.locationTo}}</div>
        <div>{{ getAssignedDriverNameForTour(tour.assignedDriver)}}</div>
      </li>
    </ul>

  </main>
</template>
