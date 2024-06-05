<script setup lang="ts">
import { useEmployeesStore } from "@/stores/employees";
import { useSidebarStore } from "@/stores/sidebar";

const employeesStore = useEmployeesStore();
const sidebarStore = useSidebarStore();

const userData = sidebarStore.editedUserId
  ? employeesStore.getEmployeeById(sidebarStore.editedUserId)
  : null;
</script>

<template>
  <section class="flex flex-col gap-y-10">
    <FormUserEdit :data="userData" />
  </section>
</template>
