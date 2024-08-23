<template>
  <div class="w-full min-h-screen flex justify-center items-center">
    <div class="max-w-md w-full">
      <div class="flex justify-center items-center mb-8">
        <Logo class="mr-4" />
        <h1 class="text-3xl font-bold">Mobi-Maternity</h1>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div v-for="field in fields" :key="field.id" class="mb-4">
          <Label :for="field.id" class="text-lg">{{ field.label }}</Label>
          <Input
            v-if="field.type !== 'select'"
            :id="field.id"
            :type="
              field.type === 'password'
                ? showPassword[field.id]
                  ? 'text'
                  : 'password'
                : field.type
            "
            v-model="field.value"
            :placeholder="field.placeholder"
            class="w-full"
          >
            <template v-if="field.type === 'password'" #append-inner>
              <button
                type="button"
                class="px-2 text-gray-500 hover:text-gray-700"
                @click="togglePasswordVisibility(field)"
              >
                <Icon
                  :name="
                    showPassword[field.id] ? 'ph:eye-fill' : 'ph:eye-slash'
                  "
                  size="20"
                />
              </button>
            </template>
          </Input>
          <Select v-else v-model="field.value">
            <SelectTrigger>
              <SelectValue :placeholder="field.placeholder" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup
                v-for="(option, index) in field.options"
                :key="index"
              >
                <SelectItem :value="option"> {{ option }} </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button class="bg-pink-500 hover:bg-pink-400 w-full mx-auto"
        >Register</Button
      >
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Field {
  id: string;
  label: string;
  type: string;
  value: string;
  placeholder: string;
  options?: string[];
}

const fields = ref<Field[]>([
  {
    id: "fullName",
    label: "Full Name",
    type: "text",
    value: "",
    placeholder: "Enter your full name",
  },
  {
    id: "email",
    label: "Email Address",
    type: "email",
    value: "",
    placeholder: "Enter your email address",
  },
  {
    id: "dateOfBirth",
    label: "Date of Birth",
    type: "date",
    value: "",
    placeholder: "Select your date of birth",
  },
  {
    id: "gender",
    label: "Gender",
    type: "select",
    value: "",
    placeholder: "Select your gender",
    options: ["Male", "Female", "Other"],
  },
  {
    id: "phoneNumber",
    label: "Phone Number",
    type: "number",
    value: "",
    placeholder: "Enter your phone number",
  },
  {
    id: "password",
    label: "Password",
    type: "password",
    value: "",
    placeholder: "Enter your password",
  },
  {
    id: "confirmPassword",
    label: "Confirm Password",
    type: "password",
    value: "",
    placeholder: "Confirm your password",
  },
]);

const showPassword = ref({
  password: false,
  confirmPassword: false,
});

const togglePasswordVisibility = (field: Field) => {
  showPassword.value[field.id] = !showPassword.value[field.id];
  if (!showPassword.value[field.id]) {
    field.value = "";
  }
};
</script>

<style scoped></style>
