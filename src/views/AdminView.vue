<template>
    <div class="admin">
      <h2>Panneau d'Administration</h2>
      <div class="admin-controls">
        <h3>Gestion des Utilisateurs</h3>
        <!-- Composant ou tableau pour gérer les utilisateurs -->
        <button class="btn-admin">Ajouter un Utilisateur</button>
        <h3>Gestion du Contenu</h3>
        <!-- Composant ou tableau pour gérer le contenu -->
        <button class="btn-admin">Ajouter du Contenu</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AdminView'
  }
  </script>
  
  <style scoped>
  .admin {
    padding: 20px;
  }
  .admin-controls {
    margin-top: 20px;
    border: 1px solid #ddd;
    padding: 15px;
    border-radius: 8px;
  }
  .btn-admin {
    margin-top: 10px;
    background-color: #42b983;
    color: white;
    padding: 8px 16px;
    border: none;
    cursor: pointer;
    font-size: 14px;
  }
  </style>
  