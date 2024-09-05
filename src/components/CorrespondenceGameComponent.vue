<template>
  <div class="game-component">
    <h2>{{ gameTitle }}</h2>
    <p>Sélectionnez un mot en anglais et un mot en français pour les faire correspondre.</p>

    <!-- Category Selection -->
    <div v-if="!gameStarted">
      <label for="subcategory">Choisissez une sous-catégorie :</label>
      <select id="subcategory" v-model="selectedSubcategory" @change="loadWordsFromFirebase">
        <option disabled value="">Sélectionner une catégorie</option>
        <option v-for="subcategory in subcategories" :key="subcategory" :value="subcategory">
          {{ subcategory }}
        </option>
      </select>
    </div>

    <!-- Game Content -->
    <div v-if="gameStarted" class="word-lists">
      <!-- English Word List -->
      <div class="word-list">
        <h3>Mots en Anglais</h3>
        <div
          v-for="word in wordsEnglish"
          :key="word.id"
          class="word-item"
          :class="{ selected: selectedEnglishWord && selectedEnglishWord.id === word.id }"
          @click="selectWord(word, 'english')"
        >
          {{ word.text }} ({{ word.id }})
        </div>
      </div>

      <!-- French Word List -->
      <div class="word-list">
        <h3>Mots en Français</h3>
        <div
          v-for="word in wordsFrench"
          :key="word.id"
          class="word-item"
          :class="{ selected: selectedFrenchWord && selectedFrenchWord.id === word.id }"
          @click="selectWord(word, 'french')"
        >
          {{ word.text }} ({{ word.id }})
        </div>
      </div>
    </div>

    <p v-if="isGameComplete">Bravo! Vous avez fait correspondre tous les mots!</p>

    <button v-if="isGameComplete" @click="loadNextBatch" class="restart-button">Charger plus de mots</button>
  </div>
</template>

<script>
import { ref, get } from 'firebase/database';
import { database } from '@/firebase.js'; // Import Firebase config

export default {
  name: 'CorrespondenceGameComponent',
  data() {
    return {
      subcategories: ['animal-1', 'animal-2', 'maison-1', 'nourriture-1', 'salutations'],
      selectedSubcategory: '',
      wordPairs: [],
      wordsEnglish: [],
      wordsFrench: [],
      currentBatch: [],
      batchSize: 10, // Only show 10 words at a time
      selectedEnglishWord: null,
      selectedFrenchWord: null,
      isGameComplete: false,
      gameStarted: false,
    };
  },
  computed: {
    gameTitle() {
      return this.game ? this.game.name : 'Jeu de Correspondance';
    }
  },
  methods: {
    loadWordsFromFirebase() {
      if (!this.selectedSubcategory) return;

      console.log(`Loading words from Firebase for subcategory: ${this.selectedSubcategory}`);

      const dbRef = ref(database, `words/${this.selectedSubcategory}`);

      get(dbRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            this.wordPairs = Object.values(data);

            // Shuffle and load the first batch of 10 words
            this.shuffleArray(this.wordPairs);
            this.loadNextBatch();
            this.gameStarted = true;
            console.log('Words loaded:', this.wordPairs);
          } else {
            console.warn('No data available for this subcategory.');
          }
        })
        .catch((error) => {
          console.error('Error fetching data from Firebase:', error);
        });
    },
    shuffleArray(array) {
      array.sort(() => Math.random() - 0.5); // Shuffle array randomly
    },
    loadNextBatch() {
      if (this.wordPairs.length > 0) {
        // Take the next batch of 10 word pairs
        const batch = this.wordPairs.splice(0, this.batchSize);

        // Shuffle the English and French words separately for random order
        const englishWords = batch.map(pair => ({ id: pair.id, text: pair.english }));
        const frenchWords = batch.map(pair => ({ id: pair.id, text: pair.french }));

        this.shuffleArray(englishWords);
        this.shuffleArray(frenchWords);

        this.wordsEnglish = englishWords;
        this.wordsFrench = frenchWords;

        this.isGameComplete = false; // Reset game completion
      } else {
        this.isGameComplete = true;
        console.log('All words have been matched.');
      }
    },
    selectWord(word, language) {
      if (language === 'english') {
        this.selectedEnglishWord = word;
      } else if (language === 'french') {
        this.selectedFrenchWord = word;
      }

      // Log selected words for debugging
      console.log('Selected English Word:', this.selectedEnglishWord);
      console.log('Selected French Word:', this.selectedFrenchWord);

      // Check if both words are selected
      if (this.selectedEnglishWord && this.selectedFrenchWord) {
        this.checkMatch();
      }
    },
    checkMatch() {
      if (this.selectedEnglishWord.id === this.selectedFrenchWord.id) {
        console.log('Match found! Removing words.');
        this.removeMatchedWords(this.selectedEnglishWord.id);
      } else {
        console.log('No match. Resetting selections.');
        this.selectedEnglishWord = null;
        this.selectedFrenchWord = null;
      }
    },
    removeMatchedWords(id) {
      console.log(`Removing matched words with ID = ${id}`);
      this.wordsEnglish = this.wordsEnglish.filter(word => word.id !== id);
      this.wordsFrench = this.wordsFrench.filter(word => word.id !== id);
      this.selectedEnglishWord = null;
      this.selectedFrenchWord = null;
      console.log('Remaining words after removal:', this.wordsEnglish, this.wordsFrench);
      this.checkGameCompletion();
    },
    checkGameCompletion() {
      if (this.wordsEnglish.length === 0 && this.wordsFrench.length === 0) {
        this.isGameComplete = true;
        console.log('Batch completed!');
      }
    }
  }
};
</script>

<style scoped>
.game-component {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  margin-top: 20px;
}

.game-component h2 {
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
}

.word-lists {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.word-list {
  width: 45%;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 5px;
  background-color: #f0f0f0;
  min-height: 150px;
}

.word-item {
  padding: 8px;
  margin: 5px 0;
  background-color: #42b983;
  color: white;
  border-radius: 3px;
  cursor: pointer;
  text-align: center;
  user-select: none;
  transition: background-color 0.3s ease;
}

.word-item:hover {
  background-color: #3a8d74;
}

.word-item.selected {
  background-color: #ffc107; /* Highlight selected word */
}

.restart-button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #f39c12;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.restart-button:hover {
  background-color: #e67e22;
}
</style>
