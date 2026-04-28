<template>
    <div>
        <div
            v-if="isLoaded"
            class="relative mt-4"
            @contextmenu="showContextMenu"
        >
            <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                <div
                    v-for="img in trashItems"
                    :key="img.id"
                    @contextmenu="showContextMenu2($event, img)"
                    @click="OnClickItem($event, img)"
                    @touchstart="OnClickItem($event, img)"
                >
                    <MediaItem :media="img" />
                </div>
            </div>

            <div v-if="!trashItems.length" class="flex flex-col items-center justify-center py-20 text-center">
                <svg class="mb-4 h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <p class="text-sm text-gray-500">Trash is empty</p>
            </div>

            <ContextMenu
                v-model="cm.show"
                :x="cm.x"
                :y="cm.y"
                :file="cm.file"
            />
        </div>

        <div v-else class="flex items-center justify-center py-20">
            <svg class="h-8 w-8 animate-spin text-brand-600" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import MediaItem from './mediaItem.vue';
import Mixins from './mixin';
import ContextMenu from './ContextMenu.vue';

export default {
    components: {
        MediaItem,
        ContextMenu
    },
    mixins: [Mixins],
    data () {
        return {
            cm: {},
            cm2: {},
            scrollLoading: false,
            fileCm: false,
            clickedOnItem: false
        };
    },
    computed: {
        ...mapState('Media', ['trashItems', 'trashPagination']),
        isLoaded () {
            return this.isfilesLoaded;
        }
    },
    watch: {
        '$route' (to) {
            this.selfMddiaItems(to);
        }
    },
    created () {
        this.selfMddiaItems(this.$route);
    },
    mounted () {
        document.addEventListener('click', (event) => {
            if (event.target.closest('button.media-info-button')) return;
            this.deselect();
        });
        this.scroll();
    },
    unmounted () {
        this.$store.commit('Media/emptyTrashItems');
    },
    methods: {
        selfMddiaItems (route) {
            const params = {};
            if (typeof route.params.folderId !== 'undefined') {
                params.parent_id = route.params.folderId;
            }
            if (route.query.page) {
                params.page = route.query.page;
            }
            this.$store.dispatch('Media/getTrashItems', params)
                .then(() => {
                    this.isfilesLoaded = true;
                    this.scrollLoading = false;
                });
        },
        showContextMenu (e, item) {
            e.preventDefault();
            if (this.fileCm) { this.fileCm = false; return; }
            this.cm = { show: true, x: e.clientX, y: e.clientY, file: item };
        },
        showContextMenu2 (e, item) {
            e.preventDefault();
            this.fileCm = true;
            this.cm = { show: true, x: e.clientX, y: e.clientY, file: item };
            this.OnClickItem(e, item);
        },
        OnClickItem (event, item) {
            this.clickedOnItem = true;
            const isMultiSelect = event.ctrlKey || event.metaKey;
            if (!isMultiSelect && item.type === 'folder' && !this.fileCm) {
                this.pushChiled(item);
            }
            this.$store.commit('Media/selectFiles', { isMultiSelect, id: item.id });
            this.$store.commit('Media/selectMediaItem', item);
        },
        pushChiled (item) {
            let name = 'singleFolder';
            if (this.$route.name === 'trash' || this.$route.name === 'trashFolder') {
                name = 'trashFolder';
            }
            this.$router.push({ name, params: { folderId: item.hash } });
        },
        deselect () {
            if (this.clickedOnItem) { this.clickedOnItem = false; return; }
            this.$store.commit('Media/deselectFile');
        },
        scroll () {
            window.onscroll = () => {
                if (this.scrollLoading) return;
                const bottomOfWindow = document.documentElement.scrollTop + window.innerHeight + 50 > document.documentElement.offsetHeight;
                if (bottomOfWindow) {
                    const page = (this.$route.query.page || 1) + 1;
                    if (page > this.trashPagination.total_pages) return;
                    this.scrollLoading = true;
                    this.$router.replace({ name: this.$route.name, params: this.$route.params, query: { page } });
                }
            };
        }
    }
};
</script>
