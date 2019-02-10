<template>
    <VDialog
        :value="open"
        class="mpu"
        width="500"
        persistent
    >
        <form @submit.prevent="onSubmit">
            <VCard>
                <VCardTitle
                    class="headline grey lighten-2"
                >
                    Rename File
                </VCardTitle>

                <VCardText>
                    <VTextField
                        v-model="selectedMedia.name"
                        v-validate="'required'"
                        :error-messages="errors.collect('name')"
                        label="Name"
                        data-vv-name="name"
                        required
                    />
                </VCardText>

                <VCardActions>
                    <VBtn
                        color="info"
                        type="submit"
                        flat
                    >
                        Rename
                    </VBtn>
                    <VBtn
                        color="error"
                        flat
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
import { mapState } from 'vuex'
import Mixin from './mixin'

export default {
    $_veeValidate: {
        validator: 'new'
    },
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
        }
    },
    computed: {
        ...mapState('Media', ['selectedMedia'])
    },
    methods: {
        onSubmit () {
            this.$validator.validateAll()
            const item = {
                name: this.selectedMedia.name,
                id: this.selectedMedia.id
            }

            this.$store.dispatch('Media/updateItem', item)
                .then(() => {
                    this.close()
                })
        },
        close () {
            this.$store.commit('Media/renamefilemodal', false)
        }
    }
}
</script>

<style>
.mpu .v-card__actions {
    border-top: 1px solid #ddd;
}
</style>
