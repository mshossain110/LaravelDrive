<template>
    <Menu as="div" class="relative inline-block text-left">
        <MenuButton as="template">
            <slot name="trigger" />
        </MenuButton>

        <transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
        >
            <MenuItems
                :class="[
                    'absolute z-50 mt-2 w-56 origin-top-right rounded-xl bg-white shadow-lg ring-1 ring-black/5 focus:outline-none overflow-hidden',
                    alignClass,
                ]"
            >
                <div class="py-1">
                    <slot name="content" />
                </div>
            </MenuItems>
        </transition>
    </Menu>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Menu, MenuButton, MenuItems } from '@headlessui/vue';

interface Props {
    align?: 'left' | 'right';
}

const props = withDefaults(defineProps<Props>(), {
    align: 'right',
});

const alignClass = computed((): string => {
    return props.align === 'left' ? 'left-0' : 'right-0';
});
</script>
