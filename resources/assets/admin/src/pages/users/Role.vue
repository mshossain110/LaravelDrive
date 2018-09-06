<template>
    <div>

        <v-list-tile
            :to="{name: 'role-permissions', params: { id: role.id }}"
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
                    @click="roleEdit = !roleEdit" >
                    edit
                </v-icon>
                <v-icon
                    small
                    @click="deleteRole(role.id)" >
                    delete
                </v-icon>
            </v-list-tile-action>
        </v-list-tile>
        <role-form
            v-if="roleEdit"
            :role="role"
            @close="roleEdit = false" />
    </div>
</template>


<script>
import RoleForm from './RoleForm.vue';

export default {
    components: {
        RoleForm,
    },
    props: {
        role: {
            type: Object,
            required: true,
        },
    },
    data () {
        return {
            roleEdit: false,
        };
    },
    computed: {

    },
    methods: {
        deleteRole (id) {
            this.$store.dispatch('Users/deleteRole', id);
        },
    },
};
</script>
