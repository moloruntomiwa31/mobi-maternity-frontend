<template>
    <div class="border rounded p-4">
      <div ref="mapContainerRef" style="height: 400px"></div>
    </div>
  </template>
  
  <script setup>  
  const { mapContainerRef, map, currentLocation, searchedLocation, searchLocation } = useLeafletMap()
  </script>