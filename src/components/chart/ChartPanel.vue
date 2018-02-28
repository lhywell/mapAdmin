<template>
    <div class="chart-panel" :class="chart.switchPanel?'chart-panel--fadeIn':'chart-panel--fadeOut'">
        <div class="chart-panel__flexbtn" @click="setSwitchPanel(false)">
            <Icon :type="chart.switchPanel?'chevron-right':'chevron-left'"></Icon>
        </div>
        <div class="chart-panel-main">
            <chart-head></chart-head>
            <chart-tab></chart-tab>
            <chart-main></chart-main>
        </div>
    </div>
</template>
<script>
import ChartHead from './ChartHead';
import ChartTab from './ChartTab';
import ChartMain from './ChartMain';
import { mapState, mapActions } from 'vuex';
export default {
    data() {
        return {

        }
    },
    components: {
        ChartHead,
        ChartTab,
        ChartMain
    },
    computed: {
        ...mapState([
            'chart',
        ])
    },
    mounted() {},
    methods: {
        setSwitchPanel(val) {
            this.$store.dispatch('setSwitchPanel', val);
            this.$store.dispatch('setTabSelected', this.chart.tabs[0].value);
        }
    }
}

</script>
<style>
@import './chart/chart-panel.less'

</style>
