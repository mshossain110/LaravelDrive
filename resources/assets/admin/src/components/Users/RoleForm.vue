<template>
    <VForm
        class="role-form"
        @submit.prevent="submitRole()"
    >
        <VCol
            cols="12"
        >
            <VTextField
                v-model="role.name"
                placeholder="Add Role"
                full-width
                hide-details
                light
                flat
                @focus="showFullForm()"
            />
        </VCol>
        <template
            v-if="showForm"
            transition="slide-y-transition"
        >
            <VCol
                cols="12"
            >
                <textarea v-model="role.description">Description </textarea>
            </VCol>
            <VCol cols="12">
                <Multiselect
                    v-model="role.permissions"
                    :options="permissions"
                    :multiple="true"
                    :group-select="true"
                    :searchable="false"
                    group-values="permissions"
                    group-label="model"
                    placeholder="Add Permissions"
                >
                    <span slot="noResult">
                        Oops! No Permissions found.
                        Consider changing the search query.
                    </span>
                </Multiselect>
            </VCol>
            <VCol cols="12">
                <VBtn
                    :loading="loading"
                    color="primery"
                    type="submit"
                    depressed
                    ripple
                    small
                    right
                >
                    Submit
                </VBtn>
                <VBtn
                    color="error"
                    depressed
                    ripple
                    small
                    right
                    @click="hideFullForm()"
                >
                    close
                </VBtn>
            </VCol>
        </template>
    </VForm>
</template>

<script>
import Multiselect from 'vue-multiselect';
import { mapState } from 'vuex';

export default {
    components: {
        Multiselect
    },
    $_veeValidate: {
        validator: 'new'
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
                    status: true
                };
            }
        },
        halfForm: {
            type: Boolean,
            default: true
        }
    },

    data () {
        return {
            loading: false,
            showForm: this.halfForm
        };
    },
    computed: {
        ...mapState('Users', ['permissions'])
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
                status: this.role.status
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
        }
    }
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
