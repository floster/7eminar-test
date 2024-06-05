<script setup lang="ts">
import { object, array, string, number, date, type InferType } from "yup";
import type { FormSubmitEvent } from "#ui/types";

import type { Employee } from "@/types";

const props = defineProps<{
  data?: Employee | null | undefined;
}>();

const schema = object({
  employee_name: string()
    .max(20, "20 characters max")
    .required("required field"),
  employee_surname: string()
    .max(50, "30 characters max")
    .required("required field"),
  employee_description: string().max(500, "500 characters max"),
  event_date: date(),
  events: array().of(
    object({
      period: object({
        start: string()
          .matches(
            /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
            "should be a time, e.g. 12:00"
          )
          .required("required field"),
        end: string()
          .matches(
            /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
            "should be a time, e.g. 12:00"
          )
          .required("required field"),
      }),
      price: number()
        .typeError("price should be a number")
        .required("required field")
        .max(3000, "price should be equal or less than 3000"),
      kind: string().required("required field"),
    })
  ),
});

const state = reactive({
  employee_name: props.data ? props.data.name : undefined,
  employee_surname: props.data ? props.data.surname : undefined,
  employee_description: props.data ? props.data.description : undefined,
  event_date: undefined,
  events: props.data ? props.data.events : [],
});

type Schema = InferType<typeof schema>;
async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with event.data
  console.log(event.data);
}
</script>

<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
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

    <footer class="grid grid-cols-2 gap-x-3">
      <UButton color="rose" variant="outline" block>Delete User</UButton>
      <UButton color="primary" variant="solid" type="submit" block
        >Save</UButton
      >
    </footer>
  </UForm>
</template>
