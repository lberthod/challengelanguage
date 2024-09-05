<template>
  <div class="word-rain-game">
    <h2>Jeu de Correspondance de Mots</h2>
    <p>Faites glisser les mots anglais sur leur traduction française correcte pour marquer des points.</p>

    <!-- Subcategory selection -->
    <div v-if="!gameStarted" class="subcategory-selection">
      <label for="subcategory">Choisissez une sous-catégorie :</label>
      <select id="subcategory" v-model="selectedSubcategory" @change="loadFirebaseData">
        <option disabled value="">Sélectionner</option>
        <option v-for="subcategory in subcategories" :key="subcategory" :value="subcategory">{{ subcategory }}</option>
      </select>
    </div>

    <!-- Start button to initiate the game -->
    <button v-if="!gameStarted && selectedSubcategory" @click="startGame" class="start-button">Commencer</button>

    <!-- Display timer, score, and streak -->
    <div v-if="gameStarted" class="game-info">
      <p>Temps écoulé : {{ counter }} secondes</p>
      <p>Score: {{ score }}</p>
      <p>Multiplicateur de Score: x{{ streakMultiplier }}</p>
    </div>

    <!-- Game content will only be shown if the game has started -->
    <div v-if="gameStarted">
      <!-- Display drop zones with French words -->
      <div class="drop-zones">
        <div
          v-for="pair in currentWordPairs"
          :key="'drop-' + pair.french"
          class="drop-zone"
          :class="{ 'streak-bonus': isOnStreak }"
          @dragover.prevent
          @drop="handleDrop(pair.french)"
        >
          {{ pair.french }}
        </div>
      </div>

      <!-- Display draggable English words -->
      <div class="words-container">
        <transition-group name="word-fade" tag="div">
          <div
            v-for="word in englishWords"
            :key="word.id"
            class="word-item"
            :style="getWordStyle(word.position)"
            :data-id="word.id"
            draggable="true"
            @dragstart="handleDragStart(word)"
          >
            {{ word.text }}
          </div>
        </transition-group>
      </div>

      <!-- Progress bar -->
      <div class="progress-bar-container">
        <div class="progress-bar" :style="{ width: progressBarWidth + '%' }"></div>
      </div>

      <!-- Achievement unlocked message -->
      <div v-if="achievementUnlocked" class="achievement-message">
        <p>{{ achievementUnlocked }}</p>
      </div>

      <!-- Power-up section -->
      <div class="power-ups">
        <button @click="usePowerUp('freezeTime')" class="power-up-button">Freeze Time</button>
        <button @click="usePowerUp('showMatch')" class="power-up-button">Show Match</button>
        <button @click="usePowerUp('doublePoints')" class="power-up-button">Double Points</button>
      </div>
    </div>

    <!-- Modal Component -->
    <ModalComponent 
      v-if="showModal"
      :title="modalTitle"
      :message="modalMessage"
      :visible="showModal"
      @close="closeModal"
    />
  </div>
</template>

<script>/* eslint-disable */ 
import { ref, get } from 'firebase/database';
import { database } from '@/firebase.js';
import ModalComponent from '@/components/ModalComponent.vue';

