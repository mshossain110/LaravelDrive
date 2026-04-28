<template>
    <Combobox :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)" :multiple="multiple">
        <div class="relative">
            <ComboboxLabel v-if="label" class="block text-sm font-medium text-gray-700 mb-1.5">
                {{ label }}
            </ComboboxLabel>

            <div class="relative">
                <!-- Multiple selection chips -->
                <div
                    v-if="multiple && Array.isArray(modelValue) && modelValue.length"
                    class="flex flex-wrap gap-1.5 mb-2"
                >
                    <span
                        v-for="item in modelValue"
                        :key="typeof item === 'object' ? item[itemValue] : item"
                        class="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700 ring-1 ring-inset ring-brand-200"
                    >
                        {{ typeof item === 'object' ? item[itemText] : item }}
                        <button
                            type="button"
                            class="rounded-full p-0.5 hover:bg-brand-200 transition-colors"
                            @click.prevent="removeItem(item)"
                        >
                            <XMarkIcon class="h-3 w-3" />
                        </button>
                    </span>
                </div>

                <ComboboxInput
                    :class="[
                        'w-full rounded-xl border border-gray-300 bg-white py-2.5 pl-4 pr-10 text-sm shadow-sm transition-colors',
                        'hover:border-gray-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20',
                    ]"
                    :display-value="(val) => (typeof val === 'object' ? val?.[itemText] : val) || ''"
                    :placeholder="placeholder"
                    @change="query = $event.target.value"
                />
                <ComboboxButton class="absolute inset-y-0 right-0 flex items-center pr-3">
                    <ChevronUpDownIcon class="h-5 w-5 text-gray-400" />
                </ComboboxButton>
            </div>

            <transition
                leave-active-class="transition duration-100 ease-in"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
            >
                <ComboboxOptions
                    class="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-xl bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none text-sm"
                >
                    <div v-if="filteredOptions.length === 0" class="px-4 py-3 text-sm text-gray-500">
                        No results found.
                    </div>

                    <ComboboxOption
                        v-for="option in filteredOptions"
                        :key="optionValue(option)"
                        v-slot="{ active, selected }"
                        :value="option"
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
                    </ComboboxOption>
                </ComboboxOptions>
            </transition>
        </div>
    </Combobox>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import {
    Combobox,
    ComboboxButton,
    ComboboxInput,
    ComboboxLabel,
    ComboboxOption,
    ComboboxOptions,
} from '@headlessui/vue';
import { CheckIcon, ChevronUpDownIcon, XMarkIcon } from '@heroicons/vue/24/outline';

type OptionValue = string | number | Record<string, any>;

interface Props {
    modelValue?: OptionValue | OptionValue[] | null;
    options?: OptionValue[];
    label?: string;
    placeholder?: string;
    multiple?: boolean;
    itemText?: string;
    itemValue?: string;
}

const props = withDefaults(defineProps<Props>(), {
    modelValue: null,
    options: () => [],
    label: '',
    placeholder: 'Search...',
    multiple: false,
    itemText: 'label',
    itemValue: 'value',
});

const emit = defineEmits<{
    'update:modelValue': [value: OptionValue | OptionValue[]];
}>();

const query = ref('');

const optionValue = (option: OptionValue): string | number =>
    typeof option === 'object' ? (option as Record<string, any>)[props.itemValue] : option;

const optionLabel = (option: OptionValue): string =>
    typeof option === 'object' ? (option as Record<string, any>)[props.itemText] : String(option);

const filteredOptions = computed((): OptionValue[] => {
    if (!query.value) return props.options;
    const q = query.value.toLowerCase();
    return props.options.filter((o) => optionLabel(o).toLowerCase().includes(q));
});

function removeItem(item: OptionValue): void {
    if (!Array.isArray(props.modelValue)) return;
    const val = optionValue(item);
    emit('update:modelValue', props.modelValue.filter((i) => optionValue(i) !== val));
}
</script>
