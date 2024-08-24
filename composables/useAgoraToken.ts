import axios from "axios";

export function useAgoraToken() {
  const fetchToken = async (channelName: string, uid: string | null = null) => {
    try {
      const response = await axios.get("/api/agora-token", {
        params: { channelName, uid },
      });

      return response.data.token;
    } catch (error) {
      console.error("Error fetching Agora token:", error);
      throw new Error("Failed to fetch Agora token");
    }
  };

  return { fetchToken };
}
