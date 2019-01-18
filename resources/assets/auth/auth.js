import Vue from 'vue'
import 'babel-polyfill'
import VeeValidate from 'vee-validate'

import Login from './components/Login'

Vue.use(VeeValidate)

Vue.component('Login', Login)

new Vue({ // eslint-disable-line no-new
    el: '#members'
})
