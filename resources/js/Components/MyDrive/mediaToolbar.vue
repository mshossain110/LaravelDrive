<template>
    <div class="flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 shadow-sm ring-1 ring-gray-200">
        <!-- Title + dropdown -->
        <div class="flex items-center gap-1.5">
            <PhotoIcon class="h-5 w-5 text-brand-600" />
            <h2 class="text-sm font-semibold text-gray-900">My Files</h2>

            <!-- Add menu -->
            <div class="relative">
                <button
                    class="rounded p-1 text-gray-500 hover:bg-gray-100"
                    @click="addMenu = !addMenu"
                >
                    <PlusCircleIcon class="h-5 w-5" />
                </button>
                <Transition
                    enter-active-class="transition ease-out duration-100"
                    enter-from-class="opacity-0 scale-95"
                    enter-to-class="opacity-100 scale-100"
                    leave-active-class="transition ease-in duration-75"
                    leave-from-class="opacity-100 scale-100"
                    leave-to-class="opacity-0 scale-95"
                >
                    <div
                        v-if="addMenu"
                        v-click-outside="() => addMenu = false"
                        class="absolute left-0 top-full z-20 mt-1 w-48 rounded-lg bg-white py-1 shadow-lg ring-1 ring-gray-200"
                    >
                        <button class="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50" @click="openNewFolderModal(); addMenu = false">
                            <FolderPlusIcon class="h-4 w-4 text-gray-400" />
                            New Folder
                        </button>
                        <button class="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50" @click="uploadFolder(); addMenu = false">
                            <FolderArrowDownIcon class="h-4 w-4 text-gray-400" />
                            Upload Folder
                        </button>
                        <button class="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50" @click="openDropZone(); addMenu = false">
                            <ArrowUpTrayIcon class="h-4 w-4 text-gray-400" />
                            Upload Files
                        </button>
                    </div>
                </Transition>
            </div>
        </div>

        <div class="flex-1" />

        <!-- Action buttons -->
        <button class="rounded-lg p-2 text-gray-500 hover:bg-gray-100" title="Upload files" @click="openDropZone()">
            <ArrowUpTrayIcon class="h-5 w-5" />
        </button>
        <button class="rounded-lg p-2 text-gray-500 hover:bg-gray-100" title="New folder" @click="openNewFolderModal()">
            <FolderPlusIcon class="h-5 w-5" />
        </button>
        <button class="rounded-lg p-2 text-gray-500 hover:bg-gray-100" title="Grid view">
            <Squares2X2Icon class="h-5 w-5" />
        </button>
        <button class="rounded-lg p-2 text-gray-500 hover:bg-gray-100" title="List view">
            <Bars3BottomLeftIcon class="h-5 w-5" />
        </button>
        <button class="rounded-lg p-2 text-gray-500 hover:bg-gray-100" title="Filter">
            <FunnelIcon class="h-5 w-5" />
        </button>
        <button
            class="rounded-lg p-2 transition-colors"
            :class="fileInfoSideBar ? 'bg-brand-100 text-brand-700' : 'text-gray-500 hover:bg-gray-100'"
            title="Info"
            @click="toggleSidebar()"
        >
            <InformationCircleIcon class="h-5 w-5" />
        </button>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { getCurrentInstance } from 'vue';
import {
    PhotoIcon,
    PlusCircleIcon,
    FolderPlusIcon,
    ArrowUpTrayIcon,
    Squares2X2Icon,
    Bars3BottomLeftIcon,
    FunnelIcon,
    InformationCircleIcon,
} from '@heroicons/vue/24/outline';
import { FolderArrowDownIcon } from '@heroicons/vue/24/outline';

const store = useStore();
const instance = getCurrentInstance();
const emmiter = instance?.appContext.config.globalProperties.emmiter;

const addMenu = ref(false);

const fileInfoSideBar = computed(() => store.state.Media.fileInfoSideBar);

function toggleSidebar() {
    store.commit('Media/toggleSidebar');
}
function openNewFolderModal() {
    store.commit('Media/newFolderModal', true);
}
function openDropZone() {
    emmiter?.emit('openDropZone');
}
function uploadFolder() {
    emmiter?.emit('uploadFolder');
}

// Simple click-outside directive
const vClickOutside = {
    mounted(el: HTMLElement, binding: { value: () => void }) {
        (el as any)._clickOutside = (e: MouseEvent) => {
            if (!el.contains(e.target as Node)) binding.value();
        };
        setTimeout(() => document.addEventListener('click', (el as any)._clickOutside), 0);
    },
    unmounted(el: HTMLElement) {
        document.removeEventListener('click', (el as any)._clickOutside);
    },
};
</script>
