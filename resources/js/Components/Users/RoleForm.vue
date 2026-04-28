<template>
    <form class="border border-gray-200 bg-white p-4" @submit.prevent="submitRole()">
        <div class="mb-3">
            <input
                v-model="role.name"
                type="text"
                placeholder="Add Role"
                class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                @focus="showFullForm()"
            />
        </div>

        <template v-if="showForm">
            <div class="mb-3">
                <textarea
                    v-model="role.description"
                    placeholder="Description"
                    rows="3"
                    class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                />
            </div>

            <div class="mb-3">
                <Multiselect
                    v-model="role.permissions"
                    :options="permissions"
                    :multiple="true"
                    :group-select="true"
                    :searchable="false"
                    group-values="permissions"
                    group-label="model"
                    placeholder="Add Permissions"
                />
            </div>

            <div class="flex gap-2">
                <button
                    type="submit"
                    :disabled="loading"
                    class="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-50"
                >
                    <span v-if="loading">Saving...</span>
                    <span v-else>Submit</span>
                </button>
                <button
                    type="button"
                    class="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                    @click="hideFullForm()"
                >
                    Close
                </button>
            </div>
        </template>
    </form>
</template>

<script>
import Multiselect from 'vue-multiselect';
import { mapState } from 'vuex';

export default {
    components: {
        Multiselect
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
                    .catch(() => { this.loading = false; });
            } else {
                this.$store.dispatch('Users/updateRole', role)
                    .then(() => {
                        this.loading = false;
                        this.$emit('close', 'true');
                        this.showForm = false;
                    })
                    .catch(() => { this.loading = false; });
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
