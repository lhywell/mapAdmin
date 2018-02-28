<template>
    <div class="consume-chart">
        <div class="consume-chart__head">综合消费能力</div>
        <div class="consume-chart__chart">
            <i-chart :options="consumeChart.options" :height="height" ref="consumeChart" :noDataText="consumeChart.noDataText"></i-chart>
        </div>
        <div class="consume-chart__info">
            <div v-for="(item,index) in data" class="consume-chart__info--description">
                <span class="consume-chart__info--description--name">{{item.name}}</span>
                <span class="consume-chart__info--description--color" :style="{'background':color[index]}"></span>
                <span class="consume-chart__info--description--num">{{item.value}}%</span>
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
    computed: {
        ...mapState([
            'chart',
        ])
    },
    data() {
        return {
            color: chartConfig.getColor(),
            consumeChart: {
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
            this.$refs.consumeChart.resize();
        }
    },
    mounted() {},
    methods: {
        renderChart() {
            if (this.data.length) {
                this.consumeChart.options.series.push(this.consumeChart.seriesOptions);
                chartUtil.mergeRecursive(this.consumeChart.options.series[0], {
                    radius: ['100%', '80%'],
                    data: this.data
                });
                this.consumeChart.noDataText = '';
            } else {
                this.consumeChart.options.series = [];
                this.consumeChart.noDataText = "暂无数据";
            }
        }
    }
}

</script>
<style>
@import './chart/module/portrait/consume-chart.less'

</style>
