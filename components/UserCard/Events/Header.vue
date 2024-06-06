<script setup lang="ts">
defineEmits(["toggle-sort"]);
</script>

<template>
  <header class="flex items-center justify-between">
    <h3 class="text-base text-slate-600">Booked consultations</h3>
    <UButton
      icon="i-heroicons-arrows-up-down-solid"
      size="sm"
      color="gray"
      square
      variant="ghost"
      @click="$emit('toggle-sort')"
    />
  </header>
</template>
