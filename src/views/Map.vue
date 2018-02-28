<template>
    <div class="map">
        <smart-header></smart-header>
        <CreateBrand></CreateBrand>
        <BrandDetail></BrandDetail>
        <div id="allmap" style="width:100%;height:100%"></div>
        <map-tools></map-tools>
        <chart-panel></chart-panel>
        <Legend></Legend>
        <Modal v-model="infoModel" width="262" :mask-closable="true" :title="name" id="infoModel" class-name="infoModel mapModel">
            <!--内容-->
            <template v-if="openShop.display">
                <ul>
                    <li>
                        <span>所在城市</span>{{openShop.city}}
                    </li>
                    <li>
                        <span>月流水</span>{{openShop.amount}}
                    </li>
                    <li>
                        <span>辐射半径</span>{{openShop.range}}m
                    </li>
                    <li>
                        <span>服务区域</span>{{openShop.area}}㎡
                    </li>
                </ul>
                <div class="">
                    <Button type="ghost" size="large" class="toLocation" @click="toLocation()">区域洞察</Button>
                </div>
            </template>
            <template v-else-if="tobeShop.display">
                <ul>
                    <li>
                        <span>所在城市</span>{{tobeShop.city}}
                    </li>
                    <li>
                        <span>辐射半径</span>{{tobeShop.range}}m
                    </li>
                    <li>
                        <span>服务区域</span>{{tobeShop.area}}㎡
                    </li>
                </ul>
                <div class="">
                    <Button type="ghost" size="large" class="toLocation" @click="toLocation()">区域洞察</Button>
                </div>
            </template>
            <template v-else="other.display">
                <ul>
                    <li>
                        <span>所在城市</span>{{other.city}}
                    </li>
                </ul>
            </template>
        </Modal>
    </div>
</template>
<script>
import Vue from 'vue'
import smartHeader from "@/components/header/smartHeader"
import mapTools from "@/components/map/mapTools"
import CreateBrand from '@/components/map/CreateBrand'
import BrandDetail from '@/components/map/BrandDetail'
import Legend from '@/components/map/Legend'
import ChartPanel from '@/components/chart/ChartPanel'
//待选门店
import fenceTobe from './fence_tobe.json'

//已开门店
import fenceOpen from './fence_open.json'

//增益/竞品品牌
import storeBase from './storeBase.json'

//热力图数据
import heatmapPassenger from '@/assets/json/shenzhen_passenger.json'
import heatmapPopulation from '@/assets/json/shenzhen_population.json'

import {
    mapState,
    mapActions,
} from 'vuex'

import {
    BAIDU_MAP_STYLE,
    BAIDU_MAP_DRAWING_STYLE
} from './config';


