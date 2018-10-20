<template>
    <v-toolbar
        flat
        light
        height="40px"
        id="mediaToolbar"
        class="la-pt"
        color="white">
        
        <v-toolbar-title>
            <v-icon>perm_media</v-icon>
            My Files
            <v-menu offset-y>
                <v-btn
                    slot="activator"
                    icon
                    >
                        <v-icon>arrow_drop_down</v-icon>
                    </v-btn>

                <v-list>
                    <v-list-tile @click="openNewFolderModal()">
                        <v-list-tile-title>
                            <v-icon>create_new_folder</v-icon> 
                            New Folder
                        </v-list-tile-title>
                    </v-list-tile>
                    <v-list-tile @click="uploadFolder">
                        <v-list-tile-title>
                            <v-icon>create_new_folder</v-icon> 
                            Upload  Folder
                        </v-list-tile-title>
                    </v-list-tile>
                    <v-list-tile @click="openDropZone">
                        <v-list-tile-title>
                            <v-icon>add_photo_alternate</v-icon>
                            Upload  Files
                        </v-list-tile-title>
                    </v-list-tile>
                </v-list>
            </v-menu>
        </v-toolbar-title>

        <v-spacer />

        <v-btn icon @click="openDropZone()">
            <v-icon>add_photo_alternate</v-icon>
        </v-btn>
        <v-btn icon @click="openNewFolderModal()">
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
        <v-btn icon @click="toggleSidebar()" :class="{'active': fileInfoSideBar}">
            <v-icon>info</v-icon>
        </v-btn>
    </v-toolbar>
</template>


<script>
import Mixins from './mixin'
import { mapState } from 'vuex';
export default {
    data () {
        return {
            
        }
    },

    mixins: [Mixins],
    computed: {
        ...mapState('Media', ['fileInfoSideBar']),
    },
    methods: {
        openDropZone () {
            Bus.$emit('openDropZone')
        },
        uploadFolder () {
            Bus.$emit('uploadFolder')
        }
    }
}
</script>

<style>
    #mediaToolbar .v-btn.active {
        background: #0e5796;
        color: #fff;
    }
</style>