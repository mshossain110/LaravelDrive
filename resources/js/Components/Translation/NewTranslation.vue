<template>
    <form class="space-y-3 border-b border-gray-200 p-4" @submit.prevent="create">
        <div>
            <label class="mb-1 block text-sm font-medium text-gray-700">Group</label>
            <select
                v-model="translation.group"
                required
                class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
            >
                <option value="" disabled>Select group</option>
                <option v-for="g in groups" :key="g" :value="g">{{ g }}</option>
            </select>
        </div>
        <div>
            <label class="mb-1 block text-sm font-medium text-gray-700">Key</label>
            <input
                v-model="translation.key"
                type="text"
                required
                class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
            />
        </div>
        <div>
            <label class="mb-1 block text-sm font-medium text-gray-700">String</label>
            <input
                v-model="translation.value"
                type="text"
                required
                placeholder="e.g. Keys must be a single string"
                class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
            />
        </div>
        <div>
            <label class="mb-1 block text-sm font-medium text-gray-700">Namespace (optional)</label>
            <input
                v-model="translation.namespace"
                type="text"
                placeholder="e.g. Keys must be a single string"
                class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
            />
        </div>
        <div class="flex gap-2">
            <button
                type="button"
                class="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                @click="cancel"
            >
                Cancel
            </button>
            <button
                type="submit"
                :disabled="loading"
                class="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-50"
            >
                <span v-if="loading">Creating...</span>
                <span v-else>Create</span>
            </button>
        </div>
    </form>
</template>

<script>
import { mapState } from 'vuex';
export default {
    props: {
        locale: { type: String, required: true },
        translation: {
            type: Object,
            default: () => ({ group: '', key: '', value: '', namespace: '' })
        }
    },
    data: () => ({ loading: false }),
    computed: {
        ...mapState('Translation', ['groups'])
    },
    methods: {
        cancel () {
            this.$emit('cancel');
        },
        create () {
            if (this.loading) return;
            this.loading = true;
            const param = this.translation;
            param.language = this.locale;
            this.$store.dispatch('Translation/storeTranslations', this.translation)
                .then(() => {
                    this.loading = false;
                    this.cancel();
                });
        }
    }
};
</script>
        create () {
            if (this.loading) {
                return;
            }
            this.loading = true;
            const param = this.translation;
            param.language = this.locale;

            this.$store.dispatch('Translation/storeTranslations', this.translation)
                .then(() => {
                    this.loading = false;
                    this.cancel();
                });
        }
    }

};
</script>

<style>

</style>
