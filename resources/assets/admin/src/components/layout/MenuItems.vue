<template>
    <v-list dense class="la-side-menu">
        <template v-for="item in items">
            <v-layout
                v-if="item.heading"
                :key="item.heading"
                row
                align-center
                >
            
                <v-flex xs12>
                    <v-subheader v-if="item.heading">
                        {{ item.heading }}
                    </v-subheader>
                </v-flex>
        
                <!-- <v-flex xs6 class="text-xs-center">
                    <a href="#!" class="body-2 black--text">EDIT</a>
                </v-flex> -->
            </v-layout>
    
    
            <v-list-group
                v-else-if="item.children"
                v-model="item.model"
                :key="item.text"
                :prepend-icon="item.icon"
                no-action
                >
                <v-list-tile slot="activator" :to="{name:item.name }">
                    <v-list-tile-content>
                        <v-list-tile-title>
                            {{ item.text }}
                        </v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
    
                <v-list-tile
                    v-for="(child, i) in item.children"
                    :key="i"
                    :to="{name:child.name }"
                        >
        
                    <v-list-tile-action v-if="child.icon">
                        <v-icon>{{ child.icon }}</v-icon>
                    </v-list-tile-action>
                    
                    <v-list-tile-content>
                        <v-list-tile-title>
                            {{ child.text }}
                        </v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list-group>
    
    
            <v-list-tile v-else :key="item.name" :to="{name:item.name }">
                <v-list-tile-action>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-tile-action>
            
                <v-list-tile-content>
                    <v-list-tile-title>
                        {{ item.text }}
                    </v-list-tile-title>
                </v-list-tile-content>
    
            </v-list-tile>
        </template>
    </v-list>
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
                    { icon: 'perm_media', text: 'Files', name: 'media' },
                    { icon: 'people', text: 'Shared with me', name: 'shared' },
                    { icon: 'watch_later', text: 'Recent', name: 'recent' },
                    { icon: 'star', text: 'Starred', name: 'starred' },
                    { icon: 'delete_forever', text: 'Trash', name: 'trash' },
                    { heading: 'Admin Settings' },
                    { icon: 'settings', text: 'Settings', name:'settings' }
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