<script setup lang="ts">
const time = defineModel<string>();
defineProps<{
  error?: string | boolean;
  label?: string;
}>();
</script>

<template>
  <UFormGroup
    :label="label"
    :error="error"
    :ui="{ label: { base: 'text-indigo-900' } }"
  >
    <UInput v-model="time" type="time" icon="i-heroicons-clock" trailing />
  </UFormGroup>
</template>
