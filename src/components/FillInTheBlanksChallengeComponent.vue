<template>
    <div class="fill-in-the-blanks-challenge">
      <h2>Défi "Remplir les Blancs"</h2>
      <p>Complétez la phrase en sélectionnant le bon mot !</p>
  
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
  
      <!-- Category selection -->
      <div v-if="!gameStarted && selectedLanguage" class="category-selection">
        <label for="category">Sélectionnez une catégorie :</label>
        <select v-model="selectedCategory" id="category">
          <option value="" disabled>Sélectionner une catégorie</option>
          <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
        </select>
      </div>
  
      <!-- Level selection -->
      <div v-if="!gameStarted && selectedCategory" class="level-selection">
        <label for="level">Sélectionnez un niveau :</label>
        <select v-model="selectedLevel" id="level">
          <option value="" disabled>Sélectionner un niveau</option>
          <option v-for="level in levels" :key="level" :value="level">{{ level }}</option>
        </select>
      </div>
  
      <!-- Start button -->
      <button v-if="!gameStarted && selectedLevel" @click="startGame" class="start-button">Commencer le Jeu</button>
  
      <!-- Display the sentence with blanks and word choices -->
      <div v-if="gameStarted" class="game-area">
        <p><strong>Phrase :</strong> {{ currentSentence }}</p>
  
        <div class="word-options">
          <button v-for="(option, index) in currentOptions" :key="index" @click="checkAnswer(option)">
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
    name: 'FillInTheBlanksChallengeComponent',
    data() {
      return {
        languages: {
          en: 'Anglais',
          fr: 'Français',
          it: 'Italien',
          ru: 'Russe',
          zh: 'Chinois',
          es: 'Espagnol',
          pt: 'Portugais',
        },
        categories: ['legumes', 'arbres', 'outils_de_soins', 'technologie'], // Exemples de catégories
        levels: ['1', '2', '3'], // Niveaux
  
        selectedLanguage: '', // Langue sélectionnée
        selectedCategory: '', // Catégorie sélectionnée
        selectedLevel: '', // Niveau sélectionné
        sentences: [], // Stocke les phrases provenant de la base de données
        currentSentence: '', // Stocke la phrase actuelle
        currentOptions: [], // Stocke les options de mots
        correctAnswer: '', // Stocke la réponse correcte
        feedbackMessage: '',
        isCorrect: false,
        gameStarted: false
      };
    },
    methods: {
      loadSentences() {
        const dbRef = ref(database, `categories/${this.selectedCategory}/levels/${this.selectedLevel}/fillblank_game/pairs`);
        get(dbRef)
          .then(snapshot => {
            if (snapshot.exists()) {
              this.sentences = Object.values(snapshot.val());
            } else {
              console.warn('Aucune phrase disponible.');
            }
          })
          .catch(error => {
            console.error('Erreur lors de la récupération des phrases :', error);
          });
      },
      startGame() {
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
          this.currentSentence = selectedSentence.sentence[this.selectedLanguage].replace('___', '___');
          this.currentOptions = this.removeDuplicates([...selectedSentence.blanks]);
          this.correctAnswer = selectedSentence.correct[this.selectedLanguage];
          this.isCorrect = false;
          this.feedbackMessage = '';
        } else {
          console.error('La phrase sélectionnée est invalide.');
        }
      },
      removeDuplicates(array) {
        return [...new Set(array)];
      },
      shuffleArray(array) {
        return array.sort(() => Math.random() - 0.5);
      },
      checkAnswer(selectedWord) {
        if (selectedWord === this.correctAnswer) {
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
  .fill-in-the-blanks-challenge {
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
  
  .word-options {
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
  
  .language-selection, .category-selection, .level-selection {
    margin-bottom: 20px;
  }
  </style>
  