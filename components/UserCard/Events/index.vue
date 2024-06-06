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
  <UserCardEventsHeader class="mb-3" @toggle-sort="toggleSortOrder" />
  <UserCardEventsList if="userId" :events="events" :sort-order="sortOrder" />
</template>
