<template>
    <div class="overflow-hidden rounded-xl bg-white shadow-sm">
        <!-- Toolbar -->
        <div class="flex items-center justify-between bg-brand-600 px-4 py-3 text-white">
            <h2 class="text-sm font-semibold">Languages</h2>
            <button
                class="rounded-full p-1.5 hover:bg-white/20"
                @click="newLanguage = !newLanguage"
            >
                <PencilIcon class="h-4 w-4" />
            </button>
        </div>

        <!-- New Language Form -->
        <Transition
            enter-active-class="transition-all duration-200 ease-out"
            enter-from-class="max-h-0 opacity-0"
            enter-to-class="max-h-96 opacity-100"
            leave-active-class="transition-all duration-150 ease-in"
            leave-from-class="max-h-96 opacity-100"
            leave-to-class="max-h-0 opacity-0"
        >
            <NewLangulage
                v-if="newLanguage"
                @cancel="newLanguage = false"
            />
        </Transition>

        <!-- Language List -->
        <ul class="divide-y divide-gray-100">
            <li
                v-for="(lan, key) in languages"
                :key="key"
                class="cursor-pointer px-4 py-3 text-sm transition-colors hover:bg-gray-50"
                :class="{ 'bg-brand-50 font-medium text-brand-700': locale === lan }"
                @click="selectLocale(lan)"
            >
                {{ lan }}
            </li>
        </ul>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { PencilIcon } from '@heroicons/vue/24/outline';
import NewLangulage from './NewLanguage';

export default {
    components: { NewLangulage, PencilIcon },
    props: {
        modelValue: {
            type: String,
            default: 'en'
        }
    },
    emits: ['update:modelValue'],
    data: () => ({
        newLanguage: false,
        locale: ''
    }),
    computed: {
        ...mapState('Translation', ['languages'])
    },
    watch: {
        modelValue (val) {
            if (this.locale !== val) this.locale = val;
        },
        locale (val) {
            if (this.modelValue !== val) this.$emit('update:modelValue', val);
        }
    },
    created () {
        this.getLanguages();
        this.locale = this.modelValue;
    },
    methods: {
        selectLocale (lan) {
            this.locale = lan;
        },
        getLanguages () {
            this.$store.dispatch('Translation/getLanguages');
        }
    }
};
</script>
