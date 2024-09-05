<template>
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-left">
          <p>&copy; 2024 Langue Challenge. Tous droits réservés.</p>
        </div>
        <div class="footer-right">
          <ul class="footer-links">
            <li><router-link to="/terms">Termes et Conditions</router-link></li>
            <li><router-link to="/privacy">Politique de Confidentialité</router-link></li>
            <li><a href="https://www.facebook.com" target="_blank">Facebook</a></li>
            <li><a href="https://www.twitter.com" target="_blank">Twitter</a></li>
            <li><a href="https://www.instagram.com" target="_blank">Instagram</a></li>
          </ul>
        </div>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'FooterComponent'
  }
  </script>
  
  <style scoped>
  .footer {
    background-color: #2c3e50;
    color: white;
    padding: 20px 0;
    position: relative;
    bottom: 0;
    width: 100%;
    text-align: center;
  }
  
  .footer-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
  
  .footer-left {
    flex: 1;
  }
  
  .footer-right {
    flex: 2;
  }
  
  .footer-links {
    list-style: none;
    padding: 0;
    display: flex;
    gap: 15px;
    justify-content: center;
  }
  
  .footer-links li {
    display: inline;
  }
  
  .footer-links a {
    color: white;
    text-decoration: none;
    transition: color 0.3s ease;
  }
  
  .footer-links a:hover {
    color: #42b983;
  }
  </style>
  