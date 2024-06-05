<script setup lang="ts">
const minValue = ref(300);
const maxValue = ref(3000);
const step = ref(100);

const value = ref(maxValue.value / 2);
</script>


<template>
  <div class="flex flex-col">
    <p class="flex gap-x-4 mb-3">
      Filter consultations by price:
      <pre>{{ minValue }} - {{ value }}</pre>
    </p>
    <URange
      v-model="value"
      :min="minValue"
      :max="maxValue"
      :step="step"
      size="lg"
      color="indigo"
    />
    <div class="flex items-center justify-between">
      <span>{{ minValue }}</span
      ><span>{{ maxValue }}</span>
    </div>
  </div>
</template>