<template>
    <aside class="absolute inset-y-0 right-0 z-10 w-80 border-l border-gray-200 bg-white shadow-lg">
        <!-- Header -->
        <div v-if="hasItem" class="flex items-center gap-3 border-b border-gray-200 px-4 py-3">
            <component :is="iconComponent" class="h-5 w-5 shrink-0" :class="iconColor" />
            <h3 class="truncate text-sm font-semibold text-gray-900">{{ selectedMedia.name }}</h3>
        </div>
        <div v-else class="flex items-center gap-3 border-b border-gray-200 px-4 py-3">
            <FolderIcon class="h-5 w-5 text-amber-500" />
            <h3 class="text-sm font-semibold text-gray-900">My Files</h3>
        </div>

        <!-- Tabs -->
        <div class="flex border-b border-gray-200">
            <button
                class="flex-1 py-2.5 text-center text-xs font-medium transition-colors"
                :class="tabActive === 1 ? 'border-b-2 border-brand-600 text-brand-700' : 'text-gray-500 hover:text-gray-700'"
                @click="tabActive = 1"
            >
                Details
            </button>
            <button
                class="flex-1 py-2.5 text-center text-xs font-medium transition-colors"
                :class="tabActive === 2 ? 'border-b-2 border-brand-600 text-brand-700' : 'text-gray-500 hover:text-gray-700'"
                @click="tabActive = 2"
            >
                Activities
            </button>
        </div>

        <!-- File details -->
        <div v-if="hasItem" class="overflow-y-auto p-4" style="max-height: calc(100% - 110px)">
            <img
                v-if="isImageFile"
                :src="selectedMedia.public_path"
                :alt="selectedMedia.name"
                class="mb-4 w-full rounded-lg object-cover"
                loading="lazy"
            />

            <dl class="space-y-3">
                <div v-for="detail in details" :key="detail.label" class="flex gap-3">
                    <dt class="w-24 shrink-0 text-xs text-gray-500">{{ detail.label }}</dt>
                    <dd class="break-all text-xs text-gray-900">{{ detail.value }}</dd>
                </div>
            </dl>
        </div>

        <!-- Empty state -->
        <div v-else class="flex flex-col items-center justify-center px-4 py-16 text-center">
            <DocumentIcon class="mb-3 h-12 w-12 text-gray-300" />
            <p class="text-sm text-gray-500">Select a file or folder to view its details.</p>
        </div>
    </aside>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import {
    FolderIcon,
    DocumentIcon,
    DocumentTextIcon,
    PhotoIcon,
    FilmIcon,
    MusicalNoteIcon,
    ArchiveBoxIcon,
} from '@heroicons/vue/24/outline';
import type { Component } from 'vue';

const store = useStore();
const tabActive = ref(1);

const selectedMedia = computed(() => store.state.Media.selectedMedia);

const hasItem = computed(() => selectedMedia.value?.id !== undefined);

const imageTypes = ['gif', 'ico', 'jpeg', 'jpg', 'png', 'svg', 'bmp', 'dib'];

const isImageFile = computed(() => imageTypes.includes(selectedMedia.value?.extension));

const iconComponent = computed((): Component => {
    const ext = selectedMedia.value?.extension;
    const type = selectedMedia.value?.type;
    if (type === 'folder') return FolderIcon;
    if (imageTypes.includes(ext)) return PhotoIcon;
    if (['pdf', 'txt', 'doc', 'docx'].includes(ext)) return DocumentTextIcon;
    if (['mp4', 'webm', 'mov'].includes(ext)) return FilmIcon;
    if (['mp3', 'ogg'].includes(ext)) return MusicalNoteIcon;
    if (['zip', 'rar', '7z'].includes(ext)) return ArchiveBoxIcon;
    return DocumentIcon;
});

const iconColor = computed((): string => {
    const ext = selectedMedia.value?.extension;
    const type = selectedMedia.value?.type;
    if (type === 'folder') return 'text-amber-500';
    if (imageTypes.includes(ext)) return 'text-emerald-500';
    if (['pdf'].includes(ext)) return 'text-red-500';
    return 'text-gray-400';
});

const details = computed(() => {
    const m = selectedMedia.value;
    if (!m?.id) return [];
    return [
        { label: 'File Name', value: m.name },
        { label: 'Type', value: m.type },
        { label: 'Size', value: m.file_size },
        { label: 'Storage Used', value: m.file_size },
        { label: 'Location', value: m.url },
        { label: 'Owner', value: m.file_name },
        { label: 'Created', value: m.created_at?.date },
        { label: 'Modified', value: m.updated_at?.date },
        { label: 'Description', value: m.description },
    ].filter(d => d.value);
});
</script>
