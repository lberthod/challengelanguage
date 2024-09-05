<template>
  <nav class="navbar">
    <div class="navbar-container">
      <!-- Logo de l'application -->
      <router-link to="/" class="logo" @click.native="closeMenu">Langue Challenge</router-link>

      <!-- Liens de navigation -->
      <div class="navbar-links" :class="{ 'is-active': isMenuActive }">
        <router-link to="/" @click="closeMenu">Accueil</router-link>
        <router-link to="/dashboard" @click="closeMenu">Tableau de Bord</router-link>
        <router-link to="/game" @click="closeMenu">Jeux</router-link>
        <router-link to="/multiplayer" @click="closeMenu">Multijoueur</router-link>
        <router-link to="/profile" @click="closeMenu">Profil</router-link>
        <router-link to="/auth" @click="closeMenu">Connexion / Inscription</router-link>
      </div>

      <!-- Bouton hamburger pour mobile -->
      <button class="navbar-burger" @click="toggleMenu">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavbarComponent',
  data() {
    return {
      isMenuActive: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuActive = !this.isMenuActive;
    },
    closeMenu() {
      this.isMenuActive = false;
    },
  },
};
</script>

<style scoped>
.navbar {
  background-color: #42b983;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 1000;
}

.navbar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.logo {
  color: white;
  font-size: 1.5em;
  text-decoration: none;
}

.navbar-links {
  display: flex;
  gap: 15px;
}

.navbar-links a {
  color: white;
  text-decoration: none;
  padding: 5px 10px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.navbar-links a:hover {
  background-color: #3a8d74;
}

.navbar-burger {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  flex-direction: column;
  justify-content: space-between;
  height: 24px;
  width: 30px;
}

.navbar-burger span {
  display: block;
  width: 100%;
  height: 3px;
  background-color: white;
  transition: transform 0.3s ease;
}

@media (max-width: 768px) {
  .navbar-burger {
    display: flex;
  }

  .navbar-links {
    display: none;
    position: absolute;
    top: 50px;
    right: 0;
    background-color: #42b983;
    flex-direction: column;
    width: 100%;
    text-align: center;
  }

  .navbar-links.is-active {
    display: flex;
  }

  .navbar-links a {
    padding: 10px 0;
  }
}
</style>
