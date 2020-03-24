<template>
    <VList
        dense
        class="la-side-menu"
    >
        <template v-for="(item, i) in items">
            <VRow
                v-if="item.heading"
                :key="i"
                no-gutters
            >
                <VCol cols="12">
                    <VSubheader v-if="item.heading">
                        {{ item.heading }}
                    </VSubheader>
                </VCol>

                <!-- <v-flex xs6 class="text-xs-center">
                    <a href="#!" class="body-2 black--text">EDIT</a>
                </v-flex> -->
            </VRow>
            <VDivider
                v-else-if="item.divider"
                :key="i"
                dark
                class="my-4"
            />
            <VListGroup
                v-else-if="item.children"
                :key="i"
                v-model="item.model"
                :prepend-icon="item.icon"
                no-action
            >
                <VListItem
                    slot="activator"
                    :to="{name:item.name }"
                    :disabled="item.disabled"
                >
                    <VListItemContent>
                        <VListItemTitle>
                            {{ item.text }}
                        </VListItemTitle>
                    </VListItemContent>
                </VListItem>

                <VListItem
                    v-for="(child, ci) in item.children"
                    :key="ci"
                    :to="{name:child.name }"
                    :disabled="item.disabled"
                >
                    <VListItemAction v-if="child.icon">
                        <VIcon>{{ child.icon }}</VIcon>
                    </VListItemAction>

                    <VListItemContent>
                        <VListItemTitle>
                            {{ child.text }}
                        </VListItemTitle>
                    </VListItemContent>
                </VListItem>
            </VListGroup>

            <VListItem
                v-else
                :key="i"
                :to="{name:item.name }"
                :disabled="item.disabled"
            >
                <VListItemAction>
                    <VIcon>{{ item.icon }}</VIcon>
                </VListItemAction>

                <VListItemContent>
                    <VListItemTitle>
                        {{ item.text }}
                    </VListItemTitle>
                </VListItemContent>
            </VListItem>
        </template>
    </VList>
</template>

<script>
export default {
    data () {
        return {
            items: [
                { icon: 'dashboard', text: 'Dashboard', name: 'dashboard', disabled: false, permission: true },
                { divider: true },
                { heading: 'Users', permission: true },
                { icon: 'people', text: 'Users', name: 'users', disabled: false },
                { icon: 'fingerprint', text: 'Roles', name: 'users-role', disabled: false, permission: this.hasPermission('role.view') },
                { divider: true },
                { heading: 'My Drive' },
                { icon: 'perm_media', text: 'My Files', name: 'media', disabled: false },
                { icon: 'people', text: 'Shared with me', name: 'shared', disabled: false },
                // { icon: 'watch_later', text: 'Recent', name: 'recent', disabled: true },
                { icon: 'star', text: 'Starred', name: 'starred', disabled: false },
                { icon: 'delete_forever', text: 'Trash', name: 'trash', disabled: false },
                { divider: true },
                { heading: 'Admin Settings' }
                // { icon: 'settings', text: 'Settings', name: 'settings', disabled: true }
            ].filter(i => typeof i.permission === 'undefined' || i.permission)
        };
    },
    computed: {

    },
    methods: {

    }
};
</script>
