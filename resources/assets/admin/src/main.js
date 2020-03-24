import Vue from 'vue';
import VueRouter from 'vue-router';
import vuetify from './vuetify';

import App from './App.vue';

import routes from './router';

import mixin from './mixin';

import store from './store';

import { ValidationProvider, extend } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';

Object.keys(rules).forEach(rule => {
    extend(rule, rules[rule]);
});

Vue.component('ValidationProvider', ValidationProvider);
Vue.use(VueRouter);

const router = new VueRouter({
    routes, // short for `routes: routes`
    mode: 'history',
    base: 'drive',
    scrollBehavior () {
        return { x: 0, y: 0 };
    }
});

router.beforeEach((to, from, next) => {
    var user = LD.user;

    if (user) {
        store.commit('auth', true);
        next();
    } else {
        store.commit('auth', false);
        next(false);
    }
});

Vue.mixin(mixin);

window.Bus = new Vue();

new Vue({ // eslint-disable-line no-new
    el: '#root',
    vuetify,
    router,
    store,
    render: h => h(App)
});
