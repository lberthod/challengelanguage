<template>
  <div class="profile">
    <UserProfileComponent />
    <UserStatsComponent />
    <AchievementsComponent />
    <SettingsComponent />
  </div>
</template>

<script>
import UserProfileComponent from '@/components/UserProfileComponent.vue';
import UserStatsComponent from '@/components/UserStatsComponent.vue';
import AchievementsComponent from '@/components/AchievementsComponent.vue';
import SettingsComponent from '@/components/SettingsComponent.vue';

export default {
  name: 'ProfileView',
  components: {
    UserProfileComponent,
    UserStatsComponent,
    AchievementsComponent,
    SettingsComponent
  }
}
</script>

<style scoped>
.profile {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
