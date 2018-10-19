<template>
    <div class="media-item" @click="selectItem" :class="{ 'seleted': isSelected }" :click-outside="unselect" >
        <div @click="clickde()" class="card-inner">
            <div class="la-file-name"  >
                <div class="fi" :class="mediaIcon.type" :style="{ color: mediaIcon.color }">
                    <div class="la-fia" v-if="mediaIcon.avatar">
                        <v-avatar   size="166" tile v-html="mediaIcon.icon"></v-avatar>
                    </div>
                    
                    <div v-else class="la-fii">
                        <v-img
                            v-if="media.type == 'image'"
                            :src="fileUrl"
                            height="166"
                            :lazy-src="fileUrl" >
                            </v-img>
                    </div>
                    

                </div>
                <div class="fn">
                    <div class="fn-i">
                        <span class="fn-i-i" :style="{ color: mediaIcon.color }" size="15" tile v-html="mediaIcon.icon">
                          </span>
                        <div class="fn-i-t">
                            <span class="filename" v-text="media.name" v-if="!media.edit"></span>
                        </div>
                    </div>
                    
                </div>
            </div>
           
        </div>
    
    </div>
</template>


<script>

import Mixins from './mixin';
import { mapState } from 'vuex';


export default {
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
            submitting: false,
        }
    },
    mixins: [Mixins],
    computed: {
        ...mapState('Media', ['selectedFilesId']),
        mediaIcon () {
            return this.getMediaIcon(this.media.type)
        },
        fileUrl () {
            return window.location.origin +'/'+ this.media.url;
        },
        isSelected () {
            return this.selectedFilesId.findIndex(x => x == this.media.id) !== -1 ;
        }
    },
    methods: {
        renameMedia () {
            
            if (this.submitting) {
                return;
            }

            this.submitting = true;

            if (this.media.name == '') {
                this.$store.commit('setSnackbar',
                        {
                            message: 'Folder Name should not be null.',
                            status: '',
                            color: 'error',
                            show: true,
                        },
                        { root: true });
                this.$refs.medaiName.focus();
                this.submitting = false;
                return;
            }

            this.$emit('rename', this.media)

        },
        clickde () {
            
            if (this.media.type == 'folder') {
                this.$router.push({
                    name: 'singleFolder',
                    params: {
                        folderId: this.media.hash
                    }
                })
            }
        },
        selectItem (event) {
            let isMultiSelect = event.ctrlKey || event.metaKey;
            
            this.$store.commit("Media/selectFiles", { isMultiSelect: isMultiSelect, id: this.media.id });
            this.$store.commit("Media/selectMediaItem", this.media);
        },
        unselect () {
            this.$store.commit("Media/selectFiles", {  });
            this.$store.commit("Media/selectMediaItem", {});
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

    
</style>