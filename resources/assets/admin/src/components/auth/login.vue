<template>
    <div class="auth-form text-center">

        <form method="POST" v-on:submit.prevent="login">

            <p class="text-danger" v-if="authErrors.has('invalid_credentials')" v-text="authErrors.get('invalid_credentials')"></p>

            <label for="email" class="sr-only">Email address</label>
            <input type="email" id="email" class="form-control" placeholder="Email address" required autofocus v-model="email">

            <label for="password" class="sr-only">Password</label>
            <input type="password" id="password" class="form-control" placeholder="Password" required v-model="password">

            <div class="checkbox mt-2">
                <label>
                    <input type="checkbox" value="remember" v-model="remember"> Remember me
                </label>
            </div>

            <button class="btn btn-lg btn-primary btn-block mt-2 mb-2" type="submit">Sign in</button>

            <router-link :to="{ name: 'password-email' }">Forgot Password</router-link>

            <p>Don't have an account? <router-link :to="{ name: 'register' }">Register</router-link></p>

        </form>

    </div>
</template>

<script>
    export default {
        data(){
            return {
                'email':'',
                'password':'',
                'remember':false,
            }
        },
        computed: {
            authErrors(){
                return this.$store.getters.authErrors;
            }
        },
        methods: {
            login: function () {
                const { email, password, remember } = this;
                this.$store.dispatch('authRequest', { email, password, remember })
                    .then(() => {
                        this.$router.push('/dashboard')
                    })
            }
        }
    }
</script>
