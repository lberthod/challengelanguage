import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import DashboardView from '../views/DashboardView.vue';
import GameView from '../views/GameView.vue';
import MultiplayerView from '../views/MultiplayerView.vue';
import ProfileView from '../views/ProfileView.vue';
import AuthView from '../views/AuthView.vue';
import AdminView from '../views/AdminView.vue';
import GameComponent from '../components/GameComponent.vue';
import WordRainComponent from '../components/WordRainComponent.vue';

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/dashboard', name: 'Dashboard', component: DashboardView },
  { path: '/game', name: 'Game', component: GameView },
  { path: '/multiplayer', name: 'Multiplayer', component: MultiplayerView },
  { path: '/profile', name: 'Profile', component: ProfileView },
  { path: '/auth', name: 'Auth', component: AuthView },
  { path: '/admin', name: 'Admin', component: AdminView },
  // Routes for game components
  { path: '/game/correspondance', name: 'GameComponent', component: GameComponent },
  {
    path: '/game/wordrain',
    name: 'WordRainComponent',
    component: WordRainComponent,
    props: route => ({ wordPairs: JSON.parse(route.query.wordPairs || '[]') })
  }];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
