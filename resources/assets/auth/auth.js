import Vue from 'vue'
import 'babel-polyfill'

import Login from './components/Login'
import Register from './components/Register'
import Social from './components/Social'

Vue.component('Login', Login)
Vue.component('Register', Register)
Vue.component('Social', Social)

new Vue({ // eslint-disable-line no-new
    el: '#members',
    data () {
        return {
            isLogin: location.pathname === '/login',
            isRegister: location.pathname === '/register'
        }
    }
})
