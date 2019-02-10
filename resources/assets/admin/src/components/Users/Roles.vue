<template>
    <v-layout row>
        <v-flex
            xs12
            sm4>
            <v-card flat>
                <v-toolbar
                    flat
                    color="secondary">

                    <v-toolbar-title>Roles</v-toolbar-title>

                    <v-spacer />

                    <v-btn icon>
                        <v-icon>search</v-icon>
                    </v-btn>

                </v-toolbar>
                <role-form :half-form="false" />

                <v-list
                    v-for="role in roles"
                    :key="role.id"
                    two-line
                    subheader>

                    <role :role="role" />

                </v-list>
            </v-card>

        </v-flex>
        <v-flex
            xs12
            sm6>
            <router-view />
        </v-flex>
    </v-layout>
</template>


<script>
import { mapState } from 'vuex';
import RoleForm from './RoleForm.vue';
import Role from './Role.vue';

export default {
    components: {
        RoleForm,
        Role,
    },
    data () {
        return {
            status: true,
        };
    },
    computed: {
        ...mapState('Users', ['roles']),
    },
    created () {
        this.$store.dispatch('Users/getRole');
    },
    methods: {
    },
};
</script>

<style lang="css">
.role-action {
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
}
</style>
