<template>
    <VOverlay
        v-model="showMenu"
        :position-x="x"
        :position-y="y"
        absolute
        offset-y
    >
        <VList id="contextmenu">
            <VListItem
                v-for="(item, index) in items"
                :key="index"
                ripple
                @click="item.action"
            >
                <VListItemAction v-if="item.icon">
                    <VIcon>{{ item.icon }}</VIcon>
                </VListItemAction>
                <VListItemTitle>{{ item.title }}</VListItemTitle>
            </VListItem>
        </VList>
    </VOverlay>
</template>

<script>
import { mapState } from 'vuex';
import Mixins from './mixin';

export default {
    mixins: [Mixins],
    props: {
        value: {
            type: Boolean
        },
        x: {
            type: Number,
            default: 0
        },
        y: {
            type: Number,
            default: 0
        },
        file: {
            type: Object,
            default () {
                return {

                };
            }
        }
    },
    data () {
        return {
            showMenu: this.value
        };
    },
    computed: {
        ...mapState('Media', ['selectedFilesId']),
        items () {
            // eslint-disable-next-line no-prototype-builtins
            if (this.file.hasOwnProperty('id') && this.file.deleted_at === null) {
                if (this.file.type === 'folder') {
                    return this.menuitems.filter(i => i.show === 'items').filter(i => i.title !== 'Preview');
                }
                return this.menuitems.filter(i => i.show === 'items');
                // eslint-disable-next-line no-prototype-builtins
            } else if (this.file.hasOwnProperty('id') && this.file.deleted_at !== null) {
                return this.menuitems.filter(i => i.show === 'trash');
            } else if (this.$route.name === 'media' || this.$route.name === 'singleFolder') {
                return this.menuitems.filter(i => i.show === 'back');
            }

            return [];
        },

        menuitems () {
            return [
                {
                    title: 'Preview',
                    icon: 'mdi-preview',
                    show: 'items',
                    action: this.preview
                },
                {
                    title: 'Share',
                    icon: 'supervisor_account',
                    show: 'items',
                    action: this.shareFiles
                },
                {
                    title: 'Get shareable link',
                    icon: 'link',
                    show: 'items',
                    action: this.shareLink
                },
                {
                    title: this.file.stared ? 'Removed from star' : 'Add a star',
                    icon: 'grade',
                    show: 'items',
                    action: this.manageStar
                },
                {
                    title: 'Move to',
                    icon: 'call_missed_outgoing',
                    show: 'items',
                    action: this.moveTo
                },
                {
                    title: 'Rename',
                    icon: 'edit',
                    show: 'items',
                    action: this.openRenameModel
                },
                {
                    title: 'Make a copy',
                    icon: 'file_copy',
                    show: 'items',
                    action: this.copyFiles
                },
                {
                    title: 'Download',
                    icon: 'cloud_download',
                    show: 'items',
                    action: this.downloadFile
                },
                {
                    title: 'Delete',
                    icon: 'delete',
                    show: 'items',
                    action: this.deleteItems
                },
                {
                    title: 'New Folder',
                    icon: 'create_new_folder',
                    show: 'back',
                    action: this.openNewFolderModal
                },
                {
                    title: 'Upload files',
                    icon: 'cloud_upload',
                    show: 'back',
                    action: this.openDropZone
                },
                {
                    title: 'Upload Folder',
                    icon: 'folder_open',
                    show: 'back',
                    action: this.uploadFolder
                },
                {
                    title: 'Restore files',
                    icon: 'restore',
                    show: 'trash',
                    action: this.restore
                },
                {
                    title: 'Delete Forever',
                    icon: 'delete_forever',
                    show: 'trash',
                    action: this.deleteForever
                }
            ];
        }
    },
    watch: {

        value (newVal) {
            this.showMenu = false;
            this.$nextTick(() => {
                this.showMenu = newVal;
            });
        },
        x () {
            this.showMenu = false;
            this.$nextTick(() => {
                this.showMenu = true;
            });
        },
        y () {
            this.showMenu = false;
            this.$nextTick(() => {
                this.showMenu = true;
            });
        }
    },
    methods: {
        openDropZone () {
            this.emmiter.emit('openDropZone');
        },
        uploadFolder () {
            this.emmiter.$emit('uploadFolder');
        },
        moveTo () {
            this.$store.commit('Media/moveToemodal', true);
        },
        shareFiles () {
            this.$store.commit('Media/shareFileModal', true);
        },
        shareLink () {
            this.$store.commit('Media/shareLinkModal', true);
        },
        manageStar () {
            // eslint-disable-next-line no-prototype-builtins
            if (this.file.hasOwnProperty('id') && !this.file.stared) {
                this.$store.dispatch('Media/addStar', { ids: this.selectedFilesId });
            } else {
                this.$store.dispatch('Media/removeStar', { ids: this.selectedFilesId });
            }
        },
        openRenameModel () {
            this.$store.commit('Media/renamefilemodal', true);
        },

        deleteItems () {
            this.$store.dispatch('Media/deleteItem', { ids: this.selectedFilesId });
        },
        copyFiles () {
            this.$store.dispatch('Media/copyFile', { ids: this.selectedFilesId });
        },
        downloadFile () {
            this.$store.dispatch('Media/downloadFile', { ids: this.selectedFilesId });
        },
        restore () {
            this.$store.dispatch('Media/deleteItem', { ids: this.selectedFilesId, action: 'restore' });
        },
        deleteForever () {
            this.$store.dispatch('Media/deleteItem', { ids: this.selectedFilesId, action: 'deleteforever' });
        },
        preview () {
            this.$store.commit('Media/previewModal', true);
        }
    }
};
</script>

<style>
    #contextmenu {
        width: 300px;
        padding: 10px;
    }
    #contextmenu .v-list-item.theme--light:hover {
        background: #f3f3f3;
    }
    #contextmenu .v-list-item__action {
        min-width: 36px;
    }
    #contextmenu .v-list-item {
        height: 32px;
        cursor: pointer;
    }
</style>
