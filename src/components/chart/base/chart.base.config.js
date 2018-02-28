import Util from './util';
export default {
    chartConfig() {
        return {
            color: ['#2D8CF0','#2DE2C5','#FCC45F','#FF8454','#DB425A'],
            tooltip: {
                trigger: 'axis',
                padding: [15, 15, 10, 15],
                    
            },
            legend: {
                type: "scroll",
                right: 0,
                top: 0,
                padding: 10,
                itemHeight: 5,
            },
            grid: {
                "top": "30px",
                "left": "0%",
                "right": "0%",
                "bottom": "0px",
                "containLabel": true
            },
            axis: {
                axisTick: {
                    show: true
                },
                axisLabel: {
                    show:true
                },
            },
            series: {
                axisTick: {
                    alignWithLabel: true
                }
            }
        }
    },
    /**
     * 获取echarts 基本配置信息
     * @param {any} options
     * @returns
     */
    getBaseOptions(options = {}) {
        const config = this.chartConfig();
        let defaults = Util.mergeRecursive({
            color: config.color,
            tooltip: config.tooltip,
            grid: config.grid,
            legend: config.legend
        }, options);

        defaults.xAxis||[].forEach((obj, index) => {
            // 防止覆盖用户自定义属性,所以首先将用户自定义属性全部赋给默认配置
            const axis = JSON.parse(JSON.stringify(config.axis))
            Util.mergeRecursive(axis, obj)
            // 默认配置全部赋值给用户自定义属性
            Util.mergeRecursive(obj, axis)
        })
        defaults.yAxis||[].forEach((obj, index) => {
            Util.mergeRecursive(config.axis, obj)
            Util.mergeRecursive(obj, config.axis)
        })
        defaults.series.forEach((obj, index) => {
            Util.mergeRecursive(config.series, obj)
            Util.mergeRecursive(obj, config.series)
        })
        if (defaults.legend.data) {
            defaults.legend.data.forEach((obj, index) => {
                Util.mergeRecursive(config.legendData, obj)
                Util.mergeRecursive(obj, config.legendData)
            })
        }
        return defaults
    }
}