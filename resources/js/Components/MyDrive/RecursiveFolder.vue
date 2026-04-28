<template>
    <li class="list-none">
        <div class="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-gray-100" :style="{ paddingLeft: depth * 16 + 'px' }">
            <FolderOpenIcon class="h-4 w-4 shrink-0 text-amber-500" />
            <span class="flex-1 truncate text-gray-700">{{ folder.name }}</span>
            <button
                v-if="folder.children && folder.children.length"
                class="rounded p-0.5 text-gray-400 hover:text-gray-600"
                @click.prevent="open = !open"
            >
                <ChevronDownIcon :class="['h-4 w-4 transition-transform', open ? 'rotate-180' : '']" />
            </button>
        </div>
        <ul v-if="folder.children && folder.children.length && open" class="pl-0">
            <RecursiveFolder
                v-for="child in folder.children"
                :key="child.id"
                :folder="child"
                :depth="depth + 1"
            />
        </ul>
    </li>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { FolderOpenIcon, ChevronDownIcon } from '@heroicons/vue/24/outline';

interface FolderNode {
    id: number;
    name: string;
    children?: FolderNode[];
}

withDefaults(defineProps<{
    folder: FolderNode;
    depth?: number;
}>(), { depth: 0 });

const open = ref(false);
</script>
