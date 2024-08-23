<template>
  <div class="flex items-center justify-between h-screen w-full">
    <div class="w-1/2">
      <slot />
    </div>
    <div class="w-1/2 h-full relative">
      <img
        src="../public/pregnantWoman.png"
        alt=""
        class="object-contain w-full h-full"
      />
    </div>
  </div>
</template>

<script setup></script>
