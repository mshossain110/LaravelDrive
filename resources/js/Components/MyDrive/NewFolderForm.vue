<template>
    <VDialog
        :model-value="open"
        class="mpu"
        width="500"
        persistent
    >
        <form @submit.prevent="onSubmit">
            <VCard>
                <VCardTitle
                    class="headline grey lighten-2"
                >
                    New Folder
                </VCardTitle>

                <VCardText>
                    <ValidationProvider
                        v-slot="{ errors }"
                        name="Name"
                        :rules="'required|min:6'"
                    >
                        <VTextField
                            v-model="name"
                            :error-messages="errors"
                            label="Name"
                            required
                        />
                    </ValidationProvider>
                </VCardText>
                <VDivider />
                <VCardActions>
                    <VBtn
                        color="primary"
                        type="submit"
                    >
                        Craete
                    </VBtn>
                    <VBtn
                        color="error"
                        @click="close"
                    >
                        Cancel
                    </VBtn>
                </VCardActions>
            </VCard>
        </form>
    </VDialog>
</template>

<script>
import Mixin from './mixin';

export default {
    mixins: [Mixin],
    props: {
        open: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            name: ''
        };
    },
    computed: {

    },
    methods: {
        onSubmit () {
            const item = {
                name: this.name,
                parent_id: this.currentFolderId
            };

            this.$store.dispatch('Media/addFolder', item)
                .then(() => {
                    this.close();
                });
        },
        close () {
            this.$store.commit('Media/newFolderModal', false);
            this.name = '';
        }
    }
};
</script>

<style>
.mpu .v-card__actions {
    border-top: 1px solid #ddd;
}
</style>
