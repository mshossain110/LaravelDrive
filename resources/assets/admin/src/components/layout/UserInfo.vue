<template>
    <VMenu
        v-model="menu"
        :close-on-content-click="false"
        :nudge-width="300"
        nudge-top
        offset-y
    >
        <template v-slot:activator="{ on }">
            <VAvatar
                slot="activator"
                size="32px"
                v-on="on"
            >
                <img
                    src="https://i.pravatar.cc/60"
                    alt="Vuetify"
                >
            </VAvatar>
        </template>

        <VCard>
            <VCardText>
                <VRow>
                    <VCol cols="5">
                        <VAvatar size="100px">
                            <img
                                src="https://cdn.vuetifyjs.com/images/john.jpg"
                                alt="Vuetify"
                            >
                        </VAvatar>
                    </VCol>
                    <VCol
                        cals="7"
                    >
                        <p>{{ fullname }} </p>
                        <p>{{ currentUser.email }} </p>
                    </VCol>
                </VRow>
            </VCardText>
            <VCardActions class="bt-1">
                <VRow no-gutters>
                    <VCol>
                        <div>
                            <VBtn
                                depressed
                                small
                            >
                                Normal
                            </VBtn>
                        </div>
                    </VCol>
                    <VCol>
                        <div>
                            <VBtn
                                depressed
                                small
                            >
                                Normal
                            </VBtn>
                        </div>
                    </VCol>

                    <VCol>
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
                    </VCol>
                </VRow>
            </VCardActions>
        </VCard>
    </VMenu>
</template>

<script>

import auth from '@common/auth';

export default {
    mixins: [auth],
    data () {
        return {
            fav: true,
            menu: false,
            message: false,
            hints: true
        };
    },
    computed: {

    },
    created () {

    },
    methods: {
        logoutSelf () {
            this.logout();
        }

    }
};
</script>

<style>

</style>
