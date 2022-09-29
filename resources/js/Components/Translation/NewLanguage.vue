<template>
    <VForm
        ref="form"
        class="pa-3"
        elevation
    >
        <VTextField
            v-model="language.name"
            label="Name"
            required
        />

        <VTextField
            v-model="language.locale"
            label="Locale"
            required
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
            @click="create"
        >
            Create
        </VBtn>
    </VForm>
</template>
<script>
export default {
    props: {
        language: {
            type: Object,
            default: () => ({
                name: '',
                locale: ''
            })
        }
    },
    data: () => ({
        loading: false
    }),
    methods: {
        cancel () {
            this.$emit('cancel');
        },
        create () {
            if (this.loading) {
                return;
            }

            this.loading = true;

            const params = {
                name: this.language.name,
                locale: this.language.locale
            };

            this.$store.dispatch('Translation/storeLanguages', params)
                .then(() => {
                    this.cancel();
                });
        }
    }
};
</script>

<style>

</style>
