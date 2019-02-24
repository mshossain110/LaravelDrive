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
                class="preview-card"
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
                    <VToolbarTitle>Settings</VToolbarTitle>
                    <VSpacer />
                    <VToolbarItems>
                        <VBtn
                            dark
                            flat
                            @click="dialog = false"
                        >
                            Save
                        </VBtn>
                    </VToolbarItems>
                </VToolbar>

                <VCard
                    v-if="isImage"
                    class="image-preview"
                >
                    <VImg
                        :src="fileUrl"
                        aspect-ratio="2.75"
                        contain
                        width="70"
                    />
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
import { mapState } from 'vuex'
import PanZoom from './../../mixin/library/panzoom'
export default {
    props: {
        open: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {

        }
    },
    computed: {
        ...mapState('Media', ['mediaItems', 'selectedMedia', 'selectedFilesId']),

        filesCanPreview () {
            return this.mediaItems.filter(m => {
                return m.type !== 'folder'
            })
        },
        currentImage () {
            let hash = this.$route.params.hash
            return this.mediaItems.find(i => i.hash === hash)
        },
        fileUrl () {
            return window.location.origin + '/' + this.selectedMedia.url
        },
        isImage () {
            return ['gif', 'ico', 'jpeg', 'jpg', 'png', 'svg', 'bmp', 'dib'].indexOf(this.selectedMedia.extension) !== -1
        }

    },
    mounted () {
        PanZoom('.image-preview')
    },
    methods: {
        closePreview () {
            this.$store.commit('Media/previewModal', false)
        },
        clickCard (event) {
            if (event.target.closest('.v-toolbar__content')) {
                return
            }
            if (event.target.closest('.v-responsive__content')) {
                return
            }

            this.closePreview()
        },
        downloadFile () {
            this.$store.dispatch('Media/downloadFile', { ids: this.selectedFilesId })
        }
    }
}
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
</style>
