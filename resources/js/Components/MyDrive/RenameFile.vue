<template>
    <AppModal :open="open" title="Rename File" max-width="sm" @close="close">
        <form @submit.prevent="onSubmit">
            <div class="px-6 py-4">
                <label for="rename-input" class="block text-sm font-medium text-gray-700">Name</label>
                <input
                    id="rename-input"
                    v-model="selectedMedia.name"
                    type="text"
                    required
                    minlength="3"
                    class="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                />
            </div>
            <div class="flex justify-end gap-2 border-t border-gray-200 px-6 py-3">
                <button type="button" class="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100" @click="close">Cancel</button>
                <button type="submit" class="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700">Rename</button>
            </div>
        </form>
    </AppModal>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import AppModal from '@/Components/UI/AppModal.vue';

defineProps<{ open: boolean }>();

const store = useStore();
const selectedMedia = computed(() => store.state.Media.selectedMedia);

function onSubmit() {
    store.dispatch('Media/updateItem', { name: selectedMedia.value.name, id: selectedMedia.value.id })
        .then(() => close());
}
function close() {
    store.commit('Media/renamefilemodal', false);
}
</script>
