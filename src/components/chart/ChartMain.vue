<template>
    <div class="chart-main" ref="chartMain">
        <flow-matching v-show="chart.selected==='1'"></flow-matching>
        <population-matching v-show="chart.selected==='2'"></population-matching>
        <regions-matching v-show="chart.selected==='4'"></regions-matching>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import FlowMatching from './module/flow-matching/FlowMatching';
import PopulationMatching from './module/population-matching/PopulationMatching';
import RegionsMatching from './module/regions-matching/RegionsMatching';
export default {
    data() {
        return {}
    },
    components: {
        FlowMatching,
        PopulationMatching,
        RegionsMatching
    },
    watch: {
        'chart.selected' (val, oldVal) {
            this.$refs.chartMain.scrollTo(0, 0);
        }
    },
    mounted() {

    },
    methods: {

    },
    computed: {
        ...mapState([
            'chart',
        ])
    },
    mounted() {},
    methods: {}
}

</script>
<style>
@import './chart/chart-main.less'

</style>
