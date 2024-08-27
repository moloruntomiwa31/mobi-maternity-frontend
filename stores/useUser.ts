import { defineStore, acceptHMRUpdate } from "pinia";

export const useUser = defineStore("user", () => {
  const user = ref(null);
  const userRole = ref("");
  const userInfo = ref(null);
  const userIsAuthenticated = ref(false);

  const setUser = (userData: any) => {
    if (userData) {
      user.value = userData;
      userRole.value = userData.role;
      userRole.value =
        userRole.value === "P" ? "Patient" : "Health Professional";
      userIsAuthenticated.value = true;
    } else {
      user.value = null;
      userRole.value = "";
      userInfo.value = null;
      userIsAuthenticated.value = false;
    }
  };

  const setUserInfo = (info: any) => {
    userInfo.value = info;
  };

  const clearUser = () => {
    user.value = null;
    userRole.value = "";
    userInfo.value = null;
    userIsAuthenticated.value = false;
    localStorage.removeItem("user");
  };

  onMounted(() => {
    if (!userIsAuthenticated.value) {
      const userData = localStorage.getItem("user");
      if (userData) {
        try {
          setUser(JSON.parse(userData));
        } catch (error) {
          console.error("Error parsing user data from localStorage:", error);
          clearUser();
        }
      } else {
        clearUser();
      }
    }
  });

  return {
    setUser,
    user,
    userRole,
    userIsAuthenticated,
    userInfo,
    setUserInfo,
    clearUser,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUser, import.meta.hot));
}
