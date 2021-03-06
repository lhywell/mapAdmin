<template>
    <Card class="flow-matching__flowchart" dis-hover>
        <p slot="title">
            客流分析
        </p>
        <Tabs :value="activeName" @on-click="changeTab" ref="tabs">
            <TabPane v-for="item in tabs" :key="item.key" :label="item.value" :name="item.key"></TabPane>
        </Tabs>
        <i-chart :options="flowChart.options" :height="220" ref="chart" :noDataText="flowChart.noDataText"></i-chart>
    </Card>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import iChart from '../../base/chart';
import chartConfig from "../chart.config";
import chartUtil from "../chart.util";
export default {
    props: {
        passengerAvgHourlyWeek: {
            type: Array,
            default: function() {
                return [];
            }
        },
        passengerAvgHourlyMonth: {
            type: Array,
            default: function() {
                return [];
            }
        },
        passengerDailyWeek: {
            type: Array,
            default: function() {
                return [];
            }
        },
        passengerDailyMonth: {
            type: Array,
            default: function() {
                return [];
            }
        }
    },
    data() {
        return {
            tabs: [{ key: 'passengerAvgHourlyWeek', value: '周平均客流' }, { key: 'passengerAvgHourlyMonth', value: '月平均客流' }, { key: 'passengerDailyWeek', value: '周每日客流' }, { key: 'passengerDailyMonth', value: '月每日客流' }],
            activeName: 'passengerAvgHourlyWeek',
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
        passengerAvgHourlyWeek() {
            if (this.activeName === this.tabs[0].key) {
                this.init();
            }
        },
        passengerAvgHourlyMonth() {
            if (this.activeName === this.tabs[1].key) {
                this.init();
            }
        },
        passengerDailyWeek() {
            if (this.activeName === this.tabs[2].key) {
                this.init();
            }
        },
        passengerDailyMonth() {
            if (this.activeName === this.tabs[3].key) {
                this.init();
            }
        },
        'chart.selected' (val, oldVal) {
            this.$refs.chart.resize();
        }
    },
    mounted() {},
    computed: {
        ...mapState([
            'chart',
        ])
    },
    methods: {
        init() {
            this.renderFlowhart();
        },
        /**
         * [renderFlowhart 解析客流分析图]
         */
        renderFlowhart() {
            let activeData = this[this.activeName] || [],
                xAxisData = [],
                seriesData = [];
            if (activeData && activeData.length) {
                activeData.forEach((item, index) => {
                    xAxisData.push(item.key);
                    seriesData.push(item.value);
                });
                this.flowChart.options.xAxis[0].data = xAxisData;
                chartUtil.mergeRecursive(this.flowChart.options.tooltip, {
                    padding: [5, 5],
                    formatter: (params) => {
                        let str = `<div style='padding:10px;'>${params[0].axisValue}</br>`;
                        params.forEach((item) => {
                            const icon = this.$echarts.format.getTooltipMarker(item.color);
                            str += `${icon}${item.seriesName}${item.value}</br>`;
                        });
                        return str + '</div>';
                    },
                    position: chartUtil.setPosition
                });
                chartUtil.mergeRecursive(this.flowChart.options.yAxis[0].axisLabel, {
                    formatter: (value) => {
                        return `${value}K`;
                    }
                });
                this.flowChart.options.series = [{
                    name: '',
                    type: 'line',
                    smooth: true, //是否平滑显示
                    symbol: 'none', //折线上点的样式
                    "areaStyle": {
                        opacity: 0.3
                    },
                    data: seriesData
                }];
            } else {
                this.flowChart.options.series = [];
            }
            this.flowChart.noDataText = !this.flowChart.options.series.length ? '暂无数据' : '';
        },
        changeTab(val) {
            this.activeName = val;
            this.renderFlowhart();
            this.$nextTick(() => {
                setTimeout(() => {
                    const tabs = this.$refs.tabs;
                    const index = tabs.navList.findIndex((nav) => nav.name === tabs.activeKey);
                    const inkBar = tabs.$refs.navScroll.children[0].children[0];
                    const left = (tabs.barOffset ? tabs.barOffset + index * 8.4 : 0) + 'px';//8.4=24.4-16(iview默认margin-right)
                    inkBar.style.transform = `translate3d(${left}, 0px, 0px)`;
                }, 100)
            });
        }
    }
}

</script>
<style>
@import './chart/module/flow-matching/flow-chart.less'

</style>
