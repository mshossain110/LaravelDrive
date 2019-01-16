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
                                :error-messages="errors.collect('firstname')"
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
                                :error-messages="errors.collect('lastname')"
                                label="Last Name"
                            />
                        </VFlex>
                        <VFlex xs12>
                            <VTextField
                                v-model="user.name"
                                v-validate="'required|min:6'"
                                :counter="6"
                                :disabled="Boolean(user.id)"
                                :error-messages="errors.collect('name')"
                                data-vv-name="name"
                                label="User Name*"
                                required
                            />
                        </VFlex>
                        <VFlex xs12>
                            <VTextField
                                v-model="user.email"
                                v-validate="'required|email'"
                                :disabled="Boolean(user.id)"
                                :error-messages="errors.collect('email')"
                                label="E-mail*"
                                data-vv-name="email"
                                required
                            />
                        </VFlex>

                        <VFlex xs12>
                            <VTextField
                                ref="password"
                                v-model="user.password"
                                v-validate="{ required: !user.id, min: 6 }"
                                :error-messages="errors.collect('password')"
                                name="password"
                                type="password"
                                label="Password"
                                data-vv-name="password"
                            />
                        </VFlex>
                        <VFlex xs12>
                            <VTextField
                                v-model="user.password_confirmation"
                                v-validate="{ required: !user.id, confirmed: 'password' }"
                                :error-messages="errors.collect('password_confirmation')"
                                name="password_confirmation"
                                type="password"
                                label="Confirmed Password"
                                data-vv-name="password_confirmation"
                            />
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
                    flat
                    @click.native="$emit('close', false)"
                >
                    Close
                </VBtn>
                <VBtn
                    color="blue darken-1"
                    flat
                    type="submit"
                >
                    Save
                </VBtn>
            </VCardActions>
        </form>
    </VCard>
</template>

<script>
import Multiselect from 'vue-multiselect'
import { mapState } from 'vuex'

export default {
    components: {
        Multiselect
    },
    $_veeValidate: {
        validator: 'new'
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
                }
            }
        }
    },

    data: () => ({

    }),
    computed: {
        ...mapState('Users', ['permissions'])
    },
    created () {
        this.$store.dispatch('Users/getPermissions')
    },
    methods: {
        submit () {
            this.$validator.validateAll()
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
            }
            if (!this.user.id) {
                this.$store.dispatch('Users/addUser', user)
                    .then(() => {
                        this.clear()
                        this.$emit('close', false)
                    })
            } else {
                this.$store.dispatch('Users/updateUser', user)
                    .then(() => {
                        this.$emit('close', false)
                    })
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
            }
        }
    }
}
</script>
