<template>
    <div class="auth-form text-center">
        <form
            method="POST"
            @submit.prevent="resetPassword"
        >
            <img
                class="mb-4"
                src="/img/logo.svg"
                alt=""
                width="300"
                height="72"
            >

            <label
                for="email"
                class="sr-only"
            >
                Email address
            </label>
            <input
                id="email"
                v-model="email"
                type="email"
                class="form-control"
                placeholder="Email address"
                required
                autofocus
            >

            <input
                v-model="token"
                type="hidden"
                name="token"
                required
            >

            <label
                for="password"
                class="sr-only"
            >
                Password
            </label>
            <input
                id="password"
                v-model="password"
                type="password"
                class="form-control"
                placeholder="Password"
                required
            >

            <label
                for="password_confirmation"
                class="sr-only"
            >
                Confirm Password
            </label>
            <input
                id="password_confirmation"
                v-model="password_confirmation"
                type="password"
                class="form-control"
                placeholder="Password Confirmation"
                required
            >

            <div
                v-if="authErrors.any()"
                class="alert alert-danger mt-3"
                role="alert"
            >
                <div v-text="authErrors.get('email')" />
                <div v-text="authErrors.get('password')" />
            </div>

            <button
                class="btn btn-lg btn-primary btn-block mt-2 mb-2"
                type="submit"
            >
                Reset Password
            </button>
        </form>
    </div>
</template>

<script>
export default {
    data () {
        return {
            'action': 'password-reset',
            'email': '',
            'password': '',
            'password_confirmation': '',
            'token': ''
        }
    },
    computed: {
        authErrors () {
            return this.$store.getters.authErrors
        }
    },
    mounted () {
        let token = this.$route.params.token
        if (!token) {
            this.$router.push('/')
        }
        this.token = token
    },
    methods: {
        resetPassword: function () {
            const { action, email, password, password_confirmation, token } = this // eslint-disable-line camelcase
            this.$store.dispatch('authRequest', { action, email, password, password_confirmation, token })
                .then(() => {
                    this.$router.push('/dashboard')
                })
        }
    }
}
</script>
