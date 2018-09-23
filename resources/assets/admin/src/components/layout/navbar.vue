<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="#">

            <img src="/img/vue.svg" width="30" height="30" class="d-inline-block align-top" alt="">
             Authentication
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ml-auto">

                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="UserDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {{user.name}}
                    </a>
                    <div class="dropdown-menu" aria-labelledby="UserDropdown">
                        <a class="dropdown-item" href="#" @click.prevent="logout">Sign Out</a>
                    </div>
                </li>

            </ul>
        </div>
    </nav>
</template>



<script>
    export default {
        data(){
            return {
            }
        },
        computed: {
            user(){
                return this.$store.getters.getProfile;
            }
        },
        methods: {
            logout: function () {
                this.$store.dispatch('authLogout')
                    .then(() => {
                        this.$router.push('/')
                    })
            }
        }
    }
</script>
