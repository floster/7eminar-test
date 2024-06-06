<script setup lang="ts">
import {useFiltersStore} from "~/stores/filters"
import {useEmployeesStore} from "~/stores/employees"
const filtersStore = useFiltersStore()
const employeeStore = useEmployeesStore()

const router = useRouter();

// if route contains 'priceRange' query, set the price range to the current value
if (router.currentRoute.value.query.priceRange) {
  const priceRangeFromPath = parseInt(router.currentRoute.value.query.priceRange as string)

  // if the price range from the URL is greater than the max price, set the price range to the max price
  const priceRange = priceRangeFromPath > employeeStore.getMaxPrice ? employeeStore.getMaxPrice : priceRangeFromPath
  filtersStore.setPriceRangeCurrent(priceRange)
  // ...and set rewrite the URL query to the current price range
  router.push({
    query: { ...router.currentRoute.value.query, priceRange: priceRange.toString() }
  });
}
// watch for changes in the price range and save it to the URL query as 'price'

watch(() => filtersStore.priceRangeCurrent, (value) => {
  router.push({
    query: { ...router.currentRoute.value.query, priceRange: value.toString() }
  });
});
</script>


<template>
  <div class="flex flex-col">
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