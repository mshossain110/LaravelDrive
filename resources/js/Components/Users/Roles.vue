<template>
    <div class="mx-auto max-w-xl">
        <div class="overflow-hidden rounded-xl bg-white shadow-sm">
            <!-- Toolbar -->
            <div class="flex items-center justify-between border-b border-gray-200 px-6 py-3">
                <h1 class="text-lg font-semibold text-gray-800">Roles</h1>
                <button class="rounded-lg p-2 text-gray-600 hover:bg-gray-100">
                    <MagnifyingGlassIcon class="h-5 w-5" />
                </button>
            </div>

            <!-- Add Role Form -->
            <RoleForm
                v-if="hasPermission('role.create')"
                :half-form="false"
            />

            <!-- Roles List -->
            <div class="divide-y divide-gray-100">
                <Role
                    v-for="role in roles"
                    :key="role.id"
                    :role="role"
                />
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline';
import RoleForm from './RoleForm.vue';
import Role from './Role.vue';

export default {
    beforeRouteEnter (to, from, next) {
        const p = LD.hasPermission('role.view');
        next(p);
    },
    components: {
        MagnifyingGlassIcon,
        RoleForm,
        Role
    },
    data () {
        return {
            status: true
        };
    },
    computed: {
        ...mapState('Users', ['roles'])
    },
    created () {
        this.$store.dispatch('Users/getRole');
    },
    methods: {}
};
</script>
