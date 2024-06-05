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
      header: { padding: 'py-2', background: 'bg-slate-100' },
      shadow: 'shadow-lg',
    }"
  >
    <template #header>
      <UserCardHeader :user-data="data" />
    </template>

    <UserCardEvents :events="data.events" />
  </UCard>
</template>
