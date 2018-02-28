<template>
    <div class="income-chart">
        <div class="income-chart__head">家庭月收入</div>
        <div class="income-chart__chart">
            <i-chart :options="incomeChart.options" :height="height" ref="incomeChart" :noDataText="incomeChart.noDataText"></i-chart>
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
    data() {
        return {
            incomeChart: {
                options: chartConfig.getHorizontalBarBaseConfig(),
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
            this.$refs.incomeChart.resize();
        }

    },
    computed: {
        ...mapState([
            'chart',
        ])
    },
    mounted() {},
    methods: {
        renderChart() {
            let yAxisData = [],
                series = {
                    name: '',
                    type: 'bar',
                    barWidth: '16',
                    label: {
                        show: true,
                        formatter: '{c}%',
                        position: 'right',
                        fontFamily: 'HelveticaNeue',
                        fontFize: 14,
                        color: 'rgba(23, 35, 61, 0.75)',
                        lineHeight: 22
                    },
                    data: []
                },
                seriesData = [];
            this.data.forEach((item) => {
                yAxisData.push(item.name);
                seriesData.push(item.value);
            });
            series.data = seriesData;
            this.incomeChart.options.yAxis = this.incomeChart.options.yAxis.map(item => {
                return chartUtil.mergeRecursive(item, { data: yAxisData });
            });
            this.incomeChart.options.series = seriesData.length ? [series] : [];
            this.incomeChart.noDataText = !this.incomeChart.options.series.length ? '暂无数据' : '';

        }
    }
}

</script>
<style>
@import './chart/module/portrait/income-chart.less'

</style>
