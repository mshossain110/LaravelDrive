<template>
    <VDialog
        v-model="open"
        class="mpu"
        width="200"
        persistent
    >
        <VCard>
            <VCardTitle
                class="headline grey lighten-2"
            >
                Move To
                <VCardActions>
                    <VBtn
                        icon
                        light
                        text
                        small
                        color="red"
                        @click.native="open = false"
                    >
                        <VIcon>close</VIcon>
                    </VBtn>
                </VCardActions>
            </VCardTitle>

            <VCardText class="recursive-folder">
                <VTreeview
                    v-model="moveid"
                    :items="getNestedFolders"
                    activatable
                    active-class="grey lighten-4 indigo--text"
                    selected-color="indigo"
                    open-on-click
                    selectable
                    expand-icon="mdi-chevron-down"
                    on-icon="mdi-bookmark"
                    off-icon="mdi-bookmark-outline"
                    indeterminate-icon="mdi-bookmark-minus"
                />
            </VCardText>

            <VCardActions>
                <VBtn
                    color="error"
                    text
                    @click="open = false"
                >
                    Cancel
                </VBtn>
            </VCardActions>
        </VCard>
    </VDialog>
</template>

<script>
import Mixin from './mixin'
import { mapState, mapGetters } from 'vuex'
// import RecursiveFolder from './RecursiveFolder.vue'

export default {
    $_veeValidate: {
        validator: 'new'
    },
    components: {
        // RecursiveFolder
    },
    mixins: [Mixin],
    data () {
        return {
            active: [],
            name: '',
            open: false,
            moveid: []
        }
    },
    computed: {
        ...mapState('Media', ['folders']),
        ...mapGetters('Media', ['getNestedFolders'])
    },
    mounted () {
        Bus.$on('moveTo', () => {
            this.open = !this.open
        })
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
                    this.open = false
                })
        },
        nestedView () {

        }
    }
}
</script>

<style>
.mpu .v-card__actions {
    border-top: 1px solid #ddd;
}

</style>
