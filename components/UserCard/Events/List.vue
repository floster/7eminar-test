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

// TODO: investigate why the sorting is not working
const sortedEvents = computed(() =>
  sortEventsByDate(filteredEvents.value, props.sortOrder)
);
</script>

<template>
  <UAlert
    v-if="filteredEvents.length <= 0"
    color="amber"
    variant="outline"
    title="No consultations in this price range."
    description="Try to increase the price range."
  />
  <TransitionGroup v-else name="list" tag="div" class="flex flex-col gap-y-2">
    <UserCardEventsItem
      v-for="event in sortedEvents"
      :key="event.id"
      :event="event"
    />
  </TransitionGroup>
</template>

<style scoped>
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>
