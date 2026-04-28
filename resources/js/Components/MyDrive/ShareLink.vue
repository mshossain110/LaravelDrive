<template>
    <AppModal :open="open" title="Shareable link" max-width="500px" @close="close">
        <form class="file-deselet" @submit.prevent="storeShareableLink">
            <div class="space-y-4 p-4">
                <!-- Header row -->
                <div class="flex items-center justify-between">
                    <strong class="text-sm">Link sharing is on</strong>
                    <div class="flex gap-1">
                        <button
                            v-if="hasLinkData"
                            type="button"
                            class="rounded-full border border-red-300 p-1.5 text-red-500 hover:bg-red-50"
                            @click="deleteShareableLink()"
                        >
                            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                        <button
                            type="button"
                            class="rounded-full border border-gray-300 p-1.5 text-gray-500 hover:bg-gray-50"
                            @click="showSittings = !showSittings"
                        >
                            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                        </button>
                    </div>
                </div>

                <!-- Link input with copy -->
                <div class="flex gap-2">
                    <input
                        ref="sharelink"
                        type="text"
                        :value="linkdata.link"
                        readonly
                        class="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                        @focus="$event.target.select()"
                    />
                    <button
                        type="button"
                        class="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
                        @click="copyLink"
                    >
                        Copy
                    </button>
                </div>

                <!-- Settings panel -->
                <div v-if="showSittings" class="space-y-4 rounded-lg border border-gray-200 p-4">
                    <!-- Link expiration -->
                    <div class="border-b border-gray-200 pb-4">
                        <p class="mb-2 text-sm font-medium">Link expiration</p>
                        <label class="flex items-center gap-2 text-sm">
                            <input v-model="linkExpier" type="checkbox" class="rounded border-gray-300 text-brand-600 focus:ring-brand-500" />
                            Link is valid until:
                        </label>
                        <div v-if="linkExpier" class="mt-2 flex gap-2">
                            <input
                                v-model="linkExpierDate"
                                type="date"
                                class="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                            />
                            <input
                                v-model="linkExpierTime"
                                type="time"
                                class="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                            />
                        </div>
                    </div>

                    <!-- Password protect -->
                    <div class="border-b border-gray-200 pb-4">
                        <p class="mb-2 text-sm font-medium">Password Protect</p>
                        <label class="flex items-center gap-2 text-sm">
                            <input v-model="password" type="checkbox" class="rounded border-gray-300 text-brand-600 focus:ring-brand-500" />
                            Require password:
                        </label>
                        <div v-if="password" class="relative mt-2">
                            <input
                                v-model="LinkPassword"
                                :type="showPassword ? 'text' : 'password'"
                                name="LinkPassword"
                                class="w-full rounded-lg border border-gray-300 px-3 py-2 pr-10 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                                placeholder="At least 8 characters"
                            />
                            <button
                                type="button"
                                class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                                @click="showPassword = !showPassword"
                            >
                                <svg v-if="showPassword" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                <svg v-else class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <!-- Allow editing -->
                    <div class="border-b border-gray-200 pb-4">
                        <p class="mb-2 text-sm font-medium">Allow editing</p>
                        <label class="flex items-center gap-2 text-sm">
                            <input v-model="editable" type="checkbox" class="rounded border-gray-300 text-brand-600 focus:ring-brand-500" />
                            Users with link can modify this item.
                        </label>
                    </div>

                    <!-- Allow download -->
                    <div>
                        <p class="mb-2 text-sm font-medium">Allow download</p>
                        <label class="flex items-center gap-2 text-sm">
                            <input v-model="downloadable" type="checkbox" class="rounded border-gray-300 text-brand-600 focus:ring-brand-500" />
                            Users with link can download this item.
                        </label>
                    </div>
                </div>
            </div>

            <!-- Actions -->
            <div class="flex gap-2 border-t px-4 py-3">
                <button
                    type="submit"
                    class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                    {{ hasLinkData ? 'Update Link' : 'Create Link' }}
                </button>
                <button
                    type="button"
                    class="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                    @click="close"
                >
                    Cancel
                </button>
            </div>
        </form>
    </AppModal>
</template>

<script>
import Mixin from './mixin';
import { mapState } from 'vuex';
import AppModal from '@/Components/UI/AppModal.vue';

export default {
    components: { AppModal },
    mixins: [Mixin],
    props: {
        open: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            loading: false,
            showSittings: false,
            date: new Date().toISOString().substr(0, 10),
            time: null,
            linkExpier: false,
            linkExpierDate: '',
            linkExpierTime: '',
            password: false,
            LinkPassword: '',
            showPassword: false,
            editable: false,
            downloadable: true,
            linkdata: {}
        };
    },
    computed: {
        ...mapState('Media', ['selectedFilesId']),
        hasLinkData () {
            return Object.prototype.hasOwnProperty.call(this.linkdata, 'id');
        }
    },
    mounted () {
        this.getShareableLink();
    },
    methods: {
        close () {
            this.$store.commit('Media/shareLinkModal', false);
        },
        getShareableLink (params) {
            axios.get(`/api/shareable-links/file/${this.selectedFilesId[0]}`, { params })
                .then((res) => {
                    this.linkdata = res.data.data;
                    this.$nextTick(() => {
                        if (this.$refs.sharelink) this.$refs.sharelink.focus();
                    });
                });
        },
        storeShareableLink () {
            if (this.loading) return;
            this.loading = true;
            const params = {
                file_id: this.selectedFilesId[0],
                allow_edit: this.editable,
                allow_download: this.downloadable,
                password: this.LinkPassword,
                expires_at: this.linkExpierDate + ' ' + this.linkExpierTime
            };
            axios.post(`/api/shareable-links/file/${this.selectedFilesId[0]}`, params)
                .then((res) => {
                    this.linkdata = res.data.data;
                    this.loading = false;
                });
        },
        deleteShareableLink () {
            if (!this.hasLinkData) return;
            axios.delete(`/api/shareable-links/${this.linkdata.id}`)
                .then(() => { this.close(); });
        },
        copyLink () {
            if (this.$refs.sharelink) {
                this.$refs.sharelink.select();
                navigator.clipboard.writeText(this.linkdata.link || '');
                this.$store.commit('setSnackbar', {
                    message: 'Link Copied successfully',
                    color: 'success',
                    show: true
                });
            }
        }
    }
};
</script>
