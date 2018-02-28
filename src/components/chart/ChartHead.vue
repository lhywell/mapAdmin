<template>
    <div class="chart-head">
        <div class="chart-head--title">{{chart.storeInfo.name}}</div>
        <div class="chart-head--subtitle">辐射半径: {{chart.storeInfo.coverage}}km²</div>
        <div class="chart-head--subtitle">服务区域: {{chart.storeInfo.serviceArea}}m²</div>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
export default {
    data() {
        return {

        }
    },
    computed: {
        ...mapState([
            'chart',
        ])
    },
    mounted() {},
    methods: {

    }
}

</script>
<style>
@import './chart/chart-head.less'

</style>
