<template>
    <Listbox :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)">
        <div class="relative">
            <ListboxLabel v-if="label" class="block text-sm font-medium text-gray-700 mb-1.5">
                {{ label }}
            </ListboxLabel>

            <ListboxButton
                class="relative w-full cursor-pointer rounded-xl border border-gray-300 bg-white py-2.5 pl-4 pr-10 text-left text-sm shadow-sm transition-colors hover:border-gray-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            >
                <span class="block truncate" :class="!modelValue ? 'text-gray-400' : 'text-gray-900'">
                    {{ displayValue || placeholder }}
                </span>
                <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <ChevronUpDownIcon class="h-5 w-5 text-gray-400" />
                </span>
            </ListboxButton>

            <transition
                leave-active-class="transition duration-100 ease-in"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
            >
                <ListboxOptions
                    class="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-xl bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none text-sm"
                >
                    <ListboxOption
                        v-for="option in options"
                        :key="optionValue(option)"
                        v-slot="{ active, selected }"
                        :value="optionValue(option)"
                        as="template"
                    >
                        <li
                            :class="[
                                'relative cursor-pointer select-none py-2.5 pl-10 pr-4 transition-colors',
                                active ? 'bg-brand-50 text-brand-700' : 'text-gray-900',
                            ]"
                        >
                            <span :class="['block truncate', selected ? 'font-semibold' : 'font-normal']">
                                {{ optionLabel(option) }}
                            </span>
                            <span
                                v-if="selected"
                                class="absolute inset-y-0 left-0 flex items-center pl-3 text-brand-600"
                            >
                                <CheckIcon class="h-5 w-5" />
                            </span>
                        </li>
                    </ListboxOption>
                </ListboxOptions>
            </transition>
        </div>
    </Listbox>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import {
    Listbox,
    ListboxButton,
    ListboxLabel,
    ListboxOption,
    ListboxOptions,
} from '@headlessui/vue';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/24/outline';

type OptionValue = string | number | Record<string, unknown>;

interface Props {
    modelValue?: OptionValue | null;
    options?: OptionValue[];
    label?: string;
    placeholder?: string;
    itemText?: string;
    itemValue?: string;
}

const props = withDefaults(defineProps<Props>(), {
    modelValue: null,
    options: () => [],
    label: '',
    placeholder: 'Select an option',
    itemText: 'label',
    itemValue: 'value',
});

defineEmits<{
    'update:modelValue': [value: OptionValue];
}>();

const optionValue = (option: OptionValue): string | number => {
    return typeof option === 'object' ? (option as Record<string, any>)[props.itemValue] : option;
};

const optionLabel = (option: OptionValue): string => {
    return typeof option === 'object' ? (option as Record<string, any>)[props.itemText] : String(option);
};

const displayValue = computed((): string => {
    if (props.modelValue === null || props.modelValue === undefined) return '';
    const found = props.options.find((o) => optionValue(o) === props.modelValue);
    return found ? optionLabel(found) : String(props.modelValue);
});
</script>
