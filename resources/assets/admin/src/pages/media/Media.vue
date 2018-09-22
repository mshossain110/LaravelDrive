<template>

<v-layout class="d-block" >
    <v-layout class="d-block">
        
        <v-flex xs12>
            <v-toolbar
                flat
                light
                height="60px"
                color="secondary">
                
                <v-toolbar-title class="headline">
                    <v-icon>people</v-icon>
                    Media
                </v-toolbar-title>

                <v-spacer />

                <v-btn icon class="la-upload">
                    <v-icon>add_photo_alternate</v-icon>
                </v-btn>
                <v-btn icon @click="createFolder()">
                    <v-icon>create_new_folder</v-icon>
                </v-btn>
                <v-btn icon>
                    <v-icon>view_module</v-icon>
                </v-btn>
                <v-btn icon>
                    <v-icon>view_list</v-icon>
                </v-btn>

                <v-btn icon>
                    <v-icon>filter_list</v-icon>
                </v-btn>
                <v-btn icon @click="drawer= !drawer">
                    <v-icon>chevron_right</v-icon>
                </v-btn>
            </v-toolbar>

        </v-flex>
    </v-layout>

    <v-layout fill-height style="display: block;"
            @dragenter="activeDropzone($event)">
            <v-layout row wrap id="filecontainer" >
                <v-flex
                    v-if="newFolder"
                    xs4
                    sm3
                    lg2
                    >
                    <media-item :media="{name: null, type: 'folder'}" :editable="newFolder" @rename="createNewFolder"></media-item>
                </v-flex>
                <v-flex
                    v-for="img in mediaItems"
                    :key="img.id"
                    xs4
                    sm3
                    lg2
                    >
                    <media-item :media="img"></media-item>
                    </v-flex>
            </v-layout>

            <v-navigation-drawer
                v-model="drawer"
                absolute
                hide-overlay
                clipped
                stateless
                height
                right
                >
                

                here will be show image detals
            </v-navigation-drawer>

            <dropzone ref="myVueDropzone" id="laraveladmin" :options="dropzoneOptions" :style="dropzonestyle" @vdropzone-drop="deactiveDropzone" @vdropzone-drag-leave="deactiveDropzone"/>
    </v-layout>
</v-layout>
</template>


<script>
import { mapState } from 'vuex';
import Dropzone from '@ac/dropzone';
import MediaItem from './mediaItem.vue';

export default {
    components: {
        Dropzone,
        MediaItem,
    },
    data () {
        return {
            drawer: false,
            mediaareaStyle: {},
            newFolder: false,
            dropzoneOptions: {
                url: '/api/file',
                thumbnailWidth: 200,
                init: function() {
                    this.on("sending", function(file, xhr, formData){
                        let path = file.fullPath;
                        if ( typeof file.fullPath === 'undefined' ) {
                            path = '/' + file.name;
                        }
                        formData.append('path', path);
                    });
                },
                params: {
                    parent_id: null,
                },
                addRemoveLinks: true,
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
    created () {
        this.$store.dispatch('Media/getMediaItems')
        .then((res) => {

        });
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
        }
    },
    computed: {
        ...mapState('Media', ['mediaItems', 'pagination']),
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
        createFolder () {
            this.newFolder = true;
        },
        createNewFolder (media) {
            const item = {
                name: media.name,
            }

            this.$store.dispatch('Media/addFolder', item)
                .then((res) => {
                    this.newFolder = false;
                })
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
</style>