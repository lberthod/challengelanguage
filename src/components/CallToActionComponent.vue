<template>
    <div class="call-to-action">
      <button @click="startGame" class="btn-start">Commencer à Jouer</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CallToActionComponent',
    methods: {
      startGame() {
        this.$router.push('/game');
      }
    }
  }
  </script>
  
  <style scoped>
  .call-to-action {
    text-align: center;
    margin-top: 20px;
  }
  .btn-start {
    background-color: #42b983;
    color: white;
    padding: 15px 30px;
    border: none;
    cursor: pointer;
    font-size: 18px;
  }
  </style>
  