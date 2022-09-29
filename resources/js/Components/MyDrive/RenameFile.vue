<template>
    <VDialog
        :model-value="open"
        class="mpu"
        width="500"
        persistent
    >
        <form
            class="file-deselet"
            @submit.prevent="onSubmit"
        >
            <VCard>
                <VCardTitle
                    class="headline grey lighten-2"
                >
                    Rename File
                </VCardTitle>

                <VCardText>
                    <ValidationProvider
                        v-slot="{ errors }"
                        name="Name"
                        :rules="'required|min:6'"
                    >
                        <VTextField
                            v-model="selectedMedia.name"
                            :error-messages="errors"
                            label="Name"
                            data-vv-name="name"
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
                        Rename
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
import { mapState } from 'vuex';
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
            // name: this.selectedMedia.name,
        };
    },
    computed: {
        ...mapState('Media', ['selectedMedia'])
    },
    methods: {
        onSubmit () {
            const item = {
                name: this.selectedMedia.name,
                id: this.selectedMedia.id
            };

            this.$store.dispatch('Media/updateItem', item)
                .then(() => {
                    this.close();
                });
        },
        close () {
            this.$store.commit('Media/renamefilemodal', false);
        }
    }
};
</script>

<style>
.mpu .v-card__actions {
    border-top: 1px solid #ddd;
}
</style>
