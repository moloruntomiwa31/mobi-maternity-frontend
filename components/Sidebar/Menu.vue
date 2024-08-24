<template>
  <div>
    <header class="hover:scale-[101%] transition cursor-pointer">
      <div class="flex items-center p-4 gap-2">
        <Logo />
        <p class="font-bold leading-4">
          Mobi-Maternity
        </p>
      </div>
    </header>
    <div class="grow">
      <div class="grid gap-2 relative">
        <NuxtLink
          v-for="item in items"
          :key="item.title"
          :to="item.path"
          class="px-2 py-1 transition rounded cursor-pointer relative text-white"
          active-class="text-pink-500 font-bold active-link
            "
        >
          <div class="flex items-center gap-2">
            <Icon size="20" :name="item.icon" color="black" />
            <span>{{ item.title }}</span>
          </div>
        </NuxtLink>
      </div>
    </div>
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
  right: 0;
  top: 0;
  bottom: 0;
  width: 6px;
  background-color: #ea52a6;
  border-radius: 50% 0 0 50%;
}
</style>
