<script setup lang="ts">
import type { Events } from "@/types";
defineProps<{
  events: Events;
}>();

const sortOrder = ref<"asc" | "desc">("asc");
const toggleSortOrder = () => {
  sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
};
</script>

<template>
  <div>
    <UserCardEventsHeader class="mb-3" @toggle-sort="toggleSortOrder" />
    <UserCardEventsList :sort-order="sortOrder" :events="events" />
  </div>
</template>
