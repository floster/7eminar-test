<script setup lang="ts">
import type { Events } from "@/types";
defineProps<{
  events: Events;
}>();
</script>

<template>
  <div class="flex flex-col gap-y-2">
    <UserCardEventsItem
      v-for="event in events"
      :key="event.id"
      :event="event"
    />
  </div>
</template>
