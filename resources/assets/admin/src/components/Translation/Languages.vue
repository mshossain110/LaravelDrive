<template>
    <VCard>
        <VToolbar
            color="primary"
            dark
        >
            <VToolbarTitle>Langugaes</VToolbarTitle>

            <VSpacer />

            <VBtn
                icon
                small
                @click="newLanguage = !newLanguage"
            >
                <VIcon small>
                    mdi-pencil
                </VIcon>
            </VBtn>
        </VToolbar>
        <VExpandTransition>
            <NewLangulage
                v-if="newLanguage"
                @cancel="newLanguage = false"
            />
        </VExpandTransition>

        <VList>
            <VListItemGroup v-model="locale">
                <VListItem
                    v-for="(lan, key) in languages"
                    :key="key"
                    :value="lan"
                >
                    <VListItemContent>
                        <VListItemTitle v-text="lan" />
                    </VListItemContent>
                </VListItem>
            </VListItemGroup>
        </VList>
    </VCard>
</template>

<script>
import { mapState } from 'vuex';
import NewLangulage from './NewLanguage';
export default {
    components: {
        NewLangulage
    },
    props: {
        value: {
            type: String,
            default: 'en'
        }
    },
    data: () => ({
        newLanguage: false,
        locale: ''
    }),
    computed: {
        ...mapState('Translation', ['languages'])
    },
    watch: {
        value (val) {
            if (this.locale !== val) {
                this.locale = val;
            }
        },
        locale (val) {
            if (this.value !== val) {
                this.$emit('input', val);
            }
        }
    },
    created () {
        this.getLanguages();
        this.locale = this.value;
    },
    methods: {
        getLanguages () {
            this.$store.dispatch('Translation/getLanguages');
        }
    }
};
</script>

<style>

</style>
