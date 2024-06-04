<script setup lang="ts">
const page = ref(2);
const items = ref(Array(55));
</script>

<template>
  <UPagination
    v-model="page"
    :page-count="5"
    :total="items.length"
    size="lg"
    :active-button="{ color: 'black' }"
    class="self-center"
  />
</template>
