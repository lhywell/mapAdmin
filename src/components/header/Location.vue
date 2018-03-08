<template>
    <div id="Location">
        <span><Icon type="ios-location"></Icon></span>
        <!-- <Select v-model="city" style="width:86px" class="select" @on-change="changeCity">
            <Option v-for="item in cityList" :value="item.name" :key="item.qid">{{ item.name }}</Option>
        </Select> -->
        <Poptip placement="bottom-start" width="220" class="poptip" v-model="visible">
            <Button type="ghost">{{initText}}
                <Icon type="chevron-down"></Icon>
            </Button>
            <div class="api" slot="content">
                <template>
                    <div class="brandSelect">
                        <div class="title">
                            <span>选择城市</span>
                        </div>
                        <ul>
                            <li v-for="item in cityList" :class="{active:item.active}">
                                <a href="#" @click="changeCity(item)">
                                    <div>{{item.name}}</div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </template>
            </div>
        </Poptip>
    </div>
</template>
<script>
export default {
    name: 'Location',
    data() {
        return {
            visible: false,
            initText: '深圳市',
            cityList: [{
                    "qid": 110000,
                    "name": "北京市",
                    "sname": "北京市",
                    "pinyin": "BJS",
                    "center": "116.407395,39.904211",
                    "telno": "010",
                    "active": false
                }, {
                    "qid": 310000,
                    "name": "上海市",
                    "sname": "上海市",
                    "pinyin": "SHS",
                    "center": "121.473701,31.230416",
                    "bsne": "122.015846,31.839066",
                    "bssw": "120.629629,30.410977",
                    "telno": "021",
                    "active": false
                },
                {
                    "qid": 440300,
                    "name": "深圳市",
                    "sname": "深圳市",
                    "pinyin": "SCS",
                    "center": "114.057865,22.543096",
                    "bsne": "115.499083, 23.052675",
                    "bssw": "113.726043, 22.418031",
                    "telno": "0755",
                    "active": true
                }
            ],
        }
    },

    components: {},
    mounted() {

    },
    computed: {},
    methods: {
        changeCity(city) {
            // console.log(city)
            this.visible = false;
            this.initText = city.name;
            this.cityList.map((x, y) => {
                x.active = false;
                if (x.name == city.name) {
                    city.active = true
                    let center = x.center.split(',');
                    let lnglat = this.$utils.drawLngLat(center[0], center[1]);
                    this.$Baidu.panTo(lnglat);
                    this.$Baidu.setZoom(12);
                }
            })
        },
    }
}

</script>
<style>
@import './header/location.css';

</style>
