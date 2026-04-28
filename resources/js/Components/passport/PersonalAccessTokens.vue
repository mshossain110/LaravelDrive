<template>
    <div>
        <div class="overflow-hidden rounded-xl bg-white shadow-sm">
            <div class="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                <h2 class="text-base font-semibold text-gray-900">Personal Access Tokens</h2>
                <button
                    class="text-sm font-medium text-brand-600 hover:text-brand-700"
                    @click="showCreateTokenForm"
                >
                    Create New Token
                </button>
            </div>

            <div class="p-6">
                <p v-if="tokens.length === 0" class="text-sm text-gray-500">
                    You have not created any personal access tokens.
                </p>

                <table v-if="tokens.length > 0" class="w-full text-left text-sm">
                    <thead class="border-b border-gray-200 text-xs uppercase text-gray-500">
                        <tr>
                            <th class="px-3 py-3">Name</th>
                            <th class="px-3 py-3" />
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100">
                        <tr v-for="token in tokens" :key="token.id" class="hover:bg-gray-50">
                            <td class="px-3 py-3 align-middle">{{ token.name }}</td>
                            <td class="px-3 py-3 align-middle">
                                <button class="text-sm font-medium text-red-600 hover:text-red-700" @click="revoke(token)">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Create Token Modal -->
        <AppModal :open="showCreateModal" title="Create Token" @close="showCreateModal = false">
            <div v-if="form.errors.length > 0" class="mb-4 rounded-lg border border-red-200 bg-red-50 p-4">
                <p class="mb-2 text-sm font-semibold text-red-800">Whoops! Something went wrong!</p>
                <ul class="list-inside list-disc space-y-1 text-sm text-red-700">
                    <li v-for="error in form.errors" :key="error">{{ error }}</li>
                </ul>
            </div>

            <form class="space-y-4" @submit.prevent="store">
                <div>
                    <label class="mb-1 block text-sm font-medium text-gray-700">Name</label>
                    <input
                        v-model="form.name"
                        type="text"
                        class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                        name="name"
                    />
                </div>

                <div v-if="scopes.length > 0">
                    <label class="mb-2 block text-sm font-medium text-gray-700">Scopes</label>
                    <div class="space-y-2">
                        <label v-for="scope in scopes" :key="scope.id" class="flex items-center gap-2 text-sm text-gray-700">
                            <input
                                type="checkbox"
                                :checked="scopeIsAssigned(scope.id)"
                                class="rounded border-gray-300 text-brand-600 focus:ring-brand-500"
                                @click="toggleScope(scope.id)"
                            />
                            {{ scope.id }}
                        </label>
                    </div>
                </div>
            </form>

            <template #footer>
                <button class="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50" @click="showCreateModal = false">Close</button>
                <button class="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700" @click="store">Create</button>
            </template>
        </AppModal>

        <!-- Access Token Modal -->
        <AppModal :open="showAccessTokenModal" title="Personal Access Token" @close="showAccessTokenModal = false">
            <p class="mb-3 text-sm text-gray-600">
                Here is your new personal access token. This is the only time it will be shown so don't lose it!
                You may now use this token to make API requests.
            </p>
            <textarea
                v-model="accessToken"
                readonly
                rows="10"
                class="w-full rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm shadow-sm focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
            />

            <template #footer>
                <button class="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50" @click="showAccessTokenModal = false">Close</button>
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
            accessToken: null,
            tokens: [],
            scopes: [],
            showCreateModal: false,
            showAccessTokenModal: false,

            form: {
                name: '',
                scopes: [],
                errors: []
            }
        };
    },

    mounted () {
        this.getTokens();
        this.getScopes();
    },

    methods: {
        getTokens () {
            axios.get('/oauth/personal-access-tokens')
                .then(response => {
                    this.tokens = response.data;
                });
        },

        getScopes () {
            axios.get('/oauth/scopes')
                .then(response => {
                    this.scopes = response.data;
                });
        },

        showCreateTokenForm () {
            this.form.errors = [];
            this.form.name = '';
            this.form.scopes = [];
            this.showCreateModal = true;
        },

        store () {
            this.accessToken = null;
            this.form.errors = [];

            axios.post('/oauth/personal-access-tokens', this.form)
                .then(response => {
                    this.form.name = '';
                    this.form.scopes = [];
                    this.form.errors = [];

                    this.tokens.push(response.data.token);
                    this.showAccessToken(response.data.accessToken);
                })
                .catch(error => {
                    if (typeof error.response.data === 'object') {
                        this.form.errors = Object.values(error.response.data.errors).flat();
                    } else {
                        this.form.errors = ['Something went wrong. Please try again.'];
                    }
                });
        },

        toggleScope (scope) {
            const idx = this.form.scopes.indexOf(scope);
            if (idx >= 0) {
                this.form.scopes.splice(idx, 1);
            } else {
                this.form.scopes.push(scope);
            }
        },

        scopeIsAssigned (scope) {
            return this.form.scopes.indexOf(scope) >= 0;
        },

        showAccessToken (accessToken) {
            this.showCreateModal = false;
            this.accessToken = accessToken;
            this.showAccessTokenModal = true;
        },

        revoke (token) {
            axios.delete('/oauth/personal-access-tokens/' + token.id)
                .then(() => {
                    this.getTokens();
                });
        }
    }
};
</script>
