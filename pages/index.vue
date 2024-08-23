<template>
  <div class="grid gap-12 place-items-center">
    <transition name="slide" mode="out-in">
      <component :is="components[currentIndex].component" :key="currentIndex" />
    </transition>
    <div class="flex items-center gap-4">
      <Button @click="handleSkip" class="bg-pink-600 hover:bg-pink-400"
        >Skip</Button
      >
      <Pagination :current="currentIndex" :total="components.length" />
      <Button
        @click="handleNext"
        class="bg-pink-600 hover:bg-pink-400"
        :disabled="currentIndex === components.length - 1"
        >Next</Button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "onboarding",
});
import { Button } from "@/components/ui/button";
const components = [
  {
    name: "welcome",
    title: "Welcome",
    component: defineAsyncComponent(
      () => import("@/components/Home/Welcome.vue")
    ),
  },
  {
    name: "consultation",
    title: "Consultation",
    component: defineAsyncComponent(
      () => import("@/components/Home/Consultations.vue")
    ),
  },
  {
    name: "locationtracking",
    title: "Location Tracking",
    component: defineAsyncComponent(
      () => import("@/components/Home/LocationTracking.vue")
    ),
  },
];
const currentIndex = ref(0);
const currentComponent = computed(
  () => components[currentIndex.value].component
);
const handleNext = () => {
  if (currentIndex.value < components.length - 1) {
    currentIndex.value++;
  }
};
const handleSkip = () => {
  navigateTo("/login");
};
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
