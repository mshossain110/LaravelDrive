<template>
    <form class="space-y-3 border-b border-gray-200 p-4" @submit.prevent="create">
        <div>
            <label class="mb-1 block text-sm font-medium text-gray-700">Name</label>
            <input
                v-model="language.name"
                type="text"
                required
                class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
            />
        </div>
        <div>
            <label class="mb-1 block text-sm font-medium text-gray-700">Locale</label>
            <input
                v-model="language.locale"
                type="text"
                required
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
                Create
            </button>
        </div>
    </form>
</template>

<script>
export default {
    props: {
        language: {
            type: Object,
            default: () => ({ name: '', locale: '' })
        }
    },
    data: () => ({ loading: false }),
    methods: {
        cancel () {
            this.$emit('cancel');
        },
        create () {
            if (this.loading) return;
            this.loading = true;
            const params = { name: this.language.name, locale: this.language.locale };
            this.$store.dispatch('Translation/storeLanguages', params)
                .then(() => { this.cancel(); });
        }
    }
};
</script>
        }
    }
};
</script>

<style>

</style>
