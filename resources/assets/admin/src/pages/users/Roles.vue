<template>
    <v-layout row>
        <v-flex
            xs12
            sm6>
            <v-card flat>
                <v-toolbar
                    flat
                    color="secondary">

                    <v-toolbar-title>Roles</v-toolbar-title>

                    <v-spacer />

                    <v-btn icon>
                        <v-icon>search</v-icon>
                    </v-btn>

                </v-toolbar>

                <v-list
                    two-line
                    subheader>

                    <v-list-tile
                        :to="{name: 'permissions', params: { id: 1 }}"
                        avatar
                        ripple>
                        <v-list-tile-content>
                            <v-list-tile-title>Profile photo</v-list-tile-title>
                            <v-list-tile-sub-title>
                                Change your Google+ profile photo
                            </v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>

                    <v-list-tile avatar>
                        <v-list-tile-content>
                            <v-list-tile-title>Show your status</v-list-tile-title>
                            <v-list-tile-sub-title>
                                Your status is visible to everyone
                            </v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>

            </v-card>
        </v-flex>
    </v-layout>
</template>


<script>
export default {
    data() {
        return {
            roles: [],
        };
    },
    computed: {
    },
    methods: {
    },
};
</script>
