<template>
    <div   flat class="media-item">
        <div @click="clickde()" class="card-inner">
            <div class="la-file-name"  >
                <div class="fi" :class="getMediaIcon.type" :style="{ color: getMediaIcon.color }">
                    <div class="la-fia" v-if="getMediaIcon.avatar">
                        <v-avatar   size="166" tile v-html="getMediaIcon.icon"></v-avatar>
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
                        <span class="fn-i-i" :style="{ color: getMediaIcon.color }" size="15" tile v-html="getMediaIcon.icon">
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
    computed: {
        getMediaIcon () {
            return [
                    {
                        type: 'folder',
                        icon: '<span class="lafi material-icons">folder</span>',
                        color: "#fbc02d",
                        avatar: true,
                    },
                    {
                        type: 'text',
                        icon: '<span class="lafi flaticon-txt"></span>',
                        color: '#2196f3',
                        avatar: true,
                    },
                    {
                        type: 'audio',
                        icon: '<span class="lafi flaticon-mp3"></span>',
                        color: '#ff9800',
                        avatar: true,
                    },
                    {
                        type: 'pdf',
                        icon: '<span class="lafi flaticon-pdf"></span>',
                        color: '#f44336',
                        avatar: true,
                    },
                    {
                        type: 'archive',
                        icon: '<span class="lafi flaticon-zip"></span>',
                        color: '#FBC02D',
                        avatar: true,
                    },
                    {
                        type: 'video',
                        icon: '<span class="lafi flaticon-mp4"></span>',
                        color: '#f44336',
                        avatar: true,
                    },
                    {
                        type: 'ai',
                        icon: '<span class="lafi flaticon-ai"></span>',
                        color: '#D9D7CA',
                        avatar: true,
                    },
                    {
                        type: 'avi',
                        icon: '<span class="lafi flaticon-avi"></span>',
                        color: '#C8BDB8',
                        avatar: true,
                    },
                    {
                        type: 'css',
                        icon: '<span class="lafi flaticon-css"></span>',
                        color: '#0096E6',
                        avatar: true,
                    },
                    {
                        type: 'csv',
                        icon: '<span class="lafi flaticon-csv"></span>',
                        color: '#C8BDB8',
                        avatar: true,
                    },
                    {
                        type: 'dbf',
                        icon: '<span class="lafi flaticon-dbf"></span>',
                        color: '#C8BDB8',
                        avatar: true,
                    },
                    {
                        type: 'doc',
                        icon: '<span class="lafi flaticon-doc"></span>',
                        color: '#8697CB',
                        avatar: true,
                    },
                    {
                        type: 'html',
                        icon: '<span class="lafi flaticon-html"></span>',
                        color: '#EC6630',
                        avatar: true,
                    },
                    {
                        type: 'flash',
                        icon: '<span class="lafi flaticon-flash"></span>',
                        color: '#7A2F32',
                        avatar: true,
                    },
                    {
                        type: 'iso',
                        icon: '<span class="lafi flaticon-iso"></span>',
                        color: '#E9E9E0',
                        avatar: true,
                    },
                    {
                        type: 'javascript',
                        icon: '<span class="lafi flaticon-javascript"></span>',
                        color: '#EEAF4B',
                        avatar: true,
                    },
                    {
                        type: 'mp3',
                        icon: '<span class="lafi flaticon-mp3"></span>',
                        color: '#7D6599',
                        avatar: true,
                    },
                    {
                        type: 'ppt',
                        icon: '<span class="lafi flaticon-ppt"></span>',
                        color: '#C8BDB8',
                        avatar: true,
                    },
                    {
                        type: 'psd',
                        icon: '<span class="lafi flaticon-psd"></span>',
                        color: '#C8BDB8',
                        avatar: true,
                    },
                    {
                        type: 'xls',
                        icon: '<span class="lafi flaticon-xls"></span>',
                        color: '#C8BDB8',
                        avatar: true,
                    },
                    {
                        type: 'xml',
                        icon: '<span class="lafi flaticon-xml"></span>',
                        color: '#F29C1F',
                        avatar: true,
                    },
                    {
                        type: 'image',
                        icon: '<span class="lafi flaticon-jpg"></span>',
                        avatar: false,
                    }
                ].find( icon => 
                    icon.type == this.media.type
                ) || {};
        },
        fileUrl () {
            return window.location.origin +'/'+ this.media.url;
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