<template>
    <div class="auth-form text-center">

        <form method="POST" v-on:submit.prevent="register" @keydown="authErrors.clear($event.target.name)">

            <router-link :to="{ name: 'login' }">
                <img class="mb-4" src="/img/logo.svg" alt="" width="300" height="72">
            </router-link>

            <label for="name" class="sr-only">Name</label>
            <input type="text" id="name" class="form-control" placeholder="Name" required autofocus v-model="name">

            <label for="email" class="sr-only">Email address</label>
            <input type="email" id="email" class="form-control" placeholder="Email address" required v-model="email">

            <label for="password" class="sr-only">Password</label>
            <input type="password" id="password" class="form-control" placeholder="Password" required v-model="password">

            <label for="password_confirmation" class="sr-only">Confirm Password</label>
            <input type="password" id="password_confirmation" class="form-control" placeholder="Password Confirmation" required v-model="password_confirmation">

            <div class="alert alert-danger mt-3" role="alert" v-if="authErrors.has('name') || authErrors.has('email') || authErrors.has('password')">
                <div v-text="authErrors.get('name')"></div>
                <div v-text="authErrors.get('email')"></div>
                <div v-text="authErrors.get('password')"></div>
            </div>

            <button class="btn btn-lg btn-primary btn-block mt-2 mb-2" type="submit">Register</button>

            Have an account? <router-link :to="{ name: 'login' }">Login</router-link>

        </form>

    </div>
</template>


<script>
    export default {
        data(){
            return {
                'action':'register',
                'name':'',
                'email':'',
                'password':'',
                'password_confirmation':'',
            }
        },
        computed: {
            authErrors(){
                return this.$store.getters.authErrors;
            }
        },
        methods: {
            register: function () {
                const { action, name, email, password, password_confirmation } = this;
                this.$store.dispatch('authRequest', { action, name, email, password, password_confirmation })
                    .then(() => {
                        this.$router.push('/dashboard')
                    })
            }
        }
    }
</script>
