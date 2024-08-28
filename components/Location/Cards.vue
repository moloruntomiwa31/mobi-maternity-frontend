<template>
  <Card
    v-for="hospital in hospitals"
    :key="hospital.place_id"
    class="w-full rounded-lg p-4 transition duration-300 ease-in-out hover:shadow-lg"
  >
    <CardHeader>
      <CardTitle class="text-lg">{{ hospital.name }}</CardTitle>
    </CardHeader>
    <CardContent>
      <p class="text-gray-600 text-sm">{{ hospital.address }}</p>
      <p class="text-sm text-gray-500 mt-2">
        {{ hospital.distance }} meters away
      </p>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
defineProps(["hospitals"]);
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
</script>

<style scoped></style>
