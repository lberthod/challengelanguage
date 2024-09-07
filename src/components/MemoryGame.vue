<template>
    <div class="memory-match-game">
      <h2>Jeu de Mémoire avec Correspondance</h2>
      <p>Essayez de correspondre les cartes par leurs traductions.</p>
  
      <!-- Language selection -->
      <div v-if="!gameStarted">
        <label for="language1">Choisissez la première langue :</label>
        <select id="language1" v-model="selectedLanguage1" @change="loadFirebaseData">
          <option disabled value="">Sélectionner la langue</option>
          <option v-for="(language, code) in languages" :key="code" :value="code">{{ language }}</option>
        </select>
      </div>
  
      <!-- Second Language selection -->
      <div v-if="!gameStarted && selectedLanguage1">
        <label for="language2">Choisissez la deuxième langue :</label>
        <select id="language2" v-model="selectedLanguage2" @change="loadFirebaseData">
          <option disabled value="">Sélectionner la langue</option>
          <option v-for="(language, code) in languages" :key="code" :value="code">{{ language }}</option>
        </select>
      </div>
  
      <!-- Category selection -->
      <div v-if="!gameStarted && selectedLanguage2">
        <label for="category">Choisissez une catégorie :</label>
        <select id="category" v-model="selectedCategory" @change="loadFirebaseData">
          <option disabled value="">Sélectionner la catégorie</option>
          <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
        </select>
      </div>
  
      <!-- Level selection -->
      <div v-if="!gameStarted && selectedCategory">
        <label for="level">Choisissez un niveau :</label>
        <select id="level" v-model="selectedLevel" @change="loadFirebaseData">
          <option disabled value="">Sélectionner le niveau</option>
          <option v-for="level in levels" :key="level" :value="level">{{ level }}</option>
        </select>
      </div>
  
      <!-- Start button to initiate the game -->
      <button v-if="!gameStarted && selectedLevel" @click="startGame" class="start-button">Start</button>
  
      <!-- Display number of attempts -->
      <p v-if="gameStarted">Nombre de tentatives : {{ attempts }}</p>
  
      <!-- Game content -->
      <div v-if="gameStarted" class="cards-container">
        <CardComponent
          v-for="(card, index) in displayedCards"
          :key="index"
          :word="card.text"
          :isFlipped="card.flipped"
          :isMatched="card.matched"
          :translationId="card.translationId"
          @flip="handleCardFlip(index, $event)"
        />
      </div>
  
      <!-- Message when all cards are matched -->
      <div v-if="gameStarted && allCardsMatched" class="congratulations-message">
        <p>Félicitations! Vous avez trouvé toutes les paires!</p>
        <button @click="loadNextCards" class="start-button">Continuer avec de nouvelles cartes</button>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, get } from 'firebase/database';
  import { database } from '@/firebase.js'; // Import Firebase config
  import CardComponent from '@/components/CardComponent.vue'; // Import CardComponent
  
  export default {
    name: 'MemoryMatchComponent',
    components: {
      CardComponent
    },
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
  
        selectedLanguage1: '',
        selectedLanguage2: '',
        selectedCategory: '',
        selectedLevel: '',
  
        wordPairs: [],
        displayedCards: [],
        firstFlippedCard: null,
        secondFlippedCard: null,
        gameStarted: false,
        isProcessing: false,
        attempts: 0, // To count the number of attempts
        allCardsMatched: false // To check if all cards are matched
      };
    },
    methods: {
      loadFirebaseData() {
        if (!this.selectedLanguage1 || !this.selectedLanguage2 || !this.selectedCategory || !this.selectedLevel) return;
  
        const dbRef = ref(database, `categories/${this.selectedCategory}/levels/${this.selectedLevel}/memory_game/pairs`);
  
        get(dbRef)
          .then((snapshot) => {
            if (snapshot.exists()) {
              const data = snapshot.val();
              this.wordPairs = Object.values(data);
              this.prepareCards();
            } else {
              console.warn('No data available for this selection.');
            }
          })
          .catch((error) => {
            console.error('Error fetching data from Firebase:', error);
          });
      },
      startGame() {
        if (!this.wordPairs.length) {
          alert('Veuillez choisir des langues, une catégorie et un niveau valides.');
          return;
        }
        this.gameStarted = true;
        this.attempts = 0; // Reset attempts count when the game starts
        this.allCardsMatched = false; // Reset matched status
        this.prepareCards();
      },
      prepareCards() {
        const selectedPairs = this.wordPairs
          .sort(() => 0.5 - Math.random())
          .slice(0, 5); // Sélectionner 5 paires pour un total de 10 cartes
  
        // Création des cartes avec un mot dans chaque langue
        this.displayedCards = selectedPairs.flatMap(pair => [
          { text: pair.word[this.selectedLanguage1], id: pair.id, key: pair.key, translationId: pair.id, flipped: false, matched: false },
          { text: pair.word[this.selectedLanguage2], id: pair.id, key: pair.key, translationId: pair.id, flipped: false, matched: false }
        ]);
  
        this.shuffleArray(this.displayedCards); // Mélange des cartes
      },
      loadNextCards() {
        this.firstFlippedCard = null;
        this.secondFlippedCard = null;
        this.allCardsMatched = false; // Réinitialise quand de nouvelles cartes sont chargées
        this.prepareCards();
      },
      shuffleArray(array) {
        return array.sort(() => Math.random() - 0.5);
      },
      handleCardFlip(index, flippedCardData) {
        if (this.isProcessing || this.displayedCards[index].flipped || this.displayedCards[index].matched) return;
  
        // Retourne la carte
        this.displayedCards[index].flipped = true;
  
        if (!this.firstFlippedCard) {
          this.firstFlippedCard = { index, ...flippedCardData };
        } else {
          this.secondFlippedCard = { index, ...flippedCardData };
          this.attempts++; // Incrémente les tentatives lorsque deux cartes sont retournées
          this.checkForMatch();
        }
      },
      checkForMatch() {
        const firstCard = this.firstFlippedCard;
        const secondCard = this.secondFlippedCard;
  
        this.isProcessing = true;
  
        if (firstCard.translationId === secondCard.translationId) {
          // Les cartes correspondent
          this.displayedCards[firstCard.index].matched = true;
          this.displayedCards[secondCard.index].matched = true;
          this.checkIfAllMatched(); // Vérifie si toutes les cartes sont appariées
          this.resetFlippedCards();
        } else {
          // Pas de correspondance, retourne les cartes après un délai
          setTimeout(() => {
            this.displayedCards[firstCard.index].flipped = false;
            this.displayedCards[secondCard.index].flipped = false;
            this.resetFlippedCards();
          }, 1000); // Délai avant de retourner les cartes
        }
      },
      checkIfAllMatched() {
        this.allCardsMatched = this.displayedCards.every(card => card.matched);
      },
      resetFlippedCards() {
        this.firstFlippedCard = null;
        this.secondFlippedCard = null;
        this.isProcessing = false;
      }
    }
  };
  </script>
  
  <style scoped>
  .memory-match-game {
    text-align: center;
    padding: 20px;
  }
  
  .cards-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
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
  
  .congratulations-message {
    margin-top: 20px;
    font-size: 18px;
    color: green;
    font-weight: bold;
  }
  </style>
  