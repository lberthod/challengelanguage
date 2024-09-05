<template>
  <div class="game-component">
    <h2>{{ gameTitle }}</h2>
    <p>Faites glisser et déposez les mots pour les faire correspondre.</p>

    <div class="word-lists">
      <div class="word-list" @dragover.prevent @drop="handleDrop('english')">
        <h3>Mots en Anglais</h3>
        <div
          v-for="(word, index) in wordsEnglish"
          :key="index"
          class="word-item"
          draggable="true"
          @dragstart="handleDragStart(word, 'english')"
        >
          {{ word }}
        </div>
      </div>

      <div class="word-list" @dragover.prevent @drop="handleDrop('french')">
        <h3>Mots en Français</h3>
        <div
          v-for="(word, index) in wordsFrench"
          :key="index"
          class="word-item"
          draggable="true"
          @dragstart="handleDragStart(word, 'french')"
        >
          {{ word }}
        </div>
      </div>
    </div>

    <p v-if="isGameComplete">Bravo! Vous avez fait correspondre tous les mots!</p>
  </div>
</template>

<script>
export default {
  name: 'GameComponent',
  props: {
    game: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      wordsEnglish: ['Hello', 'Cat', 'Dog', 'House'], // Example words
      wordsFrench: ['Bonjour', 'Chat', 'Chien', 'Maison'], // Corresponding words
      currentDragWord: null,
      currentDragLanguage: null,
      isGameComplete: false
    };
  },
  computed: {
    gameTitle() {
      return this.game ? this.game.name : 'Jeu';
    }
  },
  methods: {
    handleDragStart(word, language) {
      this.currentDragWord = word;
      this.currentDragLanguage = language;
    },
    handleDrop(targetLanguage) {
      if (this.currentDragWord && this.currentDragLanguage !== targetLanguage) {
        const englishIndex = this.wordsEnglish.indexOf(this.currentDragWord);
        const frenchIndex = this.wordsFrench.indexOf(this.currentDragWord);
        if (
          (this.currentDragLanguage === 'english' &&
            targetLanguage === 'french' &&
            frenchIndex !== -1 &&
            this.wordsFrench[frenchIndex] === this.getTranslation(this.currentDragWord)) ||
          (this.currentDragLanguage === 'french' &&
            targetLanguage === 'english' &&
            englishIndex !== -1 &&
            this.wordsEnglish[englishIndex] === this.getTranslation(this.currentDragWord))
        ) {
          this.wordsEnglish.splice(englishIndex, 1);
          this.wordsFrench.splice(frenchIndex, 1);
          this.checkGameCompletion();
        }
      }
      this.currentDragWord = null;
      this.currentDragLanguage = null;
    },
    getTranslation(word) {
      const translationMap = {
        'Hello': 'Bonjour',
        'Cat': 'Chat',
        'Dog': 'Chien',
        'House': 'Maison'
        // Add more translations as needed
      };
      return translationMap[word];
    },
    checkGameCompletion() {
      if (this.wordsEnglish.length === 0 && this.wordsFrench.length === 0) {
        this.isGameComplete = true;
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
</style>
