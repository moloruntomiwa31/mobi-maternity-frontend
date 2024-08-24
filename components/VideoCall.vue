<!-- components/VideoCall.vue -->
<template>
  <div v-if="callStore.isCallInitiated || isInCall">
    <div v-if="!isInCall">
      <p>Incoming call from {{ callStore.calleeId }}</p>
      <button @click="startCall">Accept</button>
      <button @click="rejectCall">Reject</button>
    </div>
    <div v-else>
      <h2>In call with {{ callStore.calleeId }}</h2>
      <div id="local-player" ref="localPlayerRef"></div>
      <div
        v-for="user in remoteUsers"
        :key="user.uid"
        :id="`player-${user.uid}`"
      ></div>
      <button @click="endCall">Leave</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCallStore } from "~/stores/useCallStore";

const {
  isInCall,
  localTracks,
  remoteUsers,
  startCall: initStartCall,
  endCall,
} = useVideoCall();

const callStore = useCallStore();

const localPlayerRef = ref(null);

const AGORA_APP_ID = "YOUR_AGORA_APP_ID"; // Replace with your actual Agora App ID

const startCall = async () => {
  try {
    await initStartCall(AGORA_APP_ID);
  } catch (error) {
    console.error("Failed to start call:", error);
  }
};

const rejectCall = () => {
  callStore.resetCall();
};

watch(
  localTracks,
  (newTracks) => {
    if (newTracks.videoTrack && localPlayerRef.value) {
      newTracks.videoTrack.play(localPlayerRef.value);
    }
  },
  { deep: true }
);

watch(
  remoteUsers,
  (newUsers) => {
    newUsers.forEach((user) => {
      if (user.videoTrack) {
        user.videoTrack.play(`player-${user.uid}`);
      }
    });
  },
  { deep: true }
);

// onMounted(() => {
//   // Any additional setup you need on component mount
// });
</script>

<style scoped>
#local-player,
[id^="player-"] {
  width: 320px;
  height: 240px;
  margin: 10px;
}
</style>
