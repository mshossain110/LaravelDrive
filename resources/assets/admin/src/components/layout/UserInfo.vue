<template>
    <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :nudge-width="300"
        nudge-top
        offset-y
        >
      
        <v-avatar size="32px"  slot="activator">
          <img
            src="https://cdn.vuetifyjs.com/images/john.jpg"
            alt="Vuetify"
          >
        </v-avatar>
      

      <v-card>
        <v-layout row class="pa-2">
            <v-flex xs5>
                <v-avatar size="100px">
                    <img
                    src="https://cdn.vuetifyjs.com/images/john.jpg"
                    alt="Vuetify"
                    >
                </v-avatar>
            </v-flex>
            <v-flex xs7 class="ml-2">
                <p>{{ fullname }} </p>
                <p>{{ currentUser.email }} </p>
            </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row class="mt-3">
            <v-flex xs4>
                <div>
                    <v-btn depressed small>Normal</v-btn>
                </div>
                
                
                
            </v-flex>
            <v-flex xs4 class="ml-2">
                <div>
                    <v-btn depressed small>Normal</v-btn>
                </div>
                
                
            </v-flex>

            <v-flex xs4 class="ml-2">
                <div>
                    <v-btn depressed small color="error" @click.prevent="logout()">Log out</v-btn>
                </div>
            </v-flex>
        </v-layout>

      </v-card>
    </v-menu>
</template>


<script>
export default {
    data () {
        return {
            fav: true,
            menu: false,
            message: false,
            hints: true,
        }
    },
    computed: {
        
    },
    methods: {
        logout () {
            this.$store.dispatch('authLogout')
                .then(() => {
                    location.replace('/');
                })
        }   
        
    }
}
</script>

<style>
    
</style>