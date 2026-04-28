<template>
    <span
        :class="[
            'inline-flex items-center gap-1.5 rounded-full text-xs font-medium',
            sizeClass,
            colorClass,
        ]"
    >
        <slot />
        <button
            v-if="closable"
            type="button"
            class="shrink-0 rounded-full p-0.5 hover:bg-black/10 transition-colors"
            @click="$emit('close')"
        >
            <XMarkIcon class="h-3 w-3" />
        </button>
    </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { XMarkIcon } from '@heroicons/vue/24/outline';

type ChipColor = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
type ChipSize = 'sm' | 'md' | 'lg';

interface Props {
    color?: ChipColor;
    size?: ChipSize;
    closable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    color: 'default',
    size: 'md',
    closable: false,
});

defineEmits<{
    close: [];
}>();

const sizeClass = computed((): string => {
    const map: Record<ChipSize, string> = {
        sm: 'px-2 py-0.5 text-[11px]',
        md: 'px-2.5 py-1 text-xs',
        lg: 'px-3 py-1.5 text-sm',
    };
    return map[props.size] || 'px-2.5 py-1 text-xs';
});

const colorClass = computed((): string => {
    const map: Record<ChipColor, string> = {
        default: 'bg-gray-100 text-gray-700 ring-1 ring-inset ring-gray-200',
        primary: 'bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-200',
        success: 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200',
        warning: 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200',
        error:   'bg-red-50 text-red-700 ring-1 ring-inset ring-red-200',
        info:    'bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-200',
    };
    return map[props.color] || 'bg-gray-100 text-gray-700 ring-1 ring-inset ring-gray-200';
});
</script>
