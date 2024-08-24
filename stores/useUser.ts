import { defineStore, acceptHMRUpdate } from 'pinia'
export const useUser = defineStore("user", () => {
  const user = ref(null);
  const userRole = ref("");
  const setUser = (user) => {
    user.value = user;
  };
  return { setUser, user, userRole };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUser, import.meta.hot));
}
