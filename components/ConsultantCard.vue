<script setup lang="ts">
import { Card, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { VideotapeIcon } from "lucide-vue-next";
import femaleDr from "../public/femaleDr.jpg";
import maleDr from "../public/maleDr.jpg";
import { useCallStore } from "~/stores/useCallStore";
import { storeToRefs } from "pinia";
const {channel, app_id} = storeToRefs(useCallStore());  
//created store for channel and app_id

defineProps(["consultants"]);
const { fetchToken } = useAgoraToken();

const isCallActive = ref(false); // Flag to check if a call is active
const { $agora } = useNuxtApp();
const activeConsultant = ref(null); // Store the active consultant

const generateUid = () => {
  return Math.floor(Math.random() * 2 ** 32);
};

const generateChannelName = () => {
  const prefix = "channel_";
  const timestamp = Date.now(); 
  const randomNum = Math.floor(Math.random() * 10000); 
  return `${prefix}${timestamp}_${randomNum}`;
};

const startCall = async (consultant) => {
  channel.value = generateChannelName();
  let uid = generateUid();
  console.log("Starting call with channel:", channel, "and UID:", uid);
  try {
    const tokenResponse = await fetchToken(channel.value, uid);
    const token = tokenResponse.token;
    app_id.value = tokenResponse.app_id;

    const client = $agora?.createClient({ mode: "rtc", codec: "vp8" });

    if (client) {
      await client.join(app_id.value, channel.value, token, uid);
      isCallActive.value = true;
      activeConsultant.value = consultant;

      // Additional Agora operations can be placed here
    }
  } catch (error) {
    console.error("Failed to start call:", error);
  }
};
</script>

<template>
  <div v-if="!isCallActive">
    <Card
      v-for="consultant in consultants"
      :key="consultant.user_registration.id"
      class="shadow-none w-[220px] h-[300px] grid place-content-center text-center gap-4 cursor-pointer transition"
      :class="
        consultant.user_registration.gender == 'F'
          ? 'bg-pink-50 hover:bg-pink-100'
          : 'bg-blue-50 hover:bg-blue-100'
      "
    >
      <CardHeader class="grid place-items-center w-full">
        <img
          :src="consultant.user_registration.gender == 'F' ? femaleDr : maleDr"
          :alt="consultant.user_registration.first_name"
          class="w-[100px] h-[100px] rounded-full"
        />
        <h2 class="text-base font-bold">
          Dr. {{ consultant.user_registration.first_name }}
          {{ consultant.user_registration.last_name }}
        </h2>
        <h4 class="text-sm font-medium">{{ consultant.specialty }}</h4>
      </CardHeader>
      <CardFooter class="text-center mx-auto">
        <Button
          @click="startCall(consultant)"
          class="p-1 rounded-full w-10 h-10 grid place-content-center text-center transition"
          :class="
            consultant.user_registration.gender == 'F'
              ? 'bg-pink-600 hover:bg-pink-400'
              : 'bg-blue-600 hover:bg-blue-400'
          "
        >
          <VideotapeIcon class="w-4 h-4 text-white" />
        </Button>
        <span class="ml-2">Video Call</span>
      </CardFooter>
    </Card>
  </div>

  <div v-else>
    <!-- Display Video Call Component when a call is active -->
    <VideoCall :consultant="activeConsultant" />
  </div>
</template>
