<template>
    <div v-if="tokens.length > 0" class="overflow-hidden rounded-xl bg-white shadow-sm">
        <div class="border-b border-gray-200 px-6 py-4">
            <h2 class="text-base font-semibold text-gray-900">Authorized Applications</h2>
        </div>

        <div class="p-6">
            <table class="w-full text-left text-sm">
                <thead class="border-b border-gray-200 text-xs uppercase text-gray-500">
                    <tr>
                        <th class="px-3 py-3">Name</th>
                        <th class="px-3 py-3">Scopes</th>
                        <th class="px-3 py-3" />
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                    <tr v-for="token in tokens" :key="token.id" class="hover:bg-gray-50">
                        <td class="px-3 py-3 align-middle">{{ token.client.name }}</td>
                        <td class="px-3 py-3 align-middle">
                            <span v-if="token.scopes.length > 0">{{ token.scopes.join(', ') }}</span>
                        </td>
                        <td class="px-3 py-3 align-middle">
                            <button class="text-sm font-medium text-red-600 hover:text-red-700" @click="revoke(token)">Revoke</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            tokens: []
        };
    },

    mounted () {
        this.getTokens();
    },

    methods: {
        getTokens () {
            axios.get('/oauth/tokens')
                .then(response => {
                    this.tokens = response.data;
                });
        },

        revoke (token) {
            axios.delete('/oauth/tokens/' + token.id)
                .then(() => {
                    this.getTokens();
                });
        }
    }
};
</script>
