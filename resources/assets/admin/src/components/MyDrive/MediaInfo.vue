<template>
    <VNavigationDrawer
        class="media-info"
        :value="fileInfoSideBar"
        absolute
        right
    >
        <div
            v-if="hasItem"
            class="mi-fh"
        >
            <span
                class="fn-i-i"
                :style="{ color: mediaIcon.color }"
                size="15"
                tile
                v-html="mediaIcon.icon"
            />
            <h3>{{ selectedMedia.name }}</h3>
        </div>

        <div
            v-else
            class="mi-fh pa-3"
        >
            <span
                class="fn-i-i"
                :style="{ color: mediaIcon.color }"
                size="15"
                tile
                v-html="mediaIcon.icon"
            />
            <h3>My Files </h3>
        </div>

        <div class="la-toggle-bn">
            <a
                v-if="tabActive == 1"
                href="#"
                :class="{'active': tabActive == 1 }"
            >
                Details
            </a>
            <a
                v-if="tabActive == 1"
                href="#"
                :class="{'active': tabActive == 2 }"
            >
                Activities
            </a>
        </div>

        <div
            v-if="hasItem"
            class="details pa-3"
        >
            <VImg
                :src="fileUrl"
                :lazy-src="fileUrl"
            />

            <div class="las-info-list">
                <div class="las-ii">
                    <span class="la-ik">
                        File Name
                    </span>
                    <span class="la-iv">
                        {{ selectedMedia.name }}
                    </span>
                </div>
                <div class="las-ii">
                    <span class="la-ik">
                        Type
                    </span>
                    <span class="la-iv">
                        {{ selectedMedia.type }}
                    </span>
                </div>
                <div class="las-ii">
                    <span class="la-ik">
                        Size
                    </span>
                    <span class="la-iv">
                        {{ selectedMedia.file_size }}
                    </span>
                </div>
                <div class="las-ii">
                    <span class="la-ik">
                        Storate Used
                    </span>
                    <span class="la-iv">
                        {{ selectedMedia.file_size }}
                    </span>
                </div>
                <div class="las-ii">
                    <span class="la-ik">
                        Location
                    </span>
                    <span class="la-iv">
                        {{ selectedMedia.url }}
                    </span>
                </div>
                <div class="las-ii">
                    <span class="la-ik">
                        Owner
                    </span>
                    <span class="la-iv">
                        {{ selectedMedia.file_name }}
                    </span>
                </div>
                <div class="las-ii">
                    <span class="la-ik">
                        Created
                    </span>
                    <span class="la-iv">
                        {{ selectedMedia.created_at.date }}
                    </span>
                </div>
                <div class="las-ii">
                    <span class="la-ik">
                        Modified
                    </span>
                    <span class="la-iv">
                        {{ selectedMedia.updated_at.date }}
                    </span>
                </div>
                <div class="las-ii">
                    <span class="la-ik">
                        Description
                    </span>
                    <span class="la-iv">
                        {{ selectedMedia.description }}
                    </span>
                </div>
                <div class="las-ii">
                    <span class="la-ik">
                        File Name
                    </span>
                    <span class="la-iv">
                        {{ selectedMedia.file_name }}
                    </span>
                </div>
            </div>
        </div>

        <div
            v-else
            class="no-item pa-3"
        >
            <VIcon
                color="gray"
                large
            >
                home
            </VIcon>

            <h4>Select a file or folder to view its details.</h4>
        </div>
    </VNavigationDrawer>
</template>

<script>
import { mapState } from 'vuex'

import Mixins from './mixin'

export default {
    mixins: [Mixins],
    data () {
        return {
            tabActive: 1
        }
    },
    computed: {
        ...mapState('Media', ['fileInfoSideBar', 'selectedMedia']),
        mediaIcon () {
            if (this.hasItem) {
                return this.getMediaIcon(this.selectedMedia.extension)
            } else {
                return this.getMediaIcon('folder')
            }
        },
        fileUrl () {
            return window.location.origin + '/' + this.selectedMedia.url
        },
        hasItem () {
            return this.selectedMedia.hasOwnProperty('id')
        }
    },
    methods: {

    }
}
</script>
<style lang="scss">
    .media-info {
        border-top: 1px solid #ddd;
        .mi-fh {
            padding:20px 0px;
            h3 {
                display: inline;
            }
        }

        .la-toggle-bn {
            display: flex;
            justify-content: space-around;
            border-bottom: 1px solid #ddd;
            a {
                padding: 10px 20px;
                display: inline-block;
                font-size: 16px;
                &.active,
                &:hover {
                    text-decoration: none;
                    border-bottom: 3px solid rgb(45, 111, 173);
                }
            }
        }
        .las-info-list {
            margin-top: 20px;
            .las-ii {
                display: flex;
                justify-content: flex-start;
                align-items: self-start;
                padding: 7px 0px;
                text-overflow: clip;
                word-break: break-word;
                overflow: hidden;
                span.la-ik {
                    flex: 0 0 120px;
                    color: #757373;
                }
            }
        }
    }
</style>
