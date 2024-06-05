<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/yup";
import { object, string, number } from "yup";

const consultation_kinds = [
  "Online consultation",
  "Offline consultation",
  "Telephone consultation",
];

const schema = toTypedSchema(
  object({
    start_time: string()
      .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "must be a datetime")
      .required("required field"),
    end_time: string()
      .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "must be a datetime")
      .required("required field"),
    price: number().max(3000, "500 characters max").required("required field"),
    consultation_kind: string().required("required field"),
  })
);

const { errors, defineField, handleSubmit } = useForm({
  validationSchema: schema,
});

const [start_time] = defineField("start_time");
const [end_time] = defineField("end_time");
const [price] = defineField("price");

const [consultation_kind] = defineField("consultation_kind");

const onSubmit = handleSubmit((values) => {
  console.log("Submitted with", values);
});
</script>

<template>
  <div class="flex flex-col">
    <div class="flex items-center justify-between">
      <h3>05-06-2024</h3>
      <UIButtonClose />
    </div>
    <form class="space-y-4 bg-slate-500 py-3 px-2 rounded" @submit="onSubmit">
      <div class="grid grid-cols-3 gap-x-2">
        <UIInputTime
          v-model="start_time"
          label="Start"
          :error="errors.start_time"
        />
        <UIInputTime v-model="end_time" label="End" :error="errors.end_time" />

        <UFormGroup
          label="Price"
          :error="errors.price"
          :ui="{ label: { base: 'text-gray-50' } }"
        >
          <UInput v-model="price" type="number" />
        </UFormGroup>
      </div>

      <UFormGroup
        label="Kind"
        :error="errors.consultation_kind"
        :ui="{ label: { base: 'text-gray-50' } }"
      >
        <USelect
          v-model="consultation_kind"
          :options="consultation_kinds"
          placeholder="select kind of consultation"
        />
      </UFormGroup>
    </form>
  </div>
</template>
