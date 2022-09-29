import './bootstrap';
import Vuetify from './Vuetify';
import { createApp } from 'vue';
import mitt from "mitt";
import App from '@/Components/App.vue';
import router from '@/router/index.js'
import store from '@/store/index.js';
import mixin from '@/plugins/mixin.js';


const app = createApp(App)

app.config.devtools = true;

app.use(Vuetify);
app.use(router)
app.use(store)
app.mixin(mixin)

app.config.globalProperties.emmiter = mitt();
app.mount('#root')
