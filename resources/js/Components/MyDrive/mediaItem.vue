
<template>
    <!-- eslint-disable vue/no-v-html  -->
    <div
        class="media-item"
        :class="{ 'selected': isSelected }"
    >
        <div class="card-inner">
            <div class="la-file-name">
                <div
                    class="fi"
                    :class="mediaIcon.type"
                    :style="{ color: mediaIcon.color }"
                >
                    <div
                        v-if="isImage"
                        class="la-fii"
                    >
                        <VImg
                            v-if="isImage"
                            :src="media.public_path"
                            height="166"
                            :lazy-src="media.public_path"
                        />
                    </div>
                    <div
                        v-else
                        class="la-fia"
                    >
                        <VAvatar
                            size="166"
                            tile
                            v-html="mediaIcon.icon"
                        />
                    </div>
                </div>

                <div class="fn">
                    <div class="fn-i">
                        <span
                            class="fn-i-i"
                            :style="{ color: mediaIcon.color }"
                            size="15"
                            tile
                            v-html="mediaIcon.icon"
                        />
                        <div class="fn-i-t">
                            <span
                                v-if="!media.edit"
                                class="filename"
                                v-text="media.name"
                            />
                        </div>
                    </div>
                </div>

                <span
                    v-if="media.stared"
                    class="fstared material-icons"
                    size="15"
                    tile
                >
                    star
                </span>
            </div>
        </div>
    </div>
</template>

<script>

import Mixins from './mixin';
import { mapState } from 'vuex';

export default {
    mixins: [Mixins],
    props: {
        media: {
            type: Object,
            required: true
        },
        editable: Boolean
    },
    data () {
        return {
            error: '',
            submitting: false
        };
    },
    computed: {
        ...mapState('Media', ['selectedFilesId', 'selectedMedia']),
        mediaIcon () {
            return this.getMediaIcon(this.media.extension);
        },
        fileUrl () {
            return this.media.public_path;
        },
        isSelected () {
            return this.selectedFilesId.findIndex(x => x === this.media.id) !== -1;
        },
        isImage () {
            return ['gif', 'ico', 'jpeg', 'jpg', 'png', 'svg', 'bmp', 'dib'].indexOf(this.media.extension) !== -1;
        },
        ispdf () {
            return ['pdf', 'txt'].indexOf(this.media.extension) !== -1;
        },
        isVideo () {
            return ['mp4', 'webm', '3gp', 'flv', 'ogg', 'ogv', 'mov', 'wmv', 'mpeg'].indexOf(this.media.extension) !== -1;
        },
        isAudio () {
            return ['mp3', 'ogg'].indexOf(this.media.extension) !== -1;
        }
    },
    methods: {
        renameMedia () {
            if (this.submitting) {
                return;
            }

            this.submitting = true;

            if (this.media.name === '') {
                this.$store.commit('setSnackbar',
                    {
                        message: 'Folder Name should not be null.',
                        status: '',
                        color: 'error',
                        show: true
                    },
                    { root: true });
                this.$refs.medaiName.focus();
                this.submitting = false;
                return;
            }

            this.$emit('rename', this.media);
        }

    }
};
</script>

<style lang="css">
/* #filecontainer .media-item {
    .card-inner {
        border: 1px solid #e8eaed;
        -webkit-border-radius: 6px;
        border-radius: 6px;
        -webkit-box-shadow: none;
        box-shadow: none;
        position: relative;
        width: 100%;
    }
    &.selected  .card-inner {
        border: 1px solid #226cdb;
    }
    .la-fia {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .fn {
        height: 48px;
        width: 100%;
        border-radius: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        .fn-i {
            display: flex;
            padding: 5px;
            justify-content: flex-start;
            align-items: center;
            height: 100%;
            .fn-i-i {
                padding: 0px 10px;
                span {
                    font-size: 16px;
                    vertical-align: middle;
                }
                [class^="flaticon-"]:before,
                [class^="flaticon-"]:after,
                [class*=" flaticon-"]:before,
                [class*=" flaticon-"]:after {
                    font-size: 16px;
                    margin: 0;
                }
            }
            .fn-i-t {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                padding-right: 10px;
            }
        }
    }
    .fi .lafi{
        font-size: 90px;

        &[class^="flaticon-"]:before,
        &[class^="flaticon-"]:after,
        &[class*=" flaticon-"]:before,
        &[class*=" flaticon-"]:after {
            font-size: 90px;
            margin: 0;
        }
    }
    span.fstared {
        position: absolute;
        top: -10px;
        right: -10px;
        color: #d4a002;
    }
} */

</style>
