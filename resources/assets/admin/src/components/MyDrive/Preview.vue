<template>
    <VLayout
        row
        justify-center
    >
        <VDialog
            :value="open"
            fullscreen
            transition="dialog-bottom-transition"
        >
            <VCard
                class="preview-card file-deselet"
                @click="clickCard"
            >
                <VToolbar
                    dark
                    color="primary"
                >
                    <VBtn
                        icon
                        dark
                        @click="closePreview()"
                    >
                        <VIcon>close</VIcon>
                    </VBtn>
                    <VSpacer />
                    <VToolbarItems>
                        <VBtn
                            dark
                            text
                            @click="downloadFile()"
                        >
                            <VIcon>cloud_download</VIcon>
                        </VBtn>
                    </VToolbarItems>
                    <VToolbarItems style="position: relative;">
                        <VBtn
                            dark
                            text
                            @click="showContextMenu"
                        >
                            <VIcon>more_vert</VIcon>
                        </VBtn>
                        <ContextMenu
                            v-model="showMenu"
                            :x="menuPos.x"
                            :y="menuPos.y"
                            :file="selectedMedia"
                        />
                    </VToolbarItems>
                </VToolbar>

                <VCard
                    v-if="ispdf"
                    class="pdf-preview"
                >
                    <object
                        :type="selectedMedia.mime"
                        :data="fileUrl"
                        internalinstanceid="8"
                    >
                        <a
                            trans=""
                            :href="fileUrl"
                        >
                            Download the file.
                        </a>
                    </object>
                </VCard>

                <VCard
                    v-else-if="isImage"
                    class="image-preview"
                >
                    <VImg
                        :src="selectedMedia.public_path"
                        aspect-ratio="2.75"
                        contain
                        width="70"
                    />
                </VCard>

                <VCard
                    v-else-if="isVideo"
                    class="video-preview"
                >
                    <video
                        id="player"
                        playsinline
                        controls
                    >
                        <source
                            :src="fileUrl"
                            :type="selectedMedia.mime"
                        >

                        <!-- Captions are optional -->

                    </video>
                </VCard>

                <VCard
                    v-else-if="isAudio"
                    class="video-preview"
                >
                    <audio
                        id="player"
                        controls
                    >
                        <source
                            :src="fileUrl"
                            :type="selectedMedia.mime"
                        >
                    </audio>
                </VCard>

                <VCard
                    v-else
                    class="no-preview"
                >
                    <VCardTitle primary-title>
                        <h4>No file preview available.</h4>
                        <VBtn
                            color="primary"
                            @click="downloadFile()"
                        >
                            Download
                        </VBtn>
                    </VCardTitle>
                </VCard>
            </VCard>
        </VDialog>
    </VLayout>
</template>

<script>
import { mapState } from 'vuex';
import Plyr from 'Plyr';
import PanZoom from './../../mixin/library/panzoom';
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
            return this.mediaItems.filter(m => {
                return m.type !== 'folder';
            });
        },
        currentImage () {
            const hash = this.$route.params.hash;
            return this.mediaItems.find(i => i.hash === hash);
        },
        fileUrl () {
            return window.location.origin + '/' + this.selectedMedia.url;
        },
        isImage () {
            return ['gif', 'ico', 'jpeg', 'jpg', 'png', 'svg', 'bmp', 'dib'].indexOf(this.selectedMedia.extension) !== -1;
        },
        ispdf () {
            return ['pdf', 'txt'].indexOf(this.selectedMedia.extension) !== -1;
        },
        isVideo () {
            return ['mp4', 'webm', '3gp', 'flv', 'ogg', 'ogv', 'mov', 'wmv', 'mpeg'].indexOf(this.selectedMedia.extension) !== -1;
        },
        isAudio () {
            return ['mp3', 'ogg'].indexOf(this.selectedMedia.extension) !== -1;
        }

    },
    mounted () {
        PanZoom('.image-preview');
        // eslint-disable-next-line no-new
        new Plyr('#player');
    },
    methods: {
        closePreview () {
            this.$store.commit('Media/previewModal', false);
        },
        clickCard (event) {
            if (event.target.closest('.v-toolbar__content')) {
                return;
            }
            if (event.target.closest('.v-responsive__content')) {
                return;
            }

            if (event.target.closest('.video-preview')) {
                return;
            }

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
<style>
.v-card.preview-card .v-card {
    background: transparent !important;
}
.v-card.preview-card {
    background-color: rgba(0,0,0, 0.8) !important;
}

.v-card.preview-card .image-preview {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh;
    box-shadow: none;
}

.v-card.preview-card .v-toolbar {
    z-index: 9999;
}
.v-card.preview-card .v-card.no-preview{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.v-card.preview-card .v-card.no-preview .v-card__title{
    width: 300px;
    background: #fff;
    text-align: center;
    display: flex;
    justify-content: center;
}
.pdf-preview object {
    width: 100%;
    height: 100vh;
}
.video-preview {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    text-align: center;
}

.v-card.preview-card .v-card.pdf-preview {
    background: #FFF !important;
}
</style>
