/**
 * chart图系统默认的配置项
 */
const FONTCOLOR = 'rgba(23,35,61,0.75)';
const LINECOLOR = 'rgba(23,35,61,0.35)';
const config = {
    rich: {
        white: {
            color: '#FFFFFF',
            align: 'center',
            padding: [10, 0],
            fontSize: 16,
        },
        gray: {
            color: 'rgba(255,255,255,0.56)',
            align: 'center',
            padding: [5, 0]
        }
    },
    /**
     * 获取饼图基本配置
     */
    getPieBaseConfig: () => {
        return {
            grid: {
                show: false
            },
            legend: {
                show: false,
                right: '0',
                left: '5%',
                top: 'middle',
                itemHeight: 10,
                itemWidth: 10,
                orient: 'vertical',
                textStyle: {
                    padding: [0, 0, 3, 8],
                    color: FONTCOLOR
                },
                data: []
            },
            series: [{
                type: 'pie',
                radius: ['50%', '70%'],
                center: ['45%', '50%'],
                label: {
                    show: false
                },
                //是否启用防止标签重叠策略，默认开启，在标签拥挤重叠的情况下会挪动各个标签的位置，防止标签间的重叠。如果不需要开启该策略，例如圆环图这个例子中需要强制所有标签放在中心位置，可以将该值设为 false
                avoidLabelOverlap: false,
                hoverAnimation: false, //是否开启 hover 在扇区上的放大动画效果
                data: []
            }]
        }
    },
    /**
     * 获取横向柱状图基本配置
     */
    getHorizontalBarBaseConfig: () => {
        return {
            grid: {
                top: '20px',
                left: '2%',
                right: '2%',
                bottom: '0px',
                containLabel: true
            },
            tooltip: {
                show: false
            },
            xAxis: [{
                type: 'value',
                boundaryGap: ["0", "23%"],
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: true,
                },
                axisLabel: {
                    show: false,
                },
            }],
            yAxis: [{
                type: 'category',
                data: [],
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    color: FONTCOLOR
                }
            }],
            series: [{
                type: 'bar',
                label: {
                    show: true,
                    position: 'right',
                    color: FONTCOLOR
                },
                barWidth: 16,
                data: []
            }]
        };
    },
    /**
     * 获取纵向柱状图基本配置
     */
    getBarBaseConfig: () => {
        return {
            grid: {
                top: '30px',
                left: '2%',
                right: '2%',
                bottom: '0',
                containLabel: true
            },
            tooltip: {
                show: true
            },
            legend: {
                show: false,
                type: 'scroll',
                textStyle: {
                    padding: [0, 0, 3, 8],
                    color: FONTCOLOR
                },
                data: []
            },
            xAxis: [{
                type: 'category',
                data: [],
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: LINECOLOR
                    }
                },
                axisTick: {
                    show: true,
                    alignWithLabel: true,
                    lineStyle: {
                        color: LINECOLOR
                    }
                },
                axisLabel: {
                    color: FONTCOLOR
                },
            }],
            yAxis: [{
                type: 'value',
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: false,
                    color: FONTCOLOR
                },
                splitLine: {
                    show: true

                },
            }],
            series: []
        };
    },
    /**
     * 获取折线图基本配置
     */
    getLineBaseConfig: () => {
        return {
            grid: {
                top: '30px',
                left: '0',
                right: '3%',
                bottom: '0px',
                containLabel: true
            },
            tooltip: {
                show: true,
                trigger: 'axis'
            },
            legend: {
                type: 'scroll',
                textStyle: {
                    padding: [0, 0, 3, 8],
                    color: FONTCOLOR
                },
                data: []
            },
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                data: [],
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: LINECOLOR
                    }
                },
                axisTick: {
                    show: true,
                    lineStyle: {
                        color: LINECOLOR
                    }
                },
                axisLabel: {
                    color: FONTCOLOR
                },
            }],
            yAxis: [{
                type: 'value',
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    color: FONTCOLOR
                },
                splitLine: {
                    show: true
                },
            }],
            series: []
        };
    },
    /**
     * 获取雷达图基本配置
     */
    getRadarBaseConfig: () => {
        return {
            grid: {
                top: '50px',
                left: '5%',
                right: '5%',
                bottom: '0px',
                containLabel: true
            },
            tooltip: {
                show: true,
                trigger: 'item'
            },
            legend: {
                type: 'scroll',
                textStyle: {
                    padding: [0, 0, 3, 8],
                    color: FONTCOLOR
                },
                data: []
            },
            radar: [{
                center: ['50%', '50%'],
                radius: 80,
                indicator: []
            }],
            series: [{
                type: 'radar',
                itemStyle: {
                    normal: {
                        areaStyle: {
                            type: 'default'
                        }
                    }
                },
                data: []
            }]
        };
    },
    getColor: () => {
        return ['#2D8CF0', '#2DE2C5', '#FCC45F', '#FF8454', '#DB425A'];
    }
}
export default config;
