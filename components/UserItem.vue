<template>
  <div class="p-2 m-2 flex justify-start items-center gap-2">
    <Avatar class="w-10 h-10" />
    <div>
      <p class="text-sm font-bold m-0 leading-1">{{ user?.first_name }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const { user } = storeToRefs(useUser());
</script>

<style scoped></style>
