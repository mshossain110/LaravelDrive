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
                    New Folder
                </VCardTitle>

                <VCardText>
                    <VTextField
                        v-model="name"
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
                        text
                    >
                        Craete
                    </VBtn>
                    <VBtn
                        color="error"
                        text
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
            name: ''
        }
    },
    computed: {

    },
    methods: {
        onSubmit () {
            this.$validator.validateAll()
            const item = {
                name: this.name,
                parent_id: this.currentFolderId
            }

            this.$store.dispatch('Media/addFolder', item)
                .then(() => {
                    this.close()
                })
        },
        close () {
            this.$store.commit('Media/newFolderModal', false)
            this.name = ''
        }
    }
}
</script>

<style>
.mpu .v-card__actions {
    border-top: 1px solid #ddd;
}
</style>
