<template>
    <TransitionRoot :show="visible" as="template">
        <div class="fixed bottom-6 right-6 z-[60]">
            <TransitionChild
                as="template"
                enter="duration-300 ease-out"
                enter-from="opacity-0 translate-y-4"
                enter-to="opacity-100 translate-y-0"
                leave="duration-200 ease-in"
                leave-from="opacity-100 translate-y-0"
                leave-to="opacity-0 translate-y-4"
            >
                <div
                    :class="[
                        'flex items-center gap-3 rounded-xl px-5 py-3.5 shadow-lg min-w-[280px] max-w-md',
                        typeClasses,
                    ]"
                >
                    <component :is="icon" class="h-5 w-5 shrink-0" />
                    <p class="flex-1 text-sm font-medium">{{ message }}</p>
                    <button
                        type="button"
                        class="shrink-0 rounded-lg p-1 opacity-70 hover:opacity-100 transition-opacity"
                        @click="close"
                    >
                        <XMarkIcon class="h-4 w-4" />
                    </button>
                </div>
            </TransitionChild>
        </div>
    </TransitionRoot>
</template>

<script setup lang="ts">
import { ref, watch, computed, onBeforeUnmount, type Component } from 'vue';
import { TransitionRoot, TransitionChild } from '@headlessui/vue';
import {
    XMarkIcon,
    CheckCircleIcon,
    ExclamationCircleIcon,
    InformationCircleIcon,
} from '@heroicons/vue/24/outline';

type SnackbarType = 'success' | 'error' | 'info';

interface Props {
    message?: string;
    type?: SnackbarType;
    duration?: number;
    modelValue?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    message: '',
    type: 'info',
    duration: 4000,
    modelValue: false,
});

const emit = defineEmits<{
    'update:modelValue': [value: boolean];
}>();

const visible = ref(props.modelValue);
let timer: ReturnType<typeof setTimeout> | null = null;

watch(() => props.modelValue, (val: boolean) => {
    visible.value = val;
    if (val && props.duration > 0) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(close, props.duration);
    }
});

function close(): void {
    visible.value = false;
    emit('update:modelValue', false);
    if (timer) clearTimeout(timer);
}

onBeforeUnmount(() => {
    if (timer) clearTimeout(timer);
});

const icon = computed((): Component => {
    const map: Record<SnackbarType, Component> = {
        success: CheckCircleIcon,
        error: ExclamationCircleIcon,
        info: InformationCircleIcon,
    };
    return map[props.type] || InformationCircleIcon;
});

const typeClasses = computed((): string => {
    const map: Record<SnackbarType, string> = {
        success: 'bg-emerald-600 text-white',
        error: 'bg-red-600 text-white',
        info: 'bg-gray-800 text-white',
    };
    return map[props.type] || 'bg-gray-800 text-white';
});
</script>
