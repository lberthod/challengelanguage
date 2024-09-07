<template>
  <div class="game-view">
    <h1>Sélectionnez un jeu</h1>
    
    <!-- Game selection buttons -->
    <button v-for="game in games" :key="game.id" @click="selectGame(game)" class="game-button">
      {{ game.name }}
    </button>

    <!-- Render the selected game component -->
    <component v-if="selectedGameComponent" :is="selectedGameComponent" :game="selectedGame" />
  </div>
</template>

<script>
// Import the game components
import WordRainComponent from '@/components/WordRainComponent.vue';
import MemoryMatchComponent from '@/components/MemoryMatchComponent.vue';
import CorrespondenceGameComponent from '@/components/CorrespondenceGameComponent.vue';
import SynonymsAntonymsGameComponent from '@/components/SynonymsAntonymsGameComponent.vue';
import VerbTenseChallengeComponent from '@/components/VerbTenseChallengeComponent.vue'; // New game
import TranslationChallengeComponent from '@/components/TranslationChallengeComponent.vue'; // New game component
import TranslationExplorationComponent from '@/components/TranslationExplorationComponent.vue'; // New game component
import FillInTheBlanksChallengeComponent from '@/components/FillInTheBlanksChallengeComponent.vue'; // New game component


import MemoryGame from '@/components/MemoryGame.vue'; // New game component

export default {
  name: 'GameView',
  components: {
    WordRainComponent,
    MemoryMatchComponent,
    CorrespondenceGameComponent,
    SynonymsAntonymsGameComponent,
    VerbTenseChallengeComponent, // New game component
    TranslationChallengeComponent,
    TranslationExplorationComponent,
    MemoryGame,FillInTheBlanksChallengeComponent// New component added

  },
  data() {
    return {
      selectedGame: null,
      selectedGameComponent: null,
      games: [
        { id: 1, name: 'Jeu de Correspondance de Mots', component: 'CorrespondenceGameComponent' },
        { id: 2, name: 'Jeu de Pluie de Mots', component: 'WordRainComponent' },
        { id: 3, name: 'Jeu de Mémoire', component: 'MemoryMatchComponent' },
        { id: 4, name: 'Jeu des Synonymes et Antonymes', component: 'SynonymsAntonymsGameComponent' },
        { id: 5, name: 'Défi des Temps Verbaux', component: 'VerbTenseChallengeComponent' },// New game added here
        { id: 7, name: 'Défi de Traduction Rapide', component: 'TranslationChallengeComponent' },
        { id: 9, name: 'Memory Game', component: 'MemoryGame' },
        { id: 8, name: 'Exploration de Vocabulaire', component: 'TranslationExplorationComponent' },// New game added here
        { id: 10, name: 'Exploration de FillInTheBlanksChallengeComponent', component: 'FillInTheBlanksChallengeComponent' } // New game added here
        // New game added here
        // New game

      ]
    };
  },
  methods: {
    selectGame(game) {
      this.selectedGame = game;
      this.selectedGameComponent = game.component;
    }
  }
};
</script>

<style scoped>
.game-view {
  padding: 20px;
}

.game-button {
  margin: 10px;
  padding: 10px 15px;
  background-color: #42b983;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.game-button:hover {
  background-color: #3a8d74;
}
</style>
