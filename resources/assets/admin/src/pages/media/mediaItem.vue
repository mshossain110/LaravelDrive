<template>
    <v-card flat tile class="media-item mr-3 mt-3">
        <v-responsive width="166px" v-if="getMediaIcon.icon" :class="getMediaIcon.type" :style="{ color: getMediaIcon.color }" >
            <v-avatar size="166" tile v-html="getMediaIcon.icon"></v-avatar>
        </v-responsive>

        <v-responsive width="166px" v-if="media.type == 'image' && !getMediaIcon.icon">
            <v-img
                src="https://fyf.tac-cdn.net/images/products/large/TEV12-4.jpg"
                lazy-src="https://fyf.tac-cdn.net/images/products/large/TEV12-4.jpg"
                height="150px"
                class="grey lighten-2" >

                <v-layout
                    slot="placeholder"
                    fill-height
                    align-center
                    justify-center
                    ma-0
                    >
                    <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                </v-layout>

            </v-img>
        </v-responsive>

        <v-card-actions>
            {{media.name}}
            <v-spacer></v-spacer>
            <v-btn icon>
            <v-icon>favorite</v-icon>
            </v-btn>
            <v-btn icon>
            <v-icon>bookmark</v-icon>
            </v-btn>
            <v-btn icon>
            <v-icon>share</v-icon>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>


<script>
    export default {
        props: {
            media: {
                type: Object,
                required: true
            }
        },
        data () {
            return {
            }
        },
        computed: {
            getMediaIcon () {
                return [
                        {
                            type: 'folder',
                            icon: '<span class="lafi material-icons"  size="100">folder</span>',
                            color: "#fbc02d",
                        },
                        {
                            type: 'text',
                            icon: '<span class="lafi flaticon-txt"></span>',
                            color: '#2196f3',
                        },
                        {
                            type: 'audio',
                            icon: '<span class="lafi flaticon-mp3"></span>',
                            color: '#ff9800',
                        },
                        {
                            type: 'pdf',
                            icon: '<span class="lafi flaticon-pdf"></span>',
                            color: '#f44336',
                        },
                        {
                            type: 'archive',
                            icon: '<span class="lafi flaticon-zip"></span>',
                            color: '#FBC02D',
                        },
                        {
                            type: 'video',
                            icon: '<span class="lafi flaticon-mp4"></span>',
                            color: '#f44336',
                        },
                        {
                            type: 'ai',
                            icon: '<span class="lafi flaticon-ai"></span>',
                            color: '#D9D7CA',
                        },
                        {
                            type: 'avi',
                            icon: '<span class="lafi flaticon-avi"></span>',
                            color: '#C8BDB8',
                        },
                        {
                            type: 'css',
                            icon: '<span class="lafi flaticon-css"></span>',
                            color: '#0096E6',
                        },
                        {
                            type: 'csv',
                            icon: '<span class="lafi flaticon-csv"></span>',
                            color: '#C8BDB8',
                        },
                        {
                            type: 'dbf',
                            icon: '<span class="lafi flaticon-dbf"></span>',
                            color: '#C8BDB8',
                        },
                        {
                            type: 'doc',
                            icon: '<span class="lafi flaticon-doc"></span>',
                            color: '#8697CB',
                        },
                        {
                            type: 'html',
                            icon: '<span class="lafi flaticon-html"></span>',
                            color: '#EC6630',
                        },
                        {
                            type: 'flash',
                            icon: '<span class="lafi flaticon-flash"></span>',
                            color: '#7A2F32',
                        },
                        {
                            type: 'iso',
                            icon: '<span class="lafi flaticon-iso"></span>',
                            color: '#E9E9E0',
                        },
                        {
                            type: 'javascript',
                            icon: '<span class="lafi flaticon-javascript"></span>',
                            color: '#EEAF4B',
                        },
                        {
                            type: 'mp3',
                            icon: '<span class="lafi flaticon-mp3"></span>',
                            color: '#7D6599',
                        },
                        {
                            type: 'ppt',
                            icon: '<span class="lafi flaticon-ppt"></span>',
                            color: '#C8BDB8',
                        },
                        {
                            type: 'psd',
                            icon: '<span class="lafi flaticon-psd"></span>',
                            color: '#C8BDB8',
                        },
                        {
                            type: 'xls',
                            icon: '<span class="lafi flaticon-xls"></span>',
                            color: '#C8BDB8',
                        },
                        {
                            type: 'xml',
                            icon: '<span class="lafi flaticon-xml"></span>',
                            color: '#F29C1F',
                        },
                        {
                            type: 'image',
                            icon: false
                        }
                    ].find( icon => 
                        icon.type == this.media.type
                    ) || {};
            }
        },
        methods: {
            
        }
    }
</script>

<style>

.lafi.material-icons {
    font-size: 90px;

}

[class^="flaticon-"]:before, [class*=" flaticon-"]:before,
[class^="flaticon-"]:after, [class*=" flaticon-"]:after { 
    font-size: 90px;
    margin: 0;
}
    
</style>