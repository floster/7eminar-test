<script setup lang="ts">
import { format } from "date-fns";

// const date = ref(new Date());

const date = defineModel<number | Date>();
</script>

<template>
  <UPopover :popper="{ placement: 'bottom-end' }">
    <UButton
      icon="i-heroicons-calendar-days-20-solid"
      :label="date ? format(date, 'dd-MM-yyyy') : 'Select date'"
      color="gray"
      variant="outline"
      trailing
      block
      class="justify-between"
    />

    <template #panel="{ close }">
      <UIDatePicker v-model="date" is-required @close="close" />
    </template>
  </UPopover>
</template>
