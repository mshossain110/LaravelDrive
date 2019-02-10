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
                    <Multiselect
                        v-model="users"
                        :options="people"
                        multiple
                        searchable
                        label="name"
                        :close-on-select="false"
                        track-by="name"
                        placeholder="Add User"
                        @search-change="searchUser"
                    >
                        <span slot="noResult">
                            Oops! No User found.
                            Consider changing the search query.
                        </span>
                    </Multiselect>
                    <VSelect
                        v-model="permission"
                        :items="permissions"
                        label="Solo field"
                        solo
                    />
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
import Multiselect from 'vue-multiselect'
import { mapState } from 'vuex'

export default {
    components: {
        Multiselect
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
        const srcs = {
            1: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
            2: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
            3: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
            4: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
            5: 'https://cdn.vuetifyjs.com/images/lists/5.jpg'
        }
        return {
            users: [],
            people: [],
            usersearchtime: false,
            isLoading: false,
            isUpdating: false,
            name: 'Midnight Crew',
            permission: '',
            permissions: [
                'Can edit', 'Can download', 'Can view'
            ]
        }
    },
    computed: {
        ...mapState('Media', ['selectedFilesId'])
    },
    methods: {
        onSubmit () {
            let emails = []
            this.users.map(u => {
                emails.push(u.email)
            })
            let param = {
                emails: emails,
                entries: this.selectedFilesId,
                permissions: { edit: true, view: true, download: true }
            }
            axios.post('/api/shares/add-users', param)
                .then(res => {
                    console.log(res.data)
                })
        },
        close () {
            this.$store.commit('Media/shareFileModal', false)
        },
        searchUser (query) {
            if (!query.length) return

            this.isLoading = true

            if (this.usersearchtime) {
                clearTimeout(this.usersearchtime)
            }

            this.usersearchtime = setTimeout(() => {
                axios.get('/api/users/search?s=' + query)
                    .then(response => {
                        this.people = response.data.data
                        this.isLoading = false
                    })
            }, 500)
        },
        remove (item) {
            let i = this.friends.findIndex(x => x === item.name)
            this.friends.splice(i, 1)
        }
    }
}
</script>

<style>
.mpu .v-card__actions {
    border-top: 1px solid #ddd;
}
.share-file {

}
</style>
