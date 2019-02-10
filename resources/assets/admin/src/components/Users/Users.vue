<template>
    <VLayout
        row
        wrap
        class="d-block"
    >
        <VFlex xs12>
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
        </VFlex>

        <VFlex xs12>
            <UsersTable />
        </VFlex>

        <VDialog
            v-model="openform"
            max-width="500px"
        >
            <UserForm @close="openform = false" />
        </VDialog>
    </VLayout>
</template>

<script>
import UsersTable from './UsersTable.vue'
import UserForm from './UserForm.vue'

export default {
    components: {
        UsersTable,
        UserForm
    },
    data () {
        return {
            openform: false
        }
    },
    computed: {
    },
    methods: {
    }
}
</script>

<style>
    .ub-h .v-toolbar__content {
        border-bottom: 1px solid #ddd;
    }
</style>
