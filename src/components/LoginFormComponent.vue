<template>
    <div class="login-form">
      <h3>Connexion</h3>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="email">Email :</label>
          <input type="email" v-model="email" id="email" required />
        </div>
        <div class="form-group">
          <label for="password">Mot de passe :</label>
          <input type="password" v-model="password" id="password" required />
        </div>
        <button type="submit" class="btn-login">Se connecter</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'LoginFormComponent',
    data() {
      return {
        email: '',
        password: ''
      };
    },
    methods: {
      login() {
        // Logique de connexion
        console.log('Login with', this.email, this.password);
        this.$emit('login', { email: this.email, password: this.password });
      }
    }
  };
  </script>
  
  <style scoped>
  .login-form {
    border: 1px solid #ddd;
    padding: 20px;
    border-radius: 8px;
    background-color: #f9f9f9;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .btn-login {
    background-color: #42b983;
    color: white;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
  }
  </style>
  