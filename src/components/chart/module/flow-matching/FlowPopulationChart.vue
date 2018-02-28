<template>
    <div class="flow-matching__populationechart">
        <div class="flow-matching__populationechart__con">
            <div class="flow-matching__populationechart__con__head">
                <span class="flow-matching__populationechart__con__head--title">人口分析</span>
            </div>
            <div class="flow-matching__populationechart__con__main">
                <!-- 性别比例 -->
                <sex-chart :data="data.sex" :height="100" class="flow-matching__populationechart__con__main__sex"></sex-chart>
                <!-- 年龄比例 -->
                <age-chart :data="data.age" :height="172" class="flow-matching__populationechart__con__main__age"></age-chart>
                <div class="chart-panel--border"></div>
                <!-- 综合消费能力 -->
                <consume-chart :data="data.consume" :height="100" class="flow-matching__populationechart__con__main__consume"></consume-chart>
                <!-- 家庭月收入 -->
                <income-chart :data="data.income" :height="172" class="flow-matching__populationechart__con__main__income"></income-chart>
                <div class="chart-panel--border"></div>
                <!-- 学历分布 -->
                <education-chart :data="data.education" :height="160" class="flow-matching__populationechart__con__main__education"></education-chart>
                <div class="chart-panel--border"></div>
                <other-chart :data="data.other" :height="100" class="flow-matching__populationechart__con__main__other"></other-chart>
            </div>
        </div>
    </div>
</template>
<script>
import SexChart from '../portrait/SexChart';
import AgeChart from '../portrait/AgeChart';
import ConsumeChart from '../portrait/ConsumeChart';
import IncomeChart from '../portrait/IncomeChart';
import EducationChart from '../portrait/EducationChart';
import OtherChart from '../portrait/OtherChart';
export default {
    props: {
        data: {
            type: Object,
            default: function() {
                return {};
            }
        }
    },
    data() {
        return {

        }
    },
    components: {
        SexChart,
        AgeChart,
        ConsumeChart,
        IncomeChart,
        EducationChart,
        OtherChart
    },
    watch: {
        data(val, oldVal) {}
    },
    mounted() {},
    methods: {

    }
}

</script>
<style>
@import './chart/module/flow-matching/flow-population-chart.less'

</style>
