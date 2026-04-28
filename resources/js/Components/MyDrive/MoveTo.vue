<template>
    <AppModal :open="open" title="Move To" max-width="sm" @close="close">
        <div class="max-h-72 overflow-y-auto px-4 py-3">
            <ul class="space-y-0.5 pl-0">
                <li
                    v-for="folder in folderLists"
                    :key="folder.id"
                    class="list-none"
                >
                    <button
                        class="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors"
                        :class="selectedFolder === folder.id ? 'bg-brand-50 text-brand-700 font-medium' : 'text-gray-700 hover:bg-gray-100'"
                        @click="selectedFolder = folder.id"
                    >
                        <FolderIcon class="h-4 w-4 text-amber-500" />
                        {{ folder.name }}
                    </button>
                </li>
            </ul>
            <p v-if="!folderLists.length" class="py-4 text-center text-sm text-gray-400">No folders available</p>
        </div>
        <div class="flex justify-end gap-2 border-t border-gray-200 px-6 py-3">
            <button class="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100" @click="close">Cancel</button>
            <button class="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700" @click="moveintoFolder">Move To</button>
        </div>
    </AppModal>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { FolderIcon } from '@heroicons/vue/24/outline';
import AppModal from '@/Components/UI/AppModal.vue';

defineProps<{ open: boolean }>();

const store = useStore();
const route = useRoute();

const selectedFolder = ref<number | null>(null);
const folderLists = ref<any[]>([]);

onMounted(() => {
    folderLists.value = store.getters['Media/getNestedFolders'] || [];
    if (route.params.folderId) {
        folderLists.value.unshift({ id: 0, name: 'Root', parent_id: 0 });
    }
});

function moveintoFolder() {
    store.dispatch('Media/moveFiles', {
        files: store.state.Media.selectedFilesId,
        destination: selectedFolder.value,
    }).then((res: any[]) => {
        const parentId = route.params.folderId || 0;
        const items = res.filter((i: any) => i.parent_id !== parentId).map((i: any) => i.id);
        store.commit('Media/moveFile', items);
        close();
    });
}
function close() {
    store.commit('Media/moveToemodal', false);
}
</script>
