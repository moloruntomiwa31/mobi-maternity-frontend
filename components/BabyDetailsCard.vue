<script setup lang="ts">
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

defineProps(["cards"]);
const getRandomLightColor = () => {
  const letters = "89ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }
  return color;
};
</script>

<template>
  <Card
    v-if="cards"
    v-for="(card, index) in cards"
    :key="index"
    v-bind="$attrs"
    :style="{ backgroundColor: getRandomLightColor() }"
  >
    <CardHeader>
      <CardTitle>{{ card.title }}</CardTitle>
      <CardDescription>{{ card.content }}</CardDescription>
    </CardHeader>
  </Card>
</template>
