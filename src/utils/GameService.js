export const calculateScore = (correctAnswers, totalQuestions) => {
    return Math.round((correctAnswers / totalQuestions) * 100);
  };
  
  export const fetchChallenges = async () => {
    // logiques pour récupérer les défis depuis l'API ou Firebase
  };
  