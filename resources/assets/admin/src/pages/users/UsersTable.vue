<template>
    <v-card flat>
        <v-card-title>
            <v-select
                :items="BulkActions"
                label="Bulk Action"
                placeholder="Bulk Action"
                solo
                flat />
            <v-spacer />
            <v-text-field
                v-model="search"
                append-icon="search"
                label="Search"
                single-line
                hide-details />
        </v-card-title>

        <v-data-table
            :headers="headers"
            :items="users"
            :search="search"
            v-model="selected"
            item-key="name"
            select-all
            flat
            hide-actions
            class="elevation-1" >

            <template
                slot="items"
                slot-scope="props">
                <td>
                    <v-checkbox
                        v-model="props.selected"
                        primary
                        hide-details />
                </td>
                <td>
                    <v-avatar
                        :title="props.item.firstname"
                        :size="32"
                        color="grey lighten-4" >
                        <img
                            :src="props.item.avatar"
                            :alt="props.item.firstname" >
                    </v-avatar>
                </td>
                <td>{{ props.item.firstname }}</td>
                <td>{{ props.item.lastname }}</td>
                <td>{{ props.item.email }}</td>
                <td>{{ props.item.role }}</td>
                <td>
                    <div class="text-xs-center">
                        <v-chip
                            :class="props.item.status"
                            @click="activation(props.item)"
                            small>
                            {{ props.item.status }}
                        </v-chip>
                    </div>
                </td>
                <td class="justify-center layout px-0">
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
                </td>
            </template>
        </v-data-table>

        <div class="text-xs-left pt-2">
            <v-pagination
                v-model="currentpage"
                :length="pagination.count" />
        </div>
        <v-dialog
            v-model="openEditUserForm"
            max-width="500px">
            <user-form
                :user="editUser"
                @close="openEditUserForm = false" />
        </v-dialog>
    </v-card>
</template>


<script>
import { mapState } from 'vuex';
import UserForm from './UserForm.vue';

export default {
    components: {
        UserForm,
    },
    data () {
        return {
            currentpage: typeof this.$route.query.page === 'undefined' ? 1 : parseInt(this.$route.query.page, 10),
            search: '',
            editUser: {},
            openEditUserForm: false,
            selected: [],
            headers: [
                {
                    text: 'Avatar',
                    value: 'avatar',
                    sortable: false,
                },
                {
                    text: 'First Name',
                    align: 'left',
                    sortable: true,
                    value: 'firstname',
                },
                { text: 'Last Name', value: 'lastname', align: 'left' },
                { text: 'Email', value: 'email', align: 'left' },
                { text: 'Role', value: 'role', align: 'left' },
                { text: 'Status', align: 'left', value: 'status' },
                { text: 'Action', align: 'left', value: 'action' },
            ],
            BulkActions: [
                'Delete',
            ],
        };
    },
    computed: {
        ...mapState('Users', ['users', 'pagination']),
    },
    watch: {
        currentpage (newValue) {
            this.$router.push({ name: 'users', query: { page: newValue } });
            this.$store.dispatch('Users/getUsers', { page: newValue });
        },
    },
    created () {
        this.$store.dispatch('Users/getUsers', { page: parseInt(this.$route.query.page, 10) });
    },
    methods: {
        editUserMethod (user) {
            const index = this.users.findIndex(u => u.id === user.id);
            if (index !== -1) {
                this.editUser = this.users[index];
                this.openEditUserForm = true;
            }
        },
        deleteUser (user) {
            if (confirm('Are you sure you want to delete this item?')) {
                this.$store.dispatch('Users/deleteUser', user.id);
            }
        },
        activation (user) {
            let status = user.status == "Inactive" ? 1:0; 
            Vue.set(user, 'status', status)
            this.$store.dispatch('Users/updateUser', user)
                .then(()=>{
                    this.$forceUpdate();
                });
        }
    },
};
</script>
