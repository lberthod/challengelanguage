<template>
  <div class="dashboard">
    <UserProgressComponent />
    <ChallengesListComponent />
    <LeaderboardComponent />
    <NotificationsComponent />
    <RecommendationEngineComponent />
    <button @click="showModal = true">Show Modal</button>
    <ModalComponent :isVisible="showModal" @close="showModal = false">
      <h3>This is a modal content!</h3>
    </ModalComponent>
  </div>
</template>

<script>
import UserProgressComponent from '@/components/UserProgressComponent.vue';
import ChallengesListComponent from '@/components/ChallengesListComponent.vue';
import LeaderboardComponent from '@/components/LeaderboardComponent.vue';
import NotificationsComponent from '@/components/NotificationsComponent.vue';
import RecommendationEngineComponent from '@/components/RecommendationEngineComponent.vue';
import ModalComponent from '@/components/ModalComponent.vue';

export default {
  name: 'DashboardView',
  components: {
    UserProgressComponent,
    ChallengesListComponent,
    LeaderboardComponent,
    NotificationsComponent,
    RecommendationEngineComponent,
    ModalComponent
  },
  data() {
    return {
      showModal: false
    };
  }
};
</script>

<style scoped>
.dashboard {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
