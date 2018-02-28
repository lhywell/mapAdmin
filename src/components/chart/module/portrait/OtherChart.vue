<template>
    <div class="other-chart">
        <div class="other-chart__head">其它</div>
        <div class="other-chart__chart">
            <i-chart :options="houseChart.options" :height="height" ref="houseChart" :noDataText="houseChart.noDataText"></i-chart>
            <i-chart :options="carChart.options" :height="height" ref="carChart" :noDataText="carChart.noDataText"></i-chart>
            <i-chart :options="marriedChart.options" :height="height" ref="marriedChart" :noDataText="marriedChart.noDataText"></i-chart>
            <i-chart :options="babyChart.options" :height="height" ref="babyChart" :noDataText="babyChart.noDataText"></i-chart>
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
                return 100;
            }
        }
    },
    data() {
        return {
            NAMES: {
                "有房": "houseChart",
                "有车": "carChart",
                "已婚": "marriedChart",
                "育儿": "babyChart"
            },
            color: chartConfig.getColor(),
            houseChart: {
                options: chartConfig.getPieBaseConfig(),
                seriesOptions: chartConfig.getPieBaseConfig().series[0],
                noDataText: ''
            },
            carChart: {
                options: chartConfig.getPieBaseConfig(),
                seriesOptions: chartConfig.getPieBaseConfig().series[0],
                noDataText: ''
            },
            marriedChart: {
                options: chartConfig.getPieBaseConfig(),
                seriesOptions: chartConfig.getPieBaseConfig().series[0],
                noDataText: ''
            },
            babyChart: {
                options: chartConfig.getPieBaseConfig(),
                seriesOptions: chartConfig.getPieBaseConfig().series[0],
                noDataText: ''
            },
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
            this.$refs.houseChart.resize();
            this.$refs.carChart.resize();
            this.$refs.marriedChart.resize();
            this.$refs.babyChart.resize();
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
            const keys = Object.keys(this.NAMES);
            this.data.forEach((item) => {
                const chart = this[this.NAMES[item.name]];
                if (Object.prototype.toString.call(item.value) === '[object Number]') {
                    // item.selected = true;
                    const data = [item, { name: ' ', value: 100 - item.value }];
                    chart.options.color = [this.color[keys.indexOf(item.name)], '#F2F2F3'];

                    chartUtil.mergeRecursive(chart.options.series[0], {
                        radius: ['100%', '90%'],
                        center: ['50%', '50%'],
                        label: {
                            show: true,
                            position: "center",
                            formatter: (params, ticket, callback) => {
                                return params.name !== ' ' ? (
                                    "{name|" +
                                    params.name +
                                    "}\n{value|" +
                                    params.value +
                                    "%}"
                                ) : '';
                            },
                            rich: {
                                name: {
                                    fontFamily: 'PingFangSC-Regular',
                                    fontSize: 14,
                                    color: 'rgba(23, 35, 61, 0.55)',
                                    lineHeight: 28
                                },
                                value: {
                                    fontFamily: 'HelveticaNeue',
                                    fontSize: 20,
                                    color: '#495060',
                                    lineHeight: 28
                                }
                            }
                        },
                        data,
                    });
                    chart.noDataText = '';
                } else {
                    chart.options.series = [];
                    chart.noDataText = "暂无数据";
                }

            });

        }
    }
}

</script>
<style>
@import './chart/module/portrait/other-chart.less'

</style>
