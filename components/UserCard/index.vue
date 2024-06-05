<script setup lang="ts"></script>

<template>
  <UCard
    as="section"
    :ui="{
      header: { padding: 'py-2', background: 'bg-slate-100' },
      shadow: 'shadow-lg',
    }"
  >
    <template #header>
      <UserCardHeader />
    </template>

    <UserCardEvents />
  </UCard>
</template>
