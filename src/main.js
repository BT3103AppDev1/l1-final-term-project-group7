import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import firebaseApp from '@/firebase.js'
import App from './App.vue'
import router from './router'
const app = createApp(App)

// Global method to capitalise Strings
app.config.globalProperties.$capitalizeFirstLetter = (string) => {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
};

app.use(createPinia())
app.use(router)

app.mount('#app')
