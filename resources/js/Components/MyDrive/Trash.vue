<template>
    <VSheet class="d-block">
        <VSheet
            v-if="isLoaded"
            fill-height
            :class="{'my-file': true, 'sidebar-open': fileInfoSideBar}"
            @dragenter="activeDropzone($event)"
            @contextmenu="showContextMenu"
        >
            <VSheet
                id="filecontainer"
                row
                wrap
            >
                <VSheet
                    class="d-flex"
                    v-for="img in trashItems"
                    :key="img.id"
                    @contextmenu="showContextMenu2($event, img)"
                    @click="OnClickItem($event, img)"
                    @touchstart="OnClickItem($event, img)"
                >
                    <MediaItem :media="img" />
                </VSheet>
            </VSheet>
            <ContextMenu
                v-model="cm.show"
                :x="cm.x"
                :y="cm.y"
                :file="cm.file"
            />
        </VSheet>
    </VSheet>
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
        '$route' (to, from) {
            this.selfMddiaItems(to);
        }
    },
    created () {
        this.selfMddiaItems(this.$route);
    },
    mounted () {
        document.addEventListener('click', (event) => {
            const element = event.target.closest('button.media-info-button');

            if (element) {
                return;
            }

            this.deselect();
        });
        this.scroll();
    },
    destroyed () {
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

            if (this.fileCm) {
                this.fileCm = false;
                return;
            }

            this.cm = {
                show: true,
                x: e.clientX,
                y: e.clientY,
                file: item
            };
        },
        showContextMenu2 (e, item) {
            e.preventDefault();
            this.fileCm = true;
            this.cm = {
                show: true,
                x: e.clientX,
                y: e.clientY,
                file: item
            };
            this.OnClickItem(e, item);
        },
        OnClickItem (event, item) {
            this.clickedOnItem = true;
            const isMultiSelect = event.ctrlKey || event.metaKey;

            if (!isMultiSelect && item.type === 'folder' && !this.fileCm) {
                this.pushChiled(item);
            }

            this.$store.commit('Media/selectFiles', { isMultiSelect: isMultiSelect, id: item.id });
            this.$store.commit('Media/selectMediaItem', item);
        },
        pushChiled (item) {
            let name = 'singleFolder';
            if (this.$route.name === 'trash' || this.$route.name === 'trashFolder') {
                name = 'trashFolder';
            }
            this.$router.push({
                name: name,
                params: {
                    folderId: item.hash
                }
            });
        },
        deselect () {
            if (this.clickedOnItem) {
                this.clickedOnItem = false;
                return;
            }

            this.$store.commit('Media/deselectFile');
        },
        scroll () {
            window.onscroll = () => {
                if (this.scrollLoading) {
                    return;
                }
                const bottomOfWindow = document.documentElement.scrollTop + window.innerHeight + 50 > document.documentElement.offsetHeight;

                if (bottomOfWindow) {
                    const page = (this.$route.query.page || 1) + 1;
                    if (page > this.trashPagination.total_pages) {
                        return;
                    }

                    this.scrollLoading = true;

                    this.$router.replace({
                        name: this.$route.name,
                        params: this.$route.params,
                        query: {
                            page: page
                        }
                    });
                }
            };
        }
    }
};
</script>

<style>
div#laraveladmin {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    display: none;
    opacity: 0;
}
.media-item .v-card__actions button.v-btn {
    width: 12px;
    height: 12px;

}
.media-item .v-card__actions button.v-btn .v-icon {
    font-size: 12px;
}
.la-pt .v-toolbar__title {
    font-size: 18px;
    font-family: 'Roboto', sans-serif !important;
    font-weight: normal;
}
.la-pt .v-icon {
    font-size: 18px;
}
.la-pt .v-menu {
    margin-left: -14px;
}
.my-file {
    position: relative;
    display: block;
    overflow: hidden;
}
#filecontainer {
    margin: 0;
    transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
#filecontainer .flex {
    width: calc(20% - 20px);
    margin-top: 16px;
    margin-right: 20px;
    display: inline-block;
    position: relative;
    vertical-align: top;
    max-width: 210px;
    min-width: 120px;
}
.sidebar-open #filecontainer {
    margin-right: 300px;
}
.sidebar-open #filecontainer .flex {
    width: calc(25% - 20px);
}
</style>
