<template>
    <VListGroup
        prepend-icon="star"
        no-action
        class="favorite-folder"
    >
        <VListItem
            slot="activator"
        >
            <VListItemContent>
                <VListItemTitle>
                    Favorite Folder
                </VListItemTitle>
            </VListItemContent>
        </VListItem>

        <VListItem
            v-for="folder in favoriteFolders"
            :key="folder.id"
            :to="{name:'singleFolder', params: {folderId:folder.hash }}"
        >
            <VListItemAction>
                <VIcon>folder</VIcon>
            </VListItemAction>

            <VListItemContent>
                <VListItemTitle>
                    {{ folder.name }}
                </VListItemTitle>
            </VListItemContent>
        </VListItem>
    </VListGroup>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    data: () => ({

    }),
    computed: {
        ...mapGetters('Media', ['favoriteFolders'])
    }
};
</script>

<style scoped>

    .favorite-folder .v-list-group__header .v-list-item {
        padding-left: 0px !important;
    }
    .favorite-folder .v-list-group__items .v-list-item {
        padding-left: 15px !important;
    }

</style>
