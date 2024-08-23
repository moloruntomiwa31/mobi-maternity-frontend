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

    <main class="grid gap-4 w-full">
      <div class="min-w-full grid place-items-center">
        <Slider :weeks />
      </div>
      <div class="flex gap-4 items-start">
        <div class="w-3/5">
          <div class="flex items-center justify-between w-3/5 mb-6">
            <div
              class="bg-pink-200 w-14 h-14 text-center rounded-full p-2 flex items-center justify-center"
            >
              <Icon
                name="icon-park-outline:baby-one"
                size="30"
                class="text-pink-500"
              />
            </div>
            <p>Your baby is like the size of a pear</p>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <Card :cards class="border-0 shadow-none p-0" />
          </div>
        </div>
        <!-- other -->
        <div class="w-2/5 grid gap-8">
          <div class="text-center">
            <h2 class="text-lg font-semibold">Daily Tip😜</h2>
            <p>{{ dailyTip }}</p>
          </div>
          <OverviewShopping :itemsList /> 
        </div>
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
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-vue-next";
const value = ref(today(getLocalTimeZone())) as Ref<DateValue>;

//weeks
const weeks = ref([]);

function generateWeeks() {
  const colors = [
    "#FFF5E6",
    "#E6F5FF",
    "#E6FFE6",
    "#FFE6E6",
    "#F5E6FF",
    "#E6F5FF",
    "#FFF5E6",
  ];

  for (let i = 2; i <= 41; i++) {
    const week = {
      number: i,
      icon: "fluent-emoji-flat:baby-light",
      bgColor: colors[(i - 2) % colors.length],
    };
    weeks.value.push(week);
  }
}

//cards
const cards = ref([
  {
    title: "Baby's Height",
    description: "12.5 cm",
    bgColor: "#FFF5E6",
  },
  {
    title: "Baby's Weight",
    description: "119grams",
    bgColor: "#E6F5FF",
  },
  {
    title: "Baby's Development",
    description: "Baby's eyes are now fully formed.",
    bgColor: "#E6FFE6",
  },
  {
    title: "Days Left",
    description: "168 days",
    bgColor: "#FFE6E6",
  },
]);

//daily tip
const dailyTip = ref("");
function getRandomDailyTip(): string {
  const tips = [
    "Stay hydrated by drinking plenty of water throughout the day.",
    "Eat a balanced diet rich in fruits, vegetables, and whole grains.",
    "Get regular exercise to maintain a healthy pregnancy.",
    "Take prenatal vitamins as recommended by your healthcare provider.",
    "Practice relaxation techniques like deep breathing or meditation to reduce stress.",
    "Attend all scheduled prenatal appointments and follow your doctor's advice.",
    "Get enough rest and sleep to support your body during this time.",
    "Avoid smoking, alcohol, and other harmful substances.",
    "Connect with other expectant mothers for support and shared experiences.",
    "Prepare for the arrival of your baby by taking childbirth classes.",
  ];
  const randomIndex = Math.floor(Math.random() * tips.length);
  return tips[randomIndex];
}

onMounted(() => {
  dailyTip.value = getRandomDailyTip();
  generateWeeks();
});
</script>

<style scoped>

</style>
