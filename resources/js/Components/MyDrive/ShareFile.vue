<template>
    <VDialog
        v-model="openpoupu"
        class="mpu"
        max-width="700"
    >
        <form
            class="file-deselet"
            @submit.prevent="onSubmit"
        >
            <VCard class="dl-share-modal">
                <VCardTitle
                    class="headline grey lighten-2"
                >
                    Share File
                </VCardTitle>

                <VCardText>
                    <VSheet>
                        <VSheet class="d-flex">
                            <VCombobox
                                v-model="users"
                                :items="people"
                                class="file-deselet"
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
                                :menu-props="{contentClass: 'file-deselet'}"
                            >
                                <template
                                    slot="selection"
                                    slot-scope="data"
                                >
                                    <VChip
                                        v-if="data.item.id"
                                        :key="data.item.id"
                                        :input-value="data.selected"
                                        :disabled="data.disabled"
                                        class="v-chip--select-multi file-deselet"
                                    >
                                        <VAvatar
                                            class="accent white--text"
                                            v-text="data.item.name.slice(0, 1).toUpperCase()"
                                        />
                                        {{ data.item.name }}
                                        <VIcon
                                            small
                                            @click="remove(data.item)"
                                        >
                                            close
                                        </VIcon>
                                    </VChip>
                                </template>

                                <template slot="append-outer">
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

                                        <VList
                                            two-line
                                            class="file-deselet"
                                        >
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
                                </template>
                            </VCombobox>
                        </VSheet>
                        <VSheet class="d-flex" >
                            <VBtn
                                color="success"
                                type="submit"
                            >
                                Add
                            </VBtn>
                        </VSheet>
                    </VSheet>

                    <VSheet align-center>
                        <VSheet class="d-flex mt-3">
                            <div
                                v-if="selectedMedia.id"
                                class="owner-of-file"
                            >
                                <div class="subheading">
                                    Owner of File
                                </div>
                                <div class="inner">
                                    <VImg
                                        :src="selectedMedia.uploader.avatar.avatar"
                                    />
                                    <div class="owen-name">
                                        {{ selectedMedia.uploader.display_name }} <br>
                                        {{ selectedMedia.uploader.email }}
                                    </div>
                                </div>
                            </div>
                            <VDivider />
                        </VSheet>
                    </VSheet>

                    <VSheet align-center>
                        <VSheet
                            v-for="u in sharedwith"
                            :key="u.id"
                            xs12
                            class="d-flex mt-1"
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
                        </VSheet>
                        <VDivider />
                    </VSheet>
                </VCardText>
            </VCard>
        </form>
    </VDialog>
</template>

<script>
import Mixin from './mixin';
import { mapState } from 'vuex';

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
        };
    },
    computed: {
        ...mapState('Media', ['selectedFilesId', 'selectedMedia', 'shareFileModal'])
    },
    watch: {
        search (val) {
            if (!val) {
                return;
            }
            this.isLoading = true;

            if (this.searchTimeOut) {
                clearTimeout(this.searchTimeOut);
            }

            this.searchTimeOut = setTimeout(() => {
                // Lazily load input items
                this.$store.dispatch('Users/searchUsers', { s: val })
                    .then(res => {
                        this.people = res.data;
                    })
                    .finally(() => (this.isLoading = false));
            }, 400);
        },
        openpoupu (val) {
            if (this.open !== val) { this.$store.commit('Media/shareFileModal', val); }
        }
    },
    created () {
        this.getfileUser();
    },
    methods: {
        onSubmit () {
            const userids = [];
            this.users.map(u => {
                if (u.id) { userids.push(u.id); }
            });
            const param = {
                userIds: userids,
                fileids: this.selectedFilesId,
                permissions: this.permission
            };
            axios.post('/api/shares/add-users', param)
                .then(res => {
                    this.$store.commit('setSnackbar',
                        {
                            message: res.data.message,
                            status: res.status,
                            color: 'success',
                            show: true
                        },
                        { root: true });
                    this.close();
                });
        },
        getfileUser () {
            axios.get(`/api/shared/file/${this.selectedFilesId}/share-with`)
                .then(res => {
                    this.sharedwith = res.data.data;
                });
        },
        close () {
            this.$store.commit('Media/shareFileModal', false);
        },
        remove (user) {
            const i = this.users.findIndex(x => x.id === user.id);
            this.users.splice(i, 1);
        }
    }
};
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
