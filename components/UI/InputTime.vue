<script setup lang="ts">
const time = defineModel<string>();
defineProps<{
  name?: string;
  label?: string;
}>();
</script>

<template>
  <UFormGroup
    :label="label"
    :name="name"
    :ui="{ label: { base: 'text-indigo-900' } }"
  >
    <UInput v-model="time" type="time" icon="i-heroicons-clock" trailing />
  </UFormGroup>
</template>
