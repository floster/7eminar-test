<script setup lang="ts">
import type { Event } from "@/types";

defineProps<{
  events: Event[] | undefined;
}>();
</script>

<template>
  <section class="flex flex-col gap-y-5">
    <FormUserEvent v-for="event in events" :key="event.id" :event="event" />
  </section>
</template>
