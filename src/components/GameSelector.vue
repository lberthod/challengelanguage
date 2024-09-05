<template>
    <div class="game-selector">
      <h2>Sélectionnez un Mini-Jeu</h2>
      <div class="games">
        <div v-for="game in games" :key="game.id" class="game-card" @click="selectGame(game)">
          <h3>{{ game.title }}</h3>
          <p>{{ game.description }}</p>
          <p><strong>Difficulté:</strong> {{ game.difficulty }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'GameSelector',
    data() {
      return {
        games: [
          { id: 1, title: 'Jeu de Vocabulaire', description: 'Apprenez de nouveaux mots', difficulty: 'Facile' },
          { id: 2, title: 'Puzzle de Grammaire', description: 'Améliorez votre grammaire', difficulty: 'Intermédiaire' },
          { id: 3, title: 'Prononciation', description: 'Perfectionnez votre accent', difficulty: 'Avancé' }
        ]
      }
    },
    methods: {
      selectGame(game) {
        this.$emit('select-game', game);
      }
    }
  }
  </script>
  
  <style scoped>
  .game-selector {
    text-align: center;
  }
  .games {
    display: flex;
    justify-content: center;
    gap: 20px;
  }
  .game-card {
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 10px;
    cursor: pointer;
    transition: transform 0.2s;
  }
  .game-card:hover {
    transform: scale(1.05);
  }
  </style>
  