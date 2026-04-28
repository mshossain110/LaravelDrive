<template>
    <Teleport to="body">
        <div
            v-if="open"
            class="fixed inset-0 z-50 flex flex-col bg-black/90 file-deselet"
            @click="clickCard"
        >
            <!-- Toolbar -->
            <div class="preview-toolbar flex items-center justify-between bg-brand-600 px-4 py-3 text-white">
                <button
                    class="rounded-full p-2 hover:bg-white/20"
                    @click.stop="closePreview()"
                >
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <div class="flex items-center gap-2">
                    <button
                        class="rounded-full p-2 hover:bg-white/20"
                        @click.stop="downloadFile()"
                    >
                        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                    </button>
                    <div class="relative">
                        <button
                            class="rounded-full p-2 hover:bg-white/20"
                            @click.stop="showContextMenu"
                        >
                            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                            </svg>
                        </button>
                        <ContextMenu
                            v-model="showMenu"
                            :x="menuPos.x"
                            :y="menuPos.y"
                            :file="selectedMedia"
                        />
                    </div>
                </div>
            </div>

            <!-- PDF -->
            <div v-if="ispdf" class="flex-1 bg-white">
                <object
                    :type="selectedMedia.mime"
                    :data="fileUrl"
                    class="h-full w-full"
                >
                    <a :href="fileUrl" class="text-blue-400 underline">Download the file.</a>
                </object>
            </div>

            <!-- Image -->
            <div
                v-else-if="isImage"
                class="image-preview flex flex-1 items-center justify-center"
            >
                <img
                    :src="selectedMedia.public_path"
                    class="max-h-[80vh] max-w-full object-contain"
                    alt="Preview"
                />
            </div>

            <!-- Video -->
            <div
                v-else-if="isVideo"
                class="video-preview flex flex-1 items-center justify-center"
            >
                <video id="player" playsinline controls class="max-h-[80vh] max-w-full">
                    <source :src="fileUrl" :type="selectedMedia.mime" />
                </video>
            </div>

            <!-- Audio -->
            <div
                v-else-if="isAudio"
                class="video-preview flex flex-1 items-center justify-center"
            >
                <audio id="player" controls>
                    <source :src="fileUrl" :type="selectedMedia.mime" />
                </audio>
            </div>

            <!-- No preview -->
            <div v-else class="flex flex-1 items-center justify-center">
                <div class="rounded-xl bg-white p-8 text-center shadow-lg">
                    <h4 class="mb-4 text-lg font-medium text-gray-700">No file preview available.</h4>
                    <button
                        class="rounded-lg bg-brand-600 px-6 py-2 text-white hover:bg-brand-700"
                        @click.stop="downloadFile()"
                    >
                        Download
                    </button>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<script>
import { mapState } from 'vuex';
import Plyr from 'plyr';
import PanZoom from '@/plugins/panzoom';
import ContextMenu from './ContextMenu.vue';
import mixin from './mixin';
export default {
    components: {
        ContextMenu
    },
    mixins: [mixin],
    props: {
        open: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            showMenu: false,
            menuPos: {}
        };
    },
    computed: {
        ...mapState('Media', ['mediaItems', 'selectedMedia', 'selectedFilesId']),
        filesCanPreview () {
            return this.mediaItems.filter(m => m.type !== 'folder');
        },
        currentImage () {
            const hash = this.$route.params.hash;
            return this.mediaItems.find(i => i.hash === hash);
        },
        fileUrl () {
            return window.location.origin + '/' + this.selectedMedia.url;
        },
        isImage () {
            return ['gif', 'ico', 'jpeg', 'jpg', 'png', 'svg', 'bmp', 'dib'].includes(this.selectedMedia.extension);
        },
        ispdf () {
            return ['pdf', 'txt'].includes(this.selectedMedia.extension);
        },
        isVideo () {
            return ['mp4', 'webm', '3gp', 'flv', 'ogg', 'ogv', 'mov', 'wmv', 'mpeg'].includes(this.selectedMedia.extension);
        },
        isAudio () {
            return ['mp3', 'ogg'].includes(this.selectedMedia.extension);
        }
    },
    mounted () {
        PanZoom('.image-preview');
        new Plyr('#player');
    },
    methods: {
        closePreview () {
            this.$store.commit('Media/previewModal', false);
        },
        clickCard (event) {
            if (event.target.closest('.preview-toolbar')) return;
            if (event.target.closest('.image-preview img')) return;
            if (event.target.closest('.video-preview')) return;
            this.closePreview();
        },
        downloadFile () {
            this.$store.dispatch('Media/downloadFile', { ids: this.selectedFilesId });
        },
        showContextMenu (event) {
            this.showMenu = !this.showMenu;
            this.menuPos.x = event.clientX;
            this.menuPos.y = event.clientY;
        }
    }
};
</script>
