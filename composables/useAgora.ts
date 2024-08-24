export function useAgora() {
  const { $agora } = useNuxtApp();
  const client = $agora.createClient({ mode: "rtc", codec: "vp8" });

  const localTracks = reactive({
    audioTrack: null,
    videoTrack: null,
  });

  const remoteUsers = ref([]);

  const joinChannel = async (appId, channel, token, uid) => {
    await client.join(appId, channel, token, uid);
    localTracks.audioTrack = await $agora.createMicrophoneAudioTrack();
    localTracks.videoTrack = await $agora.createCameraVideoTrack();
    await client.publish(Object.values(localTracks));

    client.on("user-published", handleUserPublished);
    client.on("user-unpublished", handleUserUnpublished);
  };

  const leaveChannel = async () => {
    Object.values(localTracks).forEach((track) => track?.close());
    await client.leave();
    remoteUsers.value = [];
  };

  const handleUserPublished = async (user, mediaType) => {
    await client.subscribe(user, mediaType);
    remoteUsers.value.push(user);
  };

  const handleUserUnpublished = (user) => {
    remoteUsers.value = remoteUsers.value.filter((u) => u.uid !== user.uid);
  };

  return {
    client,
    localTracks,
    remoteUsers,
    joinChannel,
    leaveChannel,
  };
}
