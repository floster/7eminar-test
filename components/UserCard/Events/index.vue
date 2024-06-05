<script setup lang="ts">
import type { Events } from "@/types";
defineProps<{
  events: Events;
}>();
</script>

<template>
  <UserCardEventsHeader class="mb-3" />
  <UserCardEventsList if="userId" :events="events" />
</template>
