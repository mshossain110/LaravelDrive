<template>
    <v-card>
        <v-card-title
            class="headline grey lighten-2"
            primary-title >
            Login
        </v-card-title>

        <v-card-text>
                   
            <div class="auth-form text-center">
                <v-form ref="form" v-on:submit.prevent="login" lazy-validation>
                    <v-text-field
                        v-validate="'required|email'"
                        v-model="email"
                        :error-messages="errors.collect('email')"
                        label="E-mail"
                        data-vv-name="email"
                        required
                        ></v-text-field>

                        <v-text-field
                        v-validate="'required'"
                        v-model="password"
                        type="password"
                        :error-messages="errors.collect('password')"
                        label="Password"
                        data-vv-name="password"
                        required
                        ></v-text-field>

                
                        <v-checkbox
                            v-model="remember"
                            :error-messages="errors.collect('remember')"
                            value="1"
                            label="Remember me"
                            data-vv-name="remember"
                            type="checkbox"
                            
                            ></v-checkbox>

                        <p> <a href="/foget">Forgot Password</a></p>

                        <p>Don't have an account? <a href="/register">Register</a></p>

                        <v-btn type="submit">Sign in</v-btn>
                        <v-btn @click="clear">clear</v-btn>
                       

                    

                </v-form>

            </div>
        </v-card-text>
                
    </v-card>
</template>

<script>

import VeeValidate from 'vee-validate'
export default {
    $_veeValidate: {
      validator: 'new'
    },
    data(){
        return {
            email: '',
            password: null,
            remember: false,
        }
    },
    computed: {
        authErrors(){
            return this.$store.getters.authErrors;
        }
    },
    methods: {
        login () {
            this.$validator.validateAll();
            const { email, password, remember } = this;
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
