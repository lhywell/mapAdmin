<template>
    <div id="FilterCustomers" class="FilterCustomers">
        <i-switch v-model="visible" @on-change="switchChange" class="customer-swich"></i-switch>
        <div class="operator">
            <Button type="ghost">
                <i class="icon-account_child"></i>客群筛选
                <div class="switchBox"></div>
            </Button>
        </div>
    </div>
</template>
<script>
import {
    mapState,
    mapGetters,
    mapMutations
} from 'vuex'

//增益/竞品品牌
import storeBase from '../../views/storeBase.json'
//热力图数据
import heatmapPassenger from '@/assets/json/shenzhen_passenger.json'
import heatmapPopulation from '@/assets/json/shenzhen_population.json'

export default {
    name: 'FilterCustomers',
    data() {
        return {
            visible: false,
            hotOverLay: null
        }
    },
    props: {},
    computed: {
        ...mapGetters(['switchHot', 'griddingMapOverlays'])
    },
    watch: {
        switchHot: {
            handler(newVal, val) {
                if (newVal == true) {
                    this.visible = true;
                } else {
                    this.visible = false;
                }
            },
            deep: true
        }
    },
    components: {},
    mounted() {},
    updated() {},
    methods: {
        switchChange(status) {
            if (status == true) {
                //初始化人口分布热力图
                // this.griddingMapOverlays.setPoints(heatmapPopulation);
                if (this.griddingMapOverlays) {
                    this.griddingMapOverlays.show()
                }
                if (this.hotOverLay) {
                    //显示热力图层
                    this.hotOverLay.show();
                }
            } else {
                let list = this.$Baidu.getOverlays();
                list.map((item, index) => {
                    if (item.type == 5) {
                        this.hotOverLay = item;
                        //隐藏热力图层
                        item.hide()
                    }
                })
            }
            this.$store.dispatch('setSwitchHot', status);
        }
    }
}

</script>
<style scoped>
@import './map/filterCustomers.css'

</style>
