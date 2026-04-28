<template>
    <div
        :class="[
            'inline-flex shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700 font-semibold overflow-hidden',
            sizeClass,
        ]"
    >
        <img
            v-if="src"
            :src="src"
            :alt="alt"
            class="h-full w-full object-cover"
        />
        <span v-else>{{ initials }}</span>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface Props {
    src?: string;
    alt?: string;
    name?: string;
    size?: AvatarSize;
}

const props = withDefaults(defineProps<Props>(), {
    src: '',
    alt: '',
    name: '',
    size: 'md',
});

const sizeClass = computed((): string => {
    const map: Record<AvatarSize, string> = {
        xs: 'h-6 w-6 text-[10px]',
        sm: 'h-8 w-8 text-xs',
        md: 'h-10 w-10 text-sm',
        lg: 'h-12 w-12 text-base',
        xl: 'h-16 w-16 text-lg',
    };
    return map[props.size] || 'h-10 w-10 text-sm';
});

const initials = computed((): string => {
    if (!props.name) return '?';
    return props.name
        .split(' ')
        .map((w) => w[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();
});
</script>
