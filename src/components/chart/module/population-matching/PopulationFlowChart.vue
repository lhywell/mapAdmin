<template>
    <div class="populationflow-matching__flowchart">
        <div class="populationflow-matching__flowchart__con">
            <div class="population-matching__populationechart__con__head">
                <span class="population-matching__populationechart__con__head--title">人口变化</span>
            </div>
            <div class="population-matching__populationechart__con__main">
                <div class="population-matching__populationechart__con__main__info">
                    <div class="population-matching__populationechart__con__main__info--title">
                        总人口
                        <span class="population-matching__populationechart__con__main__info--num">{{$utils.milliFormat(info.total)}}</span>
                    </div>
                </div>
                <i-chart :options="flowChart.options" ref="chart" :height="220" :noDataText="flowChart.noDataText"></i-chart>
            </div>
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
            type: Object,
            default: function() {
                return {};
            }
        },
        info: {
            type: Object,
            default: function() {
                return {

                };
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
            NAMES: {
                total: '总人口',
                // live: '居住人数',
                // work: '工作人数'
            },
            flowChart: {
                options: chartConfig.getLineBaseConfig(),
                noDataText: ''
            }
        }
    },
    components: {
        iChart
    },
    watch: {
        data(val, oldVal) {
            this.renderFlowhart();
        },
        'chart.selected' (val, oldVal) {
            this.$refs.chart.resize();
        },
    },
    mounted() {},
    methods: {
        renderFlowhart() {
            let legendData = [],
                xAxisData = [],
                series = [];
            if (this.data && (Object.keys(this.data)).length) {
                xAxisData = (this.data.total || []).map(item => {
                    const key = item.key;
                    return key.substring(0, 4) + '年' + (key.substring(5, 6) === '1' ? '上半年' : '下半年');
                });

                for (let key in this.data) {
                    const name = this.NAMES[key];
                    if (name) {
                        const item = this.data[key];
                        let seriesData = (item || []).map(val => {
                            return val.value / 10000;
                        });
                        series.push({
                            name: name,
                            type: 'line',
                            smooth: true, //是否平滑显示
                            symbol: 'none', //折线上点的样式
                            data: seriesData
                        });
                        legendData.push({
                            icon: 'rect',
                            name: name
                        });
                    }

                }
                chartUtil.mergeRecursive(this.flowChart.options.tooltip, {
                    padding: [5, 5],
                    formatter: (params) => {
                        let str = `<div style='padding:10px;'>${params[0].axisValue}</br>`;
                        params.forEach((item) => {
                            const icon = this.$echarts.format.getTooltipMarker(item.color);
                            str += `${icon}${item.seriesName}:${this.$utils.milliFormat(item.value)}</br>`;
                        });
                        return str + '</div>';
                    },
                    position: chartUtil.setPosition
                });
                chartUtil.mergeRecursive(this.flowChart.options.grid, {
                    top: '50px',
                });
                chartUtil.mergeRecursive(this.flowChart.options.legend, {
                    itemWidth: 16,
                    itemHeight: 4,
                    data: legendData
                });
                chartUtil.mergeRecursive(this.flowChart.options.legend.textStyle, {
                    padding: [0, 8, 0, 0],
                });
                chartUtil.mergeRecursive(this.flowChart.options.xAxis[0].axisLabel, {
                    formatter: (value, index) => {
                        return index === xAxisData.length-1 ? '{lastLabel|' + value + '}' : value;
                    },
                    rich: {
                        lastLabel: {
                            padding: [0, 40, 0, 0]

                        }
                    }
                });
                chartUtil.mergeRecursive(this.flowChart.options.yAxis[0].axisLabel, {
                    formatter: (value) => {
                        return `${value}W`;
                    }
                });
                this.flowChart.options.xAxis[0].data = xAxisData;
                this.flowChart.options.series = series;
                this.flowChart.noDataText = '';
            } else {
                this.flowChart.options.series = series;
                this.flowChart.noDataText = '暂无数据';
            }

        }
    }
}

</script>
<style>
@import './chart/module/population-matching/population-flow-chart.less'

</style>
