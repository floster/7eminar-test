<script setup lang="ts">
import { useEmployeesStore } from "~/stores/employees";
import { usePaginationStore } from "~/stores/pagination";

const paginationStore = usePaginationStore();
const employeeStore = useEmployeesStore();

const route = useRoute();
const router = useRouter();

watch(
  () => paginationStore.currentPage,
  (value) => {
    router.push({
      query: { ...route.query, page: value.toString() },
    });
  }
);
</script>

<template>
  <UPagination
    v-model="paginationStore.currentPage"
    :page-count="paginationStore.perPage"
    :total="employeeStore.getTotalEmployees"
    size="lg"
    :active-button="{ color: 'primary' }"
    class="self-center"
  />
</template>
