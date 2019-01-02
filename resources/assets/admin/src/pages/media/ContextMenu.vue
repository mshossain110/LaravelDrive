<template>
    <v-menu
      v-model="showMenu"
      :position-x="x"
      :position-y="y"
      absolute
      offset-y
    >
      <v-list id="contextmenu">
        <v-list-tile
          v-for="(item, index) in items"
          :key="index"
          ripple
          @click="item.action"
        >
            <v-list-tile-action v-if="item.icon">
                <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
</template>


<script>
import { mapState } from 'vuex';
import Mixins from './mixin'

export default {
    props: {
        value: {
            type: Boolean
        },
        x: {
            default: 0,
        },
        y: {
            default: 0
        },
        file: {
            type: Object,
            default() {
                return {

                }
            }
        }
    },
    data () {
        return {
            showMenu: this.value,
        }
    },
    mixins: [Mixins],
    watch: {

        value (newVal) {
            this.showMenu = false;
            this.$nextTick( () => {
                 this.showMenu = newVal;
            } );
        },
        x () {
            this.showMenu = false;
            this.$nextTick( () => {
                 this.showMenu = true;
            } );
        },
        y () {
            this.showMenu = false;
            this.$nextTick( () => {
                 this.showMenu = true;
            } );
        }
    },
    computed: {
        ...mapState('Media', ['selectedFilesId']),
        items () {

            if (this.file.hasOwnProperty('id')) {
                return [
                    {
                        title: "Preview",
                        icon: 'visibility',
                        action: ''
                    },
                    {
                        title: "Manage people",
                        icon: 'supervisor_account',
                        action: ''
                    },
                    {
                        title: "Get shareable link",
                        icon: 'link',
                        action: ''
                    },
                    {
                        title: this.file.stared ? "Removed from star" : "Add a star",
                        icon: 'grade',
                        action: this.manageStar
                    },
                    {
                        title: "Move to",
                        icon: 'call_missed_outgoing',
                        action: this.moveTo
                    },
                    {
                        title: "Rename",
                        icon: 'edit',
                        action: this.openRenameModel
                    },
                    {
                        title: "Make a copy",
                        icon: 'file_copy',
                        action: ''
                    },
                    {
                        title: "Download",
                        icon: 'cloud_download',
                        action: ''
                    },
                    {
                        title: "Delete",
                        icon: 'delete',
                        action: ''
                    }
                ]
            } else {
                return [
                    {
                        title: "New Folder",
                        icon: 'create_new_folder',
                        action: this.openNewFolderModal
                    },
                    {
                        title: "Upload files",
                        icon: 'cloud_upload',
                        action: this.openDropZone
                    },
                    {
                        title: "Upload Folder",
                        icon: 'folder_open',
                        action: this.uploadFolder
                    }
                ]
            }
        }
    },
    methods: {
        openDropZone () {
            Bus.$emit('openDropZone')
        },
        uploadFolder () {
            Bus.$emit('uploadFolder')
        },
        moveTo () {
            Bus.$emit('moveTo', true );
        },
        manageStar () {
            if (this.file.hasOwnProperty('id') && !this.file.stared){
                this.$store.dispatch('Media/addStar', {ids: this.selectedFilesId});
            } else {
                this.$store.dispatch('Media/removeStar', {ids: this.selectedFilesId});
            }

        },
        openRenameModel () {
            this.$store.commit("Media/renamefilemodal", true);
        }
    }
}
</script>

<style>
    #contextmenu {
        width: 300px;
        padding: 10px;
    }
    #contextmenu .v-list__tile.theme--light:hover {
        background: #f3f3f3;
    }
    #contextmenu .v-list__tile__action {
        min-width: 36px;
    }
    #contextmenu .v-list__tile {
        height: 32px;
        cursor: pointer;
    }
</style>