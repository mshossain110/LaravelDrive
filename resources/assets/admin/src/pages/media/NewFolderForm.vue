<template>
    <v-dialog
      :value="open"
      class="mpu"
      width="500"
      persistent
    >
    <form @submit="onSubmit">
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
        >
          New Folder
        </v-card-title>

        <v-card-text>
          
                <v-text-field
                v-validate="'required'"
                v-model="name"
                :error-messages="errors.collect('name')"
                label="Name"
                data-vv-name="name"
                required
                ></v-text-field>
                
            
        </v-card-text>

        <v-card-actions>
         
          <v-btn
            color="info"
            type="submit"
            flat
          >
            Craete
          </v-btn>
          <v-btn
            color="error"
            flat
            @click="close"
          >
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
      </form>
    </v-dialog>
</template>


<script>
import Mixin from './mixin';

export default {
    $_veeValidate: {
      validator: 'new'
    },
    props: {
        open: {
            type: Boolean,
            default: false,
        }
    },
    data () {
        return {
            name: ''
        }
    },
    mixins: [Mixin],
    computed: {

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
                    this.close()
                })

        },
        close () {
            this.$store.commit('Media/newFolderModal', false);
            this.name = "";
        }
    }
}
</script>

<style>
.mpu .v-card__actions {
    border-top: 1px solid #ddd;
}
</style>