<template>
  <div class="grid lg:flex items-start">
    <div>
      <Sidebar />
    </div>
    <div
      class="p-6 w-full overflow-y-auto h-screen"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
