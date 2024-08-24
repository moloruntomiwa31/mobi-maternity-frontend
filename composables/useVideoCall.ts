// composables/useVideoCall.ts
// import { ref, computed } from 'vue'
// import { useAgora } from './useAgora'
// import { useAgoraToken } from './useAgoraToken'
import { useCallStore } from '~/stores/useCallStore'

export function useVideoCall() {
  const { fetchToken } = useAgoraToken()
  const { client, localTracks, remoteUsers, joinChannel, leaveChannel } = useAgora()
  const callStore = useCallStore()

  const channelName = ref('')
  const uid = ref('')
  const token = ref('')
  const isInCall = ref(false)

  const generateChannelName = () => {
    return `channel-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`
  }

  const generateUid = () => {
    return Math.floor(Math.random() * 1000000).toString()
  }

  const initializeCall = async () => {
    channelName.value = generateChannelName()
    uid.value = generateUid()

    try {
      token.value = await fetchToken(channelName.value, uid.value)
    } catch (error) {
      console.error('Failed to fetch token:', error)
      throw error
    }
  }

  const startCall = async (appId: string) => {
    if (!token.value) {
      await initializeCall()
    }

    await joinChannel(appId, channelName.value, token.value, uid.value)
    isInCall.value = true
  }

  const endCall = async () => {
    await leaveChannel()
    isInCall.value = false
    token.value = ''
    channelName.value = ''
    uid.value = ''
    callStore.resetCall()
  }

  return {
    isInCall,
    localTracks,
    remoteUsers,
    startCall,
    endCall
  }
}