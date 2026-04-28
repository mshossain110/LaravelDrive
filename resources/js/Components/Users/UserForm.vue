<template>
    <form @submit.prevent="submit()" class="space-y-4">
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
                <label class="mb-1 block text-sm font-medium text-gray-700">First Name</label>
                <input
                    v-model="user.firstname"
                    type="text"
                    class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                />
            </div>
            <div>
                <label class="mb-1 block text-sm font-medium text-gray-700">Last Name</label>
                <input
                    v-model="user.lastname"
                    type="text"
                    class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                />
            </div>
        </div>

        <div>
            <label class="mb-1 block text-sm font-medium text-gray-700">User Name *</label>
            <input
                v-model="user.name"
                type="text"
                :disabled="Boolean(user.id)"
                required
                class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 disabled:bg-gray-100 disabled:text-gray-500"
            />
        </div>

        <div>
            <label class="mb-1 block text-sm font-medium text-gray-700">E-mail *</label>
            <input
                v-model="user.email"
                type="email"
                :disabled="Boolean(user.id)"
                required
                class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 disabled:bg-gray-100 disabled:text-gray-500"
            />
        </div>

        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
                <label class="mb-1 block text-sm font-medium text-gray-700">Password</label>
                <input
                    ref="password"
                    v-model="user.password"
                    type="password"
                    class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                />
            </div>
            <div>
                <label class="mb-1 block text-sm font-medium text-gray-700">Confirm Password</label>
                <input
                    v-model="user.password_confirmation"
                    type="password"
                    class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                />
            </div>
        </div>

        <div>
            <label class="mb-1 block text-sm font-medium text-gray-700">Permissions</label>
            <Multiselect
                v-model="user.permissions"
                :options="permissions"
                :multiple="true"
                :group-select="true"
                :searchable="false"
                group-values="permissions"
                group-label="model"
                placeholder="Add Permissions"
            />
        </div>

        <p class="text-xs text-gray-500">* indicates required field</p>

        <div class="flex justify-end gap-3 border-t border-gray-100 pt-4">
            <button
                type="button"
                class="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                @click="$emit('close', false)"
            >
                Close
            </button>
            <button
                type="submit"
                class="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
            >
                Save
            </button>
        </div>
    </form>
</template>

<script>
import Multiselect from 'vue-multiselect';
import { mapState } from 'vuex';

export default {
    components: {
        Multiselect
    },
    props: {
        user: {
            type: Object,
            default () {
                return {
                    firstname: '',
                    lastname: '',
                    name: '',
                    email: '',
                    password: '',
                    password_confirmation: '',
                    permissions: [],
                    role: 0,
                    avatar: ''
                };
            }
        }
    },
    data: () => ({}),
    computed: {
        ...mapState('Users', ['permissions'])
    },
    created () {
        this.$store.dispatch('Users/getPermissions');
    },
    methods: {
        submit () {
            const user = {
                id: this.user.id,
                firstname: this.user.firstname,
                lastname: this.user.lastname,
                name: this.user.name,
                email: this.user.email,
                password: this.user.password,
                password_confirmation: this.user.password_confirmation,
                permissions: this.user.permissions,
                role: this.user.role,
                avatar: this.user.avatar
            };
            if (!this.user.id) {
                this.$store.dispatch('Users/addUser', user)
                    .then(() => {
                        this.clear();
                        this.$emit('close', false);
                    });
            } else {
                this.$store.dispatch('Users/updateUser', user)
                    .then(() => {
                        this.$emit('close', false);
                    });
            }
        },
        clear () {
            this.user = {
                firstname: '',
                lastname: '',
                name: '',
                email: '',
                permissions: [],
                role: 0,
                avatar: ''
            };
        }
    }
};
</script>
