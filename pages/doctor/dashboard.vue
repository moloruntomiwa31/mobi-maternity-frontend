<!-- <script setup lang="ts">
import { LineChart } from "@/components/ui/chart-line";
import { ArrowUpRightIcon } from "lucide-vue-next";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

definePageMeta({
  layout: "dashboard",
});

const data = [
  {
    month: "January",
    "Patient Count": 15,
  },
  {
    month: "February",
    "Patient Count": 22,
  },
  {
    month: "March",
    "Patient Count": 18,
  },
  {
    month: "April",
    "Patient Count": 30,
  },
  // Add more data points as needed
];

//cards
const cards = ref([
  {
    title: "Patients",
    count: 125,
    icon: "mdi:patient",
    color: "blue",
    description: "Total number of patients treated",
    id: Math.random().toString(36).substring(7),
  },
  {
    title: "Appointments",
    count: 78,
    icon: "teenyicons:appointments-outline",
    color: "green",
    description: "Upcoming appointments scheduled",
    id: Math.random().toString(36).substring(7),
  },
  {
    title: "Treatments",
    count: 42,
    icon: "hugeicons:treatment",
    color: "red",
    description: "Treatments prescribed this month",
    id: Math.random().toString(36).substring(7),
  },
]);
</script> -->

<script setup lang="ts">
import { LineChart } from "@/components/ui/chart-line";
import { ArrowUpRightIcon } from "lucide-vue-next";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

definePageMeta({
  layout: "dashboard",
});

const data = [
  {
    month: "January",
    "Patient Count": 15,
  },
  {
    month: "February",
    "Patient Count": 22,
  },
  {
    month: "March",
    "Patient Count": 18,
  },
  {
    month: "April",
    "Patient Count": 30,
  },
  // Add more data points as needed
];

//cards
const cards = ref([
  {
    title: "Patients",
    count: 125,
    icon: "mdi:patient",
    color: "blue",
    description: "Total number of patients treated",
    id: Math.random().toString(36).substring(7),
  },
  {
    title: "Appointments",
    count: 78,
    icon: "teenyicons:appointments-outline",
    color: "green",
    description: "Upcoming appointments scheduled",
    id: Math.random().toString(36).substring(7),
  },
  {
    title: "Treatments",
    count: 42,
    icon: "hugeicons:treatment",
    color: "red",
    description: "Treatments prescribed this month",
    id: Math.random().toString(36).substring(7),
  },
]);
</script>

<template>
  <div class="grid gap-4">
    <div class="header grid grid-cols-1 md:grid-cols-4 gap-4">
      <LineChart
        :colors="['#db2777', '#fff']"
        :data="data"
        index="month"
        :categories="['Patient Count']"
        :x-formatter="(tick) => tick.toString()"
        :y-formatter="(tick) => `${tick}`"
        :y-ticks="[0, 10, 20, 30, 40, 50]"
        class="h-[250px] md:col-span-3"
      />
      <Card
        v-for="card in cards"
        class="w-full md:w-[220px] h-[250px] flex flex-col justify-between"
        :key="card.id"
      >
        <CardHeader
          class="w-full grid grid-cols-[auto_1fr_auto] items-center px-4"
        >
          <div class="bg-neutral-100 w-fit p-2 rounded-lg">
            <Icon :name="card.icon" size="30" class="text-pink-600" />
          </div>
          <div></div>
          <div
            class="bg-pink-600 rounded-full w-10 h-10 grid place-content-center"
          >
            <ArrowUpRightIcon class="w-6 h-6 text-white" />
          </div>
        </CardHeader>
        <CardFooter class="grid">
          <h3>{{ card.title }}</h3>
          <h1 class="text-4xl font-medium">{{ card.count }}</h1>
        </CardFooter>
      </Card>
    </div>
  </div>
</template>
