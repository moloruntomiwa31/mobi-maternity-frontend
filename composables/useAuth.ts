import axios from "axios";
import { useToast } from "@/components/ui/toast/use-toast";
import { useUser } from "@/stores/useUser";

const { toast } = useToast();
const router = useRouter();

interface RegisterFormData {
  username: string;
  password: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  date_of_birth: string;
  gender: string;
  role: string;
}

const url = "https://q60kw2bx-8002.euw.devtunnels.ms";

export function useAuth() {
  const userStore = useUser();

  const register = async (formData: RegisterFormData) => {
    try {
      const response = await axios.post(
        `${url}/api/user-create/`,
        JSON.stringify(formData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      userStore.setUser(response.data.data);
      localStorage.setItem("user", JSON.stringify(response.data.data));
      console.log("User registered successfully");
    } catch (error) {
      console.log(error);
      router.push("/login");
    }
  };

  const getUser = async () => {
    try {
      const response = await axios.get(`${url}/api/user-detail/`);
      userStore.setUser(response.data);
      toast({
        title: "Success",
        description: "User fetched successfully",
      });
    } catch (error) {
      userStore.clearUser();
      toast({
        title: "Error",
        description: `${error}`,
      });
    }
  };

  const login = async (username: string, password: string) => {
    console.log(username, password);
    try {
      const response = await axios.post(
        `${url}/api/login/`,
        JSON.stringify({ username, password }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      userStore.setUser(response.data.data);
      localStorage.setItem("user", JSON.stringify(response.data.data));
      localStorage.setItem("accessToken", response.data.access);
      localStorage.setItem("refreshToken", response.data.refresh);
      console.log(response.data);
      return true;
    } catch (error) {
      userStore.clearUser();
      toast({
        title: "Error",
        description: `${error}`,
      });
      return false;
    }
  };

  const refreshToken = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      const response = await axios.post(
        `${url}/api/token/refresh/`,
        JSON.stringify({ refresh: refreshToken }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem("accessToken", response.data.access);
    } catch (error) {
      userStore.clearUser();
      toast({
        title: "Error",
        description: `${error}`,
      });
    }
  };

  const logOut = async () => {
    console.log("Logging out");
    try {
      await axios.post(
        `${url}/api/logout/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            ContentType: "application/json",
          },
        }
      );
      localStorage.clear();
      userStore.clearUser();
      console.log("User logged out successfully");
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return { register, getUser, login, logOut, refreshToken };
}
