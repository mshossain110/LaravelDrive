<template>
    <v-app id="inspire" light>
        <v-navigation-drawer
            :clipped="$vuetify.breakpoint.lgAndUp"
            v-model="drawer"
            width="240"
            fixed
            app>
            <menu-items />
        </v-navigation-drawer>

        <v-toolbar
            :clipped-left="$vuetify.breakpoint.lgAndUp"
            color="white"
            flat
            light
            app
            fixed>

            <v-toolbar-title
                style="width: 240px"
                class="ml-0 pl-3">
                <v-toolbar-side-icon @click.stop="drawer = !drawer" />
                <span class="hidden-sm-and-down"><img src="./../../images/logo.png"  width="150px"/></span>
            </v-toolbar-title>

            <v-text-field
                flat
                solo
                box
                hide-details
                prepend-inner-icon="search"
                placeholder="Search"
                class="hidden-sm-and-down la-search"
            ></v-text-field>

            <v-spacer />

            <v-btn icon>
                <v-icon>apps</v-icon>
            </v-btn>

            <v-btn icon>
                <v-icon>notifications</v-icon>
            </v-btn>
            <user-info v-if="isAuthenticated" />

        </v-toolbar>

        <v-content>
            <v-container
                fluid
                fill-height>
                <v-layout >

                    <transition>
                        <keep-alive>
                            <router-view/>
                        </keep-alive>
                    </transition>
                    <template v-if="snackbar.show">
                        <v-snackbar
                            v-model="snackbar.show"
                            :color="snackbar.color"
                            :right="true"
                            :bottom="true"
                            :timeout="6000">
                            {{ snackbar.message }}
                            <v-btn
                                dark
                                flat
                                @click="hideSnackbar()">
                                Close
                            </v-btn>
                        </v-snackbar>
                    </template>

                    <template v-if="!isAuthenticated">
                        <v-dialog
                            :value="!isAuthenticated"
                            persistent
                            width="500"
                            >
                            <login />
                        </v-dialog>
                    </template>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
import { mapState } from 'vuex';
import MenuItems from './MenuItems.vue';
import Login from '@ac/auth/login.vue'
import UserInfo from './UserInfo.vue';

export default {
    components: {
        MenuItems,
        Login,
        UserInfo
    },
    props: {

    },
    data: () => (
        {
            dialog: false,
            drawer: null,
        }
    ),
    computed: {
        ...mapState(['snackbar', 'isAuthenticated']),
    },
    methods: {
        hideSnackbar() {
            this.$store.commit('setSnackbarHide');
        },

    },
};
</script>

<style>
.la-search.v-text-field--box.v-text-field--single-line input{
    margin-top: 0px;
}
</style>

