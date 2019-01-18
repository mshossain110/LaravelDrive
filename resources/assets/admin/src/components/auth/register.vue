<template>
    <div class="auth-form text-center">
        <form
            method="POST"
            @submit.prevent="register"
            @keydown="authErrors.clear($event.target.name)"
        >
            <RouterLink :to="{ name: 'login' }">
                <img
                    class="mb-4"
                    src="/img/logo.svg"
                    alt=""
                    width="300"
                    height="72"
                >
            </RouterLink>

            <label
                for="name"
                class="sr-only"
            >
                Name
            </label>
            <input
                id="name"
                v-model="name"
                type="text"
                class="form-control"
                placeholder="Name"
                required
                autofocus
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
                v-if="authErrors.has('name') || authErrors.has('email') || authErrors.has('password')"
                class="alert alert-danger mt-3"
                role="alert"
            >
                <div v-text="authErrors.get('name')" />
                <div v-text="authErrors.get('email')" />
                <div v-text="authErrors.get('password')" />
            </div>

            <button
                class="btn btn-lg btn-primary btn-block mt-2 mb-2"
                type="submit"
            >
                Register
            </button>

            Have an account? <RouterLink :to="{ name: 'login' }">
                Login
            </RouterLink>
        </form>
    </div>
</template>

<script>
export default {
    data () {
        return {
            'action': 'register',
            'name': '',
            'email': '',
            'password': '',
            'password_confirmation': ''
        }
    },
    computed: {
        authErrors () {
            return this.$store.getters.authErrors
        }
    },
    methods: {
        register: function () {
            const { action, name, email, password, password_confirmation } = this // eslint-disable-line camelcase
            this.$store.dispatch('authRequest', { action, name, email, password, password_confirmation })
                .then(() => {
                    this.$router.push('/dashboard')
                })
        }
    }
}
</script>
