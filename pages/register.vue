<template>
  <div class="w-full min-h-screen flex justify-center items-center">
    <div class="max-w-xl w-full">
      <div class="flex justify-center items-center mb-8">
        <Logo class="mr-4" />
        <h1 class="text-3xl font-bold">Mobi-Maternity</h1>
      </div>
      <div
        class="bg-neutral-100 grid grid-cols-2 gap-4 p-4 rounded-lg shadow"
        v-if="userRole.length === 0"
      >
        <div
          class="bg-pink-400 rounded-lg p-2 cursor-pointer transition hover:scale-[101%]"
          @click="setUserRole('Patient')"
        >
          <img src="../public/femaleDr.jpg" alt="" class="rounded-full" />
          <p class="font-bold text-sm text-white text-center">Patient</p>
        </div>
        <div
          class="bg-blue-400 rounded-lg p-2 cursor-pointer transition hover:scale-[101%]"
          @click="setUserRole('Health Professional')"
        >
          <img src="../public/maleDr.jpg" alt="" class="rounded-full" />
          <p class="font-bold text-sm text-white text-center">
            Health Professional
          </p>
        </div>
      </div>
      <div v-if="userRole.length > 0">
        <RegisterPersonal />
      </div>
      <span class="block text-center mt-4">
        Have an account?
        <NuxtLink to="/login" class="text-pink-500 hover:underline"
          >Login</NuxtLink
        >
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
const { userRole } = storeToRefs(useUser());

const setUserRole = (role: string) => {
  userRole.value = role;
};
</script>

<style scoped></style>
