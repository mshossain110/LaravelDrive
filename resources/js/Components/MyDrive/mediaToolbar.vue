<template>
    <VToolbar
        id="mediaToolbar"
        dense
    >
        <VToolbarTitle>
            <VIcon icon="mdi-multimedia"></VIcon>
            My Files
        <VMenu offset-y>
            <template v-slot:activator="{ props }">
                <VBtn
                    icon
                    v-bind="props"
                >
                    <VIcon icon="mdi-arrow-down"></VIcon>
                </VBtn>
            </template>

            <VList>
                <VListItem @click="openNewFolderModal()">
                    <VListItemTitle>
                        <VIcon icon="mdi-folder-plus"></VIcon>
                        New Folder
                    </VListItemTitle>
                </VListItem>
                <VListItem @click="uploadFolder">
                    <VListItemTitle>
                        <VIcon icon="mdi-folder-arrow-up"></VIcon>
                        Upload  Folder
                    </VListItemTitle>
                </VListItem>
                <VListItem @click="openDropZone">
                    <VListItemTitle>
                        <VIcon icon="mdi-image-plus"></VIcon>
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
            <VIcon icon="mdi-image-plus"></VIcon>
        </VBtn>
        <VBtn
            icon
            @click="openNewFolderModal()"
        >
            <VIcon icon="mdi-folder-plus"></VIcon>
        </VBtn>
        <VBtn icon>
            <VIcon icon="mdi-view-grid"></VIcon>
        </VBtn>
        <VBtn icon>
            <VIcon icon="mdi-view-list"></VIcon>
        </VBtn>

        <VBtn icon>
            <VIcon icon="mdi-filter-variant"></VIcon>
        </VBtn>
        <VBtn
            icon
            :class="{'active': fileInfoSideBar, 'file-deselet': true}"
            @click="toggleSidebar()"
        >
            <VIcon icon="mdi-information"></VIcon>
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
