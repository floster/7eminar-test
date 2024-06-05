<script setup lang="ts">
const titleAction = ref("Add");
</script>

<template>
  <header class="flex items-center justify-between">
    <h2>{{ titleAction }} user</h2>
    <UButton
      color="gray"
      variant="ghost"
      size="sm"
      icon="i-heroicons-x-mark-20-solid"
      class="flex ml-auto"
      square
      padded
      @click="() => console.log('close sidebar')"
    />
  </header>
</template>
