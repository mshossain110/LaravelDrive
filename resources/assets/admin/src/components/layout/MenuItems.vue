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
                <VListTile
                    slot="activator"
                    :to="{name:item.name }"
                    :disabled="item.disabled"
                >
                    <VListTileContent>
                        <VListTileTitle>
                            {{ item.text }}
                        </VListTileTitle>
                    </VListTileContent>
                </VListTile>

                <VListTile
                    v-for="(child, i) in item.children"
                    :key="i"
                    :to="{name:child.name }"
                    :disabled="item.disabled"
                >
                    <VListTileAction v-if="child.icon">
                        <VIcon>{{ child.icon }}</VIcon>
                    </VListTileAction>

                    <VListTileContent>
                        <VListTileTitle>
                            {{ child.text }}
                        </VListTileTitle>
                    </VListTileContent>
                </VListTile>
            </VListGroup>

            <VListTile
                v-else
                :key="item.name"
                :to="{name:item.name }"
                :disabled="item.disabled"
            >
                <VListTileAction>
                    <VIcon>{{ item.icon }}</VIcon>
                </VListTileAction>

                <VListTileContent>
                    <VListTileTitle>
                        {{ item.text }}
                    </VListTileTitle>
                </VListTileContent>
            </VListTile>
        </template>
    </VList>
</template>

<script>
export default {
    data () {
        return {
            items: [
                { icon: 'dashboard', text: 'Dashboard', name: 'dashboard', disabled: false },
                { heading: 'Users' },
                { icon: 'people', text: 'Users', name: 'users', disabled: false },
                { icon: 'fingerprint', text: 'Roles', name: 'users-role', disabled: false },
                { heading: 'My Drive' },
                { icon: 'perm_media', text: 'My Files', name: 'media', disabled: false },
                { icon: 'people', text: 'Shared with me', name: 'shared', disabled: true },
                { icon: 'watch_later', text: 'Recent', name: 'recent', disabled: true },
                { icon: 'star', text: 'Starred', name: 'starred', disabled: false },
                { icon: 'delete_forever', text: 'Trash', name: 'trash', disabled: false },
                { heading: 'Admin Settings' },
                { icon: 'settings', text: 'Settings', name: 'settings', disabled: true }
            ]
        }
    },
    computed: {

    },
    methods: {

    }
}
</script>

<style>
    .la-side-menu .v-list__tile__action{
        min-width: 36px;
    }
    .la-side-menu a.v-list__tile  {
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

    .v-list--disabled a.v-list__tile--disabled {
        color: #aaaaaa !important;
        caret-color: #aaaaaa !important;
    }

</style>
