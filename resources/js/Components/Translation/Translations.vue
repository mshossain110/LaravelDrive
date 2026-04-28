<template>
    <div class="overflow-hidden rounded-xl bg-white shadow-sm">
        <!-- Toolbar -->
        <div class="flex flex-wrap items-center gap-2 bg-brand-600 px-4 py-3 text-white">
            <h2 class="text-sm font-semibold">Translation</h2>
            <div class="flex-1" />

            <!-- Group filter -->
            <select
                v-model="groupFilter"
                class="rounded-lg border-0 bg-white/20 px-3 py-1.5 text-sm text-white placeholder-white/70 focus:ring-2 focus:ring-white/50"
            >
                <option value="" class="text-gray-900">All Groups</option>
                <option v-for="g in groups" :key="g" :value="g" class="text-gray-900">{{ g }}</option>
            </select>

            <!-- Search -->
            <input
                v-if="searchForm"
                v-model="textFilter"
                type="text"
                placeholder="Search..."
                class="rounded-lg border-0 bg-white/20 px-3 py-1.5 text-sm text-white placeholder-white/70 focus:ring-2 focus:ring-white/50"
                style="max-width: 150px;"
            />

            <button class="rounded-full p-1.5 hover:bg-white/20" @click="searchForm = !searchForm">
                <MagnifyingGlassIcon class="h-4 w-4" />
            </button>
            <button class="rounded-full p-1.5 hover:bg-white/20" @click="newtranslation = !newtranslation">
                <PencilIcon class="h-4 w-4" />
            </button>

            <!-- Display fields menu -->
            <div class="relative">
                <button class="rounded-full p-1.5 hover:bg-white/20" @click="showFieldMenu = !showFieldMenu">
                    <EllipsisVerticalIcon class="h-4 w-4" />
                </button>
                <ul
                    v-if="showFieldMenu"
                    class="absolute right-0 z-10 mt-1 w-36 rounded-lg border border-gray-200 bg-white py-1 shadow-lg"
                >
                    <li
                        class="flex cursor-pointer items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        @click="toggleField('key')"
                    >
                        <input type="checkbox" :checked="activeKey" class="rounded border-gray-300 text-brand-600 focus:ring-brand-500" readonly />
                        Key
                    </li>
                    <li
                        class="flex cursor-pointer items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        @click="toggleField('group')"
                    >
                        <input type="checkbox" :checked="activeGroup" class="rounded border-gray-300 text-brand-600 focus:ring-brand-500" readonly />
                        Group
                    </li>
                </ul>
            </div>
        </div>

        <!-- New Translation Form -->
        <Transition
            enter-active-class="transition-all duration-200 ease-out"
            enter-from-class="max-h-0 opacity-0"
            enter-to-class="max-h-screen opacity-100"
            leave-active-class="transition-all duration-150 ease-in"
            leave-from-class="max-h-screen opacity-100"
            leave-to-class="max-h-0 opacity-0"
        >
            <NewTranslation
                v-if="newtranslation"
                :locale="locale"
                @cancel="newtranslation = false"
            />
        </Transition>

        <!-- Loading skeleton -->
        <div v-if="loading" class="space-y-3 p-6">
            <div v-for="n in 8" :key="n" class="h-4 animate-pulse rounded bg-gray-200" :style="{ width: (60 + Math.random() * 30) + '%' }" />
        </div>

        <!-- Translations table -->
        <div v-else class="overflow-x-auto" style="max-height: 500px;">
            <table class="w-full text-left text-sm">
                <thead class="sticky top-0 border-b border-gray-200 bg-gray-50 text-xs uppercase text-gray-500">
                    <tr>
                        <th v-if="activeGroup" class="px-4 py-3">Group / Single</th>
                        <th v-if="activeKey" class="px-4 py-3">Key</th>
                        <th class="px-4 py-3">EN</th>
                        <th class="px-4 py-3 uppercase">{{ locale }}</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                    <tr
                        v-for="trans in filterTranslations"
                        :key="`${trans.group}-${trans.key}`"
                        class="hover:bg-gray-50"
                    >
                        <td v-if="activeGroup" class="whitespace-nowrap px-4 py-2 text-gray-600" style="width: 10%;">
                            {{ trans.group }}
                        </td>
                        <td v-if="activeKey" class="whitespace-nowrap px-4 py-2 text-gray-600" style="width: 10%;">
                            {{ trans.key }}
                        </td>
                        <td class="px-4 py-2 text-gray-700" style="width: 30%;">
                            {{ trans['en'] }}
                        </td>
                        <td class="px-4 py-2">
                            <TranslationInput
                                :language="locale"
                                :group="trans.group"
                                :translation-key="trans.key"
                                :translation="trans[locale] !== null ? trans[locale] : trans['en']"
                            />
                        </td>
                    </tr>
                    <tr v-if="!filterTranslations.length">
                        <td :colspan="2 + (activeGroup ? 1 : 0) + (activeKey ? 1 : 0)" class="px-4 py-12 text-center text-gray-500">
                            No translations found.
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { MagnifyingGlassIcon, PencilIcon, EllipsisVerticalIcon } from '@heroicons/vue/24/outline';
import TranslationInput from './TranslationInput';
import NewTranslation from './NewTranslation';

export default {
    components: {
        TranslationInput,
        NewTranslation,
        MagnifyingGlassIcon,
        PencilIcon,
        EllipsisVerticalIcon
    },
    props: {
        locale: { type: String, default: 'es' }
    },
    data: () => ({
        loading: false,
        displayField: [],
        newtranslation: false,
        searchForm: false,
        groupFilter: '',
        textFilter: '',
        showFieldMenu: false
    }),
    computed: {
        ...mapState('Translation', ['translations', 'groups']),
        activeGroup () {
            return this.displayField.includes('group');
        },
        activeKey () {
            return this.displayField.includes('key');
        },
        filterTranslations () {
            return this.translations.filter(t => {
                if (this.groupFilter) return t.group === this.groupFilter;
                if (this.textFilter) {
                    if (t[this.locale]) return t[this.locale].indexOf(this.textFilter) !== -1;
                    if (t.en) return t.en.indexOf(this.textFilter) !== -1;
                }
                return true;
            });
        }
    },
    watch: {
        locale () { this.getTranslations(); }
    },
    created () {
        this.getTranslations();
    },
    methods: {
        toggleField (field) {
            const idx = this.displayField.indexOf(field);
            if (idx === -1) this.displayField.push(field);
            else this.displayField.splice(idx, 1);
        },
        getTranslations () {
            if (this.loading) return;
            this.loading = true;
            this.$store.dispatch('Translation/getTranslations', { language: this.locale })
                .then(() => { this.loading = false; });
        }
    }
};
</script>
