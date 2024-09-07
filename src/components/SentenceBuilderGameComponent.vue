<template>
    <div class="sentence-builder-game">
      <h2>Jeu de Construction de Phrases</h2>
      <p>Construisez la phrase correcte en sélectionnant les mots dans le bon ordre !</p>
  
      <!-- Start button to initiate the game -->
      <button v-if="!gameStarted" @click="startGame" class="start-button">Commencer le Jeu</button>
  
      <!-- Display the sentence to build -->
      <div v-if="gameStarted && currentSentence" class="sentence-area">
        <p><strong>Phrase à construire :</strong></p>
        <p class="scrambled-sentence">{{ scrambledSentence.join(' ') }}</p>
  
        <!-- Buttons for selecting words -->
        <div class="word-options">
          <button
            v-for="(word, index) in scrambledSentence"
            :key="index"
            @click="selectWord(word, index)"
            :disabled="selectedIndexes.includes(index)"
            class="word-button"
          >
            {{ word }}
          </button>
        </div>
  
        <!-- Display the constructed sentence -->
        <div class="built-sentence">
          <p><strong>Votre construction :</strong></p>
          <p>{{ constructedSentence.join(' ') }}</p>
        </div>
  
        <!-- Submit and check result -->
        <button @click="checkSentence" v-if="constructedSentence.length === scrambledSentence.length" class="submit-button">
          Vérifier
        </button>
  
        <!-- Button to reset the selection -->
        <button @click="resetSelection" class="reset-button">Annuler</button>
  
        <!-- Feedback message -->
        <p v-if="feedbackMessage" class="feedback">{{ feedbackMessage }}</p>
  
        <!-- Next sentence button -->
        <button v-if="isCorrect" @click="nextSentence" class="next-sentence-button">Phrase Suivante</button>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, get } from 'firebase/database';
  import { database } from '@/firebase.js'; // Assurez-vous que ce fichier est bien configuré
  
  export default {
    name: 'SentenceBuilderGameComponent',
    data() {
      return {
        sentences: [],
        currentSentence: null,
        scrambledSentence: [],
        constructedSentence: [],
        selectedIndexes: [],
        feedbackMessage: '',
        gameStarted: false,
        isCorrect: false
      };
    },
    methods: {
      loadSentences() {
        console.log('Chargement des phrases depuis Firebase...');
        const dbRef = ref(database, 'sentences');
        get(dbRef)
          .then((snapshot) => {
            if (snapshot.exists()) {
              this.sentences = Object.values(snapshot.val());
              console.log('Phrases chargées avec succès : ', this.sentences);
            } else {
              console.warn('Aucune phrase disponible.');
            }
          })
          .catch((error) => {
            console.error('Erreur lors de la récupération des phrases: ', error);
          });
      },
      startGame() {
        console.log('Le bouton "Commencer le Jeu" a été cliqué.');
        this.loadSentences();
        
        setTimeout(() => {
          if (this.sentences.length > 0) {
            this.nextSentence();
            this.gameStarted = true;
            console.log('Le jeu a démarré.');
          } else {
            console.error('Aucune phrase n\'a été chargée.');
          }
        }, 1000);
      },
      nextSentence() {
        if (this.sentences.length === 0) {
          console.error('Aucune phrase à afficher.');
          return;
        }
  
        const randomIndex = Math.floor(Math.random() * this.sentences.length);
        const selectedSentence = this.sentences[randomIndex];
  
        if (selectedSentence && selectedSentence.french) {
          this.currentSentence = selectedSentence.french;
          console.log('Phrase sélectionnée : ', this.currentSentence);
          this.scrambledSentence = this.shuffleArray(this.currentSentence.split(' '));
          this.constructedSentence = [];
          this.selectedIndexes = [];
          this.feedbackMessage = '';
          this.isCorrect = false;
        } else {
          console.error('La phrase sélectionnée est invalide ou ne contient pas de texte en français.');
        }
      },
      shuffleArray(array) {
        return array.sort(() => Math.random() - 0.5);
      },
      selectWord(word, index) {
        const selectedIndex = this.selectedIndexes.indexOf(index);
        
        if (selectedIndex === -1) {
          this.constructedSentence.push(word);
          this.selectedIndexes.push(index);
        } else {
          this.constructedSentence.splice(selectedIndex, 1);
          this.selectedIndexes.splice(selectedIndex, 1);
        }
      },
      checkSentence() {
        const builtSentence = this.constructedSentence.join(' ');
        if (builtSentence === this.currentSentence) {
          this.feedbackMessage = 'Bravo ! La phrase est correcte.';
          this.isCorrect = true;
          console.log('Phrase correcte : ', builtSentence);
        } else {
          this.feedbackMessage = 'Incorrect. Essayez encore.';
          console.log('Phrase incorrecte : ', builtSentence);
        }
      },
      resetSelection() {
        console.log('Réinitialisation de la sélection...');
        this.constructedSentence = [];
        this.selectedIndexes = [];
      }
    }
  };
  </script>
  
  <style scoped>
  .sentence-builder-game {
    padding: 20px;
    text-align: center;
  }
  
  .start-button, .submit-button, .next-sentence-button, .reset-button {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
  }
  
  .reset-button {
    background-color: #d9534f;
  }
  
  .reset-button:hover {
    background-color: #c9302c;
  }
  
  .word-options {
    margin-top: 20px;
  }
  
  .word-button {
    padding: 10px;
    margin: 5px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
  }
  
  .word-button:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }
  
  .built-sentence, .scrambled-sentence {
    margin-top: 20px;
    font-size: 18px;
    font-weight: bold;
  }
  
  .feedback {
    margin-top: 20px;
    font-size: 18px;
    font-weight: bold;
    color: #d9534f;
  }
  
  button:hover {
    background-color: #3a8d74;
  }
  </style>
  