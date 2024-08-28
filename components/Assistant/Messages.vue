<template>
  <div
    v-for="message in messages"
    :key="message.content"
    :class="[
      'p-4 rounded-md mb-4',
      message.isUser ? 'bg-pink-100 ml-auto' : 'bg-gray-100 mr-auto',
    ]"
    style="max-width: 80%"
  >
    {{ message.content }}
  </div>
</template>

<script setup lang="ts">
interface Message {
  content: string;
  isUser: boolean;
}
defineProps<{
  messages: Message[];
}>();
</script>

<style scoped></style>
