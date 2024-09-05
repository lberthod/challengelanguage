<template>
  <div class="notifications">
    <h2>Notifications Récentes</h2>
    <ul>
      <li v-for="notification in notifications" :key="notification.id">
        {{ notification.message }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'NotificationsComponent',
  data() {
    return {
      notifications: [
        { id: 1, message: 'Vous avez gagné un badge!' },
        { id: 2, message: 'Nouvelle leçon disponible.' },
        // Ajouter plus de notifications
      ]
    }
  }
}
</script>

<style scoped>
.notifications {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}
</style>
