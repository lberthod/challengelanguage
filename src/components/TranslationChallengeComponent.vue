<template>
    <div class="translation-exploration-game">
      <h2>Exploration du Vocabulaire</h2>
      <p>Apprenez et révisez le vocabulaire dans plusieurs langues !</p>
      
      <!-- Map exploration -->
      <div class="exploration-map">
        <button v-for="(point, index) in explorationPoints" 
                :key="index" 
                @click="startQuiz(point)" 
                class="exploration-button">
          Exploration {{ index + 1 }}
        </button>
      </div>
  
      <!-- Quiz section -->
      <div v-if="quizStarted" class="quiz-area">
        <p><strong>Mot en {{ selectedLanguageLabel }}:</strong> <span class="highlight">{{ currentWord[selectedLanguage] }}</span></p>
        <p>Choisissez la bonne traduction :</p>
        
        <div class="options">
          <button v-for="(option, index) in answerOptions" 
                  :key="index" 
                  @click="checkAnswer(option)" 
                  class="option-button">
            {{ option }}
          </button>
        </div>
  
        <!-- Feedback messages for the student -->
        <p v-if="feedbackMessage" class="feedback">{{ feedbackMessage }}</p>
  
        <!-- Encourage progression -->
        <p v-if="isCorrect" class="next-step-message">Bien joué ! Prêt pour la prochaine étape ?</p>
  
        <!-- Next sentence button -->
        <button v-if="isCorrect" @click="nextSentence" class="next-sentence-button">Phrase Suivante</button>
        
        <!-- Retry button for incorrect answers -->
        <button v-if="!isCorrect && feedbackMessage" @click="retryQuiz" class="retry-button">Réessayer</button>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, get } from 'firebase/database';
  import { database } from '@/firebase.js';
  
  export default {
    name: 'TranslationExplorationComponent',
    data() {
      return {
        explorationPoints: [], // Points d'exploration
        selectedLanguage: 'french', // Langue sélectionnée pour l'exploration
        selectedLanguageLabel: 'Français', // Étiquette lisible pour l'utilisateur
        quizStarted: false,
        currentWord: null,
        answerOptions: [],
        feedbackMessage: '',
        isCorrect: false
      };
    },
    created() {
      this.loadExplorationData();
    },
    methods: {
      loadExplorationData() {
        const dbRef = ref(database, 'translation_phrases/phrases');
        get(dbRef)
          .then(snapshot => {
            if (snapshot.exists()) {
              this.explorationPoints = Object.values(snapshot.val());
            } else {
              console.warn('Aucune donnée disponible.');
            }
          })
          .catch(error => {
            console.error('Erreur lors du chargement des données Firebase :', error);
          });
      },
      startQuiz(point) {
        this.currentWord = point.languages;
        this.quizStarted = true;
        this.generateOptions();
      },
      generateOptions() {
        const correctAnswer = this.currentWord[this.selectedLanguage];
        const incorrectAnswers = this.explorationPoints
          .map(point => point.languages[this.selectedLanguage])
          .filter(answer => answer !== correctAnswer)
          .slice(0, 2);
        this.answerOptions = this.shuffleArray([...incorrectAnswers, correctAnswer]);
      },
      shuffleArray(array) {
        return array.sort(() => Math.random() - 0.5);
      },
      checkAnswer(selectedOption) {
        const correctAnswer = this.currentWord[this.selectedLanguage];
        if (selectedOption === correctAnswer) {
          this.feedbackMessage = 'Bonne réponse ! Excellent travail. Continuez ainsi pour apprendre plus de vocabulaire !';
          this.isCorrect = true;
        } else {
          this.feedbackMessage = `Ce n'est pas la bonne réponse. Essayez encore ! Le bon mot est : ${correctAnswer}.`;
          this.isCorrect = false;
        }
      },
      retryQuiz() {
        this.feedbackMessage = '';
      },
      nextSentence() {
        this.quizStarted = false;
        this.feedbackMessage = '';
        this.isCorrect = false;
      }
    }
  };
  </script>
  
  <style scoped>
  .translation-exploration-game {
    padding: 20px;
    text-align: center;
    background-color: #f5f5f5;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .highlight {
    color: #42b983;
    font-weight: bold;
  }
  
  .exploration-map {
    margin-bottom: 20px;
  }
  
  .exploration-button, .option-button {
    padding: 10px 20px;
    margin: 10px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .exploration-button:hover, .option-button:hover {
    background-color: #3a8d74;
  }
  
  .feedback {
    margin-top: 20px;
    color: #ff6b6b;
    font-size: 18px;
  }
  
  .next-step-message {
    margin-top: 15px;
    color: #42b983;
    font-weight: bold;
  }
  
  .next-sentence-button, .retry-button {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .retry-button {
    background-color: #ff6b6b;
  }
  
  .next-sentence-button:hover, .retry-button:hover {
    background-color: #3a8d74;
  }
  </style>
  