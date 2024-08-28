<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

defineProps(["cards"]);
</script>

<template>
  <Card
    v-if="cards"
    v-for="(card, index) in cards"
    :key="index"
    v-bind="$attrs"
    :style="{ backgroundColor: card.bgColor }"
  >
    <CardHeader>
      <CardTitle>{{ card.title }}</CardTitle>
      <CardDescription>{{ card.description }}</CardDescription>
    </CardHeader>
    <CardContent v-if="card.content"> Card Content </CardContent>
    <CardFooter v-if="card.footer"> Card Footer </CardFooter>
  </Card>
</template>
