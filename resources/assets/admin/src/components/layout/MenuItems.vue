<template>
    <VList
        dense
        class="la-side-menu"
    >
        <template v-for="item in items">
            <VLayout
                v-if="item.heading"
                :key="item.heading"
                row
                align-center
            >
                <VFlex xs12>
                    <VSubheader v-if="item.heading">
                        {{ item.heading }}
                    </VSubheader>
                </VFlex>

                <!-- <v-flex xs6 class="text-xs-center">
                    <a href="#!" class="body-2 black--text">EDIT</a>
                </v-flex> -->
            </VLayout>

            <VListGroup
                v-else-if="item.children"
                :key="item.text"
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
                    v-for="(child, i) in item.children"
                    :key="i"
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
                :key="item.name"
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
                { heading: 'Users', permission: true },
                { icon: 'people', text: 'Users', name: 'users', disabled: false },
                { icon: 'fingerprint', text: 'Roles', name: 'users-role', disabled: false, permission: this.hasPermission('role.view') },
                { heading: 'My Drive' },
                { icon: 'perm_media', text: 'My Files', name: 'media', disabled: false },
                { icon: 'people', text: 'Shared with me', name: 'shared', disabled: false },
                { icon: 'watch_later', text: 'Recent', name: 'recent', disabled: true },
                { icon: 'star', text: 'Starred', name: 'starred', disabled: false },
                { icon: 'delete_forever', text: 'Trash', name: 'trash', disabled: false },
                { heading: 'Admin Settings' },
                { icon: 'settings', text: 'Settings', name: 'settings', disabled: true }
            ].filter(i => typeof i.permission === 'undefined' || i.permission)
        }
    },
    computed: {

    },
    methods: {

    }
}
</script>

<style>
    .la-side-menu .v-list__Item__action{
        min-width: 36px;
    }
    .la-side-menu a.v-list__Item  {
        text-decoration: none;
        font-size: 16px;
        font-weight: normal !important;
    }

    .la-side-menu a:hover {
        text-decoration: none
    }

    .la-side-menu .v-subheader {
        border-top: 1px solid #ddd;
    }

    .v-list--disabled a.v-list__Item--disabled {
        color: #aaaaaa !important;
        caret-color: #aaaaaa !important;
    }

</style>
