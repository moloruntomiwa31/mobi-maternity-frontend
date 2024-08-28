import AgoraRTC from 'agora-rtc-sdk-ng';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('agora', AgoraRTC);
});