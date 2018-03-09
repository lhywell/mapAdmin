<template>
    <div class="flow-matching">
        <flow-info :passengerSumWeek="passengerSumWeek" :passengerSumMonth="passengerSumMonth"></flow-info>
        <flow-chart :passengerAvgHourlyWeek="passengerAvgHourlyWeek" :passengerAvgHourlyMonth="passengerAvgHourlyMonth" :passengerDailyWeek="passengerDailyWeek" :passengerDailyMonth="passengerDailyMonth"></flow-chart>
        <flow-population-chart :data="population"></flow-population-chart>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import resource from '../../../../assets/js/resource';
import FlowInfo from './FlowInfo';
import FlowChart from './FlowChart';
import FlowPopulationChart from './FlowPopulationChart';
import chartUtil from '../chart.util';
import passengerSumWeekData from './passenger-sum-week.json';
import passengerSumMonthData from './passenger-sum-month.json';
import passengerAvgHourlyWeekData from './passenger-avg-hourly-week.json';
import passengerAvgHourlyMonthData from './passenger-avg-hourly-month.json';
import passengerDailyWeekData from './passenger-daily-week.json';
import passengerDailyMonthData from './passenger-daily-month.json';
import passengerLabelData from './passenger-label-data.json';

export default {
    data() {
        //昨天
        const preDate = this.$utils.preDate();
        //上周
        const preWeek = this.$utils.preWeek(preDate);
        //上月
        const preMonth = this.$utils.preMonth(preDate);
        return {
            preDate: this.$utils.dateFormat(preDate),
            preWeek: this.$utils.dateFormat(preWeek),
            preMonth: this.$utils.dateFormat(preMonth),
            passengerSumWeek: 0, //周总客流
            passengerSumMonth: 0, //月总客流
            passengerAvgHourlyWeek: [], //周平均客流
            passengerAvgHourlyMonth: [], //月平均客流
            passengerDailyWeek: [], //周每日客流
            passengerDailyMonth: [], //月每日客流
            population: {}, //人口画像
        }
    },
    components: {
        FlowChart,
        FlowInfo,
        FlowPopulationChart
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
            this.getData();
        }
    },
    methods: {
        getData() {
            this.getPassengerSumWeek();
            this.getPassengerSumMonth();
            this.getPassengerAvgHourlyWeek();
            this.getPassengerAvgHourlyMonth();
            this.getPassengerDailyWeek();
            this.getPassengerDailyMonth();
            this.getPassengerLabelData();
        },
        /**
         * [getPassengerSumWeek 周总客流]
         */
        getPassengerSumWeek() {
            // this.$axios.get(resource.passengerSum, {
            //     params: {
            //         storeId: 10000,
            //         startDate: this.preWeek,
            //         endDate: this.preDate
            //     }
            // }).then((res) => {
            //     this.passengerSumWeek = res && res.data ? res.data : 0;
            // }).catch((ex) => {});
            this.passengerSumWeek = passengerSumWeekData.data;
        },
        /**
         * [getPassengerSumMonth 月总客流]
         */
        getPassengerSumMonth() {
            // this.$axios.get(resource.passengerSum, {
            //     params: {
            //         storeId: 10000,
            //         startDate: this.preMonth,
            //         endDate: this.preDate
            //     }
            // }).then((res) => {
            //     this.passengerSumMonth = res && res.data ? res.data : 0;
            // }).catch((ex) => {});
            this.passengerSumMonth = passengerSumMonthData.data;
        },
        /**
         * [getPassengerAvgHourlyWeek 周平均客流]
         */
        getPassengerAvgHourlyWeek() {
            // this.$axios.get(resource.passengerAvgHourly, {
            //     params: {
            //         storeId: 10000,
            //         startDate: this.preWeek,
            //         endDate: this.preDate
            //     }
            // }).then((res) => {
            //     this.passengerAvgHourlyWeek = res && res.data&&res.data.length ? res.data : [];
            // }).catch((ex) => {});
            this.passengerAvgHourlyWeek = passengerAvgHourlyWeekData.data;
        },
        /**
         * [getPassengerAvgHourlyMonth 月平均客流]
         */
        getPassengerAvgHourlyMonth() {
            // this.$axios.get(resource.passengerAvgHourly, {
            //     params: {
            //         storeId: 10000,
            //         startDate: this.preMonth,
            //         endDate: this.preDate
            //     }
            // }).then((res) => {
            //     this.passengerAvgHourlyMonth = res && res.data&&res.data.length ? res.data : [];
            // }).catch((ex) => {});
            this.passengerAvgHourlyMonth = passengerAvgHourlyMonthData.data;
        },
        /**
         * [getPassengerDailyWeek 周每日客流]
         */
        getPassengerDailyWeek() {
            // this.$axios.get(resource.passengerDaily, {
            //     params: {
            //         storeId: 10000,
            //         startDate: this.preWeek,
            //         endDate: this.preDate
            //     }
            // }).then((res) => {
            //     this.passengerDailyWeek = res && res.data&&res.data.length ? res.data : [];
            // }).catch((ex) => {});
            this.passengerDailyWeek = passengerDailyWeekData.data;
        },
        /**
         * [getPassengerDailyMonth 月每日客流]
         */
        getPassengerDailyMonth() {
            // this.$axios.get(resource.passengerDaily, {
            //     params: {
            //         storeId: 10000,
            //         startDate: this.preMonth,
            //         endDate: this.preDate
            //     }
            // }).then((res) => {
            //     this.passengerDailyMonth = res && res.data&&res.data.length ? res.data : [];
            // }).catch((ex) => {});
            this.passengerDailyMonth = passengerDailyMonthData.data;
        },
        /**
         * [getPassengerLabelData 获取人口画像]
         */
        getPassengerLabelData() {
            // this.$axios.get(resource.passengerLabelData, {
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
            const sex = chartUtil.keyConvertName(passengerLabelData.data.gender || []);
            const age = chartUtil.keyConvertName(passengerLabelData.data.age || []);
            const consume = chartUtil.keyConvertName(passengerLabelData.data.consume || [], chartUtil.CONSUMENAMES);
            const income = chartUtil.keyConvertName(passengerLabelData.data.income || []);
            const education = chartUtil.keyConvertName(passengerLabelData.data.education || [], chartUtil.EDUCATIONNAMES);

            this.population = {
                sex,
                age,
                consume,
                income,
                education,
                other: [{
                        name: '有房',
                        value: passengerLabelData.data.house
                    },
                    {
                        name: '有车',
                        value: passengerLabelData.data.car
                    },
                    {
                        name: '已婚',
                        value: passengerLabelData.data.married
                    },
                    {
                        name: '育儿',
                        value: passengerLabelData.data.haveKids
                    }
                ]
            }
        }

    }
}

</script>
<style>
@import './chart/module/flow-matching/flow-matching.less'

</style>
