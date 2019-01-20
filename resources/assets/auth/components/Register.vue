<template>
    <form
        role="registation"
        class="register"
        @submit.prevent="register"
    >
        <h3>Register</h3>
        <p>Fill in the form to get instant access</p>

        <div>
            <div class="form-group">
                <input
                    v-model="firstname"
                    :class="{'input': true, 'is-danger': errors.has('firstname') }"
                    type="text"
                    name="firstname"
                    placeholder="First name..."
                >
                <span
                    v-show="errors.has('firstname')"
                    class="help is-danger"
                >
                    {{ errors.first('firstname') }}
                </span>
            </div>
            <div class="form-group">
                <input
                    v-model="lastname"
                    :class="{'input': true, 'is-danger': errors.has('lastname') }"
                    type="text"
                    name="lastname"
                    placeholder="Last name..."
                >
                <span
                    v-show="errors.has('lastname')"
                    class="help is-danger"
                >
                    {{ errors.first('lastname') }}
                </span>
            </div>
            <div class="form-group">
                <input
                    v-model="name"
                    :class="{'input': true, 'is-danger': errors.has('name') }"
                    type="text"
                    name="name"
                    placeholder="User Name..."
                >
                <span
                    v-show="errors.has('name')"
                    class="help is-danger"
                >
                    {{ errors.first('name') }}
                </span>
            </div>

            <div class="form-group">
                <input
                    v-model="email"
                    :class="{'input': true, 'is-danger': errors.has('email') }"
                    type="emial"
                    name="email"
                    placeholder="Email..."
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
                    type="password"
                    :class="{'input': true, 'is-danger': errors.has('password') }"
                    name="f1-password"
                    placeholder="Password..."
                >
                <span
                    v-show="errors.has('password')"
                    class="help is-danger"
                >
                    {{ errors.first('password') }}
                </span>
            </div>
            <div class="form-group">
                <input
                    v-model="password_confirmation"
                    type="password"
                    :class="{'input': true, 'is-danger': errors.has('password_confirmation') }"
                    name="password_confirmation"
                    placeholder="Repeat password..."
                >
                <span
                    v-show="errors.has('password_confirmation')"
                    class="help is-danger"
                >
                    {{ errors.first('password_confirmation') }}
                </span>
            </div>
            <div class="forget-button">
                Have an account ?
                <a
                    href="/login"
                    class=""
                >
                    Login Now
                </a>
            </div>

            <div class="login-button">
                <button
                    type="submit"
                    name="login"
                >
                    Register
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
    name: 'Register',
    data () {
        return {
            firstname: '',
            lastname: '',
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            errors: new Errors()
        }
    },
    methods: {
        register () {
            const params = {
                firstname: this.firstname,
                lastname: this.lastname,
                name: this.name,
                email: this.email,
                password: this.password,
                password_confirmation: this.password_confirmation
            }
            this.authRequest(params)
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
            return new Promise((resolve, reject) => {
                axios.post('/register', params, {
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
    .register h3 {
        margin-bottom: 25px;
        margin-top: 0;
        text-transform: uppercase;
        font-weight: 700;
        font-size: 20px;
        text-align: center;
    }
    .register p {
        text-align: center;
    }
    .register  a {
        text-decoration: none;
        font-size: 13px;
        font-weight: 700;
        color: #598bd6;
    }
    .register a:hover {
        color: #1a5dc3;
    }
    .register .help.is-danger {
        color:red;
        font-size: 10px;
    }
    .register input {
        height: 45px;
        padding: 5px 15px;
        width: 100%;
        border: solid 1px #f4f4f4;
        transition: all ease-in-out 0.3s;
        color: #999;
        font-size: 14px;
    }
    .register label {
        margin-bottom: 12px;
        display: block;
        color: #444;
        text-transform: uppercase;
        font-size: 12px;
        letter-spacing: 0.5px;
        font-weight: 600;
    }

    .register .input.is-danger {
        border-color: red;
    }

    form.register {
        position: relative;
        padding: 25px;
        background-color: #FFF;
        color: #333;
    }

    .register .form-group {
        position: relative;
        margin-bottom: 25px;
        text-align: left;
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
</style>
