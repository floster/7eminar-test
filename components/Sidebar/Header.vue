<script setup lang="ts">
const titleAction = ref("Add");
</script>

<template>
  <header class="flex items-center justify-between">
    <h2>{{ titleAction }} user</h2>
    <UIButtonClose @click="() => console.log('close sidebar')" />
  </header>
</template>
