import Vue from 'vue';
import 'babel-polyfill'
import App from './App.vue';
import Vuetify from 'vuetify';

import './stylus/main.styl';
 
Vue.use(Vuetify)

new Vue({
  el: '#root',
  render: h => h(App)
});