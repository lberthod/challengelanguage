<template>
    <div class="leaderboard">
      <h2>Classement</h2>
      <ul>
        <li v-for="player in leaderboard" :key="player.id">
          {{ player.name }} - {{ player.score }} points
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: 'LeaderboardComponent',
    data() {
      return {
        leaderboard: [
          { id: 1, name: 'Alice', score: 1200 },
          { id: 2, name: 'Bob', score: 1100 },
          // Ajouter plus de joueurs
        ]
      }
    }
  }
  </script>
  
  <style scoped>
  .leaderboard {
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
  }
  </style>
  