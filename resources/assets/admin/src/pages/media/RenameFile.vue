<template>
    <v-dialog
      :value="open"
      class="mpu"
      width="500"
      persistent
    >
    <form @submit.prevent="onSubmit">
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
        >
          Rename File
        </v-card-title>

        <v-card-text>
          
                <v-text-field
                v-validate="'required'"
                v-model="selectedMedia.name"
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
            Rename
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
import { mapState } from "vuex";
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
            //name: this.selectedMedia.name,
        }
    },
    mixins: [Mixin],
    computed: {
        ...mapState('Media', [ 'selectedMedia']),
    },
    methods: {
        onSubmit () {
            this.$validator.validateAll();
            const item = {
                name: this.selectedMedia.name,
                id: this.selectedMedia.id
            }

            this.$store.dispatch('Media/updateItem', item)
                .then(() => {
                    this.close()
                })

        },
        close () {
            this.$store.commit('Media/renamefilemodal', false);
        }
    }
}
</script>

<style>
.mpu .v-card__actions {
    border-top: 1px solid #ddd;
}
</style>