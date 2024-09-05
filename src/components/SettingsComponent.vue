<template>
    <div class="settings">
      <h2>Paramètres Utilisateur</h2>
      <form @submit.prevent="updateSettings">
        <div class="form-group">
          <label for="language">Langue d'apprentissage :</label>
          <select id="language" v-model="settings.language">
            <option value="fr">Français</option>
            <option value="en">Anglais</option>
            <option value="es">Espagnol</option>
            <!-- Plus d'options de langues -->
          </select>
        </div>
        <div class="form-group">
          <label for="notifications">Notifications :</label>
          <input type="checkbox" id="notifications" v-model="settings.notifications" />
        </div>
        <button type="submit" class="btn-save">Enregistrer</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SettingsComponent',
    data() {
      return {
        settings: {
          language: 'fr', // Exemple de valeur initiale
          notifications: true
        }
      }
    },
    methods: {
      updateSettings() {
        // Logique pour mettre à jour les paramètres de l'utilisateur
        alert('Paramètres mis à jour!');
      }
    }
  }
  </script>
  
  <style scoped>
  .settings {
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
  }
  .form-group {
    margin-bottom: 15px;
  }
  .btn-save {
    background-color: #42b983;
    color: white;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
  }
  </style>
  