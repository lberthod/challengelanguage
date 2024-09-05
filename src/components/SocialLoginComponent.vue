<template>
    <div class="social-login">
      <h3>Ou connectez-vous avec :</h3>
      <button class="btn-social google" @click="loginWithGoogle">Google</button>
      <button class="btn-social facebook" @click="loginWithFacebook">Facebook</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SocialLoginComponent',
    methods: {
      loginWithGoogle() {
        // Logique de connexion avec Google
        console.log('Login with Google');
      },
      loginWithFacebook() {
        // Logique de connexion avec Facebook
        console.log('Login with Facebook');
      }
    }
  }
  </script>
  
  <style scoped>
  .social-login {
    margin-top: 20px;
    text-align: center;
  }
  
  .btn-social {
    margin: 5px;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    color: white;
    border-radius: 5px;
  }
  
  .google {
    background-color: #db4437;
  }
  
  .facebook {
    background-color: #4267b2;
  }
  </style>
  