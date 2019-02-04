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
                { icon: 'dashboard', text: 'Dashboard', name: 'dashboard' },
                { heading: 'Users' },
                { icon: 'people', text: 'Users', name: 'users' },
                { icon: 'fingerprint', text: 'Roles', name: 'users-role' },
                { heading: 'My Drive' },
                { icon: 'perm_media', text: 'My Files', name: 'media' },
                { icon: 'people', text: 'Shared with me', name: 'shared' },
                { icon: 'watch_later', text: 'Recent', name: 'recent' },
                { icon: 'star', text: 'Starred', name: 'starred' },
                { icon: 'delete_forever', text: 'Trash', name: 'trash' },
                { heading: 'Admin Settings' },
                { icon: 'settings', text: 'Settings', name: 'settings' }
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

</style>
