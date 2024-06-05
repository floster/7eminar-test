<script setup lang="ts"></script>

<template>
  <section class="flex flex-col gap-y-10">
    <FormUserData />
    <FormUserEvents />
    <footer class="grid grid-cols-2 gap-x-3">
      <UButton color="black" variant="outline" block>Delete User</UButton>
      <UButton color="black" variant="solid" block>Save</UButton>
    </footer>
  </section>
</template>
