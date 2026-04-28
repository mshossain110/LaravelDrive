<template>
    <div>
        <!-- Toolbar -->
        <div class="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-3">
            <h1 class="flex items-center gap-2 text-lg font-semibold text-gray-800">
                <UsersIcon class="h-5 w-5" />
                Users
            </h1>
            <div class="flex items-center gap-1">
                <button
                    v-if="hasPermission('user.create')"
                    class="rounded-lg p-2 text-gray-600 hover:bg-gray-100"
                    @click="openform = true"
                >
                    <UserPlusIcon class="h-5 w-5" />
                </button>
                <button class="rounded-lg p-2 text-gray-600 hover:bg-gray-100">
                    <ArrowPathIcon class="h-5 w-5" />
                </button>
            </div>
        </div>

        <!-- Table -->
        <div class="p-4">
            <UsersTable />
        </div>

        <!-- Create User Modal -->
        <AppModal
            v-if="hasPermission('user.create')"
            :open="openform"
            title="New User"
            max-width="500px"
            @close="openform = false"
        >
            <UserForm @close="openform = false" />
        </AppModal>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { UsersIcon, UserPlusIcon, ArrowPathIcon } from '@heroicons/vue/24/outline';
import UsersTable from './UsersTable.vue';
import UserForm from './UserForm.vue';
import AppModal from '@/Components/UI/AppModal.vue';

const openform = ref(false);
</script>
