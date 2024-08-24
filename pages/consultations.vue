<template>
  <div class="grid gap-4">
    <header class="flex items-center justify-between">
      <div class="grow">
        <h1>Remote Consultations</h1>
        <p class="text-sm">
          Access quality prenatal care from anywhere. Start your remote
          consultation.
        </p>
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
      <div class="grid gap-4">
        <h3 class="font-bold text-xl">Available Consultants</h3>
        <div class="grid grid-cols-4 gap-4 place-items-center rounded-lg">
          <ConsultantCard :consultants="doctors" />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
});
import { Skeleton } from "@/components/ui/skeleton";
import femaleDr from "../public/femaleDr.jpg";
import maleDr from "../public/maleDr.jpg";

interface Doctor {
  name: string;
  type: string;
  image: any;
  description: string;
  gender: string;
}

const doctors: Doctor[] = [
  {
    name: "Dr. Emily Johnson",
    type: "Pediatrician",
    image: femaleDr,
    description:
      "Dr. Emily Johnson is a board-certified pediatrician with over 10 years of experience in caring for children of all ages.",
    gender: "Female",
  },
  {
    name: "Dr. Michael Thomas",
    type: "Obstetrician",
    image: maleDr,
    description:
      "Dr. Michael Thompson is a highly skilled obstetrician specializing in prenatal care, labor and delivery, and postpartum care.",
    gender: "Male",
  },
  {
    name: "Dr. Sarah Wilson",
    type: "Pediatrician",
    image: femaleDr,
    description:
      "Dr. Sarah Wilson is a compassionate pediatrician dedicated to providing comprehensive care for infants, children, and adolescents.",
    gender: "Female",
  },
  {
    name: "Dr. David Lee",
    type: "Obstetrician",
    image: maleDr,
    description:
      "Dr. David Lee is an experienced obstetrician known for his expertise in high-risk pregnancies and minimally invasive surgical procedures.",
    gender: "Male",
  },
  {
    name: "Dr. Jessica Davis",
    type: "Pediatrician",
    image: femaleDr,
    description:
      "Dr. Jessica Davis is a friendly and approachable pediatrician who believes in building strong relationships with families.",
    gender: "Female",
  },
];
</script>

<style scoped></style>
