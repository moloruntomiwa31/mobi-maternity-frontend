import axios from "axios";

const url = "https://q60kw2bx-8002.euw.devtunnels.ms";

export function useAgoraToken() {
  const fetchToken = async (
    channelName: string,
    uid: number | null = null,
    healthWorkerId: string
  ) => {
    console.log(channelName, uid, healthWorkerId);
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      };

      const response = await axios.post(
        `${url}/get-agora-token/`,
        {
          health_worker_id: healthWorkerId,
          channel: channelName,
          uid,
        },
        {
          headers,
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching Agora token:", error);
      throw new Error("Failed to fetch Agora token");
    }
  };

  return { fetchToken };
}
