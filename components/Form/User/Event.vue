<script setup lang="ts">
import { EventKinds, type Event } from "@/types";

import { useEmployeesStore } from "~/stores/employees";
const employeeStore = useEmployeesStore();

const consultation_kinds = Object.values(EventKinds);

const event = defineModel<Event>({ required: true });

const state = defineProps<{
  index: number;
  employeeId: string | undefined;
  eventsQty: number;
}>();

const emit = defineEmits<{
  (e: "deleteEvent", id: string): void;
}>();

const handleDeleteEvent = () => {
  if (!state.employeeId || !event.value.id) return;
  emit("deleteEvent", event.value.id);
  employeeStore.deleteEvent(state.employeeId, event.value.id);
};
</script>

<template>
  <div class="flex flex-col">
    <div class="flex items-center justify-between">
      <h3 class="text-indigo-900 dark:text-indigo-200 text-sm">
        {{ event.date }}
      </h3>
      <UIButtonClose v-if="eventsQty > 1" @click="handleDeleteEvent" />
    </div>
    <div
      class="space-y-4 bg-indigo-100 dark:bg-indigo-900 text-indigo-900 dark:text-indigo-200 py-3 px-2 rounded"
    >
      <div class="grid grid-cols-3 gap-x-2">
        <UFormGroup
          label="start"
          :name="`events[${index}].period.start`"
          :ui="{ label: { base: 'text-indigo-900' } }"
        >
          <UInput
            v-model="event.period.start"
            type="Start time"
            icon="i-heroicons-clock"
            trailing
          />
        </UFormGroup>
        <UIInputTime
          v-model="event.period.end"
          label="End time"
          :name="`events[${index}].period.end`"
        />
        <UFormGroup label="Price" :name="`events[${index}].price`">
          <UInput
            v-model.number="event.price"
            type="number"
            :min="0"
            :max="3000"
          />
        </UFormGroup>
      </div>

      <UFormGroup
        label="Kind"
        :name="`events[${index}].kind`"
        :ui="{ label: { base: 'text-indigo-900' } }"
      >
        <USelect
          v-model="event.kind"
          :options="consultation_kinds"
          placeholder="select kind of consultation"
        />
      </UFormGroup>
    </div>
  </div>
</template>
