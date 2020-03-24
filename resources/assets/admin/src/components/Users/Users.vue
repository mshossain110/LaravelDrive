<template>
    <VRow
        class="d-block"
    >
        <VCol cols="12">
            <VToolbar
                flat
                light
                height="40px"
                class="ub-h"
                color="white"
            >
                <VToolbarTitle class="headline">
                    <VIcon>people</VIcon>
                    Users
                </VToolbarTitle>

                <VSpacer />

                <VBtn
                    v-if="hasPermission('user.create')"
                    icon
                    @click="openform = true"
                >
                    <VIcon>person_add</VIcon>
                </VBtn>

                <VBtn icon>
                    <VIcon>apps</VIcon>
                </VBtn>

                <VBtn icon>
                    <VIcon>refresh</VIcon>
                </VBtn>

                <VBtn icon>
                    <VIcon>more_vert</VIcon>
                </VBtn>
            </VToolbar>
        </VCol>

        <VCol cols="12">
            <UsersTable />
        </VCol>

        <VDialog
            v-if="hasPermission('user.create')"
            v-model="openform"
            max-width="500px"
        >
            <UserForm @close="openform = false" />
        </VDialog>
    </VRow>
</template>

<script>
import UsersTable from './UsersTable.vue';
import UserForm from './UserForm.vue';

export default {
    beforeRouteEnter (to, from, next) {
        var p = LD.hasPermission('user.view');
        next(p);
    },
    components: {
        UsersTable,
        UserForm
    },
    data () {
        return {
            openform: false
        };
    },
    computed: {
    },
    methods: {
    }
};
</script>

<style>
    .ub-h .v-toolbar__content {
        border-bottom: 1px solid #ddd;
    }
</style>
