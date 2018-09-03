<template>
    <v-layout
        row
        wrap>
        <v-flex xs12 >
            <v-toolbar
                flat
                light
                height="60px"
                color="secondary">
                <v-toolbar-title class="headline">
                    <v-icon>people</v-icon>
                    Users
                </v-toolbar-title>

                <v-spacer />

                <v-btn
                    icon
                    @click="openform = true">
                    <v-icon>person_add</v-icon>
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
            <users-table />
        </v-flex>

        <v-dialog
            v-model="openform"
            max-width="500px">
            <user-form @close="openform = false"/>
        </v-dialog>

    </v-layout>
</template>


<script>
import UsersTable from './UsersTable.vue';
import UserForm from './UserForm.vue';

export default {
    components: {
        UsersTable,
        UserForm,
    },
    data () {
        return {
            openform: false,
        };
    },
    computed: {
    },
    methods: {
    },
};
</script>

<style>

</style>
