<template>
    <VRow
        class="d-block"
    >
        <VCol cols="12">
            <VToolbar
                flat
                class="ub-h"
                color="secondary"
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
