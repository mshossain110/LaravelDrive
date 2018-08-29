<template>
    <v-app id="inspire">
        <v-navigation-drawer
            :clipped="$vuetify.breakpoint.lgAndUp"
            v-model="drawer"
            fixed
            app
            >
      
            <menu-items />
        </v-navigation-drawer>
    
    
        <v-toolbar
            :clipped-left="$vuetify.breakpoint.lgAndUp"
            color="blue darken-3"
            height="40"
            dark
            app
            fixed
            >
        
            <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
                <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
                <span class="hidden-sm-and-down">Google Contacts</span>
            </v-toolbar-title>
        
            <v-spacer></v-spacer>
        
            <v-btn icon>
                <v-icon>apps</v-icon>
            </v-btn>
            
            <v-btn icon>
                <v-icon>notifications</v-icon>
            </v-btn>
            
            <v-btn icon large>
                <v-avatar size="20px" tile>
                    <img
                        src="https://cdn.vuetifyjs.com/images/logos/logo.svg"
                        alt="Vuetify"
                    >
                </v-avatar>
            </v-btn>
        </v-toolbar>
    
        <v-content>
            <v-container fluid fill-height>
                <v-layout >
                    <v-tooltip right>
                        <v-btn
                            slot="activator"
                            :href="source"
                            icon
                            large
                            target="_blank"
                            >
                            <v-icon large>code</v-icon>
                        </v-btn>
                        <span>Source</span>
                    </v-tooltip>
            
            
                    <v-tooltip right>
                        <v-btn slot="activator" icon large href="https://codepen.io/johnjleider/pen/EQOYVV" target="_blank">
                            <v-icon large>mdi-codepen</v-icon>
                        </v-btn>
                        <span>Codepen</span>
                    </v-tooltip>
            
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    import MenuItems from './MenuItems';
    
    export default {
        props: {
            source: String
        },
        data: () => (
            {
                dialog: false,
                drawer: null,
                
            }
        ),
        components: {
            MenuItems
        }
        
    }
</script>