<template>
    <div class="verb-tense-challenge">
      <h2>Défi des Temps Verbaux</h2>
      <p>Choisissez la forme correcte du verbe pour compléter la phrase !</p>
  
      <!-- Language selection -->
      <div v-if="!gameStarted" class="language-selection">
        <label for="language">Sélectionnez une langue :</label>
        <select v-model="selectedLanguage" id="language">
          <option value="" disabled>Sélectionner une langue</option>
          <option value="french">Français</option>
          <option value="english">Anglais</option>
          <option value="italian">Italien</option>
        </select>
      </div>
  
      <!-- Start button -->
      <button v-if="!gameStarted && selectedLanguage" @click="startGame" class="start-button">Commencer le Jeu</button>
  
      <!-- Display the incomplete sentence and verb choices -->
      <div v-if="gameStarted" class="game-area">
        <p><strong>Phrase :</strong> {{ currentSentence[selectedLanguage] }}</p>
        <p>Temps verbal : <strong>{{ currentTense }}</strong></p>
  
        <div class="verb-options">
          <button v-for="(option, index) in verbOptions" :key="index" @click="checkAnswer(option)">
            {{ option }}
          </button>
        </div>
  
        <!-- Feedback message -->
        <p v-if="feedbackMessage" class="feedback">{{ feedbackMessage }}</p>
  
        <!-- Next sentence button -->
        <button v-if="isCorrect" @click="nextSentence" class="next-sentence-button">Phrase Suivante</button>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, get } from 'firebase/database';
  import { database } from '@/firebase.js';
  
  export default {
    name: 'VerbTenseChallengeComponent',
    data() {
      return {
        sentences: [], // Store sentences from the database
        currentSentence: null, // Store the current sentence to be completed
        currentTense: '', // Store the tense to be used for the verb
        verbOptions: [], // Store the verb options to choose from
        correctVerb: '', // Store the correct verb
        feedbackMessage: '',
        isCorrect: false,
        gameStarted: false,
        selectedLanguage: '', // Store the selected language
      };
    },
    methods: {
      loadSentences() {
        console.log('Chargement des phrases...');
        const dbRef = ref(database, 'verb_sentences'); // Assuming the Firebase path for verb sentences is 'verb_sentences'
        get(dbRef)
          .then(snapshot => {
            if (snapshot.exists()) {
              this.sentences = Object.values(snapshot.val());
              console.log('Phrases chargées :', this.sentences);
            } else {
              console.warn('Aucune phrase disponible.');
            }
          })
          .catch(error => {
            console.error('Erreur lors de la récupération des phrases :', error);
          });
      },
      startGame() {
        console.log('Démarrage du jeu...');
        this.loadSentences();
  
        setTimeout(() => {
          if (this.sentences.length > 0) {
            this.nextSentence();
            this.gameStarted = true;
          } else {
            console.error('Aucune phrase chargée.');
          }
        }, 1000);
      },
      nextSentence() {
        const randomIndex = Math.floor(Math.random() * this.sentences.length);
        const selectedSentence = this.sentences[randomIndex];
  
        if (selectedSentence) {
          this.currentSentence = selectedSentence;
          this.currentTense = this.randomTense(); // Choose a random tense for the verb
          this.correctVerb = selectedSentence.verbs[this.selectedLanguage][this.currentTense]; // The correct verb for the tense and language
          this.verbOptions = this.generateOptions(selectedSentence.verbs[this.selectedLanguage]); // Generate options (including correct and incorrect forms)
          this.isCorrect = false;
          this.feedbackMessage = '';
        } else {
          console.error('La phrase sélectionnée est invalide.');
        }
      },
      randomTense() {
        const tenses = ['present', 'past', 'future']; // List of possible tenses
        return tenses[Math.floor(Math.random() * tenses.length)];
      },
      generateOptions(verbs) {
        const incorrectOptions = Object.values(verbs).filter(verb => verb !== this.correctVerb);
        const shuffledOptions = [...incorrectOptions.slice(0, 2), this.correctVerb];
        return this.shuffleArray(shuffledOptions);
      },
      shuffleArray(array) {
        return array.sort(() => Math.random() - 0.5);
      },
      checkAnswer(selectedVerb) {
        if (selectedVerb === this.correctVerb) {
          this.feedbackMessage = 'Bravo ! Réponse correcte.';
          this.isCorrect = true;
        } else {
          this.feedbackMessage = 'Incorrect. Essayez encore.';
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .verb-tense-challenge {
    padding: 20px;
    text-align: center;
  }
  
  .start-button, .next-sentence-button {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
  }
  
  .verb-options {
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
  
  .feedback {
    margin-top: 20px;
    font-size: 18px;
    font-weight: bold;
  }
  
  button:hover {
    background-color: #3a8d74;
  }
  
  .language-selection {
    margin-bottom: 20px;
  }
  </style>
  