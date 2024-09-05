<template>
    <div class="progress-bar">
      <div class="progress" :style="{ width: `${progress}%` }"></div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ProgressBarComponent',
    props: {
      progress: {
        type: Number,
        required: true
      }
    }
  }
  </script>
  
  <style scoped>
  .progress-bar {
    width: 100%;
    background-color: #ddd;
    border-radius: 5px;
    overflow: hidden;
    height: 20px;
  }
  
  .progress {
    background-color: #42b983;
    height: 100%;
    transition: width 0.3s ease;
  }
  </style>
  