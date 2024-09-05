<template>
    <div class="synonyms-antonyms-game">
      <h2>Jeu de Synonymes et Antonymes</h2>
      <p>Devinez un synonyme ou un antonyme du mot affiché !</p>
  
      <!-- Subcategory selection -->
      <div v-if="!gameStarted">
        <label for="subcategory">Choisissez une sous-catégorie :</label>
        <select id="subcategory" v-model="selectedSubcategory" @change="loadFirebaseData">
          <option disabled value="">Sélectionner</option>
          <option v-for="subcategory in subcategories" :key="subcategory" :value="subcategory">{{ subcategory }}</option>
        </select>
      </div>
  
      <!-- Start button to initiate the game -->
      <button v-if="!gameStarted && selectedSubcategory" @click="startGame" class="start-button">Start</button>
  
      <!-- Display the word for guessing -->
      <div v-if="gameStarted" class="guess-area">
        <p><strong>Mot :</strong> {{ currentWord.text.french }} ({{ currentMode }})</p>
        <p>Choisissez un {{ currentMode }} parmi les options :</p>
  
        <!-- Display buttons with possible answers -->
        <div class="options-container">
          <button v-for="(option, index) in answerOptions" :key="index" @click="checkAnswer(option)" class="option-button">
            {{ option }}
          </button>
        </div>
  
        <!-- Display feedback after checking the answer -->
        <p v-if="feedbackMessage" class="feedback">{{ feedbackMessage }}</p>
  
        <!-- Button to load the next word -->
        <button v-if="isCorrect" @click="nextWord" class="next-word-button">Mot suivant</button>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, get } from 'firebase/database';
  import { database } from '@/firebase.js'; // Firebase configuration
  
  export default {
    name: 'SynonymsAntonymsGameComponent',
    data() {
      return {
        subcategories: ['adjectives', 'verbs', 'nouns'], // List of subcategories
        selectedSubcategory: '',
        words: [],
        currentWord: null,
        currentMode: 'synonyme', // Mode can be either 'synonyme' or 'antonyme'
        answerOptions: [], // Options to display for guessing
        feedbackMessage: '',
        isCorrect: false,
        gameStarted: false
      };
    },
    methods: {
      loadFirebaseData() {
        const dbRef = ref(database, `synonyms_antonyms/${this.selectedSubcategory}`);
        get(dbRef)
          .then((snapshot) => {
            if (snapshot.exists()) {
              this.words = Object.values(snapshot.val());
              console.log('Données récupérées : ', this.words);
            } else {
              console.warn('Aucune donnée disponible.');
            }
          })
          .catch((error) => {
            console.error('Erreur lors de la récupération des données Firebase : ', error);
          });
      },
      startGame() {
        if (this.words.length === 0) {
          alert('Veuillez choisir une sous-catégorie valide.');
          return;
        }
        this.gameStarted = true;
        this.nextWord();
      },
      nextWord() {
        // Select a random word from the list
        const randomIndex = Math.floor(Math.random() * this.words.length);
        this.currentWord = this.words[randomIndex];
        this.currentMode = Math.random() > 0.5 ? 'synonymes' : 'antonymes'; // Randomly switch between synonymes and antonymes
  
        // Ensure the word has the required property (synonyme or antonyme)
        if (!this.currentWord[this.currentMode] || !Array.isArray(this.currentWord[this.currentMode].french)) {
          console.warn(`Pas de ${this.currentMode} pour ce mot.`);
          this.nextWord(); // Retry with another word
        } else {
          this.prepareOptions();
        }
  
        this.feedbackMessage = '';
        this.isCorrect = false;
      },
      prepareOptions() {
        const correctAnswers = this.currentWord[this.currentMode]?.french || []; // Correct options (synonyms or antonyms)
        const incorrectAnswers = this.getIncorrectAnswers(); // Generate incorrect answers
        this.answerOptions = this.shuffleArray([...correctAnswers, ...incorrectAnswers]); // Shuffle correct and incorrect options together
      },
      getIncorrectAnswers() {
        // Generate some incorrect options from the other words in the list
        const otherWords = this.words.filter(word => word !== this.currentWord);
        const incorrectOptions = [];
        while (incorrectOptions.length < 2) { // Add 2 incorrect options
          const randomIndex = Math.floor(Math.random() * otherWords.length);
          const randomWord = otherWords[randomIndex].text.french;
          if (!incorrectOptions.includes(randomWord)) {
            incorrectOptions.push(randomWord);
          }
        }
        return incorrectOptions;
      },
      shuffleArray(array) {
        return array.sort(() => Math.random() - 0.5);
      },
      checkAnswer(selectedOption) {
        const correctAnswers = this.currentWord[this.currentMode]?.french || []; // Get correct synonyms or antonyms
        if (correctAnswers.includes(selectedOption)) {
          this.feedbackMessage = 'Bonne réponse !';
          this.isCorrect = true;
        } else {
          this.feedbackMessage = `Incorrect. Les ${this.currentMode}s possibles sont : ${correctAnswers.join(', ')}`;
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .synonyms-antonyms-game {
    padding: 20px;
    text-align: center;
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
  }
  
  .options-container {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
  }
  
  .option-button {
    padding: 10px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
  }
  
  .option-button:hover {
    background-color: #3a8d74;
  }
  
  .feedback {
    margin-top: 20px;
    font-size: 18px;
    font-weight: bold;
  }
  
  .next-word-button {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
  }
  </style>
  