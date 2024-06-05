<script setup lang="ts">
import type { Event } from "~/types";
defineProps<{ event: Event }>();
</script>

<template>
  <ul
    class="grid grid-cols-4 items-center gap-x-4 py-2 px-3 rounded bg-indigo-100 text-indigo-900"
  >
    <li>{{ event.date }}</li>
    <li class="flex gap-x-1">
      <span>{{ event.period.start }}</span> -
      <span>{{ event.period.end }}</span>
    </li>
    <li>{{ event.kind }}</li>
    <li class="text-end">{{ event.price }} UAH</li>
  </ul>
</template>
