<template>
  <div class="user-progress">
    <h2>Progression de l'utilisateur</h2>
    <progress-bar :progress="progress"></progress-bar>
  </div>
</template>

<script>
import ProgressBar from '@/components/ProgressBarComponent.vue';

export default {
  name: 'UserProgressComponent',
  components: {
    ProgressBar
  },
  data() {
    return {
      progress: 50  // Exemple de données, à récupérer dynamiquement
    }
  }
}
</script>

<style scoped>
.user-progress {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}
</style>
