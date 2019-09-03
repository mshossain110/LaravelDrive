<template>
    <VCard>
        <VRow no-gutters>
            <VCol
                cols="3"
                class="counter-icon"
            >
                <VIcon
                    v-if="icon"
                >
                    {{ icon }}
                </VIcon>
            </VCol>
            <VCol cols="9">
                <VCardTitle
                    class="d-block body-1"
                >
                    <slot />
                </VCardTitle>
            </VCol>
        </VRow>
    </VCard>
</template>

<script>
export default {
    props: {
        icon: {
            type: String,
            default: ''
        },
        image: {
            type: String,
            default: ''
        }
    },
    data () {
        return {

        }
    }
}
</script>

<style>
.counter-icon {
    display: flex;
    justify-content: center;
    align-items: center
}
.counter-icon .v-icon {
    font-size: 30px;
}
</style>
