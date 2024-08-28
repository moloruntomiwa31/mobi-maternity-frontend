<script setup lang="ts">
const { $agora } = useNuxtApp();
const { channel, app_id, token, uid } = storeToRefs(useCallStore());

const localVideoRef = ref(null);
const remoteVideoRef = ref(null);
const localVideoTrack = ref(null);
const localAudioTrack = ref(null);
const client = ref(null);
const remoteUser = ref(null); // Store remote user

const isVideoMuted = ref(false);
const isAudioMuted = ref(false);

defineProps(["consultant"]);
const emit  = defineEmits(["call-ended"]);

const toggleVideo = () => {
  if (localVideoTrack.value) {
    if (isVideoMuted.value) {
      localVideoTrack.value.setEnabled(true);
      isVideoMuted.value = false;
    } else {
      localVideoTrack.value.setEnabled(false);
      isVideoMuted.value = true;
    }
  }
};

const toggleAudio = () => {
  if (localAudioTrack.value) {
    if (isAudioMuted.value) {
      localAudioTrack.value.setEnabled(true);
      isAudioMuted.value = false;
    } else {
      localAudioTrack.value.setEnabled(false);
      isAudioMuted.value = true;
    }
  }
};

const leaveCall = async () => {
  if (client.value) {
    await client.value.leave();
    if (localVideoTrack.value) localVideoTrack.value.close();
    if (localAudioTrack.value) localAudioTrack.value.close();
    if (remoteUser.value?.videoTrack) remoteUser.value.videoTrack.close();
  }
emit("call-ended");
};

onMounted(async () => {
  client.value = $agora?.createClient({ mode: "rtc", codec: "vp8" });
  if (client.value) {
    // Initialize the local video and audio tracks
    localVideoTrack.value = await $agora.createCameraVideoTrack();
    localAudioTrack.value = await $agora.createMicrophoneAudioTrack();

    // Play the local video track
    localVideoTrack.value.play(localVideoRef.value);

    // Join the channel (assuming token and other necessary details are handled elsewhere)
    await client.value.join(app_id.value, channel.value, token.value, uid.value);

    // Publish the local video and audio tracks
    await client.value.publish([localVideoTrack.value, localAudioTrack.value]);

    // Handle remote users
    client.value.on("user-published", async (user, mediaType) => {
      remoteUser.value = user;
      await client.value.subscribe(user, mediaType);
      if (mediaType === "video") {
        const remoteVideoTrack = user.videoTrack;
        if (remoteVideoTrack) {
          remoteVideoTrack.play(remoteVideoRef.value);
        }
      }
    });

    // Handle remote user leaving
    client.value.on("user-unpublished", (user) => {
      if (user.videoTrack) {
        user.videoTrack.stop();
        user.videoTrack.close();
      }
    });
  }
});

onBeforeUnmount(() => {
  leaveCall();
});
</script>

<template>
  <div class="absolute">
    <h2 class="text-center mb-4">
      Call with Dr. {{ consultant.user_registration.first_name }}
    </h2>
    <div class="video-players-container">
      <div id="local-player" ref="localVideoRef" class="video-player"></div>
      <div id="remote-player" ref="remoteVideoRef" class="video-player"></div>
    </div>
    <div class="controls-container">
      <button @click="toggleVideo" class="control-button">
        {{ isVideoMuted ? "Unmute Video" : "Mute Video" }}
      </button>
      <button @click="toggleAudio" class="control-button">
        {{ isAudioMuted ? "Unmute Audio" : "Mute Audio" }}
      </button>
      <button @click="leaveCall" class="control-button">
        Leave Call
      </button>
    </div>
  </div>
</template>

<style scoped>
.video-call-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.video-players-container {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.video-player {
  width: 400px;
  height: 300px;
  background-color: #000;
  border-radius: 10px;
}

.controls-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 10px;
}

.control-button {
  background-color: #db2777;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.control-button:hover {
  background-color: #e73d89;
}
</style>
