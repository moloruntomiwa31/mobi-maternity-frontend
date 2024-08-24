import { defineStore } from "pinia";

export const useCallStore = defineStore("call", {
  state: () => ({
    isCallInitiated: false,
    calleeId: null,
  }),
  actions: {
    initiateCall(calleeId: string) {
      this.isCallInitiated = true;
      this.calleeId = calleeId;
    },
    resetCall() {
      this.isCallInitiated = false;
      this.calleeId = null;
    },
  },
});
