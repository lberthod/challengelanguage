<template>
    <div class="avatar">
      <img :src="src" alt="User Avatar" />
    </div>
  </template>
  
  <script>
  export default {
    name: 'AvatarComponent',
    props: {
      src: {
        type: String,
        required: true
      }
    }
  }
  </script>
  
  <style scoped>
  .avatar img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 2px solid #42b983;
  }
  </style>
  