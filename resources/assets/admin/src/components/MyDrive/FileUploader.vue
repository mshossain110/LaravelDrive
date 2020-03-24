
<template>
    <!-- eslint-disable vue/no-v-html  -->
    <div>
        <Dropzone
            id="laraveladmin"
            ref="myVueDropzone"
            :options="dropzoneOptions"
            :style="dropzonestyle"

            @vdropzone-files-added="fileAdded"
            @vdropzone-success="success"

            @vdropzone-processing="processing"
            @vdropzone-chunks-uploaded="chunksUploaded"
            @vdropzone-upload-progress="uploadProgress"
            @vdropzone-sending="sending"
            @vdropzone-drop="deactive"
            @vdropzone-drag-leave="deactive"
        />

        <VCard
            v-if="filesAddedpoppu"
            class="upload-file-list elevation-8"
        >
            <VToolbar
                dark
                color="red derken-2"
            >
                <VToolbarTitle class="white--text">
                    Uploading files
                </VToolbarTitle>

                <VSpacer />

                <VBtn
                    icon
                    @click="expandLess =!expandLess "
                >
                    <VIcon v-if="!expandLess">
                        expand_less
                    </VIcon>
                    <VIcon v-if="expandLess">
                        expand_more
                    </VIcon>
                </VBtn>

                <VBtn
                    icon
                    @click="filesAddedpoppu = false"
                >
                    <VIcon>close</VIcon>
                </VBtn>
            </VToolbar>

            <VCardText v-show="expandLess">
                <ul>
                    <li
                        v-for="file in fileList"
                        :key="file.size"
                    >
                        <div class="file-name">
                            <span
                                class="fn-i-i"
                                :style="{ color: mediaIcon(file.type).color }"
                                size="15"
                                v-html="mediaIcon(file.type).icon"
                            />
                            <span>{{ file.name }}</span>
                        </div>

                        <VProgressCircular :value="file.ldporgress" />
                    </li>
                </ul>
            </VCardText>
        </VCard>
    </div>
</template>

<script>
import Dropzone from '@ac/dropzone';
import Mixins from './mixin';

export default {
    components: {
        Dropzone
    },
    mixins: [Mixins],
    props: {
        value: {
            type: Boolean
        }
    },
    data () {
        return {
            uploadpopup: true,
            expandLess: true,
            filesAddedpoppu: false,
            fileList: []
        };
    },
    computed: {
        dropzoneOptions () {
            return {
                url: '/api/file',
                method: 'POST',
                thumbnailWidth: 200,
                parallelUploads: 1,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRF-TOKEN': document.head.querySelector('meta[name="csrf-token"]').content
                },
                chunking: true,
                forceChunking: true,
                maxFilesize: 400000000,
                chunkSize: 1000000,
                // If true, the individual chunks of a file are being uploaded simultaneously.
                parallelChunkUploads: true,
                retryChunks: true, // retry chunks on failure
                retryChunksLimit: 3
            };
        },
        dropzonestyle () {
            return this.value ? { display: 'block', opacity: 1 } : { display: 'none', opacity: 0 };
        }

    },
    mounted () {
        Bus.$on('openDropZone', () => {
            this.openUploader();
        });

        Bus.$on('uploadFolder', () => {
            this.uploadFolder();
        });
    },
    methods: {
        progressCount (file) {
            const up = file.upload;
            return (up.progress / up.total) * 100;
        },
        mediaIcon (type) {
            const filetype = type.split('/');
            return this.getMediaIcon(filetype[1]);
        },
        openUploader () {
            this.$refs.myVueDropzone.dropzone.init();
            this.$refs.myVueDropzone.dropzone.hiddenFileInput.click();
        },
        deactive (event) {
            event.stopPropagation();
            event.preventDefault();
            this.$emit('input', false);
        },
        uploadProgress (file, progress, bytesSent) {
            const i = this.fileList.findIndex(f => f.size === file.size);
            this.fileList[i].ldporgress = progress;
            this.fileList[i] = Object.assign(file, this.fileList[i]);
        },
        processing (file) {
            const i = this.fileList.findIndex(f => f.size === file.size);
            this.fileList[i] = Object.assign(file, this.fileList[i]);
        },
        fileAdded (files) {
            this.filesAddedpoppu = true;
            // loop through files
            for (var i = 0; i < files.length; i++) {
                files[i].ldporgress = 0;
                this.fileList.push(files[i]);
            }
        },
        success (file) {
            const response = JSON.parse(file.xhr.response);
            this.$store.commit('Media/setMediaItem', response.data);
        },
        chunksUploaded (file, done) {
            done();
        },

        sending (file, xhr, formData) {
            let path = file.fullPath || file.webkitRelativePath || file.mozRelativePath;
            if (typeof path === 'undefined') {
                path = file.name;
            }
            formData.append('path', '/' + path);
            formData.append('parent_id', this.currentFolderId);
        },
        uploadFolder () {
            this.$refs.myVueDropzone.dropzone.init();
            const input = this.$refs.myVueDropzone.dropzone.hiddenFileInput;
            input.setAttribute('type', 'file');
            input.setAttribute('webkitDirectory', true);
            input.setAttribute('mozDirectory', true);
            input.setAttribute('directory', true);
            this.$refs.myVueDropzone.dropzone.hiddenFileInput.click();
        }
    }
};
</script>

<style>
.v-card.upload-file-list{
    position: absolute;
    bottom: 20px;
    width: 500px;
    right: 0;
}

.v-card.upload-file-list ul {
    padding: 0;
    margin: 0;
    list-style: none;
}
.v-card.upload-file-list ul li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
}
.v-card.upload-file-list ul li .file-name {
    max-width: 80%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
.v-card.upload-file-list ul li [class^="flaticon-"]:before,
.v-card.upload-file-list ul li [class*=" flaticon-"]:before,
.v-card.upload-file-list ul li [class^="flaticon-"]:after,
.v-card.upload-file-list ul li [class*=" flaticon-"]:after {
    margin-left: 0 !important;
}
</style>
