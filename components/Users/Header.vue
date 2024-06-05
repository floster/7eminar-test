<script setup lang="ts">
import { useSidebarStore } from "@/stores/sidebar";
const sidebarStore = useSidebarStore();
</script>

<template>
  <header class="flex items-end">
    <Filters class="grow" />
    <UButton
      color="primary"
      size="xl"
      variant="solid"
      class="ml-auto shrink-0"
      @click="sidebarStore.open"
    >
      Add card</UButton
    >
  </header>
</template>
