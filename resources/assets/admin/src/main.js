import Vue from 'vue';
import 'babel-polyfill'

import App from './App.vue';

import Vuetify from 'vuetify';
import './stylus/main.styl';

import VueRouter from 'vue-router';
import routes from './router'

const router = new VueRouter({
  routes // short for `routes: routes`
})


Vue.use(VueRouter)
Vue.use(Vuetify);

new Vue({
  el: '#root',
  router,
  render: h => h(App)
});