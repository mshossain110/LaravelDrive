<template>
    <VApp
        id="ld"
    >
        <VLayout>
            <VNavigationDrawer
                v-model="drawer"
            >
                <MenuItems />
            </VNavigationDrawer>

            <VAppBar
                color="header"
            >
                <template v-slot:prepend>
                    <VAppBarNavIcon @click.stop="drawer = !drawer"></VAppBarNavIcon>
                </template>


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

                <template v-slot:append>
                    <VBtn icon>
                        <VIcon
                            large
                            color="blue darken-2"
                            icon="mdi-message-text"
                            ></VIcon>
                    </VBtn>

                    <VBtn icon>
                        <VIcon icon="mdi-notifications"></VIcon>
                    </VBtn>
                </template>
                
            </VAppBar>

            <VMain>
                <VResponsive>
                    <VContainer>
                        <router-view></router-view>
                    </VContainer>
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
                                @click="hideSnackbar()"
                            >
                                Close
                            </VBtn>
                        </VSnackbar>
                    </template>
                </VResponsive>
            </VMain>
        </VLayout>

    </VApp>
</template>

<script>
import MenuItems from './MenuItems.vue'
export default {
    components: {
        MenuItems
    },
    props: {

    },
    data: () => (
        {
            dialog: false,
            drawer: null,
            isAuthenticated: false,
            snackbar: {
                show: false,
                color: '#f00',
                message: 'Hello',
            }
        }
    ),
};
</script>

<style>
.la-search.v-text-field--box.v-text-field--single-line input{
    margin-top: 0px;
}
</style>
