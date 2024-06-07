<script setup lang="ts">
import { useEmployeesStore } from "@/stores/employees";
const employeesStore = useEmployeesStore();
</script>

<template>
  <UAlert
    v-if="employeesStore.getEmployeesPage.length === 0"
    color="white"
    variant="outline"
    title="No employees yet. Try to add some."
  />

  <TransitionGroup v-else name="list" tag="div" class="flex flex-col gap-y-8">
    <UserCard
      v-for="employee in employeesStore.getEmployeesPage"
      :key="employee.id"
      :data="employee"
  /></TransitionGroup>
</template>

<style scoped>
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.2s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(5px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>
