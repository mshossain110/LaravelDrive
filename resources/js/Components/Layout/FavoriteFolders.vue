<template>
    <div>
        <button
            class="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            @click="open = !open"
        >
            <StarIcon class="h-5 w-5 text-amber-400" />
            <span class="flex-1 text-left">Favorite Folders</span>
            <ChevronDownIcon
                :class="['h-4 w-4 text-gray-400 transition-transform', open ? 'rotate-180' : '']"
            />
        </button>

        <div v-show="open" class="mt-1 ml-4 space-y-0.5">
            <router-link
                v-for="folder in favoriteFolders"
                :key="folder.id"
                :to="{ name: 'singleFolder', params: { folderId: folder.hash } }"
                custom
                v-slot="{ href, navigate, isActive }"
            >
                <a
                    :href="href"
                    :class="[
                        'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                        isActive
                            ? 'bg-brand-50 font-medium text-brand-700'
                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
                    ]"
                    @click="navigate"
                >
                    <FolderIcon class="h-5 w-5 text-amber-500" />
                    <span class="truncate">{{ folder.name }}</span>
                </a>
            </router-link>

            <p v-if="!favoriteFolders.length" class="px-3 py-2 text-xs text-gray-400">
                No favorites yet
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { StarIcon, FolderIcon, ChevronDownIcon } from '@heroicons/vue/24/outline';

interface FavoriteFolder {
    id: number;
    hash: string;
    name: string;
}

const open = ref(false);

const favoriteFolders = computed((): FavoriteFolder[] => {
    return [];
});
</script>
