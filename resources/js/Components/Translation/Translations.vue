<template>
    <VCard>
        <VToolbar
            color="primary"
        >
            <VToolbarTitle>Translation</VToolbarTitle>

            <VSpacer />
            <VSelect
                v-model="groupFilter"
                :items="groups"
                outlined
                dense
                style="max-width: 130px;"
                hide-details
                label="Group"
                required
            />
            <VTextField
                v-if="searchForm"
                v-model="textFilter"
                outlined
                hide-details
                dense
                style="max-width: 150px; margin: 0 5px;"
                append-icon="search"
                placeholder="Serach..."
            />
            <VBtn
                icon
                small
                @click="searchForm = !searchForm"
            >
                <VIcon small>
                    search
                </VIcon>
            </VBtn>
            <VBtn
                icon
                small
                @click="newtranslation = !newtranslation"
            >
                <VIcon small>
                    edit
                </VIcon>
            </VBtn>

            <VMenu
                bottom
                left
            >
                <template v-slot:activator="{ on }">
                    <VBtn
                        icon
                        small
                        v-on="on"
                    >
                        <VIcon small icon="more_vert">
                        </VIcon>
                    </VBtn>
                </template>

                <VList
                    dense
                >
                    <VListItemGroup
                        v-model="displayField"
                        multiple
                    >
                        <VListItem
                            :model-value="`key`"
                            active-class="deep-purple--text text--accent-4"
                        >
                            <VListItemContent>
                                <VListItemTitle v-text="`Key`" />
                            </VListItemContent>
                        </VListItem>
                        <VListItem
                            :model-value="`group`"
                            active-class="deep-purple--text text--accent-4"
                        >
                            <VListItemContent>
                                <VListItemTitle v-text="`Group`" />
                            </VListItemContent>
                        </VListItem>
                    </VListItemGroup>
                </VList>
            </VMenu>
        </VToolbar>
        <VExpandTransition>
            <NewTranslation
                v-if="newtranslation"
                :locale="locale"
                @cancel="newtranslation = false"
            />
        </VExpandTransition>
        <VSkeletonLoader
            v-if="loading"
            ref="skeleton"
            type="table-tbody"
            class="mx-auto"
        />
        <VSimpleTable
            v-if="!loading"
            fixed-header
            :height="500"
        >
            <thead>
                <tr>
                    <th
                        v-if="activeGroup"
                        class="text-left"
                    >
                        GROUP / SINGLE
                    </th>
                    <th
                        v-if="activeKey"
                        class="text-left"
                    >
                        KEY
                    </th>
                    <th class="text-left">
                        EN
                    </th>
                    <th class="text-left text-uppercase">
                        {{ locale }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <template v-for="trans in filterTranslations">
                    <tr :key="`${trans.group}-${trans.key}`">
                        <td
                            v-if="activeGroup"
                            width="10%"
                        >
                            {{ trans.group }}
                        </td>
                        <td
                            v-if="activeKey"
                            width="10%"
                        >
                            {{ trans.key }}
                        </td>
                        <td width="30%">
                            {{ trans['en'] }}
                        </td>
                        <td>
                            <TranslationInput
                                :language="locale"
                                :group="trans.group"
                                :translation-key="trans.key"
                                :translation=" trans[locale] !== null ? trans[locale] : trans['en']"
                            />
                        </td>
                    </tr>
                </template>
            </tbody>
        </VSimpleTable>
    </VCard>
</template>

<script>
import { mapState } from 'vuex';
import TranslationInput from './TranslationInput';
import NewTranslation from './NewTranslation';
export default {
    components: {
        TranslationInput,
        NewTranslation
    },
    props: {
        locale: {
            type: String,
            default: 'es'
        }
    },
    data: () => ({
        loading: false,
        displayField: [],
        newtranslation: false,
        searchForm: false,
        groupFilter: '',
        textFilter: ''
    }),
    computed: {
        ...mapState('Translation', ['translations', 'groups']),
        activeGroup () {
            return this.displayField.indexOf('group') !== -1;
        },
        activeKey () {
            return this.displayField.indexOf('key') !== -1;
        },
        filterTranslations () {
            return this.translations.filter(t => {
                if (this.groupFilter) {
                    return t.group === this.groupFilter;
                }

                if (this.textFilter) {
                    if (t[this.locale]) {
                        return t[this.locale].indexOf(this.textFilter) !== -1;
                    }

                    if (t.en) {
                        return t.en.indexOf(this.textFilter) !== -1;
                    }
                }

                return true;
            });
        }
    },
    watch: {
        locale () {
            this.getTranslations();
        }
    },
    created () {
        this.getTranslations();
    },
    methods: {
        getTranslations () {
            if (this.loading) {
                return;
            }

            this.loading = true;
            const params = {
                language: this.locale
            };

            this.$store.dispatch('Translation/getTranslations', params)
                .then(() => {
                    this.loading = false;
                });
        }
    }
};
</script>

<style>

</style>
