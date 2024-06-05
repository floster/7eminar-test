<script setup lang="ts">
import type { Employee } from "@/types";
defineProps<{
  data: Employee;
}>();
</script>

<template>
  <UCard
    as="section"
    :ui="{
      header: {
        padding: 'py-2',
        background: 'bg-emerald-100 dark:bg-emerald-950',
      },
      shadow: 'shadow-lg',
    }"
    class="overflow-hidden"
  >
    <template #header>
      <UserCardHeader :user-data="data" />
    </template>

    <UserCardEvents :events="data.events" />
  </UCard>
</template>
