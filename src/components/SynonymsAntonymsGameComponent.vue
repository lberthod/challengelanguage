<template>
  <div class="sentence-builder-game">
    <h2>Jeu de Construction de Phrase</h2>
    <p>Réorganisez les mots pour former une phrase correcte !</p>

    <!-- Language selection -->
    <div v-if="!gameStarted" class="language-selection">
      <label for="language">Sélectionnez une langue :</label>
      <select v-model="selectedLanguage" id="language">
        <option value="" disabled>Sélectionner une langue</option>
        <option v-for="(languageName, languageCode) in languages" :key="languageCode" :value="languageCode">
          {{ languageName }}
        </option>
      </select>
    </div>

    <!-- Category and Level selection -->
    <div v-if="!gameStarted && selectedLanguage" class="level-selection">
      <label for="level">Sélectionnez un niveau :</label>
      <select v-model="selectedLevel" id="level" @change="loadFirebaseData">
        <option value="" disabled>Sélectionner un niveau</option>
        <option v-for="level in levels" :key="level" :value="level">{{ level }}</option>
      </select>
    </div>

    <!-- Start game button -->
    <button v-if="!gameStarted && words.length > 0" @click="startGame" class="start-button">Commencer le Jeu</button>

    <!-- Scrambled words for sentence building -->
    <div v-if="gameStarted" class="sentence-area">
      <p><strong>Réorganisez les mots :</strong></p>
      <div class="scrambled-words">
        <button v-for="(word, index) in scrambledWords" :key="index" @click="addWordToSentence(index)">
          {{ word }}
        </button>
      </div>

      <p><strong>Votre phrase :</strong> {{ constructedSentence.join(' ') }}</p>

      <button @click="checkSentence" class="check-button">Vérifier</button>

      <p v-if="feedbackMessage" class="feedback">{{ feedbackMessage }}</p>
    </div>
  </div>
</template>

<script>
import { ref, get } from 'firebase/database';
import { database } from '@/firebase.js'; // Firebase configuration

export default {
  name: 'SentenceBuilderGame',
  data() {
    return {
      languages: {
        en: 'Anglais',
        fr: 'Français',
        it: 'Italien',
        ru: 'Russe',
        zh: 'Chinois',
        es: 'Espagnol',
        pt: 'Portugais'
      },
      levels: ['1', '2', '3'], // Levels for the game
      selectedLanguage: '',
      selectedLevel: '',
      words: [], // Word data from the database
      scrambledWords: [],
      constructedSentence: [],
      correctSentence: '',
      feedbackMessage: '',
      gameStarted: false
    };
  },
  methods: {
    loadFirebaseData() {
      const dbRef = ref(database, `categories/${this.selectedCategory}/levels/${this.selectedLevel}/synonyms_antonyms`);
      get(dbRef)
        .then(snapshot => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            this.words = data[this.selectedLanguage];
            console.log('Données récupérées : ', this.words);
          } else {
            console.warn('Aucune donnée disponible.');
          }
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des données Firebase : ', error);
        });
    },
    startGame() {
      this.gameStarted = true;
      this.nextSentence();
    },
    nextSentence() {
      const randomIndex = Math.floor(Math.random() * this.words.length);
      const sentenceData = this.words[randomIndex];

      this.correctSentence = sentenceData.correct;
      this.scrambledWords = this.shuffleArray([...sentenceData.scrambled]);
      this.constructedSentence = [];
      this.feedbackMessage = '';
    },
    addWordToSentence(index) {
      this.constructedSentence.push(this.scrambledWords[index]);
      this.scrambledWords.splice(index, 1); // Remove word from the scrambled list
    },
    checkSentence() {
      if (this.constructedSentence.join(' ') === this.correctSentence) {
        this.feedbackMessage = 'Bravo ! Vous avez formé la phrase correcte.';
      } else {
        this.feedbackMessage = 'Incorrect. Essayez encore.';
      }
    },
    shuffleArray(array) {
      return array.sort(() => Math.random() - 0.5);
    }
  }
};
</script>

<style scoped>
.sentence-builder-game {
  padding: 20px;
  text-align: center;
}

.scrambled-words {
  margin-top: 20px;
}

button {
  margin: 5px;
  padding: 10px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.check-button {
  margin-top: 20px;
}

.feedback {
  margin-top: 20px;
  font-size: 18px;
  font-weight: bold;
}
</style>
