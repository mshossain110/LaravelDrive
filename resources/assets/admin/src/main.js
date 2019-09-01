import Vue from 'vue'
import 'babel-polyfill'
import VueRouter from 'vue-router'
import vuetify from './vuetify'
import VeeValidate from 'vee-validate'

import App from './App.vue'
import './stylus/main.scss'

import routes from './router'

import mixin from './mixin'

import store from './store'

Vue.use(VeeValidate)

window.Vue = Vue
const router = new VueRouter({
    routes, // short for `routes: routes`
    scrollBehavior () {
        return { x: 0, y: 0 }
    }
})

router.beforeEach((to, from, next) => {
    var user = LD.user

    if (user) {
        store.commit('auth', true)
        next()
    } else {
        store.commit('auth', false)
        next(false)
    }
})

Vue.use(VueRouter)

Vue.mixin(mixin)

window.Bus = new Vue()

new Vue({ // eslint-disable-line no-new
    el: '#root',
    vuetify,
    router,
    store,
    render: h => h(App)
})
