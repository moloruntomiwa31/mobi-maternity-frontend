import AgoraRTC from 'agora-rtc-sdk-ng'

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      agora: AgoraRTC
    }
  }
})