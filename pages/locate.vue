<template>
    <div>
      <LeafletMap />
  
      <Label for="Location">Location</Label>
      <Input id="Location" v-model="location" />
      <Button @click="searchLocation(location)">Locate</Button>
    </div>
  </template>
  
  <script setup lang="ts">
//   import { useLeafletMap } from '@/composables/useLeafletMap'
  import { Input } from '@/components/ui/input'
  import { Label } from '@/components/ui/label'
  
  definePageMeta({
    layout: "dashboard",
  });
  
  const location = ref('')
  const { searchLocation } = useLeafletMap()
  </script>