<script setup lang="ts">
import type { FormSubmitEvent } from "#ui/types";
import type { Employee } from "@/types";

import { useEmployeesStore } from "~/stores/employees";
import { useSidebarStore } from "~/stores/sidebar";

import { employeeSchema, type EmployeeSchema } from "~/schemas";

import { createEmptyEvent, createEmployee } from "~/helpers";

const employeeStore = useEmployeesStore();
const sidebarStore = useSidebarStore();

const props = defineProps<{
  data?: Employee | null | undefined;
}>();

const state = reactive({
  employee_name: props.data ? props.data.name : undefined,
  employee_surname: props.data ? props.data.surname : undefined,
  employee_description: props.data ? props.data.description : undefined,
  event_date: undefined,
  events: props.data ? props.data.events : [],
});

// watch for event_date changes and push an empty event to the events array
watch(
  () => state.event_date,
  (value) => {
    if (value) {
      state.events = [createEmptyEvent(value), ...state.events];
      state.event_date = undefined;
    }
  }
);

const onSubmit = (event: FormSubmitEvent<EmployeeSchema>) => {
  // if form passes validation
  // ...create/update employee
  if (props.data) {
    employeeStore.updateEmployee(props.data.id, createEmployee(event.data));
  } else {
    employeeStore.createEmployee(createEmployee(event.data));
  }
  // ...close sidebar
  sidebarStore.close();
};

const handleDeleteEmployee = () => {
  if (props.data) {
    employeeStore.deleteEmployee(props.data.id);
  }
  sidebarStore.close();
};
</script>

<template>
  <UForm
    :schema="employeeSchema"
    :state="state"
    class="space-y-4"
    @submit="onSubmit"
  >
    <UFormGroup label="Name" name="employee_name">
      <UInput v-model="state.employee_name" />
    </UFormGroup>

    <UFormGroup label="Surname" name="employee_surname">
      <UInput v-model="state.employee_surname" />
    </UFormGroup>

    <UFormGroup label="Description" name="employee_description">
      <UTextarea v-model="state.employee_description" />
    </UFormGroup>

    <UFormGroup label="Date" name="event_date">
      <UIInputDate v-model="state.event_date" />
    </UFormGroup>

    <template v-for="(_, index) in state.events" :key="index">
      <FormUserEvent v-model="state.events[index]" :index="index" />
    </template>

    <footer class="grid grid-cols-2 gap-x-3 pt-4">
      <UButton
        :disable="!data"
        color="rose"
        variant="outline"
        block
        @click="handleDeleteEmployee"
        >Delete User</UButton
      >
      <UButton color="primary" variant="solid" type="submit" block
        >Save</UButton
      >
    </footer>
  </UForm>
</template>
