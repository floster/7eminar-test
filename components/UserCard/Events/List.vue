<script setup lang="ts">
import type { Events } from "@/types";

import { useFiltersStore } from "~/stores/filters";

import { filterEventsByMaxPrice, sortEventsByDate } from "~/helpers";

const props = defineProps<{
  events: Events;
  sortOrder: "asc" | "desc";
}>();

const filtersStore = useFiltersStore();

const filteredEvents = computed(() =>
  filterEventsByMaxPrice(props.events, filtersStore.priceRangeCurrent)
);

const sortedEvents = computed(() =>
  sortEventsByDate(filteredEvents.value, props.sortOrder)
);
</script>

<template>
  <UAlert
    v-if="events.length <= 0"
    color="amber"
    variant="outline"
    title="No consultations found."
    description="Try to add one."
  />
  <UAlert
    v-else-if="sortedEvents.length <= 0"
    color="amber"
    variant="outline"
    title="No consultations in this price range."
    description="Try to increase the price range."
  />
  <div v-else name="list" tag="div" class="flex flex-col gap-y-2">
    <UserCardEventsItem
      v-for="event in sortedEvents"
      :key="event.id"
      :event="event"
    />
  </div>
</template>
