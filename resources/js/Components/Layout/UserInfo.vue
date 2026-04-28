<template>
    <div class="border-t border-gray-200 p-3">
        <div class="relative">
            <!-- Trigger -->
            <button
                class="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left hover:bg-gray-100 transition-colors"
                @click="menu = !menu"
            >
                <span
                    class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-700"
                >
                    {{ initials }}
                </span>
                <span class="flex-1 truncate">
                    <span class="block text-sm font-medium text-gray-900 truncate">{{ fullname }}</span>
                    <span class="block text-xs text-gray-500 truncate">{{ currentUser?.email }}</span>
                </span>
                <ChevronUpIcon class="h-4 w-4 shrink-0 text-gray-400" />
            </button>

            <!-- Dropdown (pops upward) -->
            <Transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
            >
                <div
                    v-if="menu"
                    class="absolute bottom-full left-0 right-0 mb-2 rounded-xl bg-white shadow-lg ring-1 ring-gray-200 z-50"
                >
                    <!-- User card -->
                    <div class="flex items-center gap-3 p-4 border-b border-gray-100">
                        <span
                            class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-100 text-base font-bold text-brand-700"
                        >
                            {{ initials }}
                        </span>
                        <div class="min-w-0">
                            <p class="text-sm font-semibold text-gray-900 truncate">{{ fullname }}</p>
                            <p class="text-xs text-gray-500 truncate">{{ currentUser?.email }}</p>
                        </div>
                    </div>

                    <!-- Actions -->
                    <div class="p-1.5">
                        <button
                            class="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                            <Cog6ToothIcon class="h-4 w-4 text-gray-400" />
                            Settings
                        </button>
                        <button
                            class="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                            @click.prevent="logoutUser"
                        >
                            <ArrowRightOnRectangleIcon class="h-4 w-4" />
                            Log out
                        </button>
                    </div>
                </div>
            </Transition>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import {
    ChevronUpIcon,
    Cog6ToothIcon,
    ArrowRightOnRectangleIcon,
} from '@heroicons/vue/24/outline';
import axios from 'axios';

declare const LD: { user: { name?: string; firstname?: string; lastname?: string; email?: string } };

const menu = ref(false);

const currentUser = computed(() => LD.user);

const fullname = computed((): string => {
    const u = currentUser.value;
    if (u.firstname || u.lastname) {
        return `${u.firstname ?? ''} ${u.lastname ?? ''}`.trim();
    }
    return u.name ?? '';
});

const initials = computed((): string => {
    return fullname.value
        .split(' ')
        .map((w) => w[0])
        .slice(0, 2)
        .join('')
        .toUpperCase() || '?';
});

function logoutUser(): void {
    axios.post('/logout').then(() => {
        location.replace('/login');
    });
}

// Close menu if clicking outside
if (typeof document !== 'undefined') {
    document.addEventListener('click', (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (menu.value && !target.closest('.relative')) {
            menu.value = false;
        }
    });
}
</script>
