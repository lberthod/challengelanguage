<template>
    <div class="memory-match-game">
      <h2>Jeu de Mémoire avec Correspondance</h2>
      <p>Essayez de correspondre les cartes par leurs traductions.</p>
  
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
        subcategories: [
          'animal-1', 'animal-2', 'maison-1', 'nourriture-1', 'salutations'
        ],
        selectedSubcategory: '',
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
        const subcategory = this.selectedSubcategory;
        const dbRef = ref(database, `words/${subcategory}`);
  
        get(dbRef)
          .then((snapshot) => {
            if (snapshot.exists()) {
              const data = snapshot.val();
              this.wordPairs = Object.values(data);
              this.prepareCards();
            } else {
              console.warn('No data available for this subcategory.');
            }
          })
          .catch((error) => {
            console.error('Error fetching data from Firebase:', error);
          });
      },
      startGame() {
        if (!this.wordPairs.length) {
          alert('Veuillez choisir une sous-catégorie valide et charger les données.');
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
          .slice(0, 5); // Select 5 pairs for 10 cards total
  
        this.displayedCards = selectedPairs.flatMap(pair => [
          { text: pair.english, translationId: pair.id, flipped: false, matched: false },
          { text: pair.french, translationId: pair.id, flipped: false, matched: false }
        ]);
  
        this.shuffleArray(this.displayedCards); // Shuffle the cards
      },
      loadNextCards() {
        this.firstFlippedCard = null;
        this.secondFlippedCard = null;
        this.allCardsMatched = false; // Reset when new cards are loaded
        this.prepareCards();
      },
      shuffleArray(array) {
        return array.sort(() => Math.random() - 0.5);
      },
      handleCardFlip(index, flippedCardData) {
        if (this.isProcessing || this.displayedCards[index].flipped || this.displayedCards[index].matched) return;
  
        // Flip the card
        this.displayedCards[index].flipped = true;
  
        if (!this.firstFlippedCard) {
          this.firstFlippedCard = { index, ...flippedCardData };
        } else {
          this.secondFlippedCard = { index, ...flippedCardData };
          this.attempts++; // Increment attempts when two cards are flipped
          this.checkForMatch();
        }
      },
      checkForMatch() {
        const firstCard = this.firstFlippedCard;
        const secondCard = this.secondFlippedCard;
  
        this.isProcessing = true;
  
        if (firstCard.translationId === secondCard.translationId) {
          // Cards match
          this.displayedCards[firstCard.index].matched = true;
          this.displayedCards[secondCard.index].matched = true;
          this.checkIfAllMatched(); // Check if all cards are matched
          this.resetFlippedCards();
        } else {
          // No match, flip the cards back
          setTimeout(() => {
            this.displayedCards[firstCard.index].flipped = false;
            this.displayedCards[secondCard.index].flipped = false;
            this.resetFlippedCards();
          }, 1000); // Delay before flipping back
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
  