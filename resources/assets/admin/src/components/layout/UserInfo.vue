<template>
    <VMenu
        v-model="menu"
        :close-on-content-click="false"
        :nudge-width="300"
        nudge-top
        offset-y
    >
        <VAvatar
            slot="activator"
            size="32px"
        >
            <img
                src="https://cdn.vuetifyjs.com/images/john.jpg"
                alt="Vuetify"
            >
        </VAvatar>

        <VCard>
            <VLayout
                row
                class="pa-2"
            >
                <VFlex xs5>
                    <VAvatar size="100px">
                        <img
                            src="https://cdn.vuetifyjs.com/images/john.jpg"
                            alt="Vuetify"
                        >
                    </VAvatar>
                </VFlex>
                <VFlex
                    xs7
                    class="ml-2"
                >
                    <p>{{ fullname }} </p>
                    <p>{{ currentUser.email }} </p>
                </VFlex>
            </VLayout>
            <VDivider />
            <VLayout
                row
                class="mt-3"
            >
                <VFlex xs4>
                    <div>
                        <VBtn
                            depressed
                            small
                        >
                            Normal
                        </VBtn>
                    </div>
                </VFlex>
                <VFlex
                    xs4
                    class="ml-2"
                >
                    <div>
                        <VBtn
                            depressed
                            small
                        >
                            Normal
                        </VBtn>
                    </div>
                </VFlex>

                <VFlex
                    xs4
                    class="ml-2"
                >
                    <div>
                        <VBtn
                            depressed
                            small
                            color="error"
                            @click.prevent="logout()"
                        >
                            Log out
                        </VBtn>
                    </div>
                </VFlex>
            </VLayout>
        </VCard>
    </VMenu>
</template>

<script>
export default {
    data () {
        return {
            fav: true,
            menu: false,
            message: false,
            hints: true
        }
    },
    computed: {

    },
    methods: {
        logout () {
            this.$store.dispatch('authLogout')
                .then(() => {
                    location.replace('/')
                })
        }

    }
}
</script>

<style>

</style>
