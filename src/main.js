import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import router from './router';

const app = createApp(App);
const pinia = createPinia();
app.use(router);

app.use(pinia);
app.use(Toast, {
  // Options de configuration
});

app.mount('#app');
