<template>
  <div class="grid grid-cols-1 md:grid-cols-4 gap-4 h-screen">
    <!-- Sidebar -->
    <aside class="bg-black hidden md:block">
      <div class="flex flex-col gap-4 justify-between h-screen">
        <div class="md:col-span-1 p-4 overflow-y-auto grid gap-4">
          <Button
            class="bg-white hover:bg-neutral-100 rounded-md text-pink-600"
            @click="startNewChat"
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
              active-class="text-pink-500 font-bold active-link"
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
          <!-- Messages -->
          <div v-if="messages.length > 0">
            <AssistantMessages :messages />
          </div>
          <div v-else class="flex justify-center items-center">
            <AssistantDefault />
          </div>
        </div>
      </div>
      <div class="bg-pink-100 p-4 flex gap-2 w-full rounded-lg">
        <Input
          v-model="inputMessage"
          class="flex-grow p-4 rounded-md"
          placeholder="Enter message..."
          @keyup.enter="sendMessage"
        />
        <Button @click="sendMessage" :disabled="isLoading">
          {{ isLoading ? "Sending..." : "Send" }}
          <SendIcon class="w-4 h-4" />
        </Button>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { SendIcon, PlusCircle } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { useAWS } from "@/composables/useAWS";

definePageMeta({
  layout: "ai-assistant",
});

interface Message {
  content: string;
  isUser: boolean;
}

const { getResponse } = useAWS();

const messages = ref<Message[]>([]);
const inputMessage = ref("");
const isLoading = ref(false);

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
    title: "Nearby Hospitals",  
    path: "/locate",
    icon: "entypo:location",
  },
  {
    title: "Update Health Info",
    path: "/more-info",
    icon: "fluent-mdl2:health",
  },
]);

const sendMessage = async () => {
  if (!inputMessage.value.trim()) return;

  const userMessage: Message = {
    content: inputMessage.value,
    isUser: true,
  };
  messages.value.push(userMessage);

  isLoading.value = true;
  try {
    const response = await getResponse(inputMessage.value);
    const aiMessage: Message = {
      content: response?.data.response,
      isUser: false,
    };
    messages.value.push(aiMessage);
  } catch (error) {
    console.error("Error sending message:", error);
    messages.value.push({
      content: "Sorry, I didn't get that.",
      isUser: false,
    });
  } finally {
    isLoading.value = false;
    inputMessage.value = "";
  }
};

const startNewChat = () => {
  messages.value = [];
  inputMessage.value = "";
};
</script>

<style scoped>
</style>
