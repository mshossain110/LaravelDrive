<template>
    <v-navigation-drawer
        class="media-info"
        :value="fileInfoSideBar"
        absolute
        right
        >
       <div class="mi-fh" v-if="hasItem" >

           <span class="fn-i-i" :style="{ color: mediaIcon.color }" size="15" tile v-html="mediaIcon.icon"></span>
           <h3>{{ selectedMedia.name }}</h3>
       </div>

       <div class="mi-fh pa-3" v-else >

           <span class="fn-i-i" :style="{ color: mediaIcon.color }" size="15" tile v-html="mediaIcon.icon"></span>
           <h3>My Files </h3>
       </div>

       <div class="la-toggle-bn" >
           <a href="#" v-if="tabActive == 1" :class="{'active': tabActive == 1 }" >Details</a>
           <a href="#" v-if="tabActive == 1" :class="{'active': tabActive == 2 }"  >Activities</a>
       </div>

       <div class="details pa-3" v-if="hasItem" >
           <v-img
                :src="fileUrl"
                :lazy-src="fileUrl" >
                </v-img>
            
            <div class="las-info-list">
                <div class="las-ii">
                    <span class="la-ik">File Name</span>
                    <span class="la-iv">{{ selectedMedia.name }}</span>
                </div>
                <div class="las-ii">
                    <span class="la-ik">Type</span>
                    <span class="la-iv">{{ selectedMedia.type }}</span>
                </div>
                <div class="las-ii">
                    <span class="la-ik">Size</span>
                    <span class="la-iv">{{ selectedMedia.file_size }}</span>
                </div>
                <div class="las-ii">
                    <span class="la-ik">Storate Used</span>
                    <span class="la-iv">{{ selectedMedia.file_size }}</span>
                </div>
                <div class="las-ii">
                    <span class="la-ik">Location</span>
                    <span class="la-iv">{{ selectedMedia.url }}</span>
                </div>
                <div class="las-ii">
                    <span class="la-ik">Owner</span>
                    <span class="la-iv">{{ selectedMedia.file_name }}</span>
                </div>
                <div class="las-ii">
                    <span class="la-ik">Created</span>
                    <span class="la-iv">{{ selectedMedia.created_at.date }}</span>
                </div>
                <div class="las-ii">
                    <span class="la-ik">Modified</span>
                    <span class="la-iv">{{ selectedMedia.updated_at.date }}</span>
                </div>
                <div class="las-ii">
                    <span class="la-ik">Description</span>
                    <span class="la-iv">{{ selectedMedia.description }}</span>
                </div>
                <div class="las-ii">
                    <span class="la-ik">File Name</span>
                    <span class="la-iv">{{ selectedMedia.file_name }}</span>
                </div>
            </div>
       </div>

       <div class="no-item pa-3" v-else >
           <v-icon color="gray" large>home</v-icon>

           <h4>Select a file or folder to view its details.</h4>
       </div> 

    </v-navigation-drawer>
</template>


<script>
import { mapState } from 'vuex';

import Mixins from './mixin';

export default {
    data () {
        return {
            tabActive: 1,
        }
    },
    mixins: [Mixins],
    computed: {
        ...mapState('Media', ['fileInfoSideBar', 'selectedMedia']),
        mediaIcon () {
            if (this.hasItem) {
                return this.getMediaIcon(this.selectedMedia.type)
            } else {
                return this.getMediaIcon('folder');
            }
        },
        fileUrl () {
            return window.location.origin +'/'+ this.selectedMedia.url;
        },
        hasItem () {
            return this.selectedMedia.hasOwnProperty('id');
        }
    },
    methods: {
        
    }
}
</script>

<style>
    .media-info {
        border-top: 1px solid #ddd;
    }
    .media-info .mi-fh {
        padding:20px 0px;
    }
    .media-info .mi-fh h3 {
        display: inline;
    }
    .la-toggle-bn {
        display: flex;
        justify-content: space-around;
        border-bottom: 1px solid #ddd;
    }
    .la-toggle-bn a {
        padding: 10px 20px;
        display: inline-block;
        font-size: 16px;
    }
    .la-toggle-bn a.active,
    .la-toggle-bn a:hover {
        text-decoration: none;
        border-bottom: 3px solid rgb(45, 111, 173);
    }
    .las-info-list {
        margin-top: 20px;
    }
    .las-ii {
        display: flex;
        justify-content: flex-start;
        align-items: self-start;
        padding: 7px 0px;
        text-overflow: clip;
        word-break: break-word;
        overflow: hidden;
    }

    .las-ii span.la-ik {
        flex: 0 0 120px;
        color: #757373;
    }
   

</style>