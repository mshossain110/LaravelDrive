<template>
    <div>
        <MediaToolbar />

        <div
            v-if="isLoaded"
            class="relative mt-4"
            :class="{ 'mr-80': fileInfoSideBar }"
            @dragenter="activeDropzone($event)"
            @contextmenu="showContextMenu"
        >
            <!-- File grid -->
            <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                <div
                    v-for="img in mediaItems"
                    :key="img.id"
                    @contextmenu="showContextMenu2($event, img)"
                    @click="OnClickItem($event, img)"
                    @touchstart="OnClickItem($event, img)"
                >
                    <MediaItem :media="img" />
                </div>
            </div>

            <!-- Empty state -->
            <div v-if="!mediaItems.length" class="flex flex-col items-center justify-center py-20 text-center">
                <svg class="mb-4 h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
                <p class="text-sm text-gray-500">This folder is empty</p>
                <p class="mt-1 text-xs text-gray-400">Drop files here or use the toolbar to upload</p>
            </div>

            <MediaInfo v-if="fileInfoSideBar" />
            <FileUploader v-model="fileUploader" />
            <ContextMenu
                v-model="cm.show"
                :x="cm.x"
                :y="cm.y"
                :file="cm.file"
            />
        </div>

        <!-- Loading -->
        <div v-else class="flex items-center justify-center py-20">
            <svg class="h-8 w-8 animate-spin text-brand-600" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
        </div>

        <NewFolderForm v-if="newFolderModal" :open="newFolderModal" />
        <ShareFile v-if="shareFileModal" :open="shareFileModal" />
        <ShareLink v-if="shareLinkModal" :open="shareLinkModal" />
        <RenameFile v-if="renamefilemodal" :open="renamefilemodal" />
        <MoveTo v-if="moveToemodal" :open="moveToemodal" />
        <Preview v-if="previewModal" :open="previewModal" />
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { defineAsyncComponent } from 'vue';
import Mixins from './mixin';

export default {
    components: {
        FileUploader: defineAsyncComponent(() => import('./FileUploader.vue')),
        MediaItem: defineAsyncComponent(() => import('./mediaItem.vue')),
        MediaToolbar: defineAsyncComponent(() => import('./mediaToolbar.vue')),
        MediaInfo: defineAsyncComponent(() => import('./MediaInfo.vue')),
        NewFolderForm: defineAsyncComponent(() => import('./NewFolderForm.vue')),
        RenameFile: defineAsyncComponent(() => import('./RenameFile.vue')),
        ContextMenu: defineAsyncComponent(() => import('./ContextMenu.vue')),
        MoveTo: defineAsyncComponent(() => import('./MoveTo.vue')),
        ShareFile: defineAsyncComponent(() => import('./ShareFile.vue')),
        ShareLink: defineAsyncComponent(() => import('./ShareLink.vue')),
        Preview: defineAsyncComponent(() => import('./Preview.vue')),
    },
    mixins: [Mixins],
    data () {
        return {
            cm: {},
            cm2: {},
            fileUploader: false,
            scrollLoading: false,
            fileCm: false,
            clickedOnItem: false
        };
    },
    computed: {
        ...mapState('Media', ['mediaItems', 'pagination', 'fileInfoSideBar', 'newFolderModal', 'shareFileModal', 'shareLinkModal', 'renamefilemodal', 'moveToemodal', 'previewModal']),
        isLoaded () {
            return this.isfilesLoaded && this.isfolderLoaded;
        },
    },
    watch: {
        '$route' (to) {
            this.selfMddiaItems(to);
        }
    },
    created () {
        this.selfMddiaItems(this.$route);
        this.loadFolders();
    },
    mounted () {
        document.addEventListener('click', (event) => {
            if (event.target.closest('.file-deselet')) return;
            this.deselect();
        });
        this.scroll();
    },
    unmounted () {
        this.$store.commit('Media/emptyMediaItems');
    },
    methods: {
        selfMddiaItems (route) {
            const params = {};
            if (typeof route.params.folderId !== 'undefined') {
                params.parent_id = route.params.folderId;
            }
            if (route.query.page) {
                params.page = route.query.page;
            }
            this.$store.dispatch('Media/getMediaItems', params)
                .then(() => {
                    this.isfilesLoaded = true;
                    this.scrollLoading = false;
                });
        },
        activeDropzone (event) {
            event.stopPropagation();
            event.preventDefault();
            this.fileUploader = true;
        },
        showContextMenu (e, item) {
            e.preventDefault();
            if (this.fileCm) { this.fileCm = false; return; }
            this.cm = { show: true, x: e.clientX, y: e.clientY, file: item };
        },
        showContextMenu2 (e, item) {
            e.preventDefault();
            this.fileCm = true;
            this.cm = { show: true, x: e.clientX, y: e.clientY, file: item };
            this.OnClickItem(e, item);
        },
        OnClickItem (event, item) {
            this.clickedOnItem = true;
            const isMultiSelect = event.ctrlKey || event.metaKey;
            if (!isMultiSelect && item.type === 'folder' && !this.fileCm) {
                this.pushChiled(item);
            }
            this.$store.commit('Media/selectFiles', { isMultiSelect, id: item.id });
            this.$store.commit('Media/selectMediaItem', item);
        },
        pushChiled (item) {
            let name = 'singleFolder';
            if (this.$route.name === 'trash' || this.$route.name === 'trashFolder') {
                name = 'trashFolder';
            }
            this.$router.push({ name, params: { folderId: item.hash } });
        },
        deselect () {
            if (this.clickedOnItem) { this.clickedOnItem = false; return; }
            this.$store.commit('Media/deselectFile');
        },
        scroll () {
            window.onscroll = () => {
                if (this.scrollLoading) return;
                const bottomOfWindow = document.documentElement.scrollTop + window.innerHeight + 50 > document.documentElement.offsetHeight;
                if (bottomOfWindow) {
                    const page = (this.$route.query.page || 1) + 1;
                    if (page > this.pagination.total) return;
                    this.scrollLoading = true;
                    this.$router.replace({ name: this.$route.name, params: this.$route.params, query: { page } });
                }
            };
        }
    }
};
</script>
