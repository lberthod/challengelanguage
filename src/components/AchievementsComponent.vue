<template>
    <div class="achievements">
      <h2>Récompenses et Badges</h2>
      <div class="badges">
        <div class="badge" v-for="badge in badges" :key="badge.id">
          <img :src="badge.icon" :alt="badge.name" />
          <p>{{ badge.name }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AchievementsComponent',
    data() {
      return {
        badges: [
          { id: 1, name: 'Débutant', icon: '/assets/badge1.png' },
          { id: 2, name: 'Intermédiaire', icon: '/assets/badge2.png' },
          { id: 3, name: 'Expert', icon: '/assets/badge3.png' }
          // Plus de badges peuvent être ajoutés ici
        ]
      }
    }
  }
  </script>
  
  <style scoped>
  .achievements {
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
  }
  .badges {
    display: flex;
    gap: 10px;
  }
  .badge {
    text-align: center;
  }
  .badge img {
    width: 50px;
    height: 50px;
  }
  </style>
  