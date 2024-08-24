<template>
  <!-- <header class="flex justify-between items-center p-2 bg-black text-white h-[10vh]">
    <div class="flex items-center gap-2">
      <Logo />
      <p class="font-bold leading-4">Mobi-Maternity</p>
    </div>
    <nav class="flex items-center gap-4">
      <NuxtLink
        v-for="item in items"
        :key="item.title"
        :to="item.path"
        class="px-2 py-1 transition rounded cursor-pointer relative"
        active-class="text-pink-500 font-bold active-link
            "
      >
        <div class="flex items-center gap-2">
          <Icon size="15" :name="item.icon" color="black" />
          <span>{{ item.title }}</span>
        </div>
      </NuxtLink>
    </nav>
  </header> -->

  <div class="w-full">
    <slot />
  </div>
</template>

<script setup lang="ts">
const items = ref([
  {
    title: "Overview",
    path: "/overview",
    icon: "material-symbols:overview-key-outline",
  },
  {
    title: "Consultations",
    path: "/consultations",
    icon: "vaadin:doctor",
  },
  {
    title: "AI Assistant",
    path: "/assistant",
    icon: "game-icons:doctor-face",
  },
  {
    title: "Geo-location Tracking",
    path: "/locate",
    icon: "entypo:location",
  },
]);
</script>

<style scoped>
.active-link::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: -12px;
  height: 6px;
  background-color: #ea52a6;
  /* width: 6px; */
  /* border-radius: 50% 0 0 50%; */
  border-radius: 10px 10px 0 0;
}
</style>
