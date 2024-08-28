<script setup lang="ts">
import { LineChart } from "@/components/ui/chart-line";
import { ArrowUpRightIcon } from "lucide-vue-next";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { nextTick } from "vue";

// Store references
const { channel, app_id, token, uid } = storeToRefs(useCallStore());
const { user } = storeToRefs(useUser());
const { $agora } = useNuxtApp();

// Agora-related refs
const localVideoRef = ref(null);
const remoteVideoRef = ref(null);
const client = ref(null);
const localVideoTrack = ref(null);
const localAudioTrack = ref(null);
const isModalVisible = ref(false);
const isMuted = ref(false);
const isVideoMuted = ref(false);
const pollingInterval = ref(null);
const patientName = ref("");
const url = "https://q60kw2bx-8002.euw.devtunnels.ms";

// Fetch Call Information
const fetchCallInfo = async () => {
  try {
    const response = await axios.get(`${url}/get-call-info/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    if (
      response.data?.channel &&
      response.data?.app_id &&
      response.data?.token
    ) {
      channel.value = response.data.channel;
      app_id.value = response.data.app_id;
      token.value = response.data.token;
      uid.value = response.data.uid;
      patientName.value = response.data.patient_name;

      clearInterval(pollingInterval.value);
      joinCall();
    }
  } catch (error) {
    console.error("Error fetching call info:", error);
  }
};

// Start Polling for Call Info
const startPollingForCallInfo = () => {
  pollingInterval.value = setInterval(fetchCallInfo, 5000); // Poll every 5 seconds
};

// Join Call
const joinCall = async () => {
  if (!channel.value || !app_id.value || !token.value) {
    console.error("Missing Agora credentials or channel information.");
    return;
  }

  client.value = $agora?.createClient({ mode: "rtc", codec: "vp8" });

  if (client.value) {
    try {
      localVideoTrack.value = await $agora.createCameraVideoTrack();
      localAudioTrack.value = await $agora.createMicrophoneAudioTrack();

      await nextTick();

      if (localVideoRef.value) {
        localVideoTrack.value.play(localVideoRef.value);
      } else {
        console.error("localVideoRef is null or not yet rendered.");
      }

      await client.value.join(
        app_id.value,
        channel.value,
        token.value,
        uid.value
      );
      await client.value.publish([
        localVideoTrack.value,
        localAudioTrack.value,
      ]);

      isModalVisible.value = true;

      client.value.on("user-published", async (user, mediaType) => {
        await client.value.subscribe(user, mediaType);

        if (mediaType === "video") {
          if (remoteVideoRef.value) {
            const remoteVideoTrack = user.videoTrack;
            remoteVideoTrack.play(remoteVideoRef.value);
          } else {
            console.error("remoteVideoRef is null or not yet rendered.");
          }
        }
      });

      client.value.on("user-unpublished", (user) => {
        if (user.videoTrack) {
          user.videoTrack.stop();
          user.videoTrack.close();
        }
      });
    } catch (error) {
      console.error("Error joining Agora channel:", error);
    }
  }
};

// Leave Call
const leaveCall = async () => {
  if (client.value) {
    await client.value.leave();
    if (localVideoTrack.value) localVideoTrack.value.close();
    if (localAudioTrack.value) localAudioTrack.value.close();
    isModalVisible.value = false;
  }
};

// Toggle Mute
const toggleMute = () => {
  if (localAudioTrack.value) {
    localAudioTrack.value.setEnabled(!isMuted.value);
    isMuted.value = !isMuted.value;
  }
};

// Toggle Video
const toggleVideo = () => {
  if (localVideoTrack.value) {
    localVideoTrack.value.setEnabled(!isVideoMuted.value);
    isVideoMuted.value = !isVideoMuted.value;
  }
};

onMounted(() => {
  startPollingForCallInfo();
});

onBeforeUnmount(() => {
  clearInterval(pollingInterval.value);
  leaveCall();
});

definePageMeta({
  layout: "dashboard",
});

// Mock data for LineChart
const data = [
  { month: "January", "Patient Count": 15 },
  { month: "February", "Patient Count": 22 },
  // ... other months
  { month: "December", "Patient Count": 50 },
];

// Cards Data
const cards = ref([
  {
    title: "Patients",
    count: 125,
    icon: "mdi:patient",
    color: "blue",
    description: "Total number of patients treated",
    id: Math.random().toString(36).substring(7),
  },
  {
    title: "Appointments",
    count: 78,
    icon: "teenyicons:appointments-outline",
    color: "green",
    description: "Upcoming appointments scheduled",
    id: Math.random().toString(36).substring(7),
  },
  {
    title: "Treatments",
    count: 42,
    icon: "hugeicons:treatment",
    color: "red",
    description: "Treatments prescribed this month",
    id: Math.random().toString(36).substring(7),
  },
]);
</script>

<template>
  <div class="grid gap-4">
    <header>
      <div>
        <h1>Patients Analytics</h1>
      </div>
    </header>

    <main class="header grid grid-cols-1 md:grid-cols-4 gap-4">
      <LineChart
        :colors="['#db2777', '#fff']"
        :data="data"
        index="month"
        :categories="['Patient Count']"
        :x-formatter="(tick) => tick.toString()"
        :y-formatter="(tick) => `${tick}`"
        :y-ticks="[0, 10, 20, 30, 40, 50]"
        class="h-[350px] md:col-span-3"
      />
      <Card
        v-for="card in cards"
        :key="card.id"
        class="w-full md:w-[220px] h-[350px] flex flex-col justify-between"
      >
        <CardHeader
          class="w-full grid grid-cols-[auto_1fr_auto] items-center px-4"
        >
          <div class="bg-neutral-100 w-fit p-2 rounded-lg">
            <Icon :name="card.icon" size="30" class="text-pink-600" />
          </div>
          <div></div>
          <div
            class="bg-pink-600 rounded-full w-10 h-10 grid place-content-center"
          >
            <ArrowUpRightIcon class="w-6 h-6 text-white" />
          </div>
        </CardHeader>
        <CardFooter class="grid">
          <h3>{{ card.title }}</h3>
          <h2 class="text-4xl font-medium">{{ card.count }}</h2>
        </CardFooter>
      </Card>
    </main>

    <!-- Video Call Section -->
    <div v-if="isModalVisible" class="modal-overlay">
      <div class="modal-content">
        <h2>Video Call with {{ patientName }}</h2>
        <div ref="localVideoRef" class="video-player"></div>
        <div ref="remoteVideoRef" class="video-player"></div>
        <div class="controls">
          <button
            @click="toggleMute"
            class="control-button"
            aria-label="Toggle Mute"
          >
            {{ isMuted ? "Unmute" : "Mute" }}
          </button>
          <button
            @click="toggleVideo"
            class="control-button"
            aria-label="Toggle Video"
          >
            {{ isVideoMuted ? "Enable Video" : "Disable Video" }}
          </button>
          <button
            @click="leaveCall"
            class="control-button"
            aria-label="Leave Call"
          >
            Leave Call
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.video-call-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 20px;
}

.video-player {
  width: 400px;
  height: 300px;
  background-color: #000;
  border-radius: 10px;
}

.controls {
  display: flex;
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
