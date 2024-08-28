import axios from "axios";
const url = "https://q60kw2bx-8002.euw.devtunnels.ms";

export function useAWS() {
  const getResponse = async (prompt: string) => {
    try {
      const response = await axios.post(
        `${url}/ai-response/`,
        JSON.stringify({ prompt }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  return { getResponse };
}
