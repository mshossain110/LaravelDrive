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

                <v-btn icon>
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

    <v-layout style="display: block; position:"
            
            @dragenter="activeDropzone($event)">
            <v-layout row wrap id="filecontainer" >
                
                <v-flex
                    v-for="img in images"
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
            dropzoneOptions: {
                url: '/api/file',
                thumbnailWidth: 200,
                addRemoveLinks: true,
                clickable: false,
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
            },
            folders: [{"id":15731,"name":"Images","parent_id":null,"path":"15731","hash":"MTU3MzF8cGFkZA","url":null},{"id":15745,"name":"Documents","parent_id":null,"path":"15745","hash":"MTU3NDV8cGFkZA","url":null},{"id":15767,"name":"Shared","parent_id":null,"path":"15767","hash":"MTU3Njd8cGFkZA","url":null},{"id":15744,"name":"Nested Folder","parent_id":15731,"path":"15731\/15744","hash":"MTU3NDR8cGFkZA","url":null}],
            images: [{"id":15745,"name":"Documents","description":null,"file_name":"Documents","mime":"NULL","file_size":null,"user_id":null,"parent_id":null,"password":null,"created_at":"2018-08-27 10:30:20","updated_at":"2018-08-27 10:30:20","deleted_at":null,"path":"15745","public_path":null,"type":"folder","extension":null,"public":0,"hash":"MTU3NDV8cGFkZA","url":null,"users":[{"email":"admin@demo083.com","id":141,"avatar":"https:\/\/www.gravatar.com\/avatar\/7c2a7ecd7c5f2f330e50cbad9a7d7baf?s=65","owns_entry":true,"entry_permissions":[],"display_name":"Demo Admin"}],"tags":[]},{"id":6896,"name":"Documents","description":null,"file_name":"Documents","mime":"NULL","file_size":null,"user_id":null,"parent_id":null,"password":null,"created_at":"2018-08-27 10:30:20","updated_at":"2018-08-27 10:30:20","deleted_at":null,"path":"15745","public_path":null,"type":"folder","extension":null,"public":0,"hash":"MTU3NDV8cGFkZA","url":null,"users":[{"email":"admin@demo083.com","id":141,"avatar":"https:\/\/www.gravatar.com\/avatar\/7c2a7ecd7c5f2f330e50cbad9a7d7baf?s=65","owns_entry":true,"entry_permissions":[],"display_name":"Demo Admin"}],"tags":[]}],
        }
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
            console.log(event)
            event.stopPropagation(); 
            event.preventDefault();
            this.dropzonestyle = {
                display: 'none',
                opacity: 0,
            }
        },
        createFolder () {
            this.images.push({
                id: parseInt( Math.random * 10),
                name:"",
                description:null,
                file_name:"",
                type:"folder",
                edit: true,
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