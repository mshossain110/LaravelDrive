<template>
    <form
        @submit.prevent="login"
    >
        <h3>Login To Our App</h3>
        <p>Fill in the form to get instant access</p>

        <div>
            <div class="form-group">
                <label for="name">
                    User name / Email
                </label>
                <input
                    v-model="email"
                    v-validate="'required'"
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
                <label for="password">
                    Password
                </label>
                <input
                    v-model="password"
                    v-validate="'required'"
                    :class="{'input': true, 'is-danger': errors.has('email') }"
                    type="password"
                    name="password"
                    placeholder="Password..."
                >
                <span
                    v-show="errors.has('email')"
                    class="help is-danger"
                >
                    {{ errors.first('email') }}
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
                        href="#"
                        class=""
                    >
                        Forgot Your Password?
                    </a>
                </div>
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
import { Validator } from 'vee-validate'

let CsrfToken = document.head.querySelector('meta[name="csrf-token"]')
export default {
    name: 'Login',
    $_veeValidate: {
        validator: 'new'
    },
    data () {
        return {
            email: '',
            password: null,
            remember: false
        }
    },
    computed: {
        authErrors () {
            return this.$store.getters.authErrors
        }
    },
    methods: {
        login () {
            this.$validator.validateAll()
            const { email, password, remember } = this
            this.authRequest({ email, password, remember })
                .then(() => {
                    // reset state, flags and clears errors.
                    this.$nextTick(() => {
                        this.$validator.reset()
                    })
                    location.reload()
                })
        },
        clear () {
            this.email = ''
            this.password = null
            this.remember = null
            this.$validator.reset()
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
                        console.log(res)
                        resolve(res.data)
                    })
                    .catch((err) => {
                        console.error(err.response)
                        reject(err.response.data)
                    })
            })
        }
    }
}
</script>