export default {
    name: 'baiduMap',
    data() {
        return {
            infoModel: false,
            name: '',
            openShop: {
                display: false,
                city: '',
                amount: '',
                range: '200',
                area: '125,600'
            },
            tobeShop: {
                display: false,
                city: '',
                range: '200',
                area: '125,600'
            },
            other: {
                display: false,
                city: '',
            }
        }
    },
    components: {
        smartHeader,
        mapTools,
        CreateBrand,
        BrandDetail,
        ChartPanel,
        Legend
    },
    mounted() {
        this.createMap();
        this.responseFence();
    },
    computed: {
        ...mapState(['map']),
    },
    methods: {
        ...mapActions(['setGriddingMapOverlays']),
        createMap() {
            let inmap = new inMap.Map({
                id: 'allmap',
                skin: "",
                center: [121.473701, 31.230416], //地图中心点上海
                zoom: {
                    value: 12, //当前地图级别
                    show: true, //放大缩小按钮显示
                    max: 18,
                    min: 5
                },
            })
            let map = inmap.getMap();
            map.disableScrollWheelZoom();
            map.enableDoubleClickZoom();


            //设置百度自定义风格地图
            map.setMapStyle({
                styleJson: BAIDU_MAP_STYLE
            });

            //锁定城市，不可以移动到所选城市之外的区域
            // let b = new BMap.Bounds(new BMap.Point(120.629629, 30.410977), new BMap.Point(122.015846, 31.839066));
            // try {
            //     BMapLib.AreaRestriction.setBounds(map, b);
            // } catch (e) {
            //     alert(e);
            // }

            Vue.prototype.$inMap = inmap;
            Vue.prototype.$Baidu = map;

            //初始化热力图
            this.initGriddingMap(inmap);
        },
        initGriddingMap(inmap) {
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
            inmap.add(overlay);
            //默认初始化隐藏
            overlay.hide();
            overlay.setPoints(heatmapPopulation);

            this.setGriddingMapOverlays({
                payload: overlay
            })
        },
        hideHeatmap() {
            this.heatmapOverlay.hide();
        },
        setCenter(storeList) {
            //地图中心点是默认列表第一个围栏的中心点
            let lng = storeList[0].center[1];
            let lat = storeList[0].center[0];
            let point = this.$utils.drawLngLat(lng, lat);
            // this.$Baidu.setZoom(14);
            this.$Baidu.setCenter(point);
        },
        responseFence() {
            let storeList = fenceTobe.data.storeList;

            let openList = fenceOpen.data.storeList;

            let zengyi = storeBase.data.zengyi;
            let jingpin = storeBase.data.jingpin;
            // console.log(storeBase)
            //设置中心点
            this.setCenter(storeList);

            //画已开门店包括点和围栏,并且定义类型为1
            this.drawStoreInfo(openList, 1);

            //画意向门店包括点和围栏,并且定义类型为2
            this.drawStoreInfo(storeList, 2);


            //画增益品牌,并且定义类型为3
            this.drawStoreBase(zengyi, 3)

            //画竞品品牌,并且定义类型为4
            this.drawStoreBase(jingpin, 4)
        },
        drawStoreBase(list, type) {
            for (let x = 0, l = list.length; x < l; x++) {
                let item = list[x].storeList;

                for (let y = 0, m = item.length; y < m; y++) {
                    let center = item[y].center;
                    let point = this.$utils.drawLngLat(parseFloat(center[1]), parseFloat(center[0]));
                    let marker = this.$utils.drawMarker(point, type);

                    /*****保存属性****/
                    marker.brand = list[x].name;
                    marker.item = item[y];
                    marker.type = type;
                    /*****保存属性*****/

                    this.drawPoint(marker);
                }
            }
        },
        drawStoreInfo(storeList, type) {
            storeList.map((item, index) => {
                let element;
                if (item.type == 2) {
                    let path = [];
                    let bounds = item.content;
                    for (let i = 0, l = bounds.length; i < l; ++i) {
                        let lng = bounds[i][1];
                        let lat = bounds[i][0];

                        let point = this.$utils.drawLngLat(Number(lng), Number(lat));

                        path.push(point);
                    }
                    // console.log(path)
                    //画多边形
                    element = this.$utils.drawPolygon(path);
                }
                if (item.type == 1) {
                    let content = item.content;
                    let radius = content.radius;
                    let center = item.center;
                    let point = this.$utils.drawLngLat(parseFloat(center[1]), parseFloat(center[0]))

                    //画圆
                    element = this.$utils.drawCircle(point, radius);
                }
                let center = item.center;
                let point = this.$utils.drawLngLat(parseFloat(center[1]), parseFloat(center[0]))

                let marker = this.$utils.drawMarker(point, type);

                /*****保存属性*****/
                marker.element = element;
                marker.item = item;
                element.item = item;
                element.element = element;

                if (type == 1) {
                    marker.type = 1;
                    element.type = 1;
                } else {
                    marker.type = 2;
                    element.type = 2;
                }
                /*****保存属性*****/

                this.drawPoint(marker);
                this.drawFence(element);
            })

        },
        drawPoint(marker) {
            marker.addEventListener("click", this.elementClick);
            this.$Baidu.addOverlay(marker);
        },
        drawFence(element) {
            //增加点击事件
            element.addEventListener("click", this.elementClick);

            //默认围栏隐藏
            element.hide()
            this.$Baidu.addOverlay(element);
        },
        elementClick(e) {
            // console.log(e.target.type)
            let pixel = e.pixel;
            this.setPosition(pixel);

            this.infoModel = true;
            let item = e.target.item;
            this.name = item.name;
            if (e.target.type == 1) {
                this.openShop.display = true;
                this.tobeShop.display = false;
                this.openShop.city = item.city;
                this.openShop.amount = item.amount;
                this.openShop.area = item.area;

                this.selectedFence(e);
            }
            if (e.target.type == 2) {
                this.tobeShop.display = true;
                this.openShop.display = false;
                this.tobeShop.city = item.city;
                this.tobeShop.area = item.area;

                this.selectedFence(e);
            }

            if (e.target.type == 3 || e.target.type == 4) {
                this.other.display = true;
                this.openShop.display = false;
                this.tobeShop.display = false;
                this.other.city = item.city;
            }


        },
        selectedFence(e) {
            //清除掉其他围栏的当前状态
            let list = this.$Baidu.getOverlays();
            list.map((item, index) => {
                if (item.type == 1 || item.type == 2) {
                    item.element.setFillOpacity(0.1);
                }
            })

            //增加选中围栏当前状态
            let element = e.target.element;
            element.setFillOpacity(0.6);
        },
        setPosition(pixel) {
            let dom = document.getElementsByClassName('mapModel')[0];
            let left = pixel.x;
            let top = pixel.y

            dom.style.position = 'absolute';
            dom.style.left = left + 'px';
            dom.style.top = top + 'px';
            dom.style.right = 'inherit';
            dom.style.bottom = 'inherit';
        },
        toLocation() {
            this.infoModel = false;
            this.$store.dispatch('setStoreInfo', {
                id: 10000,
                name: '西单概念店', //商店名称
                coverage: 5, //辐射半径
                serviceArea: 6800, //服务区域
            });
            //开启右侧面板
            this.$store.dispatch('setSwitchPanel', true);
        }
    }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
@import './map/map.css';

</style>
