<template>
    <v-form
        class="role-form"
        @submit.prevent="submitRole()">
        <v-flex
            xs12>
            <v-text-field
                v-model="role.name"
                placeholder="Add Role"
                full-width
                hide-details
                light
                flat
                @focus="showFullForm()"/>
        </v-flex>
        <template
            v-if="showForm"
            transition="slide-y-transition">
            <v-flex
                xs12>
                <textarea v-model="role.description" >Description </textarea>
            </v-flex>
            <v-flex xs12>
                <multiselect
                    v-model="role.permissions"
                    :options="permissions"
                    :multiple="true"
                    :group-select="true"
                    :searchable="false"
                    group-values="permissions"
                    group-label="model"
                    placeholder="Add Permissions">

                    <span slot="noResult">
                        Oops! No Permissions found.
                        Consider changing the search query.
                    </span>
                </multiselect>
            </v-flex>
            <v-flex xs12>
                <v-btn
                    :loading="loading"
                    color="primery"
                    type="submit"
                    depressed
                    ripple
                    small
                    right>
                    Submit
                </v-btn>
                <v-btn
                    color="error"
                    depressed
                    ripple
                    small
                    right
                    @click="hideFullForm()">
                    close
                </v-btn>
            </v-flex>
        </template>
    </v-form>
</template>

<script>
import Multiselect from 'vue-multiselect';
import { mapState } from 'vuex';

export default {
    components: {
        Multiselect,
    },
    $_veeValidate: {
        validator: 'new',
    },
    props: {
        role: {
            type: Object,
            default () {
                return {
                    id: '',
                    name: '',
                    description: '',
                    permissions: [],
                    status: true,
                };
            },
        },
        halfForm: {
            type: Boolean,
            default: true,
        },
    },

    data () {
        return {
            loading: false,
            showForm: this.halfForm,
        };
    },
    computed: {
        ...mapState('Users', ['permissions']),
    },
    created () {
        this.$store.dispatch('Users/getPermissions');
    },
    methods: {
        submitRole () {
            this.loading = true;
            const role = {
                id: this.role.id,
                name: this.role.name,
                description: this.role.description,
                permissions: this.role.permissions,
                status: this.role.status,
            };
            if (!this.role.id) {
                this.$store.dispatch('Users/addRole', role)
                    .then(() => {
                        this.loading = false;

                        this.$emit('close', 'true');
                        this.showForm = false;
                    })
                    .catch(() => {
                        this.loading = false;
                    });
            } else {
                this.$store.dispatch('Users/updateRole', role)
                    .then(() => {
                        this.loading = false;
                        this.$emit('close', 'true');
                        this.showForm = false;
                    })
                    .catch(() => {
                        this.loading = false;
                    });
            }
        },
        showFullForm () {
            this.showForm = true;
        },
        hideFullForm () {
            this.$emit('close', 'true');
            this.showForm = false;
        },
    },
};
</script>

<style lang="css">
form.role-form {
    background: #fff;
    padding: 10px;
    border: 1px solid #ddd;
}
.role-form .v-input__control {
    border: 1px solid #ddd;
    padding: 5px 0 !important;
}
.role-form textarea {
    border: 1px solid #ddd;
    margin: 10px 0px;
    width: 100%;
    padding: 5px;
}
.role-form button {
    margin-top: 13px;
    right: 8px;
}
.role-form .multiselect__tags {
    border-radius: 0;
}
</style>
