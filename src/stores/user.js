import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    isAuthenticated: false,
  }),
  actions: {
    login(user) {
      this.user = user;
      this.isAuthenticated = !!user;
    },
    logout() {
      this.user = null;
      this.isAuthenticated = false;
    },
  },
  getters: {
    getUser: (state) => state.user,
    isAuthenticated: (state) => state.isAuthenticated,
  }
});
