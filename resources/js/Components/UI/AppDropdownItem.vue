<template>
    <MenuItem v-slot="{ active }">
        <button
            type="button"
            :class="[
                'flex w-full items-center gap-3 px-4 py-2.5 text-sm transition-colors',
                active ? 'bg-brand-50 text-brand-700' : 'text-gray-700',
                disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
            ]"
            :disabled="disabled"
            @click="$emit('click')"
        >
            <slot />
        </button>
    </MenuItem>
</template>

<script setup lang="ts">
import { MenuItem } from '@headlessui/vue';

interface Props {
    disabled?: boolean;
}

withDefaults(defineProps<Props>(), {
    disabled: false,
});

defineEmits<{
    click: [];
}>();
</script>
