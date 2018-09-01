import Vue from 'vue';
import 'babel-polyfill'

import App from './App.vue';

import Vuetify from 'vuetify';
import colors from 'vuetify/es5/util/colors'
import './stylus/main.styl';

import VueRouter from 'vue-router';
import routes from './router'

import mixin from './mixin';

import Vuex from 'vuex';
import store from './store';

window.Vue = Vue;
const router = new VueRouter({
    routes // short for `routes: routes`
})


Vue.use(Vuetify, {
  theme: {
        primary: colors.blueGrey.darken2,
        secondary: colors.blueGrey.lighten5,
        accent: colors.lightGreen.darken3,
        error: colors.red.base,
        warning: colors.yellow.darken1,
        info: colors.blue.darken1,
        success: colors.green.darken2
    }
})

Vue.use(VueRouter);


new Vue({
    el: '#root',
    store,
    router,
    mixin,
    render: h => h(App)
});