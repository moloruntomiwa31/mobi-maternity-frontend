<template>
  <form class="grid grid-cols-2 gap-4">
    <div v-for="i in 6" v-if="userRole == 'Patient'">
      <h1>Patient</h1>
      <Label for="phoneNumber">Phone Number</Label>
      <Input
        id="phoneNumber"
        type="text"
        placeholder="Enter your phone number"
      />
    </div>
    <div v-for="i in 6" v-if="userRole == 'Health Professional'">
      <h1>Health Professional</h1>
      <Label for="phoneNumber">Phone Number</Label>
      <Input
        id="phoneNumber"
        type="text"
        placeholder="Enter your phone number"
      />
    </div>
    <!-- <div>
      <Button type="submit" value="Register" />
    </div> -->
  </form>
</template>

<script setup lang="ts">
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { storeToRefs } from "pinia";
import { useUser } from "@/stores/useUser";
const { userRole } = storeToRefs(useUser());
</script>

<style scoped></style>
