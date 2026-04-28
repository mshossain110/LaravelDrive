<template>
    <div>
        <h1 class="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p class="mt-1 text-sm text-gray-500">Overview of your drive storage</p>

        <div class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <WidgetCount icon="perm_media">
                <span class="block text-xs font-medium uppercase tracking-wide text-gray-500">Total Files</span>
                <span class="block text-xl font-bold text-gray-900">3,796</span>
            </WidgetCount>

            <WidgetCount icon="folder_open">
                <span class="block text-xs font-medium uppercase tracking-wide text-gray-500">Total Folders</span>
                <span class="block text-xl font-bold text-gray-900">56</span>
            </WidgetCount>

            <WidgetCount icon="people">
                <span class="block text-xs font-medium uppercase tracking-wide text-gray-500">Total Users</span>
                <span class="block text-xl font-bold text-gray-900">23</span>
            </WidgetCount>

            <WidgetCount icon="memory">
                <span class="block text-xs font-medium uppercase tracking-wide text-gray-500">Total Space Used</span>
                <span class="block text-xl font-bold text-gray-900">650.3 MB</span>
            </WidgetCount>
        </div>
    </div>
</template>

<script setup lang="ts">
import WidgetCount from './Widgets/Count.vue';
</script>
