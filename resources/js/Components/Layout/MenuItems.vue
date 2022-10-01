<template>
    <VList
    >
        <template v-for="(item, i) in items">
            <FavoriteFolders
                v-if="item.favorit"
                :key="i"
            />
            <VListSubheader 
                v-else-if="item.heading"
                :key="'h-'+i"
            >
                {{ item.heading }}
            </VListSubheader>
            <VDivider
                v-else-if="item.divider"
                :key="'d-' + i"
                class="my-4"
            />
            <VListGroup
                v-else-if="item.children"
                :key="'g' + i"
                v-model="item.model"
                :prepend-icon="item.icon"
                no-action
            >
                
                <VListItem
                    :to="{name:item.name }"
                    :disabled="item.disabled"
                >
                    <VListItemTitle>
                        {{ item.text }}
                    </VListItemTitle>
                </VListItem>

                <VListItem
                    v-for="(child, ci) in item.children"
                    :key="ci"
                    :to="{name:child.name }"
                    :disabled="item.disabled"
                >
                    <template v-slot:prepend v-if="child.icon">
                        <VIcon :icon="child.icon" class="mr-4"></VIcon>
                    </template>

                    <VListItemTitle>
                        {{ child.text }}
                    </VListItemTitle>
                </VListItem>
            </VListGroup>

            <VListItem
                v-else
                :key="'i' + i"
                :to="{name:item.name }"
                :disabled="item.disabled"
            >
                <template v-slot:prepend v-if="item.icon">
                    <VIcon :icon="item.icon" class="mr-4"></VIcon>
                </template>

                <VListItemTitle>
                    {{ item.text }}
                </VListItemTitle>
            </VListItem>
        </template>
    </VList>
</template>

<script>
import FavoriteFolders from './FavoriteFolders.vue';
export default {
    components: {
        FavoriteFolders
    },
    data () {
        return {
            items: [
                { icon: 'dashboard', text: 'Dashboard', name: 'dashboard', disabled: false, permission: true },
                { divider: true },
                { heading: 'Users', permission: true },
                { icon: 'group', text: 'Users', name: 'users', disabled: false },
                // { icon: 'fingerprint', text: 'Roles', name: 'users-role', disabled: false, permission: this.hasPermission('role.view') },
                { divider: true },
                // { favorit: true },
                { heading: 'My Drive' },
                { icon: 'photo_library', text: 'My Files', name: 'media', disabled: false },
                { icon: 'co_present', text: 'Shared with me', name: 'shared', disabled: false },
                // { icon: 'watch_later', text: 'Recent', name: 'recent', disabled: true },
                { icon: 'auto_awesome', text: 'Starred', name: 'starred', disabled: false },
                { icon: 'delete', text: 'Trash', name: 'trash', disabled: false },
                // { divider: true },
                // { heading: 'Admin Settings' },
                // { icon: 'translate', text: 'Translation', name: 'translation', disabled: false }
                // { icon: 'settings', text: 'Settings', name: 'settings', disabled: true }
            ]
            //.filter(i => typeof i.permission === 'undefined' || i.permission)
        };
    },
};
</script>
