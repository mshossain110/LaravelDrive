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
                    <VFlex xs12>
                        <VAutocomplete
                            v-model="friends"
                            :items="people"
                            box
                            chips
                            label="Select"
                            item-text="name"
                            item-value="name"
                            multiple
                            @change="searchUser"
                        >
                            <template
                                slot="selection"
                                slot-scope="data"
                            >
                                <VChip
                                    :selected="data.selected"
                                    close
                                    class="chip--select-multi"
                                    @input="remove(data.item)"
                                >
                                    <VAvatar>
                                        <img :src="data.item.avatar">
                                    </VAvatar>
                                    {{ data.item.name }}
                                </VChip>
                            </template>
                            <template
                                slot="item"
                                slot-scope="data"
                            >
                                <template v-if="typeof data.item !== 'object'">
                                    <VListTileContent v-text="data.item" />
                                </template>
                                <template v-else>
                                    <VListTileAvatar>
                                        <img :src="data.item.avatar">
                                    </VListTileAvatar>
                                    <VListTileContent>
                                        <VListTileTitle v-html="data.item.name" />
                                        <VListTileSubTitle v-html="data.item.group" />
                                    </VListTileContent>
                                </template>
                            </template>
                        </VAutocomplete>
                    </VFlex>
                </VCardText>

                <VCardActions>
                    <VBtn
                        color="info"
                        type="submit"
                        flat
                    >
                        Craete
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
        const srcs = {
            1: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
            2: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
            3: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
            4: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
            5: 'https://cdn.vuetifyjs.com/images/lists/5.jpg'
        }
        return {
            friends: ['Sandra Adams', 'Britta Holt'],
            isUpdating: false,
            name: 'Midnight Crew',

            people: [
                { header: 'Group 1' },
                { name: 'Sandra Adams', group: 'Group 1', avatar: srcs[1] },
                { name: 'Ali Connors', group: 'Group 1', avatar: srcs[2] },
                { name: 'Trevor Hansen', group: 'Group 1', avatar: srcs[3] },
                { name: 'Tucker Smith', group: 'Group 1', avatar: srcs[2] },
                { divider: true },
                { header: 'Group 2' },
                { name: 'Britta Holt', group: 'Group 2', avatar: srcs[4] },
                { name: 'Jane Smith ', group: 'Group 2', avatar: srcs[5] },
                { name: 'John Smith', group: 'Group 2', avatar: srcs[1] },
                { name: 'Sandra Williams', group: 'Group 2', avatar: srcs[3] }
            ]
        }
    },
    computed: {

    },
    methods: {
        onSubmit () {

        },
        close () {
            this.$store.commit('Media/shareFileModal', false)
        },
        searchUser () {

        }
    }
}
</script>

<style>
.mpu .v-card__actions {
    border-top: 1px solid #ddd;
}
</style>
