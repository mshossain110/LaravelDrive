
<template>
    <!-- eslint-disable vue/no-v-html  -->
    <div
        class="group relative w-full cursor-pointer select-none"
        :class="isSelected ? 'ring-2 ring-brand-500 rounded-lg' : ''"
    >
        <div class="overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-md">
            <!-- Thumbnail area -->
            <div class="relative flex h-[166px] items-center justify-center bg-gray-50">
                <img
                    v-if="isImage"
                    :src="media.public_path"
                    :alt="media.name"
                    class="h-full w-full object-cover"
                    loading="lazy"
                />
                <div
                    v-else
                    class="flex h-full w-full items-center justify-center"
                >
                    <component :is="fileIconComponent" class="h-16 w-16" :class="fileIconColor" />
                </div>

                <!-- Star badge -->
                <StarIconSolid
                    v-if="media.stared"
                    class="absolute right-2 top-2 h-5 w-5 text-amber-400 drop-shadow"
                />
            </div>

            <!-- Name bar -->
            <div class="flex items-center gap-2 border-t border-gray-100 px-3 py-2.5">
                <component :is="fileIconComponent" class="h-4 w-4 shrink-0" :class="fileIconColor" />
                <span class="truncate text-sm text-gray-700">{{ media.name }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, type Component } from 'vue';
import { useStore } from 'vuex';
import {
    PhotoIcon,
    DocumentTextIcon,
    FilmIcon,
    MusicalNoteIcon,
    FolderIcon,
    DocumentIcon,
    ArchiveBoxIcon,
    CodeBracketIcon,
} from '@heroicons/vue/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/vue/24/solid';

interface MediaFile {
    id: number;
    name: string;
    extension: string;
    type: string;
    public_path: string;
    stared: boolean;
    edit?: boolean;
}

const props = defineProps<{
    media: MediaFile;
}>();

const store = useStore();

const selectedFilesId = computed<number[]>(() => store.state.Media.selectedFilesId);

const isSelected = computed(() => selectedFilesId.value.includes(props.media.id));

const isImage = computed(() =>
    ['gif', 'ico', 'jpeg', 'jpg', 'png', 'svg', 'bmp', 'dib'].includes(props.media.extension)
);

const imageTypes = ['gif', 'ico', 'jpeg', 'jpg', 'png', 'svg', 'bmp', 'dib'];
const videoTypes = ['mp4', 'webm', '3gp', 'flv', 'ogg', 'ogv', 'mov', 'wmv', 'mpeg'];
const audioTypes = ['mp3', 'ogg'];
const archiveTypes = ['zip', 'rar', '7z', 'tar', 'gz'];
const codeTypes = ['css', 'html', 'javascript', 'js', 'ts', 'xml', 'json'];

const fileIconComponent = computed((): Component => {
    const ext = props.media.extension;
    if (props.media.type === 'folder') return FolderIcon;
    if (imageTypes.includes(ext)) return PhotoIcon;
    if (['pdf', 'txt', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'csv'].includes(ext)) return DocumentTextIcon;
    if (videoTypes.includes(ext)) return FilmIcon;
    if (audioTypes.includes(ext)) return MusicalNoteIcon;
    if (archiveTypes.includes(ext)) return ArchiveBoxIcon;
    if (codeTypes.includes(ext)) return CodeBracketIcon;
    return DocumentIcon;
});

const fileIconColor = computed((): string => {
    const ext = props.media.extension;
    if (props.media.type === 'folder') return 'text-amber-500';
    if (imageTypes.includes(ext)) return 'text-emerald-500';
    if (['pdf'].includes(ext)) return 'text-red-500';
    if (['doc', 'docx'].includes(ext)) return 'text-blue-600';
    if (['xls', 'xlsx', 'csv'].includes(ext)) return 'text-green-600';
    if (videoTypes.includes(ext)) return 'text-purple-500';
    if (audioTypes.includes(ext)) return 'text-orange-500';
    return 'text-gray-400';
});
</script>
