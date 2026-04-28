<template>
    <div class="relative inline-flex" @mouseenter="show = true" @mouseleave="show = false">
        <slot />
        <transition
            enter-active-class="transition duration-150 ease-out"
            enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="transition duration-100 ease-in"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
        >
            <div
                v-if="show && text"
                :class="[
                    'pointer-events-none absolute z-50 whitespace-nowrap rounded-lg bg-gray-900 px-3 py-1.5 text-xs font-medium text-white shadow-lg',
                    positionClass,
                ]"
            >
                {{ text }}
                <div :class="['absolute h-2 w-2 rotate-45 bg-gray-900', arrowClass]" />
            </div>
        </transition>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

interface Props {
    text?: string;
    position?: TooltipPosition;
}

const props = withDefaults(defineProps<Props>(), {
    text: '',
    position: 'top',
});

const show = ref(false);

const positionClass = computed((): string => {
    const map: Record<TooltipPosition, string> = {
        top:    'bottom-full left-1/2 -translate-x-1/2 mb-2',
        bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
        left:   'right-full top-1/2 -translate-y-1/2 mr-2',
        right:  'left-full top-1/2 -translate-y-1/2 ml-2',
    };
    return map[props.position] || 'bottom-full left-1/2 -translate-x-1/2 mb-2';
});

const arrowClass = computed((): string => {
    const map: Record<TooltipPosition, string> = {
        top:    'top-full left-1/2 -translate-x-1/2 -mt-1',
        bottom: 'bottom-full left-1/2 -translate-x-1/2 -mb-1',
        left:   'left-full top-1/2 -translate-y-1/2 -ml-1',
        right:  'right-full top-1/2 -translate-y-1/2 -mr-1',
    };
    return map[props.position] || 'top-full left-1/2 -translate-x-1/2 -mt-1';
});
</script>
