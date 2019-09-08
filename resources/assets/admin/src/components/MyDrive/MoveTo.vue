<template>
    <VDialog
        v-model="open"
        class="mpu"
        persistent
        width="500"
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
                        @click.native="close()"
                    >
                        <VIcon>close</VIcon>
                    </VBtn>
                </VCardActions>
            </VCardTitle>

            <VCardText class="recursive-folder">
                <VTreeview
                    ref="moveFolder"
                    :items="folderLists"
                    activatable
                    dense
                    hoverable
                    transition
                    rounded
                    color="green"
                    @update:active="SelectMovingFoleder"
                />
            </VCardText>

            <VCardActions class="bt-1">
                <VBtn
                    small
                    depressed
                    color="secondary"
                    @click="moveintoFolder"
                >
                    Move To
                </VBtn>
                <VBtn
                    color="error"
                    small
                    depressed
                    @click="close()"
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
            active: [],
            name: '',
            moveid: [],
            folderLists: []
        }
    },
    computed: {
        ...mapState('Media', ['folders', 'selectedFilesId']),
        ...mapGetters('Media', ['getNestedFolders'])
    },
    mounted () {
        this.folderLists = this.getNestedFolders

        if (typeof this.$route.params.folderId !== 'undefined') {
            this.folderLists.unshift({
                id: 0,
                name: 'Root',
                parent_id: 0
            })
        }
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
        moveintoFolder () {
            var params = {
                files: this.selectedFilesId,
                destination: this.moveid[0] ? this.moveid[0] : null
            }

            this.$store.dispatch('Media/moveFiles', params)
                .then(res => {
                    var parentId = 0
                    if (typeof this.$route.params.folderId !== 'undefined') {
                        parentId = this.$route.params.folderId
                    }

                    let items = res.filter(i => i.parent_id !== parentId).map(i => i.id)
                    this.$store.commit('Media/moveFile', items)
                    this.close()
                })
        },
        SelectMovingFoleder (val) {
            this.moveid = val
        },
        close () {
            this.$store.commit('Media/moveToemodal', false)
        }
    }
}
</script>

<style>
.mpu .v-card__actions {
    border-top: 1px solid #ddd;
}

</style>
