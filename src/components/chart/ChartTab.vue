<template>
    <div class="chart-tab">
        <Tabs :value="chart.selected" @on-click="changeTab" ref="tabs">
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
        changeTab(val) {
            this.$store.dispatch('setTabSelected', val);
            this.$nextTick(() => {
                setTimeout(() => {
                    const tabs = this.$refs.tabs;
                    const index = tabs.navList.findIndex((nav) => nav.name === tabs.activeKey);
                    const inkBar = tabs.$refs.navScroll.children[0].children[0];
                    const left = (tabs.barOffset ? tabs.barOffset + index * 16 : 0) + 'px';
                    inkBar.style.transform = `translate3d(${left}, 0px, 0px)`;
                }, 100)
            });

        }
    }
}

</script>
<style>
@import './chart/chart-tab.less'

</style>
