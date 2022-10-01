<template>
    <VToolbar
        id="mediaToolbar"
        dense
    >
        <VToolbarTitle>
            <VIcon icon="perm_media"></VIcon>
            My Files
        <VMenu offset-y>
            <template v-slot:activator="{ props }">
                <VBtn
                    icon
                    v-bind="props"
                    class="d-inline"
                >
                    <VIcon icon="expand_circle_down"></VIcon>
                </VBtn>
            </template>

            <VList>
                <VListItem @click="openNewFolderModal()">
                    <VListItemTitle>
                        <VIcon icon="create_new_folder"></VIcon>
                        New Folder
                    </VListItemTitle>
                </VListItem>
                <VListItem @click="uploadFolder">
                    <VListItemTitle>
                        <VIcon icon="drive_folder_upload"></VIcon>
                        Upload  Folder
                    </VListItemTitle>
                </VListItem>
                <VListItem @click="openDropZone">
                    <VListItemTitle>
                        <VIcon icon="upload_file"></VIcon>
                        Upload  Files
                    </VListItemTitle>
                </VListItem>
            </VList>
        </VMenu>

    </VToolbarTitle>

        <VSpacer />

        <VBtn
            icon
            @click="openDropZone()"
        >
            <VIcon icon="upload_file"></VIcon>
        </VBtn>
        <VBtn
            icon
            @click="openNewFolderModal()"
        >
            <VIcon icon="create_new_folder"></VIcon>
        </VBtn>
        <VBtn icon>
            <VIcon icon="grid_view"></VIcon>
        </VBtn>
        <VBtn icon>
            <VIcon icon="view_list"></VIcon>
        </VBtn>

        <VBtn icon>
            <VIcon icon="filter_list"></VIcon>
        </VBtn>
        <VBtn
            icon
            :class="{'active': fileInfoSideBar, 'file-deselet': true}"
            @click="toggleSidebar()"
        >
            <VIcon icon="info"></VIcon>
        </VBtn>
    </VToolbar>
</template>

<script>
import Mixins from './mixin';
import { mapState } from 'vuex';
export default {

    mixins: [Mixins],
    data () {
        return {

        };
    },
    computed: {
        ...mapState('Media', ['fileInfoSideBar'])
    },
    methods: {
        openDropZone () {
            this.emmiter.emit('openDropZone');
        },
        uploadFolder () {
            this.emmiter.emit('uploadFolder');
        }
    }
};
</script>

<style>
    #mediaToolbar .v-btn.active {
        background: #0e5796;
        color: #fff;
    }
</style>
