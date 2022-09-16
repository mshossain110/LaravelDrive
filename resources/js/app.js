import './bootstrap';
import Vuetify from './Vuetify'
import { createApp } from 'vue'
import App from './App.vue';
import { createRouter, createWebHashHistory } from "vue-router";
import routes from '@/drive/router/index.js'


const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

const app = createApp(App)

app.config.devtools = true;

app.use(Vuetify);
app.use(router)

app.mount('#app')
