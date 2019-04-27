<template>
    <VLayout row>
        <VFlex
            xs12
            md4
        >
            <VCard flat>
                <VToolbar
                    flat
                    color="secondary"
                >
                    <VToolbarTitle>Roles</VToolbarTitle>

                    <VSpacer />

                    <VBtn icon>
                        <VIcon>search</VIcon>
                    </VBtn>
                </VToolbar>
                <RoleForm
                    v-if="hasPermission('role.create')"
                    :half-form="false"
                />

                <VList
                    v-for="role in roles"
                    :key="role.id"
                    two-line
                    subheader
                >
                    <Role :role="role" />
                </VList>
            </VCard>
        </VFlex>
        <!-- <VFlex
            xs12
        >
            <RouterView />
        </VFlex> -->
    </VLayout>
</template>

<script>
import { mapState } from 'vuex'
import RoleForm from './RoleForm.vue'
import Role from './Role.vue'

export default {
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.hasPermission('role.view')
        })
    },
    components: {
        RoleForm,
        Role
    },
    data () {
        return {
            status: true
        }
    },
    computed: {
        ...mapState('Users', ['roles'])
    },
    created () {
        this.$store.dispatch('Users/getRole')
    },
    methods: {
    }
}
</script>

<style lang="css">
.role-action {
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
}
</style>
