import axios from "axios";
const url = "https://mobi-maternity-db.onrender.com";

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
