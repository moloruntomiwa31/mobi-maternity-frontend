<script setup lang="ts">
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
defineProps({
  weeks: Array,
});
</script>

<template>
  <Carousel
    v-if="weeks"
    class="relative min-w-[90%] max-w-2xl"
    :opts="{
      align: 'start',
    }"
  >
    <CarouselContent>
      <CarouselItem
        v-for="(data, index) in weeks"
        :key="index"
        class="md:basis-1/2 lg:basis-1/3 xl:basis-1/5"
      >
        <div class="p-1">
          <Card :style="{ backgroundColor: data.bgColor }" class="shadow-none">
            <CardContent
              class="flex aspect-square items-center justify-center p-6"
            >
              <div class="grid">
                <h4 class="text-2xl font-semibold">{{ data.number }}</h4>
                <p class="text-xs">weeks pregnant</p>
              </div>
              <Icon :name="data.icon" size="30" />
            </CardContent>
          </Card>
        </div>
      </CarouselItem>
    </CarouselContent>
    <CarouselPrevious class="hover:bg-pink-500 transition hover:text-white" />
    <CarouselNext class="hover:bg-pink-500 transition hover:text-white" />
  </Carousel>
</template>
