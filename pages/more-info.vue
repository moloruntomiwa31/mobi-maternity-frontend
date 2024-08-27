<template>
  <div class="w-full min-h-screen flex justify-center items-center">
    <div class="max-w-xl w-full">
      <div class="flex justify-center items-center mb-8">
        <Logo class="mr-4" />
        <h1 class="text-3xl font-bold">Mobi-Maternity</h1>
      </div>
      <form class="grid grid-cols-2 gap-4">
        <div v-for="field in patientFields" v-if="userRole == 'Patient'">
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
          <Select
            v-else
            v-model="field.value"
            required
            :disabled="field.disabled"
          >
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
        <div
          v-for="field in healthProfessionalFields"
          v-if="userRole == 'Health Professional'"
        >
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
        </div>
      </form>
      <div>
        <Button
          class="bg-pink-500 hover:bg-pink-400 w-full mx-auto mt-3"
          @click.prevent="addData"
        >
          Add Data
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
});
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { storeToRefs } from "pinia";
import { useUser } from "@/stores/useUser";
import { useUserInfo } from "@/composables/useUserInfo";

const { userRole } = storeToRefs(useUser());
const { addPatientInfo, addHealthWorkerInfo } = useUserInfo();

interface Field {
  id: string;
  label: string;
  type: string;
  value: string | Ref<string>;
  placeholder: string;
  options?: string[];
  disabled?: boolean;
}

const patientFields = ref<Field[]>([
  {
    id: "pregnancyStatus",
    label: "Pregnancy Status",
    type: "select",
    value: "",
    options: ["True", "False"],
    placeholder: "Enter your status",
  },
  {
    id: "dueDate",
    label: "Due Date",
    type: "date",
    value: "",
    placeholder: "Select your due date",
  },
  {
    id: "healthConditions",
    label: "Health Conditions",
    type: "text",
    value: "",
    placeholder: "Enter your health conditions",
  },
]);

const healthProfessionalFields = ref<Field[]>([
  {
    id: "medicalLicense",
    label: "Medical License Number",
    type: "number",
    value: "",
    placeholder: "Enter your license number",
  },
  {
    id: "specialization",
    label: "Specialization",
    type: "text",
    value: "",
    placeholder: "Enter your specialization",
  },
  {
    id: "clinicAddress",
    label: "Clinic Address",
    type: "text",
    value: "",
    placeholder: "Enter your clinic address",
  },
  {
    id: "hospitalName",
    label: "Hospital Name",
    type: "text",
    value: "",
    placeholder: "Enter your hospital name",
  },
]);

const addPatientData = async () => {
  const patientData = {
    pregnancy_status: "",
    due_date: "",
    health_conditions: "",
  };

  patientFields.value.forEach((field) => {
    switch (field.id) {
      case "pregnancyStatus":
        patientData.pregnancy_status = field.value;
        break;
      case "dueDate":
        patientData.due_date = field.value;
        break;
      case "healthConditions":
        patientData.health_conditions = field.value;
        break;
      default:
        break;
    }
  });

  await addPatientInfo(patientData);
};

const addHealthWorkerData = async () => {
  const healthWorkerData = {
    medical_license_number: "",
    specialty: "",
    clinic_location: "",
    hospital_name: "",
  };

  healthProfessionalFields.value.forEach((field) => {
    switch (field.id) {
      case "medicalLicense":
        healthWorkerData.medical_license_number = field.value;
        break;
      case "specialization":
        healthWorkerData.specialty = field.value;
        break;
      case "clinicAddress":
        healthWorkerData.clinic_location = field.value;
        break;
      case "hospitalName":
        healthWorkerData.hospital_name = field.value;
        break;
      default:
        break;
    }
  });

  await addHealthWorkerInfo(healthWorkerData);
};

const addData = () => {
  if (userRole.value === "Patient") {
    addPatientData();
  } else {
    addHealthWorkerData();
  }
};
</script>

<style scoped></style>
