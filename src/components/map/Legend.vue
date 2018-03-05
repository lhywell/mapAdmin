<template>
    <div id="legend">
        <Card style="width:320px" class="legendshop" v-show="visible_shop">
            <div class="l">
                <div class="title">门店分布</div>
                <p class="subtitle">点击上方「门店筛选」过滤展示信息</p>
                <div class="check">
                    <Checkbox v-model="checkbox_range" @on-change="rangeChange"></Checkbox>辐射范围
                </div>
            </div>
            <div class="open">
                <i-switch v-model="switch_shop" @on-change="myshopChange" class="myshop-swich"></i-switch>
            </div>
        </Card>
        <Card style="width:320px" class="legendbrand" v-show="visible_brand">
            <div class="l">
                <div class="title">品牌分布</div>
                <p class="subtitle">点击上方「品牌筛选」过滤展示信息</p>
            </div>
            <div class="open">
                <i-switch v-model="switch_brand" @on-change="brandChange" class="myshop-swich"></i-switch>
            </div>
        </Card>
        <Card class="legendhot" v-show="visible_hot">
            <div class="l">
                <Button type="ghost" :class="population" @click="populationClick">人口分布</Button>
                <Button type="ghost" :class="passenger" @click="passengerClick">客流分布</Button>
            </div>
            <div class="hot">
                <span class="min">100</span>
                <div class="ph">
                    <div class="ld1"></div>
                    <div class="ld2"></div>
                    <div class="ld3"></div>
                    <div class="ld4"></div>
                    <div class="ld5"></div>
                    <div class="ld6"></div>
                </div>
                <span class="max">100,261</span>
            </div>
            <div class="open">
                <i-switch v-model="switch_hot" @on-change="hotChange" class="myshop-swich"></i-switch>
            </div>
        </Card>
    </div>
</template>
<script>
import qs from 'qs';
import {
    mapState,
    mapGetters,
    mapMutations
} from 'vuex'

//热力图数据
import heatmapPassenger from '@/assets/json/shenzhen_passenger.json'
import heatmapPopulation from '@/assets/json/shenzhen_population.json'

export default {
    name: 'Legend',
    data() {
        return {
            checkbox_range: false,
            visible_shop: true,
            switch_shop: true,
            visible_brand: true,
            switch_brand: true,
            visible_hot: false,
            switch_hot: false,
            population: 'active',
            passenger: '',
        }
    },
    props: {},
    computed: {
        ...mapGetters(['switchShop', 'switchBrand', 'switchHot',
            'griddingMapOverlays'
        ]),
    },
    watch: {
        switchShop: {
            handler(newVal, val) {
                // console.log(newVal)
                if (newVal == true) {
                    this.visible_shop = true;
                    this.switch_shop = true;
                } else {
                    this.checkbox_range = false;
                    this.$store.dispatch('setCheckboxRang', false);
                    this.visible_shop = false;
                    this.switch_shop = false;
                }
            },
            deep: true
        },
        switchBrand: {
            handler(newVal, val) {
                // console.log(newVal)
                if (newVal == true) {
                    this.visible_brand = true;
                    this.switch_brand = true;
                } else {
                    this.visible_brand = false;
                    this.switch_brand = false;
                }
            },
            deep: true
        },
        switchHot: {
            handler(newVal, val) {
                // console.log(newVal)
                if (newVal == true) {
                    this.visible_hot = true;
                    this.switch_hot = true;
                } else {
                    this.visible_hot = false;
                    this.switch_hot = false;
                }
            },
            deep: true
        }
    },

    components: {},
    mounted() {

    },
    methods: {
        myshopChange(x) {
            if (x == false) {
                this.checkbox_range = false;
                this.$store.dispatch('setCheckboxRang', false);
                this.swich_shop = false;
                this.visible_shop = false;
                this.$store.dispatch('setSwitchShop', false);

                //<!-- 增加遮罩层，图层开关关闭，筛选不可以点击 -->
                this.$store.dispatch('setShopCover', true);
            }
        },
        brandChange(x) {
            if (x == false) {
                this.swich_brand = false;
                this.visible_brand = false;
                this.$store.dispatch('setSwitchBrand', false);

                //<!-- 增加遮罩层，图层开关关闭，筛选不可以点击 -->
                this.$store.dispatch('setBrandCover', true);
            }
        },
        hotChange(x) {
            if (x == false) {
                this.swich_hot = false;
                this.visible_hot = false;
                this.$store.dispatch('setSwitchHot', false);

                //热力图隐藏
                this.griddingMapOverlays.hide();
            }
        },
        rangeChange(x) {
            let list = this.$Baidu.getOverlays();
            if (x == true) {
                this.$store.dispatch('setCheckboxRang', true);
                list.map((item, index) => {
                    if (item.element) {
                        item.element.show();
                    }
                })
            } else {
                this.$store.dispatch('setCheckboxRang', false);
                list.map((item, index) => {
                    if (item.element) {
                        item.element.hide();
                    }
                })
            }
        },
        populationClick() {
            this.population = 'active';
            this.passenger = '';
            this.griddingMapOverlays.setPoints(heatmapPopulation);
        },
        passengerClick() {
            this.population = '';
            this.passenger = 'active';
            this.griddingMapOverlays.setPoints(heatmapPassenger);
        },
    }
}

</script>
<style>
@import './map/legend.css'

</style>
