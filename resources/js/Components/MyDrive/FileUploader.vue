
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

        <!-- Upload progress panel -->
        <div
            v-if="filesAddedpoppu"
            class="fixed bottom-5 right-5 z-50 w-[420px] overflow-hidden rounded-xl bg-white shadow-xl ring-1 ring-gray-200"
        >
            <!-- Header -->
            <div class="flex items-center gap-2 bg-brand-600 px-4 py-2.5">
                <span class="flex-1 text-sm font-medium text-white">Uploading files</span>
                <button class="rounded p-1 text-white/80 hover:text-white" @click="expandLess = !expandLess">
                    <ChevronUpIcon v-if="expandLess" class="h-4 w-4" />
                    <ChevronDownIcon v-else class="h-4 w-4" />
                </button>
                <button class="rounded p-1 text-white/80 hover:text-white" @click="filesAddedpoppu = false">
                    <XMarkIcon class="h-4 w-4" />
                </button>
            </div>

            <!-- File list -->
            <div v-show="expandLess" class="max-h-60 divide-y divide-gray-100 overflow-y-auto">
                <div
                    v-for="file in fileList"
                    :key="file.size"
                    class="flex items-center gap-3 px-4 py-2.5"
                >
                    <DocumentIcon class="h-5 w-5 shrink-0 text-gray-400" />
                    <span class="flex-1 truncate text-sm text-gray-700">{{ file.name }}</span>
                    <!-- Progress ring -->
                    <svg class="h-6 w-6 shrink-0" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" stroke-width="2" stroke="currentColor" fill="none" class="text-gray-200" />
                        <circle
                            cx="12" cy="12" r="10" stroke-width="2" stroke="currentColor" fill="none"
                            class="text-brand-600"
                            :stroke-dasharray="62.83"
                            :stroke-dashoffset="62.83 - (62.83 * (file.ldporgress || 0)) / 100"
                            stroke-linecap="round"
                            transform="rotate(-90 12 12)"
                        />
                    </svg>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Dropzone from '@/Components/dropzone';
import { ChevronUpIcon, ChevronDownIcon, XMarkIcon, DocumentIcon } from '@heroicons/vue/24/outline';
import Mixins from './mixin';

export default {
    components: {
        Dropzone,
        ChevronUpIcon,
        ChevronDownIcon,
        XMarkIcon,
        DocumentIcon,
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
                parallelChunkUploads: true,
                retryChunks: true,
                retryChunksLimit: 3
            };
        },
        dropzonestyle () {
            return this.value ? { display: 'block', opacity: 1 } : { display: 'none', opacity: 0 };
        }
    },
    mounted () {
        this.emmiter.on('openDropZone', () => {
            this.openUploader();
        });
        this.emmiter.on('uploadFolder', () => {
            this.uploadFolder();
        });
    },
    methods: {
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
        uploadProgress (file, progress) {
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
