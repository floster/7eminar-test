<script setup lang="ts">
import {useFiltersStore} from "~/stores/filters"
import {useEmployeesStore} from "~/stores/employees"
const filtersStore = useFiltersStore()
const employeeStore = useEmployeesStore()

const router = useRouter();

// watch for changes in the price range and save it to the URL query as 'price'
watch(() => filtersStore.priceRangeCurrent, (value) => {
  router.push({
    query: { ...router.currentRoute.value.query, priceRange: value.toString() }
  });
});

// watch for max price changes and reset the price range to the max price
watchEffect(() => {
    filtersStore.setPriceRangeCurrent(employeeStore.getMaxPrice);
});
</script>

<template>
  <div v-if="employeeStore.getMaxPrice > employeeStore.getMinPrice" class="flex flex-col">
    <p class="flex gap-x-4 mb-3 text-sm">
      Filter consultations by price:
      <pre>{{ employeeStore.getMinPrice }} - {{ filtersStore.priceRangeCurrent }}</pre>
    </p>
    <URange
      v-model="filtersStore.priceRangeCurrent"
      :min="employeeStore.getMinPrice"
      :max="employeeStore.getMaxPrice"
      :step="filtersStore.priceRangeStep"
      color="indigo"
    />
    <div class="flex items-center justify-between text-sm">
      <span>{{ employeeStore.getMinPrice }}</span
      ><span>{{ employeeStore.getMaxPrice }}</span>
    </div>
  </div>
</template>