<template>
    <div class="jakmall__indicator-step--outer">
        <ul>
            <li v-for="(indicator, index) in indicators" :key="indicator.key">
                <span :class="{'active':(index + 1) === activeStep}">{{ indicator.key }}</span>
                <span>{{ indicator.step }}</span>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    props: [
        'indicators'
    ],
    computed: {
        activeStep() {
            return this.$store.getters.getActiveStep;
        }
    }
}
</script>
<style lang="stylus">

</style>
