<template>
    <div class="sex-chart">
        <div class="sex-chart__head">性别比例</div>
        <div class="sex-chart__chart">
            <i-chart :options="sexChart.options" :height="height" ref="sexChart" :noDataText="sexChart.noDataText"></i-chart>
        </div>
        <div class="sex-chart__info">
            <div class="sex-chart__info__male">
                <img src="../../../../assets/images/icon-male.svg" />
                <div class="sex-chart__info--description">
                    <span class="sex-chart__info--description--name">男</span>
                    <span class="sex-chart__info--description--num">{{data&&data[0]&&data[0].value}}%</span>
                </div>
            </div>
            <div class="sex-chart__info__female">
                <img src="../../../../assets/images/icon-female.svg" />
                <div class="sex-chart__info--description">
                    <span class="sex-chart__info--description--name">女</span>
                    <span class="sex-chart__info--description--num">{{data&&data[1]&&data[1].value}}%</span>
                </div>
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
            sexChart: {
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
            this.$refs.sexChart.resize();
        }
    },
    mounted() {},
    computed: {
        ...mapState([
            'chart',
        ])
    },
    methods: {
        renderChart() {
            if (this.data.length) {
                this.sexChart.options.series.push(this.sexChart.seriesOptions);
                chartUtil.mergeRecursive(this.sexChart.options.series[0], {
                    radius: '100%',
                    data: this.data
                });
                this.sexChart.noDataText = '';
            } else {
                this.sexChart.options.series = [];
                this.sexChart.noDataText = "暂无数据";
            }
        }
    }
}

</script>
<style>
@import './chart/module/portrait/sex-chart.less'

</style>
