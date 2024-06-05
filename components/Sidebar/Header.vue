<script setup lang="ts">
import { useSidebarStore } from "@/stores/sidebar";
const sidebarStore = useSidebarStore();
</script>

<template>
  <header class="flex items-center justify-between">
    <h2>{{ sidebarStore.title }} user</h2>
    <UIButtonClose @click="sidebarStore.close" />
  </header>
</template>
