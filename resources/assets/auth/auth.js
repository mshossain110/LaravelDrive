import Vue from 'vue'
import 'babel-polyfill'

import Login from './components/Login'

Vue.component('Login', Login)

new Vue({ // eslint-disable-line no-new
    el: '#members'
})
