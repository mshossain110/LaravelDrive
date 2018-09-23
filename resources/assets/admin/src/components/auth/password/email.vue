<template>
    <div class="auth-form text-center">

        <form method="POST" v-on:submit.prevent="sendPasswordResetEmail" v-if="seconds>4">
            <router-link :to="{ name: 'login' }">
                <img class="mb-4" src="/img/logo.svg" alt="" width="300" height="72">
            </router-link>

            <label for="email" class="sr-only">Email address</label>
            <input type="email" id="email" class="form-control" placeholder="Email address" required autofocus v-model="email">

            <button class="btn btn-lg btn-primary btn-block mt-2 mb-2" type="submit" :disabled="disableSubmit">Send Email</button>
            Go back to <router-link :to="{ name: 'login' }">login</router-link> page.
        </form>


        <div class="container" v-else>
            <h2 class="text-success mt-5">Password recovery email sent!</h2>

            <div class="progress mt-3 mb-3 ml-5 mr-5">
                <div class="progress-bar bg-success" role="progressbar" :style="progress" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
            </div>

            <h3>Redirecting in {{seconds}} seconds</h3>

        </div>

    </div>
</template>

<script>
    export default {
        data(){
            return {
                'disableSubmit':false,
                'email':'',
                'seconds': 5
            }
        },
        computed:{
            progress:function(){
                return 'width: ' + ( 20*Math.abs(5-this.seconds) ) + '%';
            }
        },
        methods: {
            sendPasswordResetEmail: function () {
                self = this;
                self.disableSubmit=true;
                axios.post('/password/email', {'email':self.email} )
                    .then((resp) => {
                        self.countdownRedirect();
                    })
                    .catch(()=>{
                        self.disableSubmit=false;
                        self.seconds=5;
                    })
            },
            countdownRedirect: function () {
                self = this;
                setInterval(()=>{
                    self.seconds=self.seconds-1;
                    if (self.seconds === 0) {
                        self.$router.push('/');
                    }
                }, 1000);

            },
        }
    }
</script>
