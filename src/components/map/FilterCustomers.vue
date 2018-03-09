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
    mapMutations,
    mapActions
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
            visible: false
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
        ...mapActions(['setGriddingMapOverlays']),
        initGriddingMap() {
            var overlay = new inMap.GriddingOverlay({
                style: {
                    normal: {
                        size: 8.6,
                        padding: 1
                    },
                    colors: [
                        "rgba(254,240,217,0.5)",
                        "rgba(253,213,158,0.5)",
                        "rgba(254,187,132,0.5)",
                        "rgba(252,141,89,0.5)",
                        "rgba(227,74,51,0.5)",
                        "rgba(179,0,0,0.5)",
                    ]
                },
                legend: {
                    show: false
                }
            });
            //设定图层类型为5
            overlay.type = 5;
            this.$inMap.add(overlay);

            overlay.setPoints(heatmapPopulation);

            this.setGriddingMapOverlays({
                payload: overlay
            })
        },
        switchChange(status) {
            if (status == true) {
                //初始化人口分布热力图
                this.initGriddingMap();
            } else {
                //直接删除图层
                this.$Baidu.removeOverlay(this.griddingMapOverlays)
                this.setGriddingMapOverlays({
                    payload: undefined
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
