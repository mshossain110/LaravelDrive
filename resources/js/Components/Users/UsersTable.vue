<template>
    <div class="overflow-hidden rounded-xl bg-white shadow-sm">
        <!-- Table header with search & bulk actions -->
        <div class="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 px-6 py-4">
            <select class="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500">
                <option value="" disabled selected>Bulk Action</option>
                <option v-for="action in BulkActions" :key="action" :value="action">{{ action }}</option>
            </select>
            <div class="relative">
                <MagnifyingGlassIcon class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                    v-model="search"
                    type="text"
                    placeholder="Search"
                    class="rounded-lg border border-gray-300 py-2 pl-9 pr-4 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                />
            </div>
        </div>

        <!-- Table -->
        <div class="overflow-x-auto">
            <table class="w-full text-left text-sm">
                <thead class="border-b border-gray-200 bg-gray-50 text-xs uppercase text-gray-500">
                    <tr>
                        <th class="px-6 py-3">
                            <input
                                type="checkbox"
                                class="rounded border-gray-300 text-brand-600 focus:ring-brand-500"
                                :checked="allSelected"
                                @change="toggleSelectAll"
                            />
                        </th>
                        <th class="px-6 py-3">Avatar</th>
                        <th class="cursor-pointer px-6 py-3 hover:text-gray-700" @click="sortBy('firstname')">
                            <span class="flex items-center gap-1">
                                First Name
                                <ChevronUpDownIcon class="h-4 w-4" />
                            </span>
                        </th>
                        <th class="px-6 py-3">Last Name</th>
                        <th class="px-6 py-3">Email</th>
                        <th class="px-6 py-3">Role</th>
                        <th class="px-6 py-3">Status</th>
                        <th class="px-6 py-3">Action</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                    <tr
                        v-for="item in filteredUsers"
                        :key="item.id"
                        class="hover:bg-gray-50 transition-colors"
                    >
                        <td class="px-6 py-3">
                            <input
                                type="checkbox"
                                class="rounded border-gray-300 text-brand-600 focus:ring-brand-500"
                                :checked="selected.includes(item.id)"
                                @change="toggleSelect(item.id)"
                            />
                        </td>
                        <td class="px-6 py-3">
                            <img
                                v-if="item.avatar"
                                :src="item.avatar"
                                :alt="item.firstname"
                                :title="item.firstname"
                                class="h-8 w-8 rounded-full object-cover"
                            />
                            <span
                                v-else
                                class="inline-flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white"
                                :style="getRandomColor(item.id)"
                            >
                                {{ item.name?.charAt(0).toUpperCase() }}
                            </span>
                        </td>
                        <td class="px-6 py-3 font-medium text-gray-900">{{ item.firstname }}</td>
                        <td class="px-6 py-3 text-gray-600">{{ item.lastname }}</td>
                        <td class="px-6 py-3 text-gray-600">{{ item.email }}</td>
                        <td class="px-6 py-3 text-gray-600">{{ item.role }}</td>
                        <td class="px-6 py-3">
                            <button
                                class="rounded-full px-3 py-1 text-xs font-medium"
                                :class="item.status?.toLowerCase() === 'active'
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-red-100 text-red-700'"
                                @click="activation(item)"
                            >
                                {{ item.status }}
                            </button>
                        </td>
                        <td class="px-6 py-3">
                            <div class="flex items-center gap-2">
                                <button
                                    v-if="hasPermission('user.update')"
                                    class="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-blue-600"
                                    @click="editUserMethod(item)"
                                >
                                    <PencilIcon class="h-4 w-4" />
                                </button>
                                <button
                                    v-if="hasPermission('user.delete') && currentUser.id !== item.id"
                                    class="rounded p-1 text-gray-400 hover:bg-red-50 hover:text-red-600"
                                    @click="deleteUser(item)"
                                >
                                    <TrashIcon class="h-4 w-4" />
                                </button>
                            </div>
                        </td>
                    </tr>
                    <tr v-if="!filteredUsers.length">
                        <td colspan="8" class="px-6 py-12 text-center text-sm text-gray-500">
                            No users found.
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Edit User Modal -->
        <AppModal
            v-if="hasPermission('user.update')"
            :open="openEditUserForm"
            title="Edit User"
            max-width="500px"
            @close="openEditUserForm = false"
        >
            <UserForm :user="editUser" @close="openEditUserForm = false" />
        </AppModal>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { MagnifyingGlassIcon, ChevronUpDownIcon, PencilIcon, TrashIcon } from '@heroicons/vue/24/outline';
import UserForm from './UserForm.vue';
import AppModal from '@/Components/UI/AppModal.vue';

export default {
    components: {
        UserForm,
        AppModal,
        MagnifyingGlassIcon,
        ChevronUpDownIcon,
        PencilIcon,
        TrashIcon
    },
    data () {
        return {
            currentpage: typeof this.$route.query.page === 'undefined' ? 1 : parseInt(this.$route.query.page, 10),
            search: '',
            editUser: {},
            openEditUserForm: false,
            selected: [],
            sortField: '',
            sortAsc: true,
            BulkActions: ['Delete'],
            colorCache: {}
        };
    },
    computed: {
        ...mapState('Users', ['users', 'pagination']),
        filteredUsers () {
            let list = this.users || [];
            if (this.search) {
                const s = this.search.toLowerCase();
                list = list.filter(u =>
                    (u.firstname || '').toLowerCase().includes(s) ||
                    (u.lastname || '').toLowerCase().includes(s) ||
                    (u.email || '').toLowerCase().includes(s) ||
                    (u.name || '').toLowerCase().includes(s)
                );
            }
            if (this.sortField) {
                list = [...list].sort((a, b) => {
                    const va = (a[this.sortField] || '').toString().toLowerCase();
                    const vb = (b[this.sortField] || '').toString().toLowerCase();
                    return this.sortAsc ? va.localeCompare(vb) : vb.localeCompare(va);
                });
            }
            return list;
        },
        allSelected () {
            return this.filteredUsers.length > 0 && this.selected.length === this.filteredUsers.length;
        }
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
        sortBy (field) {
            if (this.sortField === field) {
                this.sortAsc = !this.sortAsc;
            } else {
                this.sortField = field;
                this.sortAsc = true;
            }
        },
        toggleSelectAll () {
            if (this.allSelected) {
                this.selected = [];
            } else {
                this.selected = this.filteredUsers.map(u => u.id);
            }
        },
        toggleSelect (id) {
            const idx = this.selected.indexOf(id);
            if (idx === -1) { this.selected.push(id); }
            else { this.selected.splice(idx, 1); }
        },
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
            if (!this.hasPermission('user.updata')) return;
            user.status = user.status.toLowerCase() === 'inactive' ? 'active' : 'inactive';
            this.$store.dispatch('Users/updateUser', user);
        },
        getRandomColor (id) {
            if (!this.colorCache[id]) {
                const h = (id * 137.508) % 360;
                this.colorCache[id] = { backgroundColor: `hsl(${h}, 60%, 45%)` };
            }
            return this.colorCache[id];
        }
    }
};
</script>
