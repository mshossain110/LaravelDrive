<template>
    <div
        class="media-item"
        :class="{ 'seleted': isSelected }"
    >
        <div class="card-inner">
            <div class="la-file-name">
                <div
                    class="fi"
                    :class="mediaIcon.type"
                    :style="{ color: mediaIcon.color }"
                >
                    <div
                        v-if="mediaIcon.avatar"
                        class="la-fia"
                    >
                        <VAvatar
                            size="166"
                            tile
                            v-html="mediaIcon.icon"
                        />
                    </div>

                    <div
                        v-else
                        class="la-fii"
                    >
                        <VImg
                            v-if="isImage"
                            :src="fileUrl"
                            height="166"
                            :lazy-src="fileUrl"
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

import Mixins from './mixin'
import { mapState } from 'vuex'

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
        }
    },
    computed: {
        ...mapState('Media', ['selectedFilesId']),
        mediaIcon () {
            return this.getMediaIcon(this.media)
        },
        fileUrl () {
            return window.location.origin + '/' + this.media.url
        },
        isSelected () {
            return this.selectedFilesId.findIndex(x => x === this.media.id) !== -1
        },
        isImage () {
            return ['jpg', 'png', 'tif', 'tiff', 'gif', 'jpeg', 'jif', 'jfif', 'jp2', 'fpx', 'pcd'].indexOf(this.media.extension.toLowerCase()) !== -1
        }
    },
    methods: {
        renameMedia () {
            if (this.submitting) {
                return
            }

            this.submitting = true

            if (this.media.name === '') {
                this.$store.commit('setSnackbar',
                    {
                        message: 'Folder Name should not be null.',
                        status: '',
                        color: 'error',
                        show: true
                    },
                    { root: true })
                this.$refs.medaiName.focus()
                this.submitting = false
                return
            }

            this.$emit('rename', this.media)
        }

    }
}
</script>

<style>
#filecontainer .media-item  .card-inner {
    border: 1px solid #e8eaed;
    -webkit-border-radius: 6px;
    border-radius: 6px;
    -webkit-box-shadow: none;
    box-shadow: none;
    position: relative;
    width: 100%;
}
#filecontainer .media-item.seleted  .card-inner {
    border: 1px solid #226cdb;
}
#filecontainer .media-item .la-fia {
    display: flex;
    justify-content: center;
    align-items: center;
}
.media-item .fn {
    height: 48px;
    width: 100%;
    border-radius: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.media-item .fn .fn-i {
    display: flex;
    padding: 5px;
    justify-content: flex-start;
    align-items: center;
    height: 100%;
}
.media-item .fn-i-i {
    padding: 0px 10px;
}

.media-item .fn .fn-i-t {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-right: 10px;
}
.media-item .fn-i-i span {
    font-size: 16px;
    vertical-align: middle;
}
.media-item .fn .fn-i-i [class^="flaticon-"]:before, .media-item .fn .fn-i-i  [class*=" flaticon-"]:before,
.media-item .fn .fn-i-i [class^="flaticon-"]:after, .media-item .fn .fn-i-i  [class*=" flaticon-"]:after {
    font-size: 16px;
    margin: 0;
}

.media-item .fi .lafi.material-icons {
    font-size: 90px;

}

.media-item .fi [class^="flaticon-"]:before, .media-item .fi [class*=" flaticon-"]:before,
.media-item .fi [class^="flaticon-"]:after, .media-item .fi [class*=" flaticon-"]:after {
    font-size: 90px;
    margin: 0;
}

.media-item span.fstared {
    position: absolute;
    top: -10px;
    right: -10px;
    color: #d4a002;
}

</style>
