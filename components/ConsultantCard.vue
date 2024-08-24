<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { VideotapeIcon } from "lucide-vue-next";
defineProps(["consultants"]);
</script>

<template>
  <Card
    v-for="consultant in consultants"
    :key="consultant.name"
    class="shadow-none w-[220px] h-[300px] grid place-content-center gap-4 cursor-pointer transition"
    :class="
      consultant.gender == 'Female'
        ? 'bg-pink-50 hover:bg-pink-100'
        : 'bg-blue-50 hover:bg-blue-100'
    "
  >
    <CardHeader class="grid place-items-center w-full">
      <img
        :src="consultant.image"
        :alt="consultant.name"
        class="w-[100px] h-[100px] rounded-full"
      />
      <h2 class="text-base font-bold">{{ consultant.name }}</h2>
      <h4 class="text-sm font-medium">{{ consultant.type }}</h4>
      <!-- <CardDescription>Card Description</CardDescription> -->
    </CardHeader>
    <!-- <CardContent> 
    </CardContent> -->
    <CardFooter class="text-center mx-auto">
      <Button
        class="p-1 rounded-full w-10 h-10 grid place-content-center text-center transition"
        :class="
          consultant.gender == 'Female'
            ? 'bg-pink-600 hover:bg-pink-400'
            : 'bg-blue-600 hover:bg-blue-400'
        "
      >
        <VideotapeIcon class="w-4 h-4 text-white" />
      </Button>
      <span class="ml-2">Video Call</span>
    </CardFooter>
  </Card>
</template>
