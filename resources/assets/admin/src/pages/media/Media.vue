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
        @contextmenu="showContextMenu"
        :class="{'my-file': true, 'sidebar-open': fileInfoSideBar}">
        <v-layout row wrap id="filecontainer">
            <v-flex
                v-for="img in mediaItems"
                @contextmenu="showContextMenu2($event, img)"
                @click="OnClickItem($event, img)" 
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
            :options="dropZoneOptions" 
            :style="dropzonestyle" 
            @vdropzone-drop="deactiveDropzone" 
            @vdropzone-drag-leave="deactiveDropzone"/>

        <!-- <context-menu v-model="cm.show" :x="cm.x" :y="cm.y" /> -->
        <context-menu v-model="cm.show" :x="cm.x" :y="cm.y" :file="cm.file" />
        
    </v-layout>

    <new-folder-form :open="newFolderModal" />
    <rename-file :open="renamefilemodal"></rename-file>
    <move-to  />
</v-layout>
</template>


<script>
import { mapState } from 'vuex';
import Dropzone from '@ac/dropzone';
import MediaItem from './mediaItem.vue';
import MediaToolbar from './mediaToolbar.vue';
import MediaInfo from './MediaInfo.vue';
import Mixins from './mixin';
import NewFolderForm from './NewFolderForm.vue';
import RenameFile from './RenameFile.vue';
import ContextMenu from './ContextMenu.vue'
import MoveTo from './MoveTo.vue'

export default {
    components: {
        Dropzone,
        MediaItem,
        MediaToolbar,
        MediaInfo,
        NewFolderForm,
        RenameFile,
        ContextMenu,
        MoveTo
    },
    data () {
        return {
            cm: {},
            cm2: {},
            fileCm: false,
            clickedOnItem: false,
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
        Bus.$on('openDropZone', ()=> {
            this.openUploader();
        });
        Bus.$on('uploadFolder', ()=> {
            this.uploadFolder();
        });
        document.addEventListener('click', ()=>{
            this.deselect()
        });
    },

    watch : {
        '$route' (to, from) {
            this.loadMediaItems({
                parent_id: to.params.folderId,
            });
        }
    },
    computed: {
        ...mapState('Media', ['mediaItems', 'pagination', 'fileInfoSideBar', 'newFolderModal', 'renamefilemodal']),
        isLoaded () {
            return this.isfilesLoaded && this.isfolderLoaded;
        },
        dropZoneOptions () {
            return {
                url: '/api/file',
                thumbnailWidth: 200,
                parallelUploads: 1,
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
                `,
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
            let path = file.fullPath || file.webkitRelativePath || file.mozRelativePath;
            if ( typeof path === 'undefined' ) {
                path = file.name;
            }
            formData.append('path', '/' + path);
            formData.append('parent_id', this.currentFolderId);
        },
        showContextMenu (e, item) {
            e.preventDefault();

            if (this.fileCm) {
                this.fileCm = false;
                return;
            }

            this.cm = {
                    show: true,
                    x: e.clientX,
                    y: e.clientY,
                    file: item,
                }
        },
        showContextMenu2 (e, item) {
            e.preventDefault();
            this.fileCm = true;
            this.cm = {
                show: true,
                x: e.clientX,
                y: e.clientY,
                file: item,
            }
            this.OnClickItem(e, item);
        },
        openUploader () {
            this.$refs.myVueDropzone.dropzone.init();
            this.$refs.myVueDropzone.dropzone.hiddenFileInput.click();
        },
        uploadFolder () {
            this.$refs.myVueDropzone.dropzone.init();
            let input = this.$refs.myVueDropzone.dropzone.hiddenFileInput;
            input.setAttribute("type", "file");
            input.setAttribute("webkitDirectory", true);
            input.setAttribute("mozDirectory", true);
            input.setAttribute("directory", true);
            this.$refs.myVueDropzone.dropzone.hiddenFileInput.click();
        },
        OnClickItem (event, item) {
            this.clickedOnItem = true;
            let isMultiSelect = event.ctrlKey || event.metaKey;

            if (!isMultiSelect && item.type == 'folder' && !this.fileCm) {
                this.$router.push({
                    name: 'singleFolder',
                    params: {
                        folderId: item.hash
                    }
                })
            }

            this.$store.commit("Media/selectFiles", { isMultiSelect: isMultiSelect, id: item.id });
            this.$store.commit("Media/selectMediaItem", item);
        },
        deselect () {
            if (this.clickedOnItem) {
                this.clickedOnItem = false;
                return;
            }

            this.$store.commit("Media/deselectFile");
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