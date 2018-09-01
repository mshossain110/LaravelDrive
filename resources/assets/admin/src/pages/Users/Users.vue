<template>
        <v-layout row wrap>
                <v-flex xs12 >
                    <v-toolbar flat light height="60px" color="secondary">
                        

                        <v-toolbar-title class="headline"> <v-icon>people</v-icon> Users</v-toolbar-title>

                        <v-spacer></v-spacer>

                        <v-btn icon>
                        <v-icon>search</v-icon>
                        </v-btn>

                        <v-btn icon>
                        <v-icon>apps</v-icon>
                        </v-btn>

                        <v-btn icon>
                        <v-icon>refresh</v-icon>
                        </v-btn>

                        <v-btn icon>
                        <v-icon>more_vert</v-icon>
                        </v-btn>
                    </v-toolbar>
                
                </v-flex>

                <v-flex xs12>
                    <users-table></users-table>
                </v-flex>


        </v-layout>
</template>


<script>
    import UsersTable from './UsersTable.vue';
    
    export default {
        data () {
            return {
                
            }
        },
        computed: {
            
        },
        methods: {
            
        },
        components: {
            UsersTable,
        }
    }
</script>

<style>
    
</style>