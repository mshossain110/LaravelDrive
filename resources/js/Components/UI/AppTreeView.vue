<template>
    <ul :class="depth === 0 ? 'space-y-0.5' : 'ml-5 space-y-0.5'">
        <li v-for="node in items" :key="node[itemKey]">
            <div
                :class="[
                    'flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors cursor-pointer',
                    isSelected(node)
                        ? 'bg-brand-50 text-brand-700 font-medium'
                        : 'text-gray-700 hover:bg-gray-100',
                ]"
                @click="select(node)"
            >
                <!-- Expand/collapse toggle -->
                <button
                    v-if="hasChildren(node)"
                    type="button"
                    class="shrink-0 rounded p-0.5 hover:bg-gray-200 transition-colors"
                    @click.stop="toggle(node)"
                >
                    <ChevronRightIcon
                        :class="[
                            'h-4 w-4 text-gray-400 transition-transform duration-200',
                            isOpen(node) ? 'rotate-90' : '',
                        ]"
                    />
                </button>
                <span v-else class="w-5" />

                <!-- Icon -->
                <slot name="icon" :node="node">
                    <FolderIcon v-if="hasChildren(node)" class="h-5 w-5 text-brand-400 shrink-0" />
                    <FolderIcon v-else class="h-5 w-5 text-gray-300 shrink-0" />
                </slot>

                <!-- Label -->
                <slot name="label" :node="node">
                    <span class="truncate">{{ node[itemText] }}</span>
                </slot>
            </div>

            <!-- Recursive children -->
            <transition
                enter-active-class="transition duration-200 ease-out"
                enter-from-class="opacity-0 -translate-y-1"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition duration-150 ease-in"
                leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 -translate-y-1"
            >
                <AppTreeView
                    v-if="hasChildren(node) && isOpen(node)"
                    :items="node[childrenKey]"
                    :item-key="itemKey"
                    :item-text="itemText"
                    :children-key="childrenKey"
                    :selected="selected"
                    :open-all="openAll"
                    :depth="depth + 1"
                    @select="$emit('select', $event)"
                />
            </transition>
        </li>
    </ul>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { ChevronRightIcon } from '@heroicons/vue/24/outline';
import { FolderIcon } from '@heroicons/vue/24/solid';

export interface TreeNode {
    [key: string]: any;
}

interface Props {
    items?: TreeNode[];
    itemKey?: string;
    itemText?: string;
    childrenKey?: string;
    selected?: string | number | null;
    openAll?: boolean;
    depth?: number;
}

const props = withDefaults(defineProps<Props>(), {
    items: () => [],
    itemKey: 'id',
    itemText: 'name',
    childrenKey: 'children',
    selected: null,
    openAll: false,
    depth: 0,
});

const emit = defineEmits<{
    select: [id: string | number];
}>();

const openNodes = ref<Set<string | number>>(new Set());

watch(
    () => props.openAll,
    (val: boolean) => {
        if (val) {
            const collectIds = (nodes: TreeNode[]): void => {
                nodes.forEach((n) => {
                    if (n[props.childrenKey]?.length) {
                        openNodes.value.add(n[props.itemKey]);
                        collectIds(n[props.childrenKey]);
                    }
                });
            };
            collectIds(props.items);
        }
    },
    { immediate: true }
);

function hasChildren(node: TreeNode): boolean {
    return node[props.childrenKey] && node[props.childrenKey].length > 0;
}

function isOpen(node: TreeNode): boolean {
    return openNodes.value.has(node[props.itemKey]);
}

function toggle(node: TreeNode): void {
    if (openNodes.value.has(node[props.itemKey])) {
        openNodes.value.delete(node[props.itemKey]);
    } else {
        openNodes.value.add(node[props.itemKey]);
    }
}

function isSelected(node: TreeNode): boolean {
    return props.selected === node[props.itemKey];
}

function select(node: TreeNode): void {
    emit('select', node[props.itemKey]);
}
</script>
