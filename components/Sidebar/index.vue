<script setup lang="ts">
const isOpen = ref(false);
</script>

<template>
  <div>
    <UButton label="Open" @click="isOpen = true" />

    <USlideover v-model="isOpen">
      <UCard
        class="flex flex-col flex-1 overflow-y-auto"
        :ui="{
          body: { base: 'flex-1' },
          ring: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        }"
      >
        <template #header>
          <SidebarHeader />
        </template>

        <FormUser />
      </UCard>
    </USlideover>
  </div>
</template>
