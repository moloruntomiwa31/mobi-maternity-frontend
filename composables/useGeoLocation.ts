// export function useGeoLocation() {
//     const coords = ref({ latitude: 0, longitude: 0 })
//     const isSupported = 'geolocation' in navigator && 'navigator' in window
//     let watcher = null
//     onMounted(() => {
//         if (isSupported) {
//             watcher = navigator.geolocation.watchPosition(position => (coords.value = position.coords))
//         }
//     })
//     onUnmounted(()=> {
//         if (watcher) {
//             navigator.geolocation.clearWatch(watcher)
//         }
//     })
    
//     return {coords, isSupported}}