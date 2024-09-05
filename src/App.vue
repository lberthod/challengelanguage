<template>
  <div id="app">
    <!-- Barre de navigation principale -->
    <nav>
      <ul>
        <li>
          <router-link to="/">Accueil</router-link>
        </li>
        <li>
          <router-link to="/dashboard">Tableau de Bord</router-link>
        </li>
        <li>
          <router-link to="/game">Jeux</router-link>
        </li>
        <li>
          <router-link to="/multiplayer">Multijoueur</router-link>
        </li>
        <li>
          <router-link to="/profile">Profil</router-link>
        </li>
        <li>
          <router-link to="/auth">Connexion / Inscription</router-link>
        </li>
        <li>
          <router-link to="/admin">Admin</router-link>
        </li>
      </ul>
    </nav>

    <!-- Vue router view rend le composant de la page active -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
    // Vous pouvez importer d'autres composants globaux ici si nécessaire
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

nav {
  background-color: #42b983;
  padding: 15px;
}

nav ul {
  list-style-type: none;
  padding: 0;
}

nav ul li {
  display: inline;
  margin-right: 15px;
}

nav ul li a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

nav ul li a:hover {
  text-decoration: underline;
}
</style>
