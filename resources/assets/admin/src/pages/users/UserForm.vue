<template>
    <v-layout
        row
        justify-center>
        <v-dialog
            v-model="value"
            persistent
            max-width="500px">

            <v-card>
                <form @submit.prevent="submit()">
                    <v-card-title>
                        <span class="headline">New User</span>
                    </v-card-title>

                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex
                                    xs12
                                    sm6
                                    md6>
                                    <v-text-field
                                        v-model="user.firstname"
                                        :error-messages="errors.collect('firstname')"
                                        label="First Name"/>
                                </v-flex>
                                <v-flex
                                    xs12
                                    sm6
                                    md6>
                                    <v-text-field
                                        v-model="user.lastname"
                                        :error-messages="errors.collect('lastname')"
                                        label="Last Name" />
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field
                                        v-validate="'required|min:6'"
                                        v-model="user.name"
                                        :counter="6"
                                        :error-messages="errors.collect('name')"
                                        data-vv-name="name"
                                        label="User Name*"
                                        required />
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field
                                        v-validate="'required|email'"
                                        v-model="user.email"
                                        :error-messages="errors.collect('email')"
                                        label="E-mail*"
                                        data-vv-name="email"
                                        required />

                                </v-flex>

                                <v-flex xs12>
                                    <v-text-field
                                        v-validate="'required|min:6'"
                                        ref="password"
                                        v-model="user.password"
                                        :error-messages="errors.collect('password')"
                                        name="password"
                                        type="password"
                                        label="Password"
                                        data-vv-name="password"
                                        required />
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field
                                        v-validate="'required|confirmed:password'"
                                        v-model="user.password_confirmation"
                                        :error-messages="errors.collect('password_confirmation')"
                                        name="password_confirmation"
                                        type="password"
                                        label="Confirmed Password"
                                        data-vv-name="password_confirmation"
                                        required />
                                </v-flex>

                                <v-flex xs12>
                                    <label class="typo__label">Permissions</label>
                                    <multiselect
                                        v-model="user.permissions"
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

                            </v-layout>
                        </v-container>

                        <small>*indicates required field</small>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer/>
                        <v-btn
                            color="blue darken-1"
                            flat
                            @click.native="$emit('input', false)">
                            Close
                        </v-btn>
                        <v-btn
                            color="blue darken-1"
                            flat
                            type="submit">
                            Save
                        </v-btn>
                    </v-card-actions>
                </form>
            </v-card>
        </v-dialog>
    </v-layout>
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
        value: {
            type: Boolean,
            default: false,
        },
        user: {
            type: Object,
            default () {
                return {
                    firstname: '',
                    lastname: '',
                    name: '',
                    email: '',
                    password: '',
                    password_confirmation: '',
                    permissions: [],
                    role: 0,
                    avatar: '',
                };
            },
        },
    },

    data: () => ({

    }),
    computed: {
        ...mapState('Users', ['permissions']),
    },
    created () {
        this.$store.dispatch('Users/getPermissions');
    },
    methods: {
        submit () {
            this.$validator.validateAll();
            const user = {
                firstname: this.user.firstname,
                lastname: this.user.lastname,
                name: this.user.name,
                email: this.user.email,
                password: this.user.password,
                password_confirmation: this.user.password_confirmation,
                permissions: this.user.permissions,
                role: this.user.role,
                avatar: this.user.avatar,
            };
            this.$store.dispatch('Users/addUser', user);
            // this.clear();
        },
        clear () {
            this.user = {
                firstname: '',
                lastname: '',
                name: '',
                email: '',
                permissions: [],
                role: 0,
                avatar: '',
            };
        },
    },
};
</script>
