<template>
  <div class="grid gap-4">
    <header class="flex items-center justify-between">
      <div class="grow">
        <h1>Hello, {{ user?.first_name }}!</h1>
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
          <div class="grid grid-cols-2 gap-4" v-if="setPrompts">
            <BabyDetailsCard :cards class="border-0 shadow-none p-0" />
          </div>
          <div class="grid gap-4" v-else>
            <h3 class="text-lg font-bold">Let's help you get a few info on your baby.</h3>
            <div class="grid gap-2" v-for="field in fields" :key="field.label">
              <Label class="text-base font-medium">{{ field.label }}</Label>
              <Input v-model="field.value" :placeholder="field.placeholder" />
            </div>
            <Button @click="getDetails" :disabled="isLoading">{{
              isLoading ? "Sending..." : "Send"
            }}</Button>
          </div>
        </div>
        <!-- other -->
        <div class="w-2/5 grid gap-8">
          <div class="text-center">
            <h2 class="text-lg font-semibold">Daily Tip😜</h2>
            <p>{{ dailyTip }}</p>
          </div>
          <OverviewShopping />
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
const { user } = storeToRefs(useUser());
import { Input } from "@/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "@/components/ui/button";
const setPrompts = ref(false);
const isLoading = ref(false);
//cards
const cards = ref(null);

const { generatePrenatalInfoPrompt, getBabyDetails } = useGenAI();

//fields
const fields = ref([
  {
    label: "Gestation Age",
    value: "",
    placeholder: "Please let us know",
  },
  {
    label: "Baby's Gender",
    value: "",
    placeholder: "Please let us know",
  },
  {
    label: "Multiple Pregnancy",
    value: "",
    placeholder: "Please let us know",
  },
]);

const getDetails = async () => {
  const prenatalInfo = {
    gestationalAge: "",
    gender: "",
    multiplePregnancy: "",
  };

  fields.value.forEach((field) => {
    switch (field.label) {
      case "Gestation Age":
        prenatalInfo.gestationalAge = field.value;
        field.value = "";
        break;
      case "Baby's Gender":
        prenatalInfo.gender = field.value;
        field.value = "";
        break;
      case "Multiple Pregnancy":
        prenatalInfo.multiplePregnancy = field.value;
        field.value = "";
        break;
      default:
        break;
    }
  });

  //actions
  isLoading.value = true;
  const prompt = generatePrenatalInfoPrompt(prenatalInfo);
  const babyDetails = await getBabyDetails(prompt);
  cards.value = babyDetails;
  setPrompts.value = true;
  isLoading.value = false;
};
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

<style scoped></style>
