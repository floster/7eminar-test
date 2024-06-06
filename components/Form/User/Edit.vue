<script setup lang="ts">
import type { FormSubmitEvent } from "#ui/types";

import { useEmployeesStore } from "~/stores/employees";
import { useSidebarStore } from "~/stores/sidebar";

import { employeeSchema, type EmployeeSchema } from "~/schemas";

import { createEmptyEvent, createEmployee } from "~/helpers";

const employeeStore = useEmployeesStore();
const sidebarStore = useSidebarStore();

const props = defineProps<{
  userId?: string | null;
}>();

// if userId is provided, get the employee data
const data = props.userId
  ? employeeStore.getEmployeeById(props.userId)
  : undefined;

const state = reactive({
  employee_name: data ? data.name : undefined,
  employee_surname: data ? data.surname : undefined,
  employee_description: data ? data.description : undefined,
  event_date: undefined,
  events: data ? data.events : [],
});

// watch for event_date changes and push an empty event to the events array
watch(
  () => state.event_date,
  (value) => {
    if (value) {
      // check if there's already 10 events created
      if (state.events.length >= 10) {
        tooManyEvents.value = true;
        state.event_date = undefined;
        return;
      }

      state.events = [createEmptyEvent(value), ...state.events];
      state.event_date = undefined;
      noEvents.value = false;
    }
  }
);

const noEvents = ref(false);
const tooManyEvents = ref(false);

const onSubmit = (event: FormSubmitEvent<EmployeeSchema>) => {
  // if there's no events, show an alert
  if (state.events.length === 0) {
    noEvents.value = true;
    return;
  }
  // if form passes validation
  // ...create/update employee
  if (data) {
    employeeStore.updateEmployee(data.id, createEmployee(event.data));
  } else {
    employeeStore.createEmployee(createEmployee(event.data));
  }
  // ...close sidebar
  sidebarStore.close();
};

const handleDeleteEmployee = () => {
  if (data) {
    employeeStore.deleteEmployee(data.id);
  }
  sidebarStore.close();
};

const handleDeleteEvent = (id: string) => {
  if (data) {
    employeeStore.deleteEvent(data.id, id);
    state.events = state.events.filter((event) => event.id !== id);
  }
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

    <UAlert
      v-if="noEvents"
      title="Create at least one event"
      color="rose"
      variant="outline"
    />

    <UAlert
      v-if="tooManyEvents"
      title="You can create only 10 events per employee"
      color="amber"
      variant="outline"
    />

    <template v-for="(_, index) in state.events" :key="index">
      <FormUserEvent
        v-model="state.events[index]"
        :index="index"
        :employee-id="data?.id"
        :events-qty="state.events.length"
        @delete-event="(id) => handleDeleteEvent(id)"
      />
    </template>

    <footer class="grid grid-cols-2 gap-x-3 pt-4">
      <UButton
        color="rose"
        variant="outline"
        block
        :disabled="!data"
        @click="handleDeleteEmployee"
        >Delete User</UButton
      >
      <UButton color="primary" variant="solid" type="submit" block
        >Save</UButton
      >
    </footer>
  </UForm>
</template>
