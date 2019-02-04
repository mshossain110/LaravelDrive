<template>
    <VCard>
        <VLayout>
            <VFlex
                xs5
                class="counter-icon"
            >
                <VIcon
                    v-if="icon"
                >
                    {{ icon }}
                </VIcon>
            </VFlex>
            <VFlex xs7>
                <VCardTitle
                    primary-title
                    class="d-block"
                >
                    <slot />
                </VCardTitle>
            </VFlex>
        </VLayout>
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
    font-size: 60px;
}
</style>
