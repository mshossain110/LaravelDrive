<template>
    <Teleport to="body">
        <Transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
        >
            <div
                v-if="showMenu"
                class="fixed z-50"
                :style="{ left: x + 'px', top: y + 'px' }"
            >
                <!-- Backdrop -->
                <div class="fixed inset-0" @click="showMenu = false" />

                <!-- Menu -->
                <div class="relative w-56 rounded-lg bg-white py-1.5 shadow-xl ring-1 ring-gray-200">
                    <button
                        v-for="(item, index) in items"
                        :key="index"
                        class="flex w-full items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        @click="item.action(); showMenu = false"
                    >
                        <component :is="item.iconComponent" class="h-4 w-4 text-gray-400" />
                        <span>{{ item.title }}</span>
                    </button>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch, getCurrentInstance, type Component } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import {
    EyeIcon,
    UsersIcon,
    LinkIcon,
    StarIcon,
    ArrowRightIcon,
    PencilIcon,
    DocumentDuplicateIcon,
    ArrowDownTrayIcon,
    TrashIcon,
    FolderPlusIcon,
    ArrowUpTrayIcon,
    FolderOpenIcon,
    ArrowPathIcon,
    XCircleIcon,
} from '@heroicons/vue/24/outline';

interface FileItem {
    id?: number;
    type?: string;
    stared?: boolean;
    deleted_at?: string | null;
    [key: string]: unknown;
}

interface MenuItem {
    title: string;
    iconComponent: Component;
    show: string;
    action: () => void;
}

const props = withDefaults(defineProps<{
    modelValue?: boolean;
    x?: number;
    y?: number;
    file?: FileItem;
}>(), {
    modelValue: false,
    x: 0,
    y: 0,
    file: () => ({}),
});

const emit = defineEmits<{ 'update:modelValue': [value: boolean] }>();

const store = useStore();
const route = useRoute();
const instance = getCurrentInstance();
const emmiter = instance?.appContext.config.globalProperties.emmiter;

const showMenu = ref(props.modelValue);
const selectedFilesId = computed<number[]>(() => store.state.Media.selectedFilesId);

watch(() => props.modelValue, (val) => {
    showMenu.value = false;
    setTimeout(() => { showMenu.value = val; }, 0);
});
watch(() => props.x, () => {
    showMenu.value = false;
    setTimeout(() => { showMenu.value = true; }, 0);
});
watch(showMenu, (v) => emit('update:modelValue', v));

const menuitems = computed((): MenuItem[] => [
    { title: 'Preview', iconComponent: EyeIcon, show: 'items', action: () => store.commit('Media/previewModal', true) },
    { title: 'Share', iconComponent: UsersIcon, show: 'items', action: () => store.commit('Media/shareFileModal', true) },
    { title: 'Get shareable link', iconComponent: LinkIcon, show: 'items', action: () => store.commit('Media/shareLinkModal', true) },
    { title: props.file?.stared ? 'Remove from star' : 'Add a star', iconComponent: StarIcon, show: 'items', action: manageStar },
    { title: 'Move to', iconComponent: ArrowRightIcon, show: 'items', action: () => store.commit('Media/moveToemodal', true) },
    { title: 'Rename', iconComponent: PencilIcon, show: 'items', action: () => store.commit('Media/renamefilemodal', true) },
    { title: 'Make a copy', iconComponent: DocumentDuplicateIcon, show: 'items', action: () => store.dispatch('Media/copyFile', { ids: selectedFilesId.value }) },
    { title: 'Download', iconComponent: ArrowDownTrayIcon, show: 'items', action: () => store.dispatch('Media/downloadFile', { ids: selectedFilesId.value }) },
    { title: 'Delete', iconComponent: TrashIcon, show: 'items', action: () => store.dispatch('Media/deleteItem', { ids: selectedFilesId.value }) },
    { title: 'New Folder', iconComponent: FolderPlusIcon, show: 'back', action: () => store.commit('Media/newFolderModal', true) },
    { title: 'Upload files', iconComponent: ArrowUpTrayIcon, show: 'back', action: () => emmiter?.emit('openDropZone') },
    { title: 'Upload Folder', iconComponent: FolderOpenIcon, show: 'back', action: () => emmiter?.emit('uploadFolder') },
    { title: 'Restore files', iconComponent: ArrowPathIcon, show: 'trash', action: () => store.dispatch('Media/deleteItem', { ids: selectedFilesId.value, action: 'restore' }) },
    { title: 'Delete Forever', iconComponent: XCircleIcon, show: 'trash', action: () => store.dispatch('Media/deleteItem', { ids: selectedFilesId.value, action: 'deleteforever' }) },
]);

const items = computed(() => {
    const f = props.file;
    if (f?.id !== undefined && f.deleted_at === null) {
        const fileItems = menuitems.value.filter(i => i.show === 'items');
        return f.type === 'folder' ? fileItems.filter(i => i.title !== 'Preview') : fileItems;
    } else if (f?.id !== undefined && f.deleted_at !== null) {
        return menuitems.value.filter(i => i.show === 'trash');
    } else if (route.name === 'media' || route.name === 'singleFolder') {
        return menuitems.value.filter(i => i.show === 'back');
    }
    return [];
});

function manageStar() {
    if (props.file?.id !== undefined && !props.file.stared) {
        store.dispatch('Media/addStar', { ids: selectedFilesId.value });
    } else {
        store.dispatch('Media/removeStar', { ids: selectedFilesId.value });
    }
}
</script>
