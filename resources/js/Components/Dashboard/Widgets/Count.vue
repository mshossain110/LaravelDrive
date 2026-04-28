<template>
    <div class="flex items-stretch rounded-xl bg-white shadow-sm ring-1 ring-gray-200 overflow-hidden">
        <div class="flex w-16 shrink-0 items-center justify-center bg-brand-50">
            <component :is="iconComponent" v-if="iconComponent" class="h-7 w-7 text-brand-600" />
        </div>
        <div class="flex-1 px-4 py-3">
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, type Component } from 'vue';
import {
    PhotoIcon,
    FolderOpenIcon,
    UsersIcon,
    CircleStackIcon,
} from '@heroicons/vue/24/outline';

interface Props {
    icon?: string;
}

const props = withDefaults(defineProps<Props>(), {
    icon: '',
});

const iconMap: Record<string, Component> = {
    perm_media: PhotoIcon,
    folder_open: FolderOpenIcon,
    people: UsersIcon,
    memory: CircleStackIcon,
};

const iconComponent = computed(() => iconMap[props.icon] ?? null);
</script>
