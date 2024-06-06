<script setup lang="ts">
import { useSidebarStore } from "@/stores/sidebar";
const sidebarStore = useSidebarStore();
</script>

<template>
  <section class="flex flex-col gap-y-10">
    <FormUserEdit :user-id="sidebarStore.editedUserId || null" />
  </section>
</template>
