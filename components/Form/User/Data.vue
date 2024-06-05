<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/yup";
import { object, string, date } from "yup";

import type { Employee } from "@/types";

const props = defineProps<{
  data: Employee | null | undefined;
}>();

const schema = toTypedSchema(
  object({
    employee_name: string()
      .max(20, "20 characters max")
      .required("required field"),
    employee_surname: string()
      .max(50, "30 characters max")
      .required("required field"),
    employee_description: string().max(500, "500 characters max"),
    event_date: date().required("required field"),
  })
);

const { errors, defineField, handleSubmit } = useForm({
  validationSchema: schema,
});

// init form values
const [employee_name] = defineField("employee_name");
const [employee_surname] = defineField("employee_surname");
const [employee_description] = defineField("employee_description");
const [event_date] = defineField("event_date");

// set default form values if exists
if (props.data) {
  employee_name.value = props.data.name;
  employee_surname.value = props.data.surname;
  employee_description.value = props.data.description;
}

const onSubmit = handleSubmit((values) => {
  console.log("Submitted with", values);
});
</script>

<template>
  <form class="space-y-4" @submit="onSubmit">
    <UFormGroup :error="errors.employee_name" label="Name">
      <UInput v-model="employee_name" />
    </UFormGroup>

    <UFormGroup label="Surname" :error="errors.employee_surname">
      <UInput v-model="employee_surname" />
    </UFormGroup>

    <UFormGroup label="Description" :error="errors.employee_description">
      <UTextarea v-model="employee_description" />
    </UFormGroup>

    <UFormGroup label="Date" :error="errors.event_date">
      <UIInputDate v-model="event_date" />
    </UFormGroup>
  </form>
</template>
