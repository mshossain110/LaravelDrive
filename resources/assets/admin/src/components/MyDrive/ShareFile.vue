<template>
    <VDialog
        :value="open"
        class="mpu"
        max-width="700"
        persistent
    >
        <form @submit.prevent="onSubmit">
            <VCard class="dl-share-modal">
                <VCardTitle
                    class="headline grey lighten-2"
                >
                    Share File
                </VCardTitle>

                <VCardText>
                    <VLayout>
                        <VFlex xs9>
                            <VCombobox
                                v-model="users"
                                :items="people"
                                :loading="isLoading"
                                :search-input.sync="search"
                                placeholder="Search User to Share"
                                item-value="id"
                                item-text="name"
                                cache-items
                                deletable-chips
                                no-filter
                                multiple
                                chips
                                clearable
                                hide-details
                                hide-selected
                            >
                                <template
                                    slot="selection"
                                    slot-scope="data"
                                >
                                    <VChip
                                        v-if="data.item.id"
                                        :key="data.item.id"
                                        :selected="data.selected"
                                        :disabled="data.disabled"
                                        class="v-chip--select-multi"
                                        close
                                        @input="remove(data.item)"
                                    >
                                        <VAvatar
                                            class="accent white--text"
                                            v-text="data.item.name.slice(0, 1).toUpperCase()"
                                        />
                                        {{ data.item.name }}
                                    </VChip>
                                </template>
                            </VCombobox>
                        </VFlex>
                        <VFlex xs3>
                            <VMenu
                                transition="slide-x-transition"
                                max-width="300"
                                bottom
                            >
                                <VBtn
                                    slot="activator"
                                    outline
                                    color="indigo"
                                >
                                    <VIcon>edit</VIcon><VIcon>keyboard_arrow_down</VIcon>
                                </VBtn>

                                <VList two-line>
                                    <VListTile
                                        v-for="(item, i) in permissions"
                                        :key="i"
                                        @click="permission = item.id"
                                    >
                                        <VListTileAction>
                                            <VIcon v-if="permission == item.id">
                                                check_circle
                                            </VIcon>
                                            <VSpacer v-else />
                                        </VListTileAction>
                                        <VListTileContent>
                                            <VListTileTitle>{{ item.title }}</VListTileTitle>
                                            <VListTileSubTitle>{{ item.descrption }}</VListTileSubTitle>
                                        </VListTileContent>
                                    </VListTile>
                                </VList>
                            </VMenu>
                        </VFlex>
                    </VLayout>
                </VCardText>

                <VCardActions>
                    <VBtn
                        color="info"
                        type="submit"

                        flat
                    >
                        Done
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
import { mapState } from 'vuex'

export default {
    components: {

    },
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
            users: [],
            people: [],
            search: null,
            searchTimeOut: false,
            isLoading: false,
            isUpdating: false,
            permission: 1,
            permissions: [
                {
                    title: 'Can edit',
                    id: 1,
                    descrption: 'People can edit, delete and copy the item to their own drive.'
                },
                {
                    title: 'Can download',

                    id: 2,
                    descrption: 'People can view and download the item.'
                },
                {
                    title: 'Can view',
                    id: 3,
                    descrption: 'People can view the item.'
                }
            ]
        }
    },
    computed: {
        ...mapState('Media', ['selectedFilesId'])
    },
    watch: {
        search (val) {
            if (!val) {
                return
            }
            this.isLoading = true

            if (this.searchTimeOut) {
                clearTimeout(this.searchTimeOut)
            }

            this.searchTimeOut = setTimeout(() => {
                // Lazily load input items
                this.$store.dispatch('Users/searchUsers', { s: val })
                    .then(res => {
                        this.people = res.data
                    })
                    .finally(() => (this.isLoading = false))
            }, 400)
        }
    },
    methods: {
        onSubmit () {
            let userids = []
            this.users.map(u => {
                if (u.id) { userids.push(u.id) }
            })
            let param = {
                userIds: userids,
                fileids: this.selectedFilesId,
                permissions: this.permission
            }
            axios.post('/api/shares/add-users', param)
                .then(res => {
                    console.log(res.data)
                    this.close()
                })
        },
        close () {
            this.$store.commit('Media/shareFileModal', false)
        },
        remove (user) {
            let i = this.users.findIndex(x => x.id === user.id)
            this.users.splice(i, 1)
        }
    }
}
</script>

<style>
.dl-share-modal .v-autocomplete{
    border: 1px solid #ddd;
}
.dl-share-modal .v-autocomplete.v-text-field > .v-input__control > .v-input__slot:before{
    border-width: 0px !important;
}
.dl-share-modal .v-autocomplete.v-text-field .v-select__selections {
    padding-left: 10px;
}

.dl-share-modal .v-menu__activator .v-btn.v-btn--outline {
    border-width: 1px 1px 1px;
    border-color: #ddd;
    border-style: solid;
    background: transparent !important;
    box-shadow: none;
    margin: 4px 0;
    height: 56px;
    color: #4a4848 !important;
}
</style>
