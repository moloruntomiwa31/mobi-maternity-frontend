<template>
  <div class="max-w-7xl mx-auto p-4">
    <h2 class="text-2xl font-bold mb-4 text-gray-800">Nearby Hospitals</h2>
    <Button
      @click="findHospitals"
      class="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
      :class="{ 'opacity-50 cursor-not-allowed': loading }"
      :disabled="loading"
    >
      {{ loading ? "Searching..." : "Find Hospitals" }}
    </Button>
    <TransitionGroup
      name="list"
      tag="div"
      v-if="hospitals.length"
      class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4"
    >
      <LocationCards :hospitals />
    </TransitionGroup>
    <div
      v-else-if="loading"
      class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4"
    >
      <Skeleton class="w-[300px] h-[300px]" v-for="i in 20" />
    </div>
    <p v-else-if="error" class="mt-4 text-red-500">{{ error }}</p>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "dashboard",
});
import { Button } from "@/components/ui/button";
import { Skeleton } from "~/components/ui/skeleton";
const { getHospitalDetails } = useHospitalLocation();

const hospitals = ref([]);
const loading = ref(false);
const error = ref(null);

const findHospitals = async () => {
  loading.value = true;
  error.value = null;
  hospitals.value = [];
  try {
    hospitals.value = await getHospitalDetails();
  } catch (err) {
    error.value = "An error occurred while fetching hospitals.";
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  findHospitals();
});
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.list-move {
  transition: transform 0.5s ease;
}
</style>
