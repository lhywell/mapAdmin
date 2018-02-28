<template>
    <div class="flow-matching">
        <population-info :data="info"></population-info>
        <population-flow-chart :data="flow"></population-flow-chart>
        <population-chart :data="population"></population-chart>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import PopulationInfo from './PopulationInfo';
import PopulationFlowChart from './PopulationFlowChart';
import PopulationChart from './PopulationChart';
import chartUtil from '../chart.util';
import populationSummaryInfoData from './population-summary-info-data.json';
import populationSummaryData from './population-summary-data.json';
import populationLabelData from './population-label-data.json';
export default {
    data() {
        return {
            info: {},
            flow: {},
            population: {},
        }
    },
    components: {
        PopulationInfo,
        PopulationFlowChart,
        PopulationChart
    },
    computed: {
        ...mapState([
            'chart',
        ])
    },
    mounted() {

    },
    watch: {
        'chart.storeInfo' (val, oldVal) {
            this.getPopulationSummaryInfo();
            this.getPopulationLabelData();
            this.getPopulationSummary();
        },
    },
    methods: {
        /**
         * [getPopulationSummaryInfo 获取区域总人口、居住人口、工作人口]
         */
        getPopulationSummaryInfo() {
            // const year = new Date().getFullYear();

            // this.$axios.get('/population/summary', {
            //     params: {
            //         storeId: 10000,
            //         times: `${year-1}01`
            //     }
            // }).then((res) => {
            //     this.info = res && res.data? res.data : {
            //     total:0,
            //     live:0,
            //     work:0
            //     };
            // }).catch((ex) => {});
            this.info = {
                total: populationSummaryInfoData.data.total[0].value || 0,
                live: populationSummaryInfoData.data.live[0].value || 0,
                work: populationSummaryInfoData.data.work[0].value || 0
            }
        },
        /**
         * [getPopulationSummary 获取人口分析]
         */
        getPopulationSummary() {
            // const year = new Date().getFullYear();

            // this.$axios.get('/population/summary', {
            //     params: {
            //         storeId: 10000,
            //         times: `${year-2}01,${year-2}02,${year-1}01,${year-1}02`
            //     }
            // }).then((res) => {

            //     this.flow = res && res.data? res.data : {};
            // }).catch((ex) => {});
            this.flow = populationSummaryData.data;
        },
        /**
         * [getPopulationLabelData 获取人口画像]
         */
        getPopulationLabelData() {
            // this.$axios.get('/label/population', {
            //     params: {
            //         storeId: 10000,
            //         time: (new Date().getFullYear()) + '01'
            //     }
            // }).then((res) => {
            //     if (res && res.data && res.data.length) {
            //         const data = res.data;
            //         const sex = chartUtil.keyConvertName(data.gender || []);
            //         const age = chartUtil.keyConvertName(data.age || []);
            //         const consume = chartUtil.keyConvertName(data.consume || [], chartUtil.CONSUMENAMES);
            //         const income = chartUtil.keyConvertName(data.income || []);
            //         const education = chartUtil.keyConvertName(data.education || [], chartUtil.EDUCATIONNAMES);
            //         this.population = {
            //             sex,
            //             age,
            //             consume,
            //             income,
            //             education,
            //             other: [{
            //                     name: '有房',
            //                     value: data.house || 0
            //                 },
            //                 {
            //                     name: '有车',
            //                     value: data.car || 0
            //                 },
            //                 {
            //                     name: '已婚',
            //                     value: data.married || 0
            //                 },
            //                 {
            //                     name: '育儿',
            //                     value: data.haveKids || 0
            //                 }
            //             ]
            //         };
            //     } else {
            //         this.population = {};
            //     }
            // }).catch((ex) => {});
            const sex = chartUtil.keyConvertName(populationLabelData.data.gender || []);
            const age = chartUtil.keyConvertName(populationLabelData.data.age || []);
            const consume = chartUtil.keyConvertName(populationLabelData.data.consume || [], chartUtil.CONSUMENAMES);
            const income = chartUtil.keyConvertName(populationLabelData.data.income || []);
            const education = chartUtil.keyConvertName(populationLabelData.data.education || [], chartUtil.EDUCATIONNAMES);
            this.population = {
                sex,
                age,
                consume,
                income,
                education,
                other: [{
                        name: '有房',
                        value: populationLabelData.data.house
                    },
                    {
                        name: '有车',
                        value: populationLabelData.data.car
                    },
                    {
                        name: '已婚',
                        value: populationLabelData.data.married
                    },
                    {
                        name: '育儿',
                        value: populationLabelData.data.haveKids
                    }
                ]
            }
        }
    }
}

</script>
<style>
@import './chart/module/population-matching/population-matching.less'

</style>
