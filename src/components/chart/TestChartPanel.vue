<template>
    <div style="display:inline-block;">
        <Button v-for="item in list" :key="item.name" type="primary" style="margin:0 10px;" @click="setStoreInfo(item)">区域洞察{{item.name}}</Button>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
export default {
    data() {
        return {
            list: [{
                id: 10000,
                name: '西单概念店', //商店名称
                coverage: 5, //辐射半径
                serviceArea: 6.8, //服务区域
            }, {
                id: 10001,
                name: '东城旗舰店', //商店名称
                coverage: 3, //辐射半径
                serviceArea: 2.3, //服务区域
            }]

        }
    },
    mounted() {},
    methods: {
        /**
         * [changeArea 区域洞察]
         */
        ...mapActions(['setStoreInfo'])
        // changeArea(item) {
        //     this.$store.dispatch('setStoreInfo', item);
        // }
    }
}

</script>
<style>
@import './chart/chart-panel.less'

</style>
