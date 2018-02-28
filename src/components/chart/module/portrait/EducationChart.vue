<template>
    <div class="education-chart">
        <div class="education-chart__head">学历分布</div>
        <div class="education-chart__chart">
            <i-chart :options="educationChart.options" :height="height" ref="educationChart" :noDataText="educationChart.noDataText"></i-chart>
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
    computed: {
        ...mapState([
            'chart',
        ])
    },
    data() {
        return {
            color: chartConfig.getColor(),
            educationChart: {
                options: chartConfig.getPieBaseConfig(),
                seriesOptions: chartConfig.getPieBaseConfig().series[0],
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
            this.$refs.educationChart.resize();
        }
    },
    mounted() {},
    methods: {
        renderChart() {
            if (this.data.length) {

                let legendMap = {};
                this.educationChart.options.series.push(this.educationChart.seriesOptions);
                this.educationChart.options.color = ['#34508C', '#2B85E4', '#1CB6FB', '#1BDBF5', '#14E3C5', '#80F2DA'];
                this.data.forEach((item) => {
                    legendMap[item.name] = item.value;
                });
                //计算数据占比
                const legendScaleMap = chartUtil.scale(legendMap);
                // debugger
                chartUtil.mergeRecursive(this.educationChart.options.legend, {
                    show: true,
                    left: '60%',
                    data: Object.keys(legendMap),
                    padding: [0, 15, 9, 0],
                    textStyle: {
                        padding: [0, 0, 0, 0],
                        height: 16,
                        rich: {
                            text: {
                                width: 42,
                                padding: [0, 60, 0, 0],
                                fontFamily: 'PingFangSC-Regular',
                                fontSize: 14,
                                color: '#495060'
                            },
                            scale: {
                                width: 35,
                                padding: [0, 30, 0, 0],
                                fontFamily: 'HelveticaNeue',
                                fontSize: 14,
                                color: 'rgba(23, 35, 61, 0.55)'
                            },
                            value: {
                                fontFamily: 'HelveticaNeue',
                                fontSize: 14,
                                color: '#495060'
                            }
                        }
                    },
                    formatter: (name) => {
                        return '{text|' + name + '}{scale|' + legendScaleMap[name] + '%}';

                    }
                });
                chartUtil.mergeRecursive(this.educationChart.options.series[0], {
                    radius: ['100%', '80%'],
                    center: ['25%', '50%'],
                    itemStyle: {
                        borderWidth: 3,
                        borderColor: 'rgba(255,255,255,1)'
                    },
                    data: this.data
                });
                this.educationChart.noDataText = '';
            } else {
                this.educationChart.options.series = [];
                this.educationChart.noDataText = '暂无数据';
            }
        }
    }
}

</script>
<style>
@import './chart/module/portrait/education-chart.less'

</style>
