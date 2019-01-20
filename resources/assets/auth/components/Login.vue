<template>
    <form
        class="loginform"
        @submit.prevent="login"
    >
        <h3>Login To Our App</h3>
        <p>Fill in the form to get instant access</p>

        <div>
            <div class="form-group">
                <input
                    v-model="email"
                    :class="{'input': true, 'is-danger': errors.has('email') }"
                    type="text"
                    name="name"
                    placeholder="User name / Email"
                >
                <span
                    v-show="errors.has('email')"
                    class="help is-danger"
                >
                    {{ errors.first('email') }}
                </span>
            </div>
            <div class="form-group">
                <input
                    v-model="password"
                    :class="{'input': true, 'is-danger': errors.has('password') }"
                    type="password"
                    name="password"
                    placeholder="Password..."
                >
                <span
                    v-show="errors.has('email')"
                    class="help is-danger"
                >
                    {{ errors.first('password') }}
                </span>
            </div>
            <div class="release-contnet">
                <div class="remember-button">
                    <label for="remember">
                        <input
                            id="remember"
                            v-model="remember"
                            type="checkbox"
                        > Remember me
                    </label>
                </div>
                <div class="forget-button">
                    <a
                        href="/password/reset/"
                        class=""
                    >
                        Forgot Your Password?
                    </a>
                </div>
            </div>
            <div class="register">
                <a
                    href="/register"
                    class=""
                >
                    Register Now
                </a>
            </div>
            <div class="login-button">
                <button
                    type="submit"
                    name="login"
                >
                    Login
                </button>
            </div>
        </div>
    </form>
</template>

<script>
import axios from 'axios'

import Errors from './../Errors.js'

let CsrfToken = document.head.querySelector('meta[name="csrf-token"]')
export default {
    name: 'Login',
    data () {
        return {
            email: '',
            password: null,
            remember: false,
            errors: new Errors()
        }
    },
    methods: {
        login () {
            const { email, password, remember } = this
            this.authRequest({ email, password, remember })
                .then((data) => {
                    this.clear()
                    location.replace(data.redirectTo)
                })
        },
        clear () {
            this.email = ''
            this.password = null
            this.remember = null
        },
        authRequest (params) {
            let remember = params.remember ? params.remember : false
            let data = {
                'email': params.email,
                'password': params.password,
                'remember': remember
            }
            return new Promise((resolve, reject) => {
                axios.post('/login', data, {
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest',
                        'X-CSRF-TOKEN': CsrfToken.content
                    }
                })
                    .then((res) => {
                        resolve(res.data)
                    })
                    .catch((err) => {
                        this.errors.record(err.response.data.errors)
                        reject(err.response.data)
                    })
            })
        }
    }
}
</script>

<style>
    .loginform h3 {
        margin-bottom: 25px;
        margin-top: 0;
        text-transform: uppercase;
        font-weight: 700;
        font-size: 20px;
        text-align: center;
    }
    .loginform p {
        text-align: center;
    }
    .loginform  a {
        text-decoration: none;
        font-size: 13px;
        font-weight: 700;
        color: #598bd6;
    }
    .loginform a:hover {
        color: #1a5dc3;
    }
    .loginform input {
        height: 45px;
        padding: 5px 15px;
        width: 100%;
        border: solid 1px #f4f4f4;
        transition: all ease-in-out 0.3s;
        color: #999;
        font-size: 14px;
    }
    .loginform .help.is-danger {
        color:red;
        font-size: 10px;
    }

    .loginform .input.is-danger {
        border-color: red;
    }

    form.loginform {
        position: relative;
        padding: 25px;
        background-color: #FFF;
        color: #333;
    }

    .loginform .form-group {
        position: relative;
        margin-bottom: 25px;
        text-align: left;
    }

    .loginform label {
        margin-bottom: 12px;
        display: block;
        color: #444;
        text-transform: uppercase;
        font-size: 12px;
        letter-spacing: 0.5px;
        font-weight: 600;
    }

    .release-contnet {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
    }

    .loginform .release-contnet #remember {
        display: inline;
        width: 20px;
        height: auto;
    }

    .login-button button {
        width: 100%;
        padding: 10px;
        background: #0162f5;
        color: #fff;
        border: 1px solid #ddd;
        border-radius: 5px;
        text-transform: uppercase;
        margin-top: 30px;
    }

    .loginform .register {
        margin: -23px 0px 0px 0px;
        padding: 0;
        text-align: right;
    }

</style>
