<template>
    <VCard>
        <form @submit.prevent="submit()">
            <VCardTitle>
                <span
                    v-if="user.id"
                    class="headline"
                >
                    Update User
                </span>
                <span
                    v-else
                    class="headline"
                >
                    New User
                </span>
            </VCardTitle>

            <VCardText>
                <VContainer grid-list-md>
                    <VLayout wrap>
                        <VFlex
                            xs12
                            sm6
                            md6
                        >
                            <VTextField
                                v-model="user.firstname"
                                label="First Name"
                            />
                        </VFlex>
                        <VFlex
                            xs12
                            sm6
                            md6
                        >
                            <VTextField
                                v-model="user.lastname"
                                label="Last Name"
                            />
                        </VFlex>
                        <VFlex xs12>
                            <ValidationProvider
                                v-slot="{ errors }"
                                :rules="'required|min:6'"
                            >
                                <VTextField
                                    v-model="user.name"
                                    v-validate=""
                                    :counter="6"
                                    :disabled="Boolean(user.id)"
                                    :error-messages="errors"
                                    label="User Name*"
                                    required
                                />
                            </ValidationProvider>
                        </VFlex>
                        <VFlex xs12>
                            <ValidationProvider
                                v-slot="{ errors }"
                                :rules="'required|email'"
                            >
                                <VTextField
                                    v-model="user.email"
                                    :disabled="Boolean(user.id)"
                                    :error-messages="errors"
                                    label="E-mail*"
                                    required
                                />
                            </ValidationProvider>
                        </VFlex>

                        <VFlex xs12>
                            <ValidationProvider
                                v-slot="{ errors }"
                                :rules="{ required: !user.id, min: 6 }"
                            >
                                <VTextField
                                    ref="password"
                                    v-model="user.password"
                                    :error-messages="errors"
                                    name="password"
                                    type="password"
                                    label="Password"
                                />
                            </validationprovider>
                        </VFlex>
                        <VFlex xs12>
                            <ValidationProvider
                                v-slot="{ errors }"
                                :rules="{ required: !user.id, confirmed: 'password' }"
                            >
                                <VTextField
                                    v-model="user.password_confirmation"
                                    name="password_confirmation"
                                    :error-messages="errors"
                                    type="password"
                                    label="Confirmed Password"
                                />
                            </ValidationProvider>
                        </VFlex>

                        <VFlex xs12>
                            <label class="typo__label">
                                Permissions
                            </label>
                            <Multiselect
                                v-model="user.permissions"
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
                        </VFlex>
                    </VLayout>
                </VContainer>

                <small>*indicates required field</small>
            </VCardText>
            <VDivider />
            <VCardActions>
                <VSpacer />
                <VBtn
                    color="blue darken-1"
                    text
                    @click.native="$emit('close', false)"
                >
                    Close
                </VBtn>
                <VBtn
                    color="blue darken-1"
                    text
                    type="submit"
                >
                    Save
                </VBtn>
            </VCardActions>
        </form>
    </VCard>
</template>

<script>
import Multiselect from 'vue-multiselect';
import { mapState } from 'vuex';

export default {
    components: {
        Multiselect
    },
    props: {
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
                    avatar: ''
                };
            }
        }
    },

    data: () => ({

    }),
    computed: {
        ...mapState('Users', ['permissions'])
    },
    created () {
        this.$store.dispatch('Users/getPermissions');
    },
    methods: {
        submit () {
            const user = {
                id: this.user.id,
                firstname: this.user.firstname,
                lastname: this.user.lastname,
                name: this.user.name,
                email: this.user.email,
                password: this.user.password,
                password_confirmation: this.user.password_confirmation,
                permissions: this.user.permissions,
                role: this.user.role,
                avatar: this.user.avatar
            };
            if (!this.user.id) {
                this.$store.dispatch('Users/addUser', user)
                    .then(() => {
                        this.clear();
                        this.$emit('close', false);
                    });
            } else {
                this.$store.dispatch('Users/updateUser', user)
                    .then(() => {
                        this.$emit('close', false);
                    });
            }
        },
        clear () {
            this.user = {
                firstname: '',
                lastname: '',
                name: '',
                email: '',
                permissions: [],
                role: 0,
                avatar: ''
            };
        }
    }
};
</script>
