<template>
    <VDialog
        :value="open"
        class="mpu"
        max-width="500"
        persistent
    >
        <form @submit.prevent="storeShareableLink">
            <VCard class="dl-share-modal">
                <VCardTitle
                    class="headline grey lighten-2"
                >
                    Shareable link
                </VCardTitle>
                <VCardText
                    v-if="showSettings"
                    class="mt-4"
                >
                    <VRow
                        no-gutters
                        justify="space-between"
                        class="mb-2"
                    >
                        <VCol>
                            <strong>Link sharing is on</strong>
                        </VCol>
                        <VCol style="text-align:right;">
                            <VBtn
                                x-small
                                fab
                                icon
                                outlined
                                rounded
                                color="red"
                            >
                                <VIcon>delete</VIcon>
                            </VBtn>

                            <VBtn
                                x-small
                                fab
                                icon
                                outlined
                                rounded
                                @click="showSittings = !showSittings"
                            >
                                <VIcon>edit</VIcon>
                            </VBtn>
                        </VCol>
                    </VRow>
                    <VRow no-gutters>
                        <VCol cols="12">
                            <VTextField
                                ref="sharelink"
                                outlined
                                label="Link"
                                :value="getShareLink"
                                type="text"
                                @focus="$event.target.select()"
                            >
                                <template v-slot:append>
                                    <VBtn
                                        color="blue"
                                        x-small
                                        @click="copyLink"
                                    >
                                        Copy
                                    </VBtn>
                                </template>
                            </VTextField>
                        </VCol>
                    </VRow>
                    <div
                        v-if="showSittings"
                        class="ba-1 pa-2"
                    >
                        <VRow
                            no-gutters
                            class="bb-1"
                        >
                            <VCol
                                cols="12"
                                align-self="center"
                            >
                                <p>Link expiration</p>
                                <VCheckbox
                                    v-model="linkExpier"
                                    label="Link is valid until:"
                                />
                            </VCol>
                            <VCol
                                v-if="linkExpier"
                                cols="6"
                            >
                                <VMenu
                                    ref="menu"
                                    v-model="datepicker"
                                    :close-on-content-click="false"
                                    :nudge-right="40"
                                    :return-value.sync="date"
                                    lazy
                                    transition="scale-transition"
                                    offset-y
                                    full-width
                                    min-width="290px"
                                >
                                    <template v-slot:activator="{ on }">
                                        <VTextField
                                            v-model="linkExpierDate"
                                            label="YYYY-MM-DD"
                                            prepend-icon="event"
                                            readonly
                                            v-on="on"
                                        />
                                    </template>
                                    <VDatePicker
                                        v-model="linkExpierDate"
                                        no-title
                                        scrollable
                                    >
                                        <div class="flex-grow-1" />
                                        <VBtn
                                            text
                                            color="primary"
                                            @click="datepicker = false"
                                        >
                                            Cancel
                                        </VBtn>
                                        <VBtn
                                            text
                                            color="primary"
                                            @click="$refs.menu.save(linkExpierDate)"
                                        >
                                            OK
                                        </VBtn>
                                    </VDatePicker>
                                </VMenu>
                            </VCol>

                            <VCol
                                v-if="linkExpier"
                                cols="6"
                            >
                                <VMenu
                                    ref="menu"
                                    v-model="timepicker"
                                    :close-on-content-click="false"
                                    :nudge-right="40"
                                    :return-value.sync="time"
                                    lazy
                                    transition="scale-transition"
                                    offset-y
                                    full-width
                                    max-width="290px"
                                    min-width="290px"
                                >
                                    <template v-slot:activator="{ on }">
                                        <VTextField
                                            v-model="linkExpierTime"
                                            label="HH:MM"
                                            prepend-icon="access_time"
                                            readonly
                                            v-on="on"
                                        />
                                    </template>
                                    <VTimePicker
                                        v-if="timepicker"
                                        v-model="linkExpierTime"
                                        full-width
                                        @click:minute="$refs.menu.save(time)"
                                    />
                                </VMenu>
                            </VCol>
                        </VRow>
                        <VRow
                            no-gutters
                            class="bb-1"
                        >
                            <VCol>
                                <p>Password Protect</p>
                                <VCheckbox
                                    v-model="password"
                                    label="Require password:"
                                />
                                <VTextField
                                    v-if="password"
                                    v-model="LinkPassword"
                                    :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                                    :type="showPassword ? 'text' : 'password'"
                                    name="LinkPassword"
                                    hint="At least 8 characters"
                                    counter
                                    @click:append="showPassword = !showPassword"
                                />
                            </VCol>
                        </VRow>
                        <VRow
                            no-gutters
                            class="bb-1"
                        >
                            <VCol>
                                <p>Allow editing</p>
                                <VCheckbox
                                    v-model="editable"
                                    label="Users with link can modify this item."
                                />
                            </VCol>
                        </VRow>
                        <VRow
                            no-gutters
                        >
                            <VCol>
                                <p>Allow download</p>
                                <VCheckbox
                                    v-model="downloadable"
                                    label="Users with link can download this item."
                                />
                            </VCol>
                        </VRow>
                    </div>
                </VCardText>

                <VCardActions>
                    <VBtn
                        v-if="showSettings"
                        color="info"
                        type="submit"
                        text
                    >
                        Create Link
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
            showSittings: false,
            date: new Date().toISOString().substr(0, 10),
            time: null,
            isLoading: false,
            linkExpier: false,
            linkExpierDate: '',
            linkExpierTime: '',
            datepicker: false,
            timepicker: false,
            password: false,
            LinkPassword: '',
            showPassword: false,
            editable: false,
            downloadable: true,
            linkdata: {},
            updateShare: false

        }
    },
    computed: {
        ...mapState('Media', ['selectedFilesId']),
        hasLinkData () {
            return this.linkdata.hasOwnProperty('id')
        },
        getShareLink () {
            if (this.hasLinkData) {
                return `${location.origin}/s/${this.linkdata.hash}/`
            }
            return ''
        },
        showSettings () {
            return !this.hasLinkData || (this.hasLinkData && this.updateShare)
        }
    },
    mounted () {
        this.getShareableLink()
        setTimeout(() => {
            this.$refs.sharelink.focus()
        }, 500)
    },
    methods: {
        close () {
            this.$store.commit('Media/shareLinkModal', false)
        },
        getShareableLink (params) {
            axios.get(`/api/shareable-links/file/${this.selectedFilesId[0]}`, { params })
                .then((res) => {
                    this.linkdata = res.data.data
                })
        },
        storeShareableLink () {
            var params = {
                'file_id': this.selectedFilesId[0],
                'allow_edit': this.editable,
                'allow_download': this.downloadable,
                'password': this.LinkPassword,
                'expires_at': this.linkExpierDate + ' ' + this.linkExpierTime
            }
            axios.post(`/api/shareable-links/file/${this.selectedFilesId[0]}`, params)
                .then((res) => {
                    this.linkdata = res.data.data
                })
        },
        copyLink () {
            this.$refs.sharelink.blur()
            this.$refs.sharelink.focus()
            document.execCommand('copy')
        }
    }
}
</script>

<style>
</style>
