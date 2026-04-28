<template>
    <div class="grid grid-cols-12 gap-6">
        <div class="col-span-12 md:col-span-3">
            <Languages v-model="locale" />
        </div>
        <div class="col-span-12 md:col-span-9">
            <Translations :locale="locale" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Languages from './Languages';
import Translations from './Translations';

const locale = ref('en');
</script>
