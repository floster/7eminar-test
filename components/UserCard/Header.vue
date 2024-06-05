<script setup lang="ts">
import type { Employee } from "~/types";
defineProps<{
  userData: Employee;
}>();
</script>

<template>
  <header class="flex flex-col gap-y-1">
    <div class="flex items-center justify-between">
      <h2 class="flex items-center gap-x-1 text-xl text-slate-900">
        <span v-if="userData.name">{{ userData.name }}</span>
        <span v-if="userData.surname">{{ userData.surname }}</span>
      </h2>
      <UButton
        icon="i-heroicons-pencil-square-solid"
        size="sm"
        color="gray"
        square
        variant="ghost"
      />
    </div>
    <p v-if="userData.description" class="text-sm text-slate-600">
      {{ userData.description }}
    </p>
  </header>
</template>
