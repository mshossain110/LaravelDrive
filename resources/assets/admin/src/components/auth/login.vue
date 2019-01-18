<template>
    <VCard>
        <VCardTitle
            class="headline grey lighten-2"
            primary-title
        >
            Login
        </VCardTitle>

        <VCardText>
            <div class="auth-form text-center">
                <VForm
                    ref="form"
                    lazy-validation
                    @submit.prevent="login"
                >
                    <VTextField
                        v-model="email"
                        v-validate="'required|email'"
                        :error-messages="errors.collect('email')"
                        label="E-mail"
                        data-vv-name="email"
                        required
                    />

                    <VTextField
                        v-model="password"
                        v-validate="'required'"
                        type="password"
                        :error-messages="errors.collect('password')"
                        label="Password"
                        data-vv-name="password"
                        required
                    />

                    <VCheckbox
                        v-model="remember"
                        :error-messages="errors.collect('remember')"
                        value="1"
                        label="Remember me"
                        data-vv-name="remember"
                        type="checkbox"
                    />

                    <p>
                        <a href="/foget">
                            Forgot Password
                        </a>
                    </p>

                    <p>
                        Don't have an account? <a href="/register">
                            Register
                        </a>
                    </p>

                    <VBtn type="submit">
                        Sign in
                    </VBtn>
                    <VBtn @click="clear">
                        clear
                    </VBtn>
                </VForm>
            </div>
        </VCardText>
    </VCard>
</template>

<script>

import VeeValidate from 'vee-validate'
export default {
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
            this.$store.dispatch('authRequest', { email, password, remember })
                .then(() => {
                    location.reload()
                })
        },
        clear () {
            this.email = ''
            this.password = null
            this.remember = null
            this.$validator.reset()
        }
    }
}
</script>
