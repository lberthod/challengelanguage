<template>
    <div class="challenges-list">
      <h2>Liste des Défis</h2>
      <ul>
        <li v-for="challenge in challenges" :key="challenge.id">
          {{ challenge.name }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ChallengesListComponent',
    data() {
      return {
        challenges: [
          { id: 1, name: 'Défi de Vocabulaire' },
          { id: 2, name: 'Défi de Grammaire' },
          // Ajouter plus de défis
        ]
      }
    }
  }
  </script>
  
  <style scoped>
  .challenges-list {
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
  }
  </style>
  