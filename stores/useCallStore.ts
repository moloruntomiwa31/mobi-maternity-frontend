import { defineStore } from "pinia";
export const useCallStore = defineStore("call", () => {
  const channel = ref<string | null>(null);
  const app_id = ref(null);
  return { channel, app_id };
});