export default {
  name: 'WordRainComponent',
  components: {
    ModalComponent
  },
  data() {
    return {
      subcategories: ['animal-1', 'animal-2', 'animal-3', 'animal-phrase-1', 'maison-1', 'maison-2', 'maison-phrase-1', 'nourriture-1', 'nourriture-2', 'nourriture-phrase-1', 'quotidien-1', 'quotidien-2', 'quotidien-phrase-1', 'salutations'],
      selectedSubcategory: '',
      wordPairs: [],
      currentWordPairs: [],
      words: [],
      currentDragWord: null,
      score: 0,
      streakMultiplier: 1,
      gameStarted: false,
      counter: 0,
      counterInterval: null,
      progressBarWidth: 0,
      achievementUnlocked: '',
      powerUps: {
        freezeTime: 1,
        showMatch: 1,
        doublePoints: 1
      },
      isOnStreak: false,
      showModal: false,
      modalTitle: '',
      modalMessage: ''
    };
  },
  computed: {
    englishWords() {
      return this.words.filter(word => word.type === 'english');
    }
  },
  methods: {
    async loadFirebaseData() {
      const subcategory = this.selectedSubcategory;
      const dbRef = ref(database, `words/${subcategory}`);

      try {
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
          this.wordPairs = Object.values(snapshot.val());
          this.prepareWords();
        } else {
          console.warn('No data available for this subcategory.');
        }
      } catch (error) {
        console.error('Error fetching data from Firebase:', error);
      }
    },
    startGame() {
      if (!this.wordPairs.length) {
        this.showModalMessage('Erreur', 'Veuillez choisir une sous-catégorie valide et charger les données.');
        return;
      }
      this.gameStarted = true;
      this.resetGame();
      this.startCounter();
    },
    startCounter() {
      this.counter = 0;
      this.counterInterval = setInterval(() => {
        this.counter++;
      }, 1000);
    },
    resetGame() {
      if (this.wordPairs.length === 0) {
        console.warn('Word pairs data is missing or empty.');
        return;
      }

      const selectedPairs = this.getRandomPairs(6);
      this.currentWordPairs = selectedPairs;
      this.words = selectedPairs.map(pair => ({
        id: pair.english,
        text: pair.english,
        type: 'english',
        position: this.randomPosition()
      }));
      this.updateProgressBar();
    },
    getRandomPairs(number) {
      const pairs = [];
      const usedIndices = new Set();
      while (pairs.length < number) {
        const randomIndex = Math.floor(Math.random() * this.wordPairs.length);
        if (!usedIndices.has(randomIndex)) {
          pairs.push(this.wordPairs[randomIndex]);
          usedIndices.add(randomIndex);
        }
      }
      return pairs;
    },
    updateProgressBar() {
      this.progressBarWidth = (this.score / (this.wordPairs.length * 6)) * 100;
    },
    randomPosition() {
      return {
        x: Math.floor(Math.random() * (window.innerWidth - 100)),
        y: Math.floor(Math.random() * (window.innerHeight - 600))
      };
    },
    getWordStyle(position) {
      return { top: position.y + 'px', left: position.x + 'px' };
    },
    handleDragStart(word) {
      this.currentDragWord = word;
    },
    handleDrop(targetFrenchWord) {
      if (this.currentDragWord) {
        const wordPair = this.currentWordPairs.find(pair =>
          pair.english === this.currentDragWord.text && pair.french === targetFrenchWord);
        if (wordPair) {
          this.words = this.words.filter(word => word.text !== wordPair.english);
          this.score += 10 * this.streakMultiplier;
          this.streakMultiplier++;
          this.isOnStreak = true;
          this.checkAchievements();
          if (this.words.length === 0) {
            this.resetGame();
          }
        } else {
          this.streakMultiplier = 1;
          this.isOnStreak = false;
        }
        this.currentDragWord = null;
      }
    },
    usePowerUp(type) {
      if (this.powerUps[type] > 0) {
        switch (type) {
          case 'freezeTime':
            clearInterval(this.counterInterval);
            setTimeout(this.startCounter, 5000);
            break;
          case 'showMatch':
            this.showModalMessage('Hint', 'Match the word to its correct translation!');
            break;
          case 'doublePoints':
            this.streakMultiplier *= 2;
            break;
        }
        this.powerUps[type]--;
      } else {
        this.showModalMessage('Information', 'No more power-ups of this type available!');
      }
    },
    showModalMessage(title, message) {
      this.modalTitle = title;
      this.modalMessage = message;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    checkAchievements() {
      if (this.score >= 100 && !this.achievementUnlocked) {
        this.achievementUnlocked = 'Bravo! Vous avez atteint 100 points!';
        setTimeout(() => {
          this.achievementUnlocked = '';
        }, 3000);
      }
    },
    endGame() {
      this.showModalMessage('Jeu terminé', `Votre score est de ${this.score} points.`);
      this.resetGameState();
    },
    resetGameState() {
      this.gameStarted = false;
      this.score = 0;
      this.streakMultiplier = 1;
      clearInterval(this.counterInterval);
    }
  }
};
</script>

<style scoped>
.word-rain-game {
  position: relative;
  width: 100%;
  height: 1000px;
  overflow: hidden;
  background-color: #f0f0f0;
  padding: 20px;
  text-align: center;
  transition: background-color 0.5s ease;
}

.word-rain-game.streak-bonus {
  background-color: #e0ffe0;
}

.start-button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.start-button:hover {
  background-color: #3a8d74;
}

.words-container {
  position: relative;
  width: 100%;
  height: 50%;
  margin-top: 20px;
}

.word-item {
  position: absolute;
  background-color: #42b983;
  color: white;
  padding: 10px;
  border-radius: 5px;
  cursor: grab;
  transition: transform 0.3s ease;
}

.drop-zones {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}

.drop-zone {
  width: 100px;
  height: 50px;
  background-color: #3a8d74;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.drop-zone.streak-bonus {
  background-color: #42b983;
}

.progress-bar-container {
  width: 80%;
  background-color: #ddd;
  border-radius: 10px;
  margin: 20px auto;
  overflow: hidden;
}

.progress-bar {
  height: 20px;
  background-color: #42b983;
  width: 0;
  transition: width 0.5s ease;
}

.achievement-message {
  position: fixed;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  background-color: yellow;
  padding: 10px 20px;
  border: 2px solid #333;
  border-radius: 8px;
  font-weight: bold;
}

.power-ups {
  margin-top: 20px;
}

.power-up-button {
  margin: 5px;
  padding: 10px;
  background-color: #f0ad4e;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

.power-up-button:hover {
  background-color: #ec971f;
}
</style>
