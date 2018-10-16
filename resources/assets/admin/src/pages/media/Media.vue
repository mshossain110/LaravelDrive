<template>

<v-layout class="d-block" >
    <v-layout class="d-block">
        
        <v-flex xs12>
            <media-toolbar />
        </v-flex>
    </v-layout>

    <v-layout fill-height
        v-if="isLoaded"
        @dragenter="activeDropzone($event)" 
        :class="{'my-file': true, 'sidebar-open': fileInfoSideBar}">
        <v-layout row wrap id="filecontainer">
            <v-flex
                v-for="img in mediaItems"
                :key="img.id"
                >
                    <media-item :media="img"></media-item>
            </v-flex>
        </v-layout>

        <media-info v-if="fileInfoSideBar" />

        <dropzone 
            ref="myVueDropzone" 
            id="laraveladmin"
            @vdropzone-sending="dropzoneSending"
            :options="dropzoneOptions" 
            :style="dropzonestyle" 
            @vdropzone-drop="deactiveDropzone" 
            @vdropzone-drag-leave="deactiveDropzone"/>
    </v-layout>
</v-layout>
</template>


<script>
import { mapState } from 'vuex';
import Dropzone from '@ac/dropzone';
import MediaItem from './mediaItem.vue';
import MediaToolbar from './mediaToolbar.vue';
import MediaInfo from './MediaInfo.vue';
import Mixins from './mixin';

export default {
    components: {
        Dropzone,
        MediaItem,
        MediaToolbar,
        MediaInfo
    },
    data () {
        return {
            mediaareaStyle: {},
            newFolder: false,
            dropzoneOptions: {
                url: '/api/file',
                thumbnailWidth: 200,
                parallelUploads: 1,
                clickable: [".la-upload"],
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRF-TOKEN': document.head.querySelector('meta[name="csrf-token"]').content,
                },
                previewsContainer: '#filecontainer',
                previewTemplate: `
                    <div class="flex xs4 sm3 lg2" >
                    <div class="dz-preview dz-file-preview media-item mr-3 mt-3 v-card v-card--flat v-card--tile theme--light">
                        <div class="dz-details v-responsive folder" style="width: 166px; color: rgb(251, 192, 45);">
                            <div class="v-responsive__content">
                                <div class="v-avatar v-avatar--tile" style="height: 166px; width: 166px;">
                                    <img data-dz-thumbnail />
                                </div>
                            </div>
                        </div>
                        <div class="dz-error-mark"><span>✘</span></div>
                        <div class="dz-filename v-card__actions">
                            <span data-dz-name></span> <span class="dz-size" data-dz-size></span>
                        </div>
                        <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>
                    </div>
                    </div>
                `
            },
            dropzonestyle: {
                display: 'none',
                opacity: 0,
            }
        }
    },
    mixins: [Mixins],
    created () {
        this.loadMediaItems();
        this.loadFolders();
    },
    mounted () {

    },
    watch : {
        drawer (newvalue) {
            if (newvalue) {
                this.mediaareaStyle = { padding: '40px 0px 0px 300px;' };
            } else {
                this.mediaareaStyle = {}
            }
        },
        '$route' (to, from) {
            this.loadMediaItems({
                parent_id: to.params.folderId,
            });
        }
    },
    computed: {
        ...mapState('Media', ['mediaItems', 'pagination', 'folders', 'fileInfoSideBar']),
        isLoaded () {
            return this.isfilesLoaded && this.isfolderLoaded;
        },
        currentFolder () {
            const hash = this.$route.params.folderId;
            const i = this.folders.findIndex(m => m.hash === hash);
            if ( -1 === i) {
                return false;
            }else {
                return this.folders[i];
            }
        },
        currentFolderId () {
            if (this.currentFolder) {
                return this.currentFolder.id;
            }else {
                return 0
            }
        }
    },
    methods: {
        activeDropzone (event) {
            event.stopPropagation();
            event.preventDefault();
            this.dropzonestyle = {
                display: 'block',
                opacity: 1,
            }
        },
        deactiveDropzone (event) {
            event.stopPropagation();
            event.preventDefault();
            this.dropzonestyle = {
                display: 'none',
                opacity: 0,
            }
        },
        
        dropzoneSending (file, xhr, formData) {
            let path = file.fullPath;
            if ( typeof file.fullPath === 'undefined' ) {
                path = file.name;
            }
            formData.append('path', '/' + path);
            formData.append('parent_id', this.currentFolderId);
        }
    }
}
</script>

<style lang="styl">
div#laraveladmin {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    display: none;
    opacity: 0;
}
.media-item .v-card__actions button.v-btn {
    width: 12px;
    height: 12px;
    
}
.media-item .v-card__actions button.v-btn .v-icon {
    font-size: 12px;
}
.la-pt .v-toolbar__title {
    font-size: 18px;
    font-family: 'Roboto', sans-serif !important;
    font-weight: normal;
}
.la-pt .v-icon {
    font-size: 18px;
}
.la-pt .v-menu {
    margin-left: -14px;
}
.my-file {
    position: relative;
    display: block;
    overflow: hidden;
}
#filecontainer {
    margin: 0;
    transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
#filecontainer .flex {
    width: calc(20% - 20px);
    margin-top: 16px;
    margin-right: 20px;
    display: inline-block;
    position: relative;
    vertical-align: top;
    max-width: 210px;
}
.sidebar-open #filecontainer {
    margin-right: 300px;
}
.sidebar-open #filecontainer .flex {
    width: calc(25% - 20px);
}
</style>