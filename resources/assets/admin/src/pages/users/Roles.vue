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

                <v-list
                    v-for="role in roles"
                    :key="role.id"
                    two-line
                    subheader>

                    <v-list-tile
                        :to="{name: 'role-permissions', params: { id: 1 }}"
                        avatar
                        ripple>
                        <v-list-tile-content>
                            <v-list-tile-title>{{ role.name }}</v-list-tile-title>
                            <v-list-tile-sub-title>
                                {{ role.description }}
                            </v-list-tile-sub-title>
                        </v-list-tile-content>
                        <v-list-tile-action class="role-action">

                            <v-icon
                                small
                                class="mr-2"
                                @click="editUserMethod(props.item)" >
                                edit
                            </v-icon>
                            <v-icon
                                small
                                @click="deleteUser(props.item)" >
                                delete
                            </v-icon>
                        </v-list-tile-action>
                    </v-list-tile>
                </v-list>
            </v-card>
            <role-form />
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

export default {
    components: {
        RoleForm,
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
