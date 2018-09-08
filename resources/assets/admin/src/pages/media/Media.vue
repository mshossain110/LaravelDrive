<template>
        <v-layout
        row
        wrap>
        <v-flex xs12>
            <v-toolbar
                flat
                light
                height="60px"
                color="secondary">
                <v-toolbar-title class="headline">
                    <v-icon>people</v-icon>
                    Media
                </v-toolbar-title>

                <v-spacer />

                <v-btn
                    icon
                   >
                    <v-icon>person_add</v-icon>
                </v-btn>

                <v-btn icon>
                    <v-icon>apps</v-icon>
                </v-btn>

                <v-btn icon>
                    <v-icon>refresh</v-icon>
                </v-btn>

                <v-btn icon>
                    <v-icon>more_vert</v-icon>
                </v-btn>
            </v-toolbar>
        </v-flex>

        <v-flex xs12>
            <dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions">
                
            </dropzone>
        </v-flex>
    </v-layout>
</template>


<script>
import Dropzone from '@ac/dropzone';


export default {
    components: {
        Dropzone,
    },
    data () {
        return {
            dropzoneOptions: {
                url: '/api/files',
                thumbnailWidth: 200,
                addRemoveLinks: true,
                dictDefaultMessage: "<i class='fa fa-cloud-upload'></i>UPLOAD ME"
            }
        }
    },
    computed: {
        
    },
    methods: {
        
    }
}
</script>

<style>
    
</style>