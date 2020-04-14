<template>
    <VForm class="translate-input">
        <VTextarea
            v-model="translationText"
            :disabled="disabled"
            rows="1"
            @blur="storeTranslate"
        />
        <VBtn
            class="edit-button"
            icon
            small
            :loading="loading"
            @click="disabled = !disabled"
        >
            <VIcon small>
                mdi-pencil
            </VIcon>
        </VBtn>
    </VForm>
</template>

<script>
export default {
    props: {
        language: {
            type: String,
            required: true
        },
        group: {
            type: String,
            required: true
        },
        translationKey: {
            type: String,
            required: true
        },
        translation: {
            type: String,
            required: true
        }

    },
    data: () => ({
        loading: false,
        translationText: '',
        disabled: true
    }),
    mounted () {
        this.translationText = this.translation;
    },
    methods: {
        storeTranslate () {
            if (this.loading) {
                return;
            }
            this.loading = true;
            const params = {
                language: this.language,
                group: this.group,
                key: this.translationKey,
                value: this.translationText
            };

            this.$store.dispatch('Translation/updateTranslations', params)
                .then(() => {
                    this.disabled = true;
                    this.loading = false;
                });
        }
    }
};
</script>

<style>
.translate-input {
    position: relative;
}
.translate-input .edit-button {
    position: absolute;
    top: 17px;
    right: 5px;
}
</style>
