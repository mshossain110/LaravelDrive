<template>
    <div class="d-block">
        <VRow dense>
            <VCol
                cols="12"
                sm="6"
                md="3"
            >
                <WidgetCount
                    class="ml-3"
                    icon="mdi-multimedia"
                >
                    <span class="d-block">
                        Total Files
                    </span>
                    <span class="d-block">
                        3796
                    </span>
                </WidgetCount>
            </VCol>

            <VCol
                cols="12"
                sm="6"
                md="3"
            >
                <WidgetCount
                    class="ml-3"
                    icon="mdi-folder-open"
                >
                    <span class="d-block">
                        Total Folders
                    </span>
                    <span class="d-block">
                        56
                    </span>
                </WidgetCount>
            </VCol>

            <VCol
                cols="12"
                sm="6"
                md="3"
            >
                <WidgetCount
                    class="ml-3"
                    icon="mdi-account-group"
                >
                    <span class="d-block">
                        Total Users
                    </span>
                    <span class="d-block">
                        23
                    </span>
                </WidgetCount>
            </VCol>

            <VCol
                cols="12"
                sm="6"
                md="3"
            >
                <WidgetCount
                    class="ml-3"
                    icon="mdi-memory"
                >
                    <span class="d-block">
                        Total Space Used
                    </span>
                    <span>
                        650.3 MB
                    </span>
                </WidgetCount>
            </VCol>
        </VRow>
    </div>
</template>

<script>

import WidgetCount from './Widgets/Count.vue';

export default {
    components: {
        WidgetCount
    },
    data () {
        return {

        };
    },
    computed: {

    },
    created () {

    },
    methods: {

    }
};
</script>

<style>

</style>
