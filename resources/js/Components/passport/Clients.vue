<template>
    <div>
        <div class="overflow-hidden rounded-xl bg-white shadow-sm">
            <div class="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                <h2 class="text-base font-semibold text-gray-900">OAuth Clients</h2>
                <button
                    class="text-sm font-medium text-brand-600 hover:text-brand-700"
                    @click="showCreateClientForm"
                >
                    Create New Client
                </button>
            </div>

            <div class="p-6">
                <p v-if="clients.length === 0" class="text-sm text-gray-500">
                    You have not created any OAuth clients.
                </p>

                <table v-if="clients.length > 0" class="w-full text-left text-sm">
                    <thead class="border-b border-gray-200 text-xs uppercase text-gray-500">
                        <tr>
                            <th class="px-3 py-3">Client ID</th>
                            <th class="px-3 py-3">Name</th>
                            <th class="px-3 py-3">Secret</th>
                            <th class="px-3 py-3" />
                            <th class="px-3 py-3" />
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100">
                        <tr v-for="client in clients" :key="client.id" class="hover:bg-gray-50">
                            <td class="px-3 py-3 align-middle">{{ client.id }}</td>
                            <td class="px-3 py-3 align-middle">{{ client.name }}</td>
                            <td class="px-3 py-3 align-middle">
                                <code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-700">{{ client.secret }}</code>
                            </td>
                            <td class="px-3 py-3 align-middle">
                                <button class="text-sm font-medium text-brand-600 hover:text-brand-700" @click="edit(client)">Edit</button>
                            </td>
                            <td class="px-3 py-3 align-middle">
                                <button class="text-sm font-medium text-red-600 hover:text-red-700" @click="destroy(client)">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Create Client Modal -->
        <AppModal :open="showCreateModal" title="Create Client" @close="showCreateModal = false">
            <div v-if="createForm.errors.length > 0" class="mb-4 rounded-lg border border-red-200 bg-red-50 p-4">
                <p class="mb-2 text-sm font-semibold text-red-800">Whoops! Something went wrong!</p>
                <ul class="list-inside list-disc space-y-1 text-sm text-red-700">
                    <li v-for="error in createForm.errors" :key="error">{{ error }}</li>
                </ul>
            </div>

            <form class="space-y-4" @submit.prevent="store">
                <div>
                    <label class="mb-1 block text-sm font-medium text-gray-700">Name</label>
                    <input
                        v-model="createForm.name"
                        type="text"
                        class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                        @keyup.enter="store"
                    />
                    <p class="mt-1 text-xs text-gray-500">Something your users will recognize and trust.</p>
                </div>
                <div>
                    <label class="mb-1 block text-sm font-medium text-gray-700">Redirect URL</label>
                    <input
                        v-model="createForm.redirect"
                        type="text"
                        class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                        @keyup.enter="store"
                    />
                    <p class="mt-1 text-xs text-gray-500">Your application's authorization callback URL.</p>
                </div>
            </form>

            <template #footer>
                <button class="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50" @click="showCreateModal = false">Close</button>
                <button class="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700" @click="store">Create</button>
            </template>
        </AppModal>

        <!-- Edit Client Modal -->
        <AppModal :open="showEditModal" title="Edit Client" @close="showEditModal = false">
            <div v-if="editForm.errors.length > 0" class="mb-4 rounded-lg border border-red-200 bg-red-50 p-4">
                <p class="mb-2 text-sm font-semibold text-red-800">Whoops! Something went wrong!</p>
                <ul class="list-inside list-disc space-y-1 text-sm text-red-700">
                    <li v-for="error in editForm.errors" :key="error">{{ error }}</li>
                </ul>
            </div>

            <form class="space-y-4" @submit.prevent="update">
                <div>
                    <label class="mb-1 block text-sm font-medium text-gray-700">Name</label>
                    <input
                        v-model="editForm.name"
                        type="text"
                        class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                        @keyup.enter="update"
                    />
                    <p class="mt-1 text-xs text-gray-500">Something your users will recognize and trust.</p>
                </div>
                <div>
                    <label class="mb-1 block text-sm font-medium text-gray-700">Redirect URL</label>
                    <input
                        v-model="editForm.redirect"
                        type="text"
                        class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                        @keyup.enter="update"
                    />
                    <p class="mt-1 text-xs text-gray-500">Your application's authorization callback URL.</p>
                </div>
            </form>

            <template #footer>
                <button class="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50" @click="showEditModal = false">Close</button>
                <button class="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700" @click="update">Save Changes</button>
            </template>
        </AppModal>
    </div>
</template>

<script>
import AppModal from '../UI/AppModal.vue';

export default {
    components: { AppModal },

    data () {
        return {
            clients: [],
            showCreateModal: false,
            showEditModal: false,

            createForm: {
                errors: [],
                name: '',
                redirect: ''
            },

            editForm: {
                errors: [],
                name: '',
                redirect: ''
            }
        };
    },

    mounted () {
        this.getClients();
    },

    methods: {
        getClients () {
            axios.get('/oauth/clients')
                .then(response => {
                    this.clients = response.data;
                });
        },

        showCreateClientForm () {
            this.createForm.errors = [];
            this.createForm.name = '';
            this.createForm.redirect = '';
            this.showCreateModal = true;
        },

        store () {
            this.persistClient(
                'post', '/oauth/clients',
                this.createForm, 'showCreateModal'
            );
        },

        edit (client) {
            this.editForm.id = client.id;
            this.editForm.name = client.name;
            this.editForm.redirect = client.redirect;
            this.editForm.errors = [];
            this.showEditModal = true;
        },

        update () {
            this.persistClient(
                'put', '/oauth/clients/' + this.editForm.id,
                this.editForm, 'showEditModal'
            );
        },

        persistClient (method, uri, form, modalKey) {
            form.errors = [];

            axios[method](uri, form)
                .then(() => {
                    this.getClients();
                    form.name = '';
                    form.redirect = '';
                    form.errors = [];
                    this[modalKey] = false;
                })
                .catch(error => {
                    if (typeof error.response.data === 'object') {
                        form.errors = Object.values(error.response.data.errors).flat();
                    } else {
                        form.errors = ['Something went wrong. Please try again.'];
                    }
                });
        },

        destroy (client) {
            axios.delete('/oauth/clients/' + client.id)
                .then(() => {
                    this.getClients();
                });
        }
    }
};
</script>
