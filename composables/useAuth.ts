import axios from "axios";
import { useToast } from "@/components/ui/toast/use-toast";
import { useUser } from "@/stores/useUser";
const { toast } = useToast();

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
      userStore.setUser(response.data);
      toast({
        title: "Success",
        description: "User registered successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `${error}`,
      });
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
      toast({
        title: "Error",
        description: `${error}`,
      });
    }
  };

  const login = async (username: string, password: string) => {
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
      // localStorage.setItem("token", response.data.access);
      // userStore.setUser(response.data);
      console.log(response.data);
      toast({
        title: "Success",
        description: "User logged in successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `${error}`,
      });
    }
  };

  return { register, getUser, login };
}
