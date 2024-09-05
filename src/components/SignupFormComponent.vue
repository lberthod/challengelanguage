<template>
    <div class="signup-form">
      <h3>Inscription</h3>
      <form @submit.prevent="signup">
        <div class="form-group">
          <label for="email">Email :</label>
          <input type="email" v-model="email" id="email" required />
        </div>
        <div class="form-group">
          <label for="password">Mot de passe :</label>
          <input type="password" v-model="password" id="password" required />
        </div>
        <button type="submit" class="btn-signup">S'inscrire</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SignupFormComponent',
    data() {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      signup() {
        // Logique d'inscription
        console.log('Signup with', this.email, this.password);
      }
    }
  }
  </script>
  
  <style scoped>
  .signup-form {
    border: 1px solid #ddd;
    padding: 20px;
    border-radius: 8px;
    background-color: #f9f9f9;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .btn-signup {
    background-color: #42b983;
    color: white;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
  }
  </style>
  