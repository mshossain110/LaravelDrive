<template>
    <div class="auth-form text-center">

        <form method="POST" v-on:submit.prevent="resetPassword">
            <img class="mb-4" src="/img/logo.svg" alt="" width="300" height="72">

            <label for="email" class="sr-only">Email address</label>
            <input type="email" id="email" class="form-control" placeholder="Email address" required autofocus v-model="email">

            <input type="hidden" name="token" required v-model="token">

            <label for="password" class="sr-only">Password</label>
            <input type="password" id="password" class="form-control" placeholder="Password" required v-model="password">

            <label for="password_confirmation" class="sr-only">Confirm Password</label>
            <input type="password" id="password_confirmation" class="form-control" placeholder="Password Confirmation" required v-model="password_confirmation">

            <div class="alert alert-danger mt-3" role="alert" v-if="authErrors.any()">
                <div v-text="authErrors.get('email')"></div>
                <div v-text="authErrors.get('password')"></div>
            </div>

            <button class="btn btn-lg btn-primary btn-block mt-2 mb-2" type="submit">Reset Password</button>

        </form>

    </div>
</template>

<script>
    export default {
        data(){
            return {
                'action': 'password-reset',
                'email':'',
                'password':'',
                'password_confirmation':'',
                'token':''
            }
        },
        computed: {
            authErrors(){
                return this.$store.getters.authErrors;
            }
        },
        methods: {
            resetPassword: function () {
                const { action, email, password, password_confirmation, token } = this;
                this.$store.dispatch('authRequest', { action, email, password, password_confirmation, token })
                    .then(() => {
                        this.$router.push('/dashboard')
                    })
            }
        },
        mounted(){
            let token = this.$route.params.token;
            if(!token){
                this.$router.push('/');
            }
            this.token = token;
        }
    }
</script>
