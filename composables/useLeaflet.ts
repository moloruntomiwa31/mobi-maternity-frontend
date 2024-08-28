import L from 'leaflet'

export const useLeafletMap = () => {
  const mapContainerRef = ref<HTMLDivElement | null>(null)
  const map = ref<L.Map | null>(null)
  const currentLocation = ref<[number, number] | null>(null)
  const searchedLocation = ref<[number, number] | null>(null)
  const isMapInitialized = ref(false)

  const initMap = () => {
    if (!isMapInitialized.value && mapContainerRef.value) {
      map.value = L.map(mapContainerRef.value).setView([0, 0], 13)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map.value)
      isMapInitialized.value = true
    }
  }

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords
        currentLocation.value = [latitude, longitude]
        map.value?.setView(currentLocation.value, 13)
        if (map.value) {
          L.marker(currentLocation.value).addTo(map.value)
        }
      })
    } else {
      console.error('Geolocation is not supported by this browser.')
    }
  }

  const searchLocation = async (location: string) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${location}&format=json&limit=1`)
      const data = await response.json()
      if (data.length > 0) {
        const { lat, lon } = data[0]
        searchedLocation.value = [parseFloat(lat), parseFloat(lon)]
        map.value?.setView(searchedLocation.value, 13)
        if (map.value) {
          L.marker(searchedLocation.value).addTo(map.value)
        }
      } else {
        console.error('Location not found.')
      }
    } catch (error) {
      console.error('Error searching for location:', error)
    }
  }

  onMounted(() => {
    initMap()
    getCurrentLocation()
  })

  onBeforeUnmount(() => {
    if (map.value) {
      map.value.remove()
      map.value = null
      isMapInitialized.value = false
    }
  })

  return {
    mapContainerRef,
    map,
    currentLocation,
    searchedLocation,
    searchLocation
  }
}