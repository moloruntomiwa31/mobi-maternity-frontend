<template>
  <form class="grid grid-cols-3 gap-4">
    <div v-for="field in fields" :key="field.id" class="mb-4">
      <Label :for="field.id" class="text-lg">{{ field.label }}</Label>
      <Input
        v-if="field.type !== 'select'"
        :id="field.id"
        :type="field.type"
        v-model="field.value"
        :placeholder="field.placeholder"
        required
        class="w-full"
      />
      <Select v-else v-model="field.value" required :disabled="field.disabled">
        <SelectTrigger>
          <SelectValue :placeholder="field.placeholder" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup v-for="(option, index) in field.options" :key="index">
            <SelectItem :value="option"> {{ option }} </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  </form>
  <div>
    <Button
      class="bg-pink-500 hover:bg-pink-400 w-full mx-auto"
      @click="handleSubmit"
      >Register</Button
    >
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
const { userRole } = storeToRefs(useUser());
const { register, getUser } = useAuth();

interface Field {
  id: string;
  label: string;
  type: string;
  value: string | Ref<string>;
  placeholder: string;
  options?: string[];
  disabled?: boolean;
}

const fields = ref<Field[]>([
  {
    id: "firstName",
    label: "First Name",
    type: "text",
    value: "",
    placeholder: "Enter your first name",
  },
  {
    id: "lastName",
    label: "Last Name",
    type: "text",
    value: "",
    placeholder: "Enter your last name",
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
    options:
      userRole.value == "Patient" ? ["Female"] : ["Male", "Female", "Other"],
  },
  {
    id: "role",
    label: "Role",
    type: "select",
    value: userRole,
    placeholder: "Select your role",
    options: ["Patient", "Health Professional"],
    disabled: true,
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

const handleSubmit = async () => {
  const formData = {
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    date_of_birth: "",
    gender: "",
    role: "",
  };

  fields.value.forEach((field) => {
    switch (field.id) {
      case "firstName":
        formData.first_name = field.value;
        break;
      case "lastName":
        formData.last_name = field.value;
        break;
      case "dateOfBirth":
        formData.date_of_birth = field.value;
        break;
      case "gender":
        formData.gender = field.value === "Male" ? "M" : "F";
        break;
      case "role":
        formData.role = field.value === "Patient" ? "P" : "H";
        break;
      case "phoneNumber":
        formData.phone_number = field.value.toString();
        break;
      case "password":
        formData.password = field.value;
        break;
      case "confirmPassword":
        // You can add validation logic here
        break;
      default:
        break;
    }
  });

  // Set the desired username
  formData.username = `${formData.first_name.toLowerCase()}${formData.last_name.toLowerCase()}`;
  try {
    const isRegistered = await register(formData);
    if (isRegistered) {
      navigateTo("/overview");
    }
  } catch (error) {
    console.log(error);
  }
};
</script>

<style scoped></style>
