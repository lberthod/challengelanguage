<template>
    <div class="theme-switcher">
      <button @click="toggleTheme">{{ themeButtonText }}</button>
    </div>
  </template>
  
  <script>
  import { computed } from 'vue';
  import { useThemeStore } from '@/stores/useThemeStore';
  
  export default {
    name: 'ThemeSwitcherComponent',
    setup() {
      const themeStore = useThemeStore();
      const themeButtonText = computed(() =>
        themeStore.currentTheme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'
      );
  
      return {
        toggleTheme: themeStore.toggleTheme,
        themeButtonText
      };
    }
  };
  </script>
  
  <style scoped>
  .theme-switcher {
    position: fixed;
    bottom: 20px;
    right: 20px;
  }
  
  button {
    background-color: #42b983;
    color: white;
    padding: 10px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
  }
  </style>
  