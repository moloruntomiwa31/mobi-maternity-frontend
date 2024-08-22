export function useAgoraToken() {
  const fetchToken = async (channelName: string, uid: string | null = null) => {
    const { data, error } = await useFetch('/api/agora-token', {
      method: 'POST',
      body: { channelName, uid }
    })

    if (error.value) {
      console.error('Error fetching Agora token:', error.value)
      throw new Error('Failed to fetch Agora token')
    }

    return data.value.token
  }

  return { fetchToken }
}