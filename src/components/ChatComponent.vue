<template>
    <div class="chat">
      <h2>Chat en Direct</h2>
      <ul>
        <li v-for="message in messages" :key="message.id">
          <strong>{{ message.user }}:</strong> {{ message.text }}
        </li>
      </ul>
      <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Tapez votre message..." />
    </div>
  </template>
  
  <script>
  export default {
    name: 'ChatComponent',
    data() {
      return {
        messages: [],
        newMessage: ''
      };
    },
    methods: {
      sendMessage() {
        if (this.newMessage.trim()) {
          this.messages.push({ id: Date.now(), user: 'Vous', text: this.newMessage });
          this.newMessage = '';
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .chat {
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
  }
  .chat input {
    width: 100%;
    padding: 10px;
    margin-top: 10px;
  }
  </style>
  