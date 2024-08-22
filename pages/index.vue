<template>
  <div class="grid gap-4">
    <header class="flex items-center justify-between">
      <div class="grow">
        <h1>Hello, Jenny!</h1>
        <p class="text-sm">You'll receive details about your pregnancy here.</p>
      </div>
      <div class="flex items-center justify-between">
        <Icon name="ic:outline-search" color="black" size="20" />
        <div class="relative">
          <div
            class="w-1 h-1 rounded-full bg-red-600 absolute top-0 right-0"
          ></div>
          <Icon
            name="clarity:notification-line"
            color="black"
            size="20"
            class="ml-4"
          />
        </div>
      </div>
      <UserItem />
    </header>

    <main class="grid gap-4">
      <!-- <div class="grid gap-4 grid-cols-1 md:grid-cols-3 xl:grid-cols-4"></div> -->
      <div class="w-full">
        <Calendar
          v-model="value"
          :weekday-format="'short'"
          class="rounded-md border w-full"
        />
      </div>
    </main>

    <footer></footer>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
});
import { type Ref, ref } from "vue";
import {
  type DateValue,
  getLocalTimeZone,
  today,
} from "@internationalized/date";
import { Calendar } from "@/components/ui/calendar";

const value = ref(today(getLocalTimeZone())) as Ref<DateValue>;
</script>

<style scoped></style>
