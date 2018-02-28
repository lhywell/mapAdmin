<template>
    <div class="chart-tab">
        <Tabs :value="chart.selected"  @on-click="setTabSelected">
            <TabPane v-for="item in chart.tabs" :key="item.name" :label="item.name" :name="item.value"></TabPane>
        </Tabs>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
export default {
    data() {
        return {}
    },
    computed: {
        ...mapState([
            'chart',
        ])
    },
    mounted() {},
    methods: {
        ...mapActions(['setTabSelected'])
    }
}

</script>
<style>
@import './chart/chart-tab.less'

</style>
