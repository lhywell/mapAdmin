<template>
    <div :style="{height:height?height+'px':'',lineHeight:height?height+'px':''}">
        <div v-show="options.series&&options.series.length" :id="defaults.id" class="chart-item" style="height:100%;">
        </div>
        <div v-show="noDataText" style="text-align: center;">
            {{noDataText}}
        </div>
    </div>
</template>
<script>
import Util from './util';
import chartConfig from './chart.base.config';
export default {
    props: {
        options: {
            type: Object,
            default: function() {
                return {}
            }
        },
        height: '',
        noDataText: ''

    },
    data() {
        return {
            defaults: {
                id: 'chart-' + (Math.random() * 100000).toFixed(0)
            },
            chartDOM: null,
        }
    },
    watch: {
        'options': {
            handler: function(val, oldVal) {
                this.defaults = Util.mergeRecursive(this.defaults, val);
                this.init();
            },
            deep: true
        }
    },
    mounted() {},
    beforeDestroy() {
        if (this.chartDOM) {
            window.removeEventListener('resize', this.chartDOM.resize, false);
            this.chartDOM.dispose();
            this.chartDOM = null;
        }
    },
    methods: {
        init() {
            // 获取echarts 基本配置信息
            this.defaults = chartConfig.getBaseOptions(this.defaults);
            if (!this.chartDOM) {
                this.chartDOM = this.$echarts.init(document.getElementById(this.defaults.id));
                window.addEventListener('resize', this.chartDOM.resize);
            }
            if (!this.noDataText) {
                // console.log(JSON.stringify(this.defaults));
                this.chartDOM.setOption(this.defaults, true);
                this.resize();
            }
        },
        resize() {
            if (this.chartDOM) {
                this.$nextTick(() => {
                    this.chartDOM.resize();
                });
            }
        }
    }
}
</script>