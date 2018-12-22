<template>
    <v-dialog
      v-model="open"
      class="mpu"
      width="200"
      persistent
    >
    
      <v-card>
        <v-card-title
          class="headline grey lighten-2">
          Move To
           <v-card-actions>
                <v-btn icon light flat small color="red" @click.native="open = false">
                    <v-icon>close</v-icon>
                </v-btn>
            </v-card-actions>
          
        </v-card-title>
       

        <v-card-text class="recursive-folder">                
           <v-treeview
            v-model="moveid"
            :items="getNestedFolders"
            activatable
            active-class="grey lighten-4 indigo--text"
            selected-color="indigo"
            open-on-click
            selectable
            expand-icon="mdi-chevron-down"
            on-icon="mdi-bookmark"
            off-icon="mdi-bookmark-outline"
            indeterminate-icon="mdi-bookmark-minus"
          >
          </v-treeview> 
            
        </v-card-text>

        <v-card-actions>
          <v-btn
            color="error"
            flat
            @click="open = false"
          >
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>


<script>
import Mixin from './mixin';
import { mapState, mapGetters } from 'vuex';
import RecursiveFolder from './RecursiveFolder.vue';

export default {
    $_veeValidate: {
      validator: 'new'
    },
    components: {
        RecursiveFolder
    },
    data () {
        return {
            active: [],
            name: '',
            open: false,
            moveid: 0,
        }
    },
    mixins: [Mixin],
    mounted () {
        Bus.$on('moveTo', ()=> {
            this.open = !this.open;
        });

        // console.log(this.getNestedFolders);
    },
    computed: {
        ...mapState('Media', ['folders']),
        ...mapGetters( 'Media', ['getNestedFolders'] )
        
    },
    methods: {
        onSubmit () {
            this.$validator.validateAll();
            const item = {
                name: this.name,
                parent_id: this.currentFolderId
            }

            this.$store.dispatch('Media/addFolder', item)
                .then(() => {
                    this.open = false
                })
            
        },
        nestedView () {
            return 
        }
    }
}
</script>

<style>
.mpu .v-card__actions {
    border-top: 1px solid #ddd;
}

</style>