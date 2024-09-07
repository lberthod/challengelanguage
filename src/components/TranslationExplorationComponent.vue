<template>
  <div class="translation-exploration">
    <h2>Exploration de Vocabulaire</h2>
    <p>Sélectionnez un point pour explorer le vocabulaire dans la langue choisie !</p>

    <!-- Language selection -->
    <div class="language-selection">
      <label for="language-select">Choisissez une langue :</label>
      <select id="language-select" v-model="selectedLanguage">
        <option value="french">Français</option>
        <option value="english">Anglais</option>
        <option value="italian">Italien</option>
      </select>
    </div>

    <!-- Category selection -->
    <div class="category-selection" v-if="sentencesData && Object.keys(sentencesData.categories).length > 0">
      <label for="category-select">Choisissez une catégorie :</label>
      <select id="category-select" v-model="selectedCategory">
        <option disabled value="">Sélectionner</option>
        <option v-for="(category, index) in Object.keys(sentencesData.categories)" :key="index" :value="category">
          {{ category }}
        </option>
      </select>
    </div>

    <!-- Display sentence in the selected language -->
    <div v-if="currentSentence" class="sentence-area">
      <p><strong>Phrase en {{ selectedLanguage }} :</strong> {{ currentSentence.languages[selectedLanguage] }}</p>

      <!-- Display answer options -->
      <div class="options-container">
        <button
          v-for="(option, index) in answerOptions"
          :key="index"
          @click="checkAnswer(option)"
          class="option-button"
        >
          {{ option }}
        </button>
      </div>
    </div>

    <!-- Feedback and next button -->
    <p v-if="feedbackMessage" class="feedback">{{ feedbackMessage }}</p>
    <button v-if="isCorrect" @click="nextSentence" class="next-sentence-button">Phrase Suivante</button>
  </div>
</template>

<script>
import { ref, get } from "firebase/database";
import { database } from "@/firebase.js"; // Import Firebase configuration

export default {
  name: "TranslationExplorationComponent",
  data() {
    return {
      sentencesData: null, // Initialize as null to avoid undefined errors
      selectedLanguage: "french", // Default language
      selectedCategory: "", // Category selected by user
      currentSentence: null, // Current sentence to be translated
      answerOptions: [], // Available answer options (correct + incorrect)
      correctOption: "", // Correct translation
      feedbackMessage: "",
      isCorrect: false,
    };
  },
  watch: {
    selectedLanguage(newLang) {
      console.log(`Langue sélectionnée : ${newLang}`);
      this.resetGame(); // Reinitialize when the language changes
    },
    selectedCategory(newCategory) {
      console.log(`Catégorie sélectionnée : ${newCategory}`);
      this.resetGame(); // Reinitialize when the category changes
    },
  },
  methods: {
    loadSentences() {
      console.log("Chargement des phrases...");
      const dbRef = ref(database, "translation_phrases");
      get(dbRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            this.sentencesData = snapshot.val(); // Stocker les données dans sentencesData
            console.log("Données chargées : ", this.sentencesData);
            if (!this.selectedCategory) {
              console.warn("Veuillez sélectionner une catégorie.");
            } else {
              this.nextSentence(); // Démarrer le jeu avec la première phrase
            }
          } else {
            console.warn("Aucune donnée disponible.");
          }
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des phrases :", error);
        });
    },
    nextSentence() {
      if (this.sentencesData && this.selectedCategory) {
        const categoryPhrases = this.sentencesData.categories[this.selectedCategory];

        if (categoryPhrases && categoryPhrases.length > 0) {
          const randomIndex = Math.floor(Math.random() * categoryPhrases.length);
          this.currentSentence = categoryPhrases[randomIndex];

          console.log("Phrase sélectionnée :", this.currentSentence);

          // Generate the correct answer and incorrect options
          this.correctOption = this.currentSentence.languages[this.selectedLanguage];
          this.answerOptions = this.generateOptions();
          this.feedbackMessage = "";
          this.isCorrect = false;
        } else {
          console.error("Aucune phrase disponible pour cette catégorie.");
        }
      } else {
        console.error("Aucune catégorie sélectionnée ou données manquantes.");
      }
    },
    generateOptions() {
      const incorrectOptions = [];
      const categoryPhrases = this.sentencesData.categories[this.selectedCategory];

      // Generate 2 random incorrect options
      while (incorrectOptions.length < 2) {
        const randomPhrase = categoryPhrases[Math.floor(Math.random() * categoryPhrases.length)];
        const randomOption = randomPhrase.languages[this.selectedLanguage];

        // Ensure that incorrect options are not the same as the correct one
        if (randomOption !== this.correctOption && !incorrectOptions.includes(randomOption)) {
          incorrectOptions.push(randomOption);
        }
      }

      console.log("Options générées : ", [...incorrectOptions, this.correctOption]);

      // Shuffle and return the options (correct + incorrect)
      return this.shuffleArray([...incorrectOptions, this.correctOption]);
    },
    shuffleArray(array) {
      return array.sort(() => Math.random() - 0.5);
    },
    checkAnswer(selectedOption) {
      if (selectedOption === this.correctOption) {
        this.feedbackMessage = "Bonne réponse !";
        this.isCorrect = true;
      } else {
        this.feedbackMessage = "Mauvaise réponse. Essayez encore.";
      }
    },
    resetGame() {
      this.currentSentence = null;
      this.answerOptions = [];
      this.feedbackMessage = "";
      this.isCorrect = false;

      if (this.selectedCategory) {
        this.nextSentence();
      }
    },
  },
  mounted() {
    console.log("Le composant est monté.");
    this.loadSentences();
  },
};
</script>

<style scoped>
.translation-exploration {
  padding: 20px;
  text-align: center;
}

.language-selection,
.category-selection {
  margin: 10px 0;
}

.option-button {
  padding: 10px;
  background-color: #42b983;
  color: white;
  border: none;
  margin: 5px;
  cursor: pointer;
  border-radius: 5px;
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

.next-sentence-button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
