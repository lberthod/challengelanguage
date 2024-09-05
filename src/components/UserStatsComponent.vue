<template>
    <div class="user-stats">
      <h2>Statistiques de l'Utilisateur</h2>
      <ul>
        <li><strong>Temps de jeu :</strong> {{ userStats.playTime }} heures</li>
        <li><strong>Score total :</strong> {{ userStats.totalScore }}</li>
        <li><strong>Niveau actuel :</strong> {{ userStats.currentLevel }}</li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: 'UserStatsComponent',
    data() {
      return {
        userStats: {
          playTime: 12,  // Exemple de données, vous devez les récupérer dynamiquement
          totalScore: 1500,
          currentLevel: 'Intermédiaire'
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .user-stats {
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
  }
  .user-stats ul {
    list-style: none;
    padding: 0;
  }
  .user-stats li {
    margin: 10px 0;
  }
  </style>
  