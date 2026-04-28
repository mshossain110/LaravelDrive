<template>
    <div>
        <router-link
            :to="{ name: 'role-permissions', params: { id: role.id } }"
            class="flex items-center justify-between px-6 py-3 hover:bg-gray-50 transition-colors"
        >
            <div class="min-w-0 flex-1">
                <div class="text-sm font-medium text-gray-900">{{ role.name }}</div>
                <div class="truncate text-xs text-gray-500">{{ role.description }}</div>
            </div>
            <div class="ml-4 flex items-center gap-2">
                <button
                    v-if="hasPermission('role.update')"
                    class="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                    @click.prevent="roleEdit = !roleEdit"
                >
                    <PencilIcon class="h-4 w-4" />
                </button>
                <button
                    v-if="hasPermission('role.delete')"
                    class="rounded p-1 text-gray-400 hover:bg-red-50 hover:text-red-600"
                    @click.prevent="deleteRole(role.id)"
                >
                    <TrashIcon class="h-4 w-4" />
                </button>
            </div>
        </router-link>
        <RoleForm
            v-if="roleEdit && hasPermission('role.update')"
            :role="role"
            @close="roleEdit = false"
        />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from 'vuex';
import { PencilIcon, TrashIcon } from '@heroicons/vue/24/outline';
import RoleForm from './RoleForm.vue';

const props = defineProps<{ role: { id: number; name: string; description: string } }>();

const store = useStore();
const roleEdit = ref(false);

function deleteRole(id: number) {
    store.dispatch('Users/deleteRole', id);
}
</script>
