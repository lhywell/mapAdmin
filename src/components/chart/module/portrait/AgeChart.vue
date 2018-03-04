<template>
    <div class="age-chart">
        <div class="age-chart__head">年龄比例</div>
        <div class="age-chart__chart">
            <i-chart :options="ageChart.options" :height="height" ref="ageChart" :noDataText="ageChart.noDataText"></i-chart>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import iChart from '../../base/chart';
import chartConfig from "../chart.config";
import chartUtil from "../chart.util";
export default {
    props: {
        data: {
            type: Array,
            default: function() {
                return [];
            }
        },
        height: {
            type: Number,
            default: function() {
                return 200;
            }
        }
    },
    computed: {
        ...mapState([
            'chart',
        ])
    },
    data() {
        return {
            ageChart: {
                options: chartConfig.getBarBaseConfig(),
                noDataText: ''
            }
        }
    },
    components: {
        iChart
    },
    watch: {
        data(val, oldVal) {
            this.renderChart();
        },
        'chart.selected' (val, oldVal) {
            this.$refs.ageChart.resize();
        },

    },
    mounted() {},
    methods: {
        renderChart() {
            let xAxisData = [],
                seriesData = [],
                series = {
                    name: '',
                    type: 'bar',
                    barWidth: '16',
                    label: {
                        show: true,
                        formatter: '{c}%',
                        position: 'top',
                        fontFamily: 'HelveticaNeue',
                        fontFize: 14,
                        color: 'rgba(23, 35, 61, 0.75)',
                        lineHeight: 22
                    },
                    data: []
                };
            this.data.forEach((item) => {
                xAxisData.push(item.name);
                seriesData.push(item.value);
            });
            series.data = seriesData;
            chartUtil.mergeRecursive(this.ageChart.options.tooltip, {
                show: false
            });
            this.ageChart.options.xAxis = this.ageChart.options.xAxis.map(item => {
                return chartUtil.mergeRecursive(item, { data: xAxisData });
            });
            this.ageChart.options.series = seriesData.length ? [series] : [];
            this.ageChart.noDataText = !this.ageChart.options.series.length ? '暂无数据' : '';

        }
    }
}

</script>
<style>
@import './chart/module/portrait/age-chart.less'

</style>
