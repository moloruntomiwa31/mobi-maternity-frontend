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
          <Skeleton
            v-for="i in 6"
            class="w-[220px] h-[300px]"
            v-if="!doctors || doctors?.length === 0"
          />
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
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";

const doctors = ref(null);
const getConsultants = async () => {
  const url = "https://mobi-maternity-db.onrender.com";
  try {
    const response = await axios.get(`${url}/api/worker-list/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    doctors.value = response.data;
    console.log(doctors.value);
  } catch (err) {
    console.error(err);
  }
};

onMounted(async () => {
  await getConsultants();
});
</script>

<style scoped></style>
