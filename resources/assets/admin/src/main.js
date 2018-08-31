import Vue from 'vue';
import 'babel-polyfill'

import App from './App.vue';

import Vuetify from 'vuetify';
import './stylus/main.styl';

import VueRouter from 'vue-router';
import routes from './router'

import mixin from './mixin';

import Vuex from 'vuex'
import store from ',/store';


const router = new VueRouter({
    routes // short for `routes: routes`
})


Vue.use(VueRouter)
Vue.use(Vuetify);
Vue.use(Vuex);


new Vue({
    el: '#root',
    store,
    router,
    mixin,
    render: h => h(App)
});