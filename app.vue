<script setup lang="ts">
useHead({
  title: "Employees Dashboard",
  meta: [
    {
      name: "description",
      content: "Employees Dashboard make it easy to manage your employees",
    },
  ],
});
</script>

<template>
  <UContainer as="main" class="py-6">
    <Users />
    <Sidebar />
  </UContainer>
</template>
