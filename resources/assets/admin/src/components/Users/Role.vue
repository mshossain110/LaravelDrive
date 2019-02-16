<template>
    <div>
        <VListTile
            :to="{name: 'role-permissions', params: { id: role.id }}"
            avatar
            ripple
        >
            <VListTileContent>
                <VListTileTitle>{{ role.name }}</VListTileTitle>
                <VListTileSubTitle>
                    {{ role.description }}
                </VListTileSubTitle>
            </VListTileContent>
            <VListTileAction class="role-action">
                <VIcon
                    small
                    class="mr-2"
                    @click="roleEdit = !roleEdit"
                >
                    edit
                </VIcon>
                <VIcon
                    small
                    @click="deleteRole(role.id)"
                >
                    delete
                </VIcon>
            </VListTileAction>
        </VListTile>
        <RoleForm
            v-if="roleEdit"
            :role="role"
            @close="roleEdit = false"
        />
    </div>
</template>

<script>
import RoleForm from './RoleForm.vue'

export default {
    components: {
        RoleForm
    },
    props: {
        role: {
            type: Object,
            required: true
        }
    },
    data () {
        return {
            roleEdit: false
        }
    },
    computed: {

    },
    methods: {
        deleteRole (id) {
            this.$store.dispatch('Users/deleteRole', id)
        }
    }
}
</script>
