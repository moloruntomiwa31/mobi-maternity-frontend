<template>
  <div
    class="text-black w-full min-h-screen flex justify-center items-center"
  >
    <div class="max-w-md w-full">
      <div class="flex justify-center items-center mb-8">
        <Logo class="mr-4" />
        <h1 class="text-3xl font-bold">Mobi-Maternity</h1>
      </div>
      <div v-for="field in fields" :key="field.id" class="mb-4">
        <Label :for="field.id" class="text-lg">{{ field.label }}</Label>
        <Input
          :id="field.id"
          :type="field.type"
          v-model="field.value"
          :placeholder="field.placeholder"
          class="w-full"
        />
      </div>
      <Button class="bg-pink-500 hover:bg-pink-400 w-full">Login</Button>
      <span class="block text-center mt-4">
        Don't have an account?
        <NuxtLink to="/register" class="text-pink-500 hover:underline"
          >Register</NuxtLink
        >
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface Field {
  id: string;
  label: string;
  type: string;
  value: string;
  placeholder: string;
}

const fields = ref<Field[]>([
  {
    id: "email",
    label: "Email Address",
    type: "email",
    value: "",
    placeholder: "Enter your email",
  },
  {
    id: "password",
    label: "Password",
    type: "password",
    value: "",
    placeholder: "Enter your password",
  },
]);
</script>

<style scoped></style>
