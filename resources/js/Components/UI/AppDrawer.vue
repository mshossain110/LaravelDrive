<template>
    <!-- Mobile overlay drawer -->
    <TransitionRoot :show="open" as="template">
        <Dialog as="div" class="relative z-40 lg:hidden" @close="$emit('close')">
            <TransitionChild
                as="template"
                enter="duration-300 ease-out"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="duration-200 ease-in"
                leave-from="opacity-100"
                leave-to="opacity-0"
            >
                <div class="fixed inset-0 bg-black/40 backdrop-blur-sm" />
            </TransitionChild>

            <div class="fixed inset-0 flex">
                <TransitionChild
                    as="template"
                    :enter="'duration-300 ease-out'"
                    :enter-from="side === 'left' ? '-translate-x-full' : 'translate-x-full'"
                    enter-to="translate-x-0"
                    :leave="'duration-200 ease-in'"
                    leave-from="translate-x-0"
                    :leave-to="side === 'left' ? '-translate-x-full' : 'translate-x-full'"
                >
                    <DialogPanel
                        :class="[
                            'relative flex w-full flex-col bg-white shadow-xl',
                            widthClass,
                            side === 'right' ? 'ml-auto' : '',
                        ]"
                    >
                        <slot />
                    </DialogPanel>
                </TransitionChild>
            </div>
        </Dialog>
    </TransitionRoot>

    <!-- Desktop persistent sidebar -->
    <aside
        :class="[
            'hidden lg:flex lg:flex-col lg:border-r lg:border-gray-200 lg:bg-white',
            widthClass,
            !open ? 'lg:hidden' : '',
        ]"
    >
        <slot />
    </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import {
    Dialog,
    DialogPanel,
    TransitionRoot,
    TransitionChild,
} from '@headlessui/vue';

interface Props {
    open?: boolean;
    side?: 'left' | 'right';
    width?: '56' | '64' | '72' | '80' | '96';
}

const props = withDefaults(defineProps<Props>(), {
    open: true,
    side: 'left',
    width: '72',
});

defineEmits<{
    close: [];
}>();

const widthClass = computed((): string => {
    const map: Record<string, string> = {
        '56': 'max-w-[14rem]',
        '64': 'max-w-[16rem]',
        '72': 'max-w-[18rem]',
        '80': 'max-w-[20rem]',
        '96': 'max-w-[24rem]',
    };
    return map[props.width] || 'max-w-[18rem]';
});
</script>
