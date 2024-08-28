export const useCallStore = defineStore("call", () => {
  const channel = ref<string | null>(null);
  const app_id = ref(null);
  const token = ref("");
  const uid = ref<number | null>(null);
  return { channel, app_id, token, uid };
});
