<template>
    <VLayout class="d-block">
        <VLayout
            row
            wrap
        >
            <VFlex
                xs12
                sm6
                md3
            >
                <WidgetCount
                    class="ml-3"
                    icon="perm_media"
                >
                    <strong class="d-block">
                        Total Files
                    </strong>
                    <strong class="d-block">
                        3796
                    </strong>
                </WidgetCount>
            </VFlex>

            <VFlex
                xs12
                sm6
                md3
            >
                <WidgetCount
                    class="ml-3"
                    icon="folder_open"
                >
                    <strong class="d-block">
                        Total Folders
                    </strong>
                    <strong class="d-block">
                        56
                    </strong>
                </WidgetCount>
            </VFlex>

            <VFlex
                xs12
                sm6
                md3
            >
                <WidgetCount
                    class="ml-3"
                    icon="people"
                >
                    <strong class="d-block">
                        Total Users
                    </strong>
                    <strong class="d-block">
                        23
                    </strong>
                </WidgetCount>
            </VFlex>

            <VFlex
                xs12
                sm6
                md3
            >
                <WidgetCount
                    class="ml-3"
                    icon="memory"
                >
                    <strong class="d-block">
                        Total Space Used
                    </strong>
                    <strong>
                        650.3 MB
                    </strong>
                </WidgetCount>
            </VFlex>
        </VLayout>
    </VLayout>
</template>

<script>

import WidgetCount from './Widgets/Count.vue'

export default {
    components: {
        WidgetCount
    },
    data () {
        return {

        }
    },
    computed: {

    },
    created () {

    },
    methods: {

    }
}
</script>

<style>

</style>
