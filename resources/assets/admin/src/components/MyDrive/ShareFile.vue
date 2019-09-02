<template>
    <VDialog
        v-model="openpoupu"
        class="mpu"
        max-width="700"
    >
        <form @submit.prevent="onSubmit">
            <VCard class="dl-share-modal">
                <VCardTitle
                    class="headline grey lighten-2"
                >
                    Share File
                </VCardTitle>

                <VCardText>
                    <VLayout align-center>
                        <VFlex xs8>
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
                        <VFlex xs2>
                            <VMenu
                                transition="slide-x-transition"
                                max-width="300"
                                bottom
                            >
                                <template v-slot:activator="{ on }">
                                    <VBtn
                                        outlined
                                        color="indigo"
                                        v-on="on"
                                    >
                                        <VIcon>edit</VIcon><VIcon>keyboard_arrow_down</VIcon>
                                    </VBtn>
                                </template>

                                <VList two-line>
                                    <VListItem
                                        v-for="(item, i) in permissions"
                                        :key="i"
                                        @click="permission = item.id"
                                    >
                                        <VListItemAction>
                                            <VIcon v-if="permission == item.id">
                                                check_circle
                                            </VIcon>
                                            <VSpacer v-else />
                                        </VListItemAction>
                                        <VListItemContent>
                                            <VListItemTitle>{{ item.title }}</VListItemTitle>
                                            <VListItemSubtitle>{{ item.descrption }}</VListItemSubtitle>
                                        </VListItemContent>
                                    </VListItem>
                                </VList>
                            </VMenu>
                        </VFlex>
                        <VFlex xs2>
                            <VBtn
                                color="success"
                                type="submit"
                            >
                                Add
                            </VBtn>
                        </VFlex>
                    </VLayout>

                    <VLayout align-center>
                        <VFlex
                            12
                            class="mt-3"
                        >
                            <div class="owner-of-file">
                                <div class="subheading">
                                    Owner of File
                                </div>
                                <div class="inner">
                                    <VImg
                                        :src="selectedMedia.owner.data.avatar"
                                    />
                                    <div class="owen-name">
                                        {{ selectedMedia.owner.data.display_name }} <br>
                                        {{ selectedMedia.owner.data.email }}
                                    </div>
                                </div>
                            </div>
                            <VDivider />
                        </VFlex>
                    </VLayout>

                    <VLayout align-center>
                        <VFlex
                            v-for="u in sharedwith"
                            :key="u.id"
                            xs12
                            class="mt-1"
                        >
                            <div class="owner-of-file">
                                <div class="subheading">
                                    Share File with
                                </div>
                                <div class="inner">
                                    <VImg
                                        :src="u.avatar"
                                    />
                                    <div class="owen-name">
                                        {{ u.display_name }} <br>
                                        {{ u.email }}
                                    </div>
                                </div>
                            </div>
                        </VFlex>
                        <VDivider />
                    </VLayout>
                </VCardText>
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
            sharedwith: [],
            search: null,
            openpoupu: this.open,
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
        ...mapState('Media', ['selectedFilesId', 'selectedMedia', 'shareFileModal'])
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
        },
        openpoupu (val) {
            if (this.open !== val) { this.$store.commit('Media/shareFileModal', val) }
        }
    },
    created () {
        this.getfileUser()
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
                    this.$store.commit('setSnackbar',
                        {
                            message: res.data.message,
                            status: res.status,
                            color: 'success',
                            show: true
                        },
                        { root: true })
                    this.close()
                })
        },
        getfileUser () {
            axios.get(`/api/shared/file/${this.selectedFilesId}/share-with`)
                .then(res => {
                    this.sharedwith = res.data.data
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

.dl-share-modal .v-menu__activator .v-btn.v-btn--outlined {
    border-width: 1px 1px 1px;
    border-color: #ddd;
    border-style: solid;
    background: transparent !important;
    box-shadow: none;
    margin: 4px 0;
    height: 56px;
    color: #4a4848 !important;
}
.inner {
    display: flex;
    justify-content: flex-start;
    margin-top: 20px;
}
.inner .v-image {
    width: 40px;
    display: block;
    max-width: 40px;
    margin-right: 20px;
}

</style>
