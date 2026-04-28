<template>
    <nav class="space-y-1 px-3">
        <template v-for="(item, i) in items" :key="i">
            <!-- Favorite folders group -->
            <FavoriteFolders v-if="item.favorit" />

            <!-- Section heading -->
            <p
                v-else-if="item.heading"
                class="mt-5 mb-1 px-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400"
            >
                {{ item.heading }}
            </p>

            <!-- Divider -->
            <hr v-else-if="item.divider" class="my-3 border-gray-200" />

            <!-- Group with children -->
            <div v-else-if="item.children">
                <button
                    class="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                    @click="item.model = !item.model"
                >
                    <component :is="iconMap[item.icon]" v-if="iconMap[item.icon]" class="h-5 w-5 text-gray-400" />
                    <span class="flex-1 text-left">{{ item.text }}</span>
                    <ChevronDownIcon
                        :class="['h-4 w-4 text-gray-400 transition-transform', item.model ? 'rotate-180' : '']"
                    />
                </button>
                <div v-show="item.model" class="mt-1 ml-4 space-y-0.5">
                    <router-link
                        v-for="(child, ci) in item.children"
                        :key="ci"
                        :to="{ name: child.name }"
                        custom
                        v-slot="{ href, navigate, isActive }"
                    >
                        <a
                            :href="href"
                            :class="[
                                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                                isActive
                                    ? 'bg-brand-50 font-medium text-brand-700'
                                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
                            ]"
                            @click="navigate"
                        >
                            <component :is="iconMap[child.icon]" v-if="iconMap[child.icon]" class="h-5 w-5" />
                            <span>{{ child.text }}</span>
                        </a>
                    </router-link>
                </div>
            </div>

            <!-- Regular menu item -->
            <router-link
                v-else
                :to="{ name: item.name }"
                custom
                v-slot="{ href, navigate, isActive }"
            >
                <a
                    :href="href"
                    :class="[
                        'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                        item.disabled ? 'pointer-events-none opacity-40' : '',
                        isActive
                            ? 'bg-brand-50 font-medium text-brand-700'
                            : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900',
                    ]"
                    @click="navigate"
                >
                    <component :is="iconMap[item.icon]" v-if="iconMap[item.icon]" class="h-5 w-5 shrink-0" :class="isActive ? 'text-brand-600' : 'text-gray-400'" />
                    <span>{{ item.text }}</span>
                </a>
            </router-link>
        </template>
    </nav>
</template>

<script setup lang="ts">
import { reactive, type Component } from 'vue';
import {
    Squares2X2Icon,
    UsersIcon,
    PhotoIcon,
    UserGroupIcon,
    StarIcon,
    TrashIcon,
    ChevronDownIcon,
} from '@heroicons/vue/24/outline';
import FavoriteFolders from './FavoriteFolders.vue';

interface MenuItem {
    icon?: string;
    text?: string;
    name?: string;
    disabled?: boolean;
    permission?: boolean;
    divider?: boolean;
    heading?: string;
    favorit?: boolean;
    children?: MenuItem[];
    model?: boolean;
}

const iconMap: Record<string, Component> = {
    dashboard: Squares2X2Icon,
    group: UsersIcon,
    photo_library: PhotoIcon,
    co_present: UserGroupIcon,
    auto_awesome: StarIcon,
    delete: TrashIcon,
    star: StarIcon,
};

const items = reactive<MenuItem[]>([
    { icon: 'dashboard', text: 'Dashboard', name: 'dashboard', disabled: false, permission: true },
    { divider: true },
    { heading: 'Users', permission: true },
    { icon: 'group', text: 'Users', name: 'users', disabled: false },
    { divider: true },
    { heading: 'My Drive' },
    { icon: 'photo_library', text: 'My Files', name: 'media', disabled: false },
    { icon: 'co_present', text: 'Shared with me', name: 'shared', disabled: false },
    { icon: 'auto_awesome', text: 'Starred', name: 'starred', disabled: false },
    { icon: 'delete', text: 'Trash', name: 'trash', disabled: false },
]);
</script>
