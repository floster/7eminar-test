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
    <FormUserData :data="userData" />
    <FormUserEvents :events="userData?.events" />
    <footer class="grid grid-cols-2 gap-x-3">
      <UButton color="rose" variant="outline" block>Delete User</UButton>
      <UButton color="primary" variant="solid" block>Save</UButton>
    </footer>
  </section>
</template>
