<template>
    <VForm
        ref="form"
        class="pa-3"
        elevation
    >
        <VSelect
            v-model="translation.group"
            :items="groups"
            label="Group"
            required
        />

        <VTextField
            v-model="translation.key"
            label="Key"
            required
        />

        <VTextField
            v-model="translation.value"
            label="String"
            placeholder="e.g. Keys must be a single string"
            required
        />

        <VTextField
            v-model="translation.namespace"
            label="Namespace (optional)"
            placeholder="e.g. Keys must be a single string"
        />

        <VBtn
            color="error"
            small
            class="mr-4"
            @click="cancel"
        >
            Cancel
        </VBtn>

        <VBtn
            color="success"
            small
            :loading="loading"
            @click="create"
        >
            Create
        </VBtn>
    </VForm>
</template>

<script>
import { mapState } from 'vuex';
export default {
    props: {
        locale: {
            type: String,
            required: true
        },
        translation: {
            type: Object,
            default: () => ({
                group: '',
                key: '',
                value: '',
                namespace: ''
            })
        }
    },
    data: () => ({
        loading: false
    }),
    computed: {
        ...mapState('Translation', ['groups'])
    },
    methods: {
        cancel () {
            this.$emit('cancel');
        },
        create () {
            if (this.loading) {
                return;
            }
            this.loading = true;
            const param = this.translation;
            param.language = this.locale;

            this.$store.dispatch('Translation/storeTranslations', this.translation)
                .then(() => {
                    this.loading = false;
                    this.cancel();
                });
        }
    }

};
</script>

<style>

</style>
