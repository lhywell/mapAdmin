<template>
    <div class="regions-matching">
        <regions-info :data="info"></regions-info>
        <regions-analyse :data="analyse"></regions-analyse>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import resource from '../../../../assets/js/resource';
import RegionsInfo from './RegionsInfo';
import RegionsAnalyse from './RegionsAnalyse';
import rawData from './regions-matching.json';
import peripheryFacilitiesData from './periphery-facilities.json';
import peripheryCompetitiveData from './periphery-competitive.json';
export default {
    data() {
        return {
            info: {},
            analyse: {}
        }
    },
    components: {
        RegionsInfo,
        RegionsAnalyse
    },
    computed: {
        ...mapState([
            'chart',
        ])
    },
    watch: {
        'chart.storeInfo' (val, oldVal) {
            this.getPeripheryCompetitive();
            this.getPeripheryFacilities();
        }
    },
    mounted() {},
    methods: {
        /**
         * [getPeripheryCompetitive 获取竞品列表]
         */
        getPeripheryCompetitive() {
            // this.$axios.get(resource.peripheryCompetitive, {}).then((res) => {
            //     this.info = res && res.data ? res.data : {};
            //     if (res && res.data && res.data.length) {
            //         let set = new Set();
            //         res.data.forEach((item) => {
            //             if (!set.has(item.type)) {
            //                 set.add(item.type);
            //             }
            //         });
            //         this.analyse = {
            //             list: res.data,
            //             types: Array.from(set)
            //         }
            //     } else {
            //         this.analyse = {};
            //     }
            // }).catch((ex) => {});
            let set = new Set();
            peripheryCompetitiveData.data.forEach((item) => {
                if (!set.has(item.type)) {
                    set.add(item.type);
                }
            });
            this.analyse = {
                list: peripheryCompetitiveData.data,
                types: Array.from(set)
            }
        },
        /**
         * [getPeripheryFacilities 获取区域周边配套设施]
         */
        getPeripheryFacilities() {
            // this.$axios.get(resource.peripheryFacilities, {
            //     params: {
            //         storeId: 10000
            //     }
            // }).then((res) => {
            //     this.info = res && res.data? res.data : {};
            // }).catch((ex) => {});
            this.info = peripheryFacilitiesData.data;
        },
    }
}

</script>
<style>
@import './chart/module/regions-matching/regions-matching.less'

</style>
