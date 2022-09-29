<template>
    <VRow>
        <VCol cols="3">
            <Languages v-model="locale" />
        </VCol>
        <VCol cols="9">
            <Translations :locale="locale" />
        </VCol>
    </VRow>
</template>

<script>
import Languages from './Languages';
import Translations from './Translations';
export default {
    components: {
        Languages,
        Translations
    },
    data: () => ({
        locale: 'en'
    })
};
</script>

<style>

</style>
