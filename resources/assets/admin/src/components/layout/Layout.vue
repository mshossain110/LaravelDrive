<template>
    <VApp
        id="inspire"
        light
    >
        <VNavigationDrawer
            v-model="drawer"
            :clipped="$vuetify.breakpoint.lgAndUp"
            width="240"
            fixed
            app
        >
            <MenuItems />
        </VNavigationDrawer>

        <VAppBar
            :clipped-left="$vuetify.breakpoint.lgAndUp"
            color="white"
            flat
            light
            app
            fixed
        >
            <VToolbarTitle
                style="width: 240px"
                class="ml-0 pl-3"
            >
                <VAppBarNavIcon @click.stop="drawer = !drawer" />
                <span class="hidden-sm-and-down">
                    <img
                        src="./../../images/logo.png"
                        width="150px"
                    >
                </span>
            </VToolbarTitle>

            <VTextField
                flat
                solo
                filled
                hide-details
                prepend-inner-icon="search"
                placeholder="Search"
                class="hidden-sm-and-down la-search"
            />

            <VSpacer />

            <VBtn icon>
                <VIcon>apps</VIcon>
            </VBtn>

            <VBtn icon>
                <VIcon>notifications</VIcon>
            </VBtn>
            <UserInfo v-if="isAuthenticated" />
        </VAppBar>

        <VContent>
            <VContainer
                fluid
            >
                <VRow>
                    <VCol
                        class="shrink"
                        cols="12"
                    >
                        <Transition>
                            <KeepAlive>
                                <RouterView />
                            </KeepAlive>
                        </Transition>
                        <template v-if="snackbar.show">
                            <VSnackbar
                                v-model="snackbar.show"
                                :color="snackbar.color"
                                :right="true"
                                :bottom="true"
                                :timeout="6000"
                            >
                                {{ snackbar.message }}
                                <VBtn
                                    dark
                                    flat
                                    @click="hideSnackbar()"
                                >
                                    Close
                                </VBtn>
                            </VSnackbar>
                        </template>

                        <template v-if="!isAuthenticated">
                            <VDialog
                                :value="!isAuthenticated"
                                persistent
                                width="500"
                            >
                                <Login />
                            </VDialog>
                        </template>
                    </VCol>
                </VRow>
            </VContainer>
        </VContent>
    </VApp>
</template>

<script>
import { mapState } from 'vuex'
import MenuItems from './MenuItems.vue'
import Login from '@auth/components/Login.vue'
import UserInfo from './UserInfo.vue'

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
            drawer: null
        }
    ),
    computed: {
        ...mapState(['snackbar', 'isAuthenticated'])
    },
    methods: {
        hideSnackbar () {
            this.$store.commit('setSnackbarHide')
        }

    }
}
</script>

<style>
.la-search.v-text-field--box.v-text-field--single-line input{
    margin-top: 0px;
}
</style>
