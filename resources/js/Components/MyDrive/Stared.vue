<template>
    <div>
        <div
            v-if="isLoaded"
            class="relative mt-4"
            :class="{ 'mr-80': fileInfoSideBar }"
            @dragenter="activeDropzone($event)"
            @contextmenu="showContextMenu"
        >
            <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                <div
                    v-for="img in staredItems"
                    :key="img.id"
                    @contextmenu="showContextMenu2($event, img)"
                    @click="OnClickItem($event, img)"
                    @touchstart="OnClickItem($event, img)"
                >
                    <MediaItem :media="img" />
                </div>
            </div>

            <div v-if="!staredItems.length" class="flex flex-col items-center justify-center py-20 text-center">
                <svg class="mb-4 h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
                <p class="text-sm text-gray-500">No starred items</p>
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

        <div v-else class="flex items-center justify-center py-20">
            <svg class="h-8 w-8 animate-spin text-brand-600" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
        </div>

        <NewFolderForm v-if="newFolderModal" :open="newFolderModal" />
        <ShareFile v-if="shareFileModal" :open="shareFileModal" />
        <RenameFile v-if="renamefilemodal" :open="renamefilemodal" />
        <MoveTo />
    </div>
</template>

<script>
import { mapState } from 'vuex';
import FileUploader from './FileUploader.vue';
import MediaItem from './mediaItem.vue';
import MediaInfo from './MediaInfo.vue';
import Mixins from './mixin';
import NewFolderForm from './NewFolderForm.vue';
import ShareFile from './ShareFile.vue';
import RenameFile from './RenameFile.vue';
import ContextMenu from './ContextMenu.vue';
import MoveTo from './MoveTo.vue';

export default {
    components: {
        FileUploader,
        MediaItem,
        MediaInfo,
        NewFolderForm,
        RenameFile,
        ContextMenu,
        MoveTo,
        ShareFile
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
        ...mapState('Media', ['staredItems', 'staredPagination', 'fileInfoSideBar', 'newFolderModal', 'shareFileModal', 'renamefilemodal']),
        isLoaded () {
            return this.isfilesLoaded;
        }
    },
    watch: {
        '$route' (to) {
            this.selfMddiaItems(to);
        }
    },
    created () {
        this.selfMddiaItems(this.$route);
    },
    mounted () {
        document.addEventListener('click', (event) => {
            if (event.target.closest('button.media-info-button')) return;
            this.deselect();
        });
        this.scroll();
    },
    unmounted () {
        this.$store.commit('Media/emptyStaredItems');
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
            this.$store.dispatch('Media/getStaredItems', params)
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
                    if (page > this.staredPagination.total_pages) return;
                    this.scrollLoading = true;
                    this.$router.replace({ name: this.$route.name, params: this.$route.params, query: { page } });
                }
            };
        }
    }
};
</script>
