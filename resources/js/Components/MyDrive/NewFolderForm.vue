<template>
    <AppModal :open="open" title="New Folder" max-width="sm" @close="close">
        <form @submit.prevent="onSubmit">
            <div class="px-6 py-4">
                <label for="folder-name" class="block text-sm font-medium text-gray-700">Folder name</label>
                <input
                    id="folder-name"
                    v-model="name"
                    type="text"
                    required
                    minlength="3"
                    class="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                    placeholder="Enter folder name"
                />
            </div>
            <div class="flex justify-end gap-2 border-t border-gray-200 px-6 py-3">
                <button type="button" class="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100" @click="close">Cancel</button>
                <button type="submit" class="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700">Create</button>
            </div>
        </form>
    </AppModal>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import AppModal from '@/Components/UI/AppModal.vue';

defineProps<{ open: boolean }>();

const store = useStore();
const route = useRoute();
const name = ref('');

const currentFolderId = computed(() => {
    const hash = route.params.folderId as string;
    const folders = store.state.Media.folders;
    const f = folders.find((m: any) => m.hash === hash);
    return f ? f.id : 0;
});

function onSubmit() {
    store.dispatch('Media/addFolder', { name: name.value, parent_id: currentFolderId.value })
        .then(() => close());
}
function close() {
    store.commit('Media/newFolderModal', false);
    name.value = '';
}
</script>
