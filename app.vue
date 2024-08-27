<template>
  <div>
    <NuxtLayout>
      <ClientOnly>
        <Toaster />
      </ClientOnly>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
import { Toaster } from "@/components/ui/toast";
</script>
