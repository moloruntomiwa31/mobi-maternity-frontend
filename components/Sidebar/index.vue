<template>
  <div class="relative bg-black text-white">
    <div
      class="flex lg:hidden items-center justify-between w-full min-h-full p-4 z-50"
    >
      <Logo />
      <Icon
        size="30"
        class="z-50 cursor-pointer left-2 top-2"
        name="iconamoon:menu-burger-horizontal"
        @click="open = true"
      />
      <div
        v-if="open"
        class="absolute top-0 left-0 z-50 w-full min-h-screen bg-neutral-50 dark:bg-neutral-900"
      >
        <Icon
          size="30"
          class="z-50 cursor-pointer top-4 absolute right-4"
          name="material-symbols:close"
          @click="open = false"
        />
        <SidebarMenu />
      </div>
    </div>
    <div
      class="hidden lg:flex w-[250px] min-h-screen flex-col justify-between border-r"
    >
      <SidebarMenu />
      <div class="grid gap-2 mb-4">
        <div class="flex items-center space-x-2 m-2"></div>
        <NuxtLink
          v-for="item in links"
          :key="item.title"
          :to="item.to"
          class="flex items-center gap-2 px-2 py-1 transition rounded cursor-pointer text-white"
        >
          <Icon size="20" :name="item.icon" color="black" />
          <span>{{ item.title }}</span>
        </NuxtLink>
        <Button
          class="text-red-600 font-bold bg-transparent hover:bg-transparent justify-start px-2"
          @click="handleLogOut"
        >
          <LogOut class="w-5 h-5 mr-1" />
          Logout
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LogOut } from "lucide-vue-next";
const { logOut } = useAuth();
const handleLogOut = async () => {
  const isLogOutSuccessful = await logOut();

  if (isLogOutSuccessful) {
    navigateTo("/login");
  } else {
    console.log("Logout failed");
  }
};
const open = ref(false);
const links = [
  {
    title: "Help Center",
    icon: "icon-park-solid:helpcenter",
    to: "/overview",
  },
  {
    title: "Contact",
    icon: "teenyicons:contact-outline",
    to: "/overview",
  },
];
</script>

<style scoped></style>
