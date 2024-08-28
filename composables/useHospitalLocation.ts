import axios from "axios";
const GEOAPIFY_API_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY as string;

export function useHospitalLocation() {
  const getHospitalDetails = async () => {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const { latitude, longitude } = position.coords;

      const response = await axios.get(`https://api.geoapify.com/v2/places`, {
        params: {
          categories: "healthcare.hospital",
          filter: `circle:${longitude},${latitude},5000`,
          bias: `proximity:${longitude},${latitude}`,
          limit: 20,
          apiKey: GEOAPIFY_API_KEY,
        },
      });
      return response.data.features.map((feature) => ({
        name: feature.properties.name,
        distance: Math.round(feature.properties.distance),
        place_id: feature.properties.place_id,
        address: feature.properties.formatted,
      }));
    } catch (e) {
      console.error(e);
    }
  };

  return {
    getHospitalDetails,
  };
}