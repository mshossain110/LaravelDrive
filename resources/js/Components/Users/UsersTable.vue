<template>
    <VCard flat>
        <VCardTitle>
            <VSelect
                :items="BulkActions"
                label="Bulk Action"
                placeholder="Bulk Action"
                solo
                flat
            />
            <VSpacer />
            <VTextField
                v-model="search"
                append-icon="search"
                label="Search"
                single-line
                hide-details
            />
        </VCardTitle>

        <VDataTable
            v-model="selected"
            :headers="headers"
            :items="users"
            :search="search"
            item-key="name"
            show-select
            class="elevation-1"
        >
            <template
                v-slot:header.data-table-select="{ on, props }"
            >
                <VSimpleCheckbox
                    color="purple"
                    v-bind="props"
                    v-on="on"
                />
            </template>

            <template
                v-slot:item.data-table-select="{ isSelected, select }"
            >
                <VSimpleCheckbox
                    color="green"
                    :model-value="isSelected"
                    @input="select($event)"
                />
            </template>

            <template
                v-slot:item.avatar="{ item }"
            >
                <VAvatar
                    v-if="item.avatar"
                    :title="item.firstname"
                    :size="32"
                    color="grey lighten-4"
                >
                    <img
                        :src="item.avatar"
                        :alt="item.firstname"
                    >
                </VAvatar>
                <VAvatar
                    v-else
                    :style="getRandomColor()"
                    :size="32"
                >
                    <span class="white--text headline">
                        {{ item.name.charAt(0).toUpperCase() }}
                    </span>
                </VAvatar>
            </template>

            <template
                v-slot:item.status="{ item }"
            >
                <div class="text-xs-center">
                    <VChip
                        :class="item.status"
                        small
                        @click="activation(item)"
                    >
                        {{ item.status }}
                    </VChip>
                </div>
            </template>

            <template v-slot:item.action="{item}">
                <VIcon
                    v-if="hasPermission('user.update')"
                    small
                    class="mr-2"
                    @click="editUserMethod(item)"
                >
                    edit
                </VIcon>
                <VIcon
                    v-if="hasPermission('user.delete') && currentUser.id !== item.id"
                    small
                    @click="deleteUser(item)"
                >
                    delete
                </VIcon>
            </template>
        </VDataTable>

        <VDialog
            v-if="hasPermission('user.update')"
            v-model="openEditUserForm"
            max-width="500px"
        >
            <UserForm
                :user="editUser"
                @close="openEditUserForm = false"
            />
        </VDialog>
    </VCard>
</template>

<script>
import { mapState } from 'vuex';
import UserForm from './UserForm.vue';

export default {
    components: {
        UserForm
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
                    sortable: false
                },
                {
                    text: 'First Name',
                    align: 'left',
                    sortable: true,
                    value: 'firstname'
                },
                { text: 'Last Name', value: 'lastname', align: 'left' },
                { text: 'Email', value: 'email', align: 'left' },
                { text: 'Role', value: 'role', align: 'left' },
                { text: 'Status', align: 'left', value: 'status' },
                { text: 'Action', align: 'left', value: 'action' }
            ],
            BulkActions: [
                'Delete'
            ]
        };
    },
    computed: {
        ...mapState('Users', ['users', 'pagination'])
    },
    watch: {
        currentpage (newValue) {
            this.$router.push({ name: 'users', query: { page: newValue } });
            this.$store.dispatch('Users/getUsers', { page: newValue });
        }
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
            if (!this.hasPermission('user.updata')) {
                return;
            }
            const status = user.status.toLowerCase() === 'inactive' ? 'active' : 'inactive';
            this.$set(user, 'status', status);
            this.$store.dispatch('Users/updateUser', user)
                .then(() => {
                    this.$forceUpdate();
                });
        },
        getRandomColor () {
            const h = Math.floor(Math.random() * 360);
            const s = Math.floor(Math.random() * 100) + '%';
            const l = Math.floor(Math.random() * 60) + '%';

            return {
                backgroundColor: `hsl(${h},${s},${l})`
            };
        }
    }
};
</script>
