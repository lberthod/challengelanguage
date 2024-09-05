<template>
  <div class="recommendations">
    <h2>Recommandations Personnalisées</h2>
    <ul>
      <li v-for="recommendation in recommendations" :key="recommendation.id">
        {{ recommendation.text }}
        <button @click="acceptRecommendation(recommendation.id)">Accepter</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'RecommendationEngineComponent',
  data() {
    return {
      recommendations: [
        { id: 1, text: 'Essayez le défi de prononciation!' },
        { id: 2, text: 'Revoyez votre vocabulaire.' }
      ]
    }
  },
  methods: {
    acceptRecommendation(id) {
      console.log('Recommendation accepted:', id);
      // Logique pour appliquer la recommandation
    }
  }
}
</script>

<style scoped>
.recommendations {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}
.recommendations ul {
  list-style: none;
  padding: 0;
}
.recommendations li {
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}
</style>
