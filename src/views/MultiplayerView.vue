<template>
  <div class="multiplayer">
    <MultiplayerLobbyComponent />
    <ChatComponent v-if="isChatEnabled" />
    <MultiplayerChallengeComponent v-if="currentChallenge" :challenge="currentChallenge" />
  </div>
</template>

<script>
import MultiplayerLobbyComponent from '@/components/MultiplayerLobbyComponent.vue';
import ChatComponent from '@/components/ChatComponent.vue';
import MultiplayerChallengeComponent from '@/components/MultiplayerChallengeComponent.vue';

export default {
  name: 'MultiplayerView',
  components: {
    MultiplayerLobbyComponent,
    ChatComponent,
    MultiplayerChallengeComponent
  },
  data() {
    return {
      isChatEnabled: false,
      currentChallenge: null
    };
  },
  methods: {
    enableChat() {
      this.isChatEnabled = true;
    },
    startChallenge(challenge) {
      this.currentChallenge = challenge;
    }
  }
}
</script>

<style scoped>
.multiplayer {
  padding: 20px;
}
</style>
