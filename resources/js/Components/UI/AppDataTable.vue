<template>
    <div class="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <!-- Table -->
        <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th
                            v-if="selectable"
                            class="w-12 px-4 py-3"
                        >
                            <input
                                type="checkbox"
                                class="form-checkbox h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500/20"
                                :checked="allSelected"
                                :indeterminate="someSelected && !allSelected"
                                @change="toggleSelectAll"
                            />
                        </th>
                        <th
                            v-for="col in columns"
                            :key="col.key"
                            :class="[
                                'px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500',
                                col.sortable !== false ? 'cursor-pointer select-none hover:text-gray-700 transition-colors' : '',
                                col.class || '',
                            ]"
                            @click="col.sortable !== false ? sort(col.key) : null"
                        >
                            <div class="flex items-center gap-1.5">
                                {{ col.label }}
                                <template v-if="col.sortable !== false && sortKey === col.key">
                                    <ChevronUpIcon v-if="sortOrder === 'asc'" class="h-3.5 w-3.5 text-brand-600" />
                                    <ChevronDownIcon v-else class="h-3.5 w-3.5 text-brand-600" />
                                </template>
                            </div>
                        </th>
                        <th v-if="$slots.actions" class="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                    <!-- Loading state -->
                    <tr v-if="loading">
                        <td :colspan="totalColumns" class="px-4 py-12 text-center">
                            <div class="flex items-center justify-center gap-3 text-gray-400">
                                <svg class="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                                <span class="text-sm">Loading...</span>
                            </div>
                        </td>
                    </tr>

                    <!-- Empty state -->
                    <tr v-else-if="!items.length">
                        <td :colspan="totalColumns" class="px-4 py-12 text-center">
                            <slot name="empty">
                                <p class="text-sm text-gray-400">No data available</p>
                            </slot>
                        </td>
                    </tr>

                    <!-- Rows -->
                    <tr
                        v-else
                        v-for="(item, index) in items"
                        :key="item.id || index"
                        class="hover:bg-gray-50/50 transition-colors"
                    >
                        <td v-if="selectable" class="w-12 px-4 py-3">
                            <input
                                type="checkbox"
                                class="form-checkbox h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500/20"
                                :checked="isSelected(item)"
                                @change="toggleSelect(item)"
                            />
                        </td>
                        <td
                            v-for="col in columns"
                            :key="col.key"
                            class="whitespace-nowrap px-4 py-3 text-sm text-gray-700"
                        >
                            <slot :name="`cell-${col.key}`" :item="item" :value="item[col.key]">
                                {{ item[col.key] }}
                            </slot>
                        </td>
                        <td v-if="$slots.actions" class="whitespace-nowrap px-4 py-3 text-right text-sm">
                            <slot name="actions" :item="item" />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3">
            <p class="text-sm text-gray-500">
                Showing <span class="font-medium">{{ fromItem }}</span> to <span class="font-medium">{{ toItem }}</span> of <span class="font-medium">{{ totalItems }}</span>
            </p>
            <nav class="flex items-center gap-1">
                <button
                    type="button"
                    class="rounded-lg px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    :disabled="currentPage <= 1"
                    @click="$emit('page-change', currentPage - 1)"
                >
                    Previous
                </button>
                <button
                    type="button"
                    class="rounded-lg px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    :disabled="currentPage >= totalPages"
                    @click="$emit('page-change', currentPage + 1)"
                >
                    Next
                </button>
            </nav>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/vue/24/outline';

export interface TableColumn {
    key: string;
    label: string;
    sortable?: boolean;
    class?: string;
}

export interface TableItem {
    id: string | number;
    [key: string]: unknown;
}

interface Props {
    columns: TableColumn[];
    items?: TableItem[];
    loading?: boolean;
    selectable?: boolean;
    selected?: TableItem[];
    sortKey?: string;
    sortOrder?: 'asc' | 'desc';
    currentPage?: number;
    perPage?: number;
    totalItems?: number;
}

const props = withDefaults(defineProps<Props>(), {
    items: () => [],
    loading: false,
    selectable: false,
    selected: () => [],
    sortKey: '',
    sortOrder: 'asc',
    currentPage: 1,
    perPage: 15,
    totalItems: 0,
});

const emit = defineEmits<{
    sort: [payload: { key: string; order: 'asc' | 'desc' }];
    'page-change': [page: number];
    'update:selected': [items: TableItem[]];
}>();

const totalPages = computed((): number => Math.ceil(props.totalItems / props.perPage) || 1);
const fromItem = computed((): number => (props.currentPage - 1) * props.perPage + 1);
const toItem = computed((): number => Math.min(props.currentPage * props.perPage, props.totalItems));
const totalColumns = computed((): number => props.columns.length + (props.selectable ? 1 : 0) + 1);

const allSelected = computed((): boolean => props.items.length > 0 && props.selected.length === props.items.length);
const someSelected = computed((): boolean => props.selected.length > 0);

function sort(key: string): void {
    const order: 'asc' | 'desc' = props.sortKey === key && props.sortOrder === 'asc' ? 'desc' : 'asc';
    emit('sort', { key, order });
}

function isSelected(item: TableItem): boolean {
    return props.selected.some((s) => s.id === item.id);
}

function toggleSelect(item: TableItem): void {
    const newSelected = isSelected(item)
        ? props.selected.filter((s) => s.id !== item.id)
        : [...props.selected, item];
    emit('update:selected', newSelected);
}

function toggleSelectAll(): void {
    emit('update:selected', allSelected.value ? [] : [...props.items]);
}
</script>
