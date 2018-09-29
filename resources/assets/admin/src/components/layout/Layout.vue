<template>
    <v-app id="inspire">
        <v-navigation-drawer
            :clipped="$vuetify.breakpoint.lgAndUp"
            v-model="drawer"
            fixed
            app>
            <menu-items />
        </v-navigation-drawer>

        <v-toolbar
            :clipped-left="$vuetify.breakpoint.lgAndUp"
            color="primary"
            height="40"
            dark
            app
            fixed>

            <v-toolbar-title
                style="width: 300px"
                class="ml-0 pl-3">
                <v-toolbar-side-icon @click.stop="drawer = !drawer" />
                <span class="hidden-sm-and-down">Google Contacts</span>
            </v-toolbar-title>

            <v-spacer />

            <v-btn icon>
                <v-icon>apps</v-icon>
            </v-btn>

            <v-btn icon>
                <v-icon>notifications</v-icon>
            </v-btn>

            <v-btn
                @click.prevent="logout"
                icon
                large>
                Sign Out
            </v-btn>
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
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
import { mapState } from 'vuex';
import MenuItems from './MenuItems.vue';

export default {
    components: {
        MenuItems,
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
        ...mapState(['snackbar']),
    },
    methods: {
        hideSnackbar() {
            this.$store.commit('setSnackbarHide');
        },
        logout: function () {
            this.$store.dispatch('authLogout')
                .then(() => {
                    // this.$router.push('/')
                })
        }
    },
};
</script>
