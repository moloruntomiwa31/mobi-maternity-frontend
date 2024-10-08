import axios from "axios";
import { useToast } from "@/components/ui/toast/use-toast";
const { toast } = useToast();

const url = "https://mobi-maternity-db.onrender.com";

export function useUserInfo() {
  const userStore = useUser();
  const addPatientInfo = async (formData) => {
    try {
      const response = await axios.put(
        `${url}/api/health-info/create/`,
        JSON.stringify(formData),
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            ContentType: "application/json",
          },
        }
      );
      console.log(response.data);
      userStore.setUserInfo(response.data);
      toast({
        title: "Success",
        description: "User Patient Info Added Successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `${error}`,
      });
    }
  };

  const addHealthWorkerInfo = async (formData) => {
    try {
      const response = await axios.put(
        `${url}/api/health-worker/create/`,
        JSON.stringify(formData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
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

  return { addPatientInfo, addHealthWorkerInfo };
}
