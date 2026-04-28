<template>
    <AppModal :open="openpoupu" title="Share File" max-width="700px" @close="close">
        <form class="file-deselet" @submit.prevent="onSubmit">
            <div class="space-y-4 p-4">
                <!-- User search -->
                <div class="flex gap-2">
                    <div class="flex-1">
                        <div class="min-h-[48px] rounded-lg border border-gray-300 p-2 focus-within:border-brand-500 focus-within:ring-1 focus-within:ring-brand-500">
                            <!-- Selected chips -->
                            <div class="mb-1 flex flex-wrap gap-1">
                                <span
                                    v-for="user in users"
                                    :key="user.id"
                                    class="inline-flex items-center gap-1 rounded-full bg-brand-100 px-3 py-1 text-sm text-brand-800"
                                >
                                    <span class="flex h-5 w-5 items-center justify-center rounded-full bg-brand-600 text-[10px] font-bold text-white">
                                        {{ user.name?.slice(0, 1).toUpperCase() }}
                                    </span>
                                    {{ user.name }}
                                    <button type="button" class="ml-1 text-brand-600 hover:text-brand-800" @click="remove(user)">
                                        <svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </span>
                            </div>
                            <!-- Search input -->
                            <input
                                v-model="search"
                                type="text"
                                class="w-full border-0 p-0 text-sm focus:outline-none focus:ring-0"
                                placeholder="Search User to Share"
                            />
                        </div>
                        <!-- Dropdown results -->
                        <div v-if="people.length && search" class="relative">
                            <ul class="absolute z-10 mt-1 max-h-48 w-full overflow-auto rounded-lg border border-gray-200 bg-white shadow-lg">
                                <li
                                    v-for="person in filteredPeople"
                                    :key="person.id"
                                    class="cursor-pointer px-4 py-2 text-sm hover:bg-gray-100"
                                    @click="selectUser(person)"
                                >
                                    {{ person.name }} ({{ person.email }})
                                </li>
                            </ul>
                        </div>
                    </div>

                    <!-- Permission dropdown -->
                    <div class="relative">
                        <button
                            type="button"
                            class="flex h-12 items-center gap-1 rounded-lg border border-gray-300 px-3 text-sm text-gray-700 hover:bg-gray-50"
                            @click="showPermMenu = !showPermMenu"
                        >
                            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        <ul
                            v-if="showPermMenu"
                            class="absolute right-0 z-20 mt-1 w-64 rounded-lg border border-gray-200 bg-white py-1 shadow-lg"
                        >
                            <li
                                v-for="item in permissions"
                                :key="item.id"
                                class="cursor-pointer px-4 py-2 hover:bg-gray-50"
                                @click="permission = item.id; showPermMenu = false"
                            >
                                <div class="flex items-center gap-2">
                                    <svg v-if="permission === item.id" class="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <div v-else class="h-5 w-5" />
                                    <div>
                                        <div class="text-sm font-medium">{{ item.title }}</div>
                                        <div class="text-xs text-gray-500">{{ item.descrption }}</div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <button
                    type="submit"
                    class="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
                >
                    Add
                </button>

                <!-- Owner -->
                <div v-if="selectedMedia.id" class="border-t pt-4">
                    <h4 class="mb-2 text-sm font-medium text-gray-600">Owner of File</h4>
                    <div class="flex items-center gap-3">
                        <img
                            :src="selectedMedia.uploader?.avatar?.avatar"
                            class="h-10 w-10 rounded-full object-cover"
                            alt=""
                        />
                        <div>
                            <div class="text-sm font-medium">{{ selectedMedia.uploader?.display_name }}</div>
                            <div class="text-xs text-gray-500">{{ selectedMedia.uploader?.email }}</div>
                        </div>
                    </div>
                </div>

                <!-- Shared with -->
                <div v-if="sharedwith.length" class="border-t pt-4">
                    <h4 class="mb-2 text-sm font-medium text-gray-600">Shared with</h4>
                    <div
                        v-for="u in sharedwith"
                        :key="u.id"
                        class="mb-2 flex items-center gap-3"
                    >
                        <img :src="u.avatar" class="h-10 w-10 rounded-full object-cover" alt="" />
                        <div>
                            <div class="text-sm font-medium">{{ u.display_name }}</div>
                            <div class="text-xs text-gray-500">{{ u.email }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </AppModal>
</template>

<script>
import Mixin from './mixin';
import { mapState } from 'vuex';
import AppModal from '@/Components/UI/AppModal.vue';

export default {
    components: { AppModal },
    mixins: [Mixin],
    props: {
        open: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            users: [],
            people: [],
            sharedwith: [],
            search: null,
            openpoupu: this.open,
            searchTimeOut: false,
            isLoading: false,
            isUpdating: false,
            permission: 1,
            showPermMenu: false,
            permissions: [
                {
                    title: 'Can edit',
                    id: 1,
                    descrption: 'People can edit, delete and copy the item to their own drive.'
                },
                {
                    title: 'Can download',
                    id: 2,
                    descrption: 'People can view and download the item.'
                },
                {
                    title: 'Can view',
                    id: 3,
                    descrption: 'People can view the item.'
                }
            ]
        };
    },
    computed: {
        ...mapState('Media', ['selectedFilesId', 'selectedMedia', 'shareFileModal']),
        filteredPeople () {
            const selectedIds = this.users.map(u => u.id);
            return this.people.filter(p => !selectedIds.includes(p.id));
        }
    },
    watch: {
        search (val) {
            if (!val) return;
            this.isLoading = true;
            if (this.searchTimeOut) clearTimeout(this.searchTimeOut);
            this.searchTimeOut = setTimeout(() => {
                this.$store.dispatch('Users/searchUsers', { s: val })
                    .then(res => { this.people = res.data; })
                    .finally(() => (this.isLoading = false));
            }, 400);
        },
        openpoupu (val) {
            if (this.open !== val) { this.$store.commit('Media/shareFileModal', val); }
        }
    },
    created () {
        this.getfileUser();
    },
    methods: {
        selectUser (person) {
            if (!this.users.find(u => u.id === person.id)) {
                this.users.push(person);
            }
            this.search = '';
            this.people = [];
        },
        onSubmit () {
            const userids = this.users.filter(u => u.id).map(u => u.id);
            const param = {
                userIds: userids,
                fileids: this.selectedFilesId,
                permissions: this.permission
            };
            axios.post('/api/shares/add-users', param)
                .then(res => {
                    this.$store.commit('setSnackbar', {
                        message: res.data.message,
                        status: res.status,
                        color: 'success',
                        show: true
                    }, { root: true });
                    this.close();
                });
        },
        getfileUser () {
            axios.get(`/api/shared/file/${this.selectedFilesId}/share-with`)
                .then(res => { this.sharedwith = res.data.data; });
        },
        close () {
            this.$store.commit('Media/shareFileModal', false);
        },
        remove (user) {
            const i = this.users.findIndex(x => x.id === user.id);
            this.users.splice(i, 1);
        }
    }
};
</script>
