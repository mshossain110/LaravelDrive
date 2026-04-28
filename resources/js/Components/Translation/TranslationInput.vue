<template>
    <div class="relative">
        <textarea
            v-model="translationText"
            :disabled="disabled"
            rows="1"
            class="w-full resize-none rounded border border-gray-300 px-3 py-2 pr-10 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 disabled:bg-gray-50 disabled:text-gray-500"
            @blur="storeTranslate"
        />
        <button
            type="button"
            class="absolute right-2 top-2 rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            :disabled="loading"
            @click="disabled = !disabled"
        >
            <svg v-if="loading" class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <PencilIcon v-else class="h-4 w-4" />
        </button>
    </div>
</template>

<script>
import { PencilIcon } from '@heroicons/vue/24/outline';

export default {
    components: { PencilIcon },
    props: {
        language: { type: String, required: true },
        group: { type: String, required: true },
        translationKey: { type: String, required: true },
        translation: { type: String, required: true }
    },
    data: () => ({
        loading: false,
        translationText: '',
        disabled: true
    }),
    mounted () {
        this.translationText = this.translation;
    },
    methods: {
        storeTranslate () {
            if (this.loading) return;
            this.loading = true;
            const params = {
                language: this.language,
                group: this.group,
                key: this.translationKey,
                value: this.translationText
            };
            this.$store.dispatch('Translation/updateTranslations', params)
                .then(() => {
                    this.disabled = true;
                    this.loading = false;
                });
        }
    }
};
</script>
