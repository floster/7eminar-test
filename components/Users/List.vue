<script setup lang="ts">
import { useEmployeesStore } from "@/stores/employees";
const employeesStore = useEmployeesStore();
</script>

<template>
  <div class="flex flex-col gap-y-8">
    <UserCard
      v-for="employee in employeesStore.employees"
      :key="employee.id"
      :data="employee"
    />
  </div>
</template>
