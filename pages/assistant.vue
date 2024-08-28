<template>
  <div class="grid grid-cols-1 md:grid-cols-4 gap-4 h-screen">
    <!-- Sidebar -->
    <aside class="bg-black hidden md:block">
      <div class="flex flex-col gap-4 justify-between h-screen">
        <div class="md:col-span-1 p-4 overflow-y-auto grid gap-4">
          <Button
            class="bg-white hover:bg-neutral-100 rounded-md text-pink-600"
          >
            New Chat
            <PlusCircle class="w-4 h-4" />
          </Button>
          <!-- Add more chat tabs here -->
        </div>
        <div class="text-white">
          <nav class="grid grid-cols-2 gap-2 w-full">
            <NuxtLink
              v-for="item in items"
              :key="item.title"
              :to="item.path"
              class="px-2 py-1 transition rounded cursor-pointer relative text-sm"
              active-class="text-pink-500 font-bold active-link
            "
            >
              <div class="flex items-center gap-2">
                <Icon size="15" :name="item.icon" color="black" />
                <span>{{ item.title }}</span>
              </div>
            </NuxtLink>
          </nav>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="md:col-span-3 flex flex-col h-screen">
      <div class="fixed top-0 right-0">
        <UserItem />
      </div>
      <div class="flex-grow overflow-y-auto">
        <div class="h-full overflow-y-auto p-4">
          <!-- Messages will go here -->
          <div
            class="bg-gray-100 p-4 rounded-md mb-4"
            v-if="messages.length > 0"
          >
            Message
          </div>
          <div v-else class="flex justify-center items-center">
            <div
              class="grid bg-pink-100 place-items-center rounded-xl shadow w-[250px] h-[400px]"
            >
              <img
                src="../public/robo-dr.png"
                alt="Dr Mobi"
                class="w-[150px] h-auto"
              />
              <p class="text-sm text-center p-4">
                Hello, I'm Dr. Mobi-Maternity is your 24/7 AI pregnancy
                companion, offering instant, personalized guidance and reliable
                medical information throughout your journey to motherhood.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-pink-100 p-4 flex gap-2 w-full rounded-lg">
        <Input
          class="flex-grow p-4 rounded-md"
          placeholder="Enter message..."
        />
        <Button class="">
          Send
          <SendIcon class="w-4 h-4" />
        </Button>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ChevronRight } from "lucide-vue-next";
import { SendIcon } from "lucide-vue-next";
import { PlusCircle } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
definePageMeta({
  layout: "ai-assistant",
});
const messages = ref([]);

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
