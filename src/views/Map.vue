<template>
    <div class="map">
        <smart-header></smart-header>
        <CreateBrand></CreateBrand>
        <BrandDetail></BrandDetail>
        <div id="allmap" style="width:100%;height:100%"></div>
        <Search></Search>
        <FilerTools></FilerTools>
        <addressConfig></addressConfig>
        <chart-panel></chart-panel>
        <Legend></Legend>
        <infoModal></infoModal>
        <DropTools></DropTools>
    </div>
</template>
<script>
import Vue from 'vue'
import smartHeader from "@/components/header/smartHeader"
import CreateBrand from '@/components/map/CreateBrand'
import BrandDetail from '@/components/map/BrandDetail'
import Legend from '@/components/map/Legend'
import ChartPanel from '@/components/chart/ChartPanel'
import Search from '@/components/map/Search'
import DropTools from '@/components/map/DropTools'
import FilerTools from '@/components/map/FilerTools'
import addressConfig from '@/components/map/addressConfig'
import infoModal from '@/components/map/infoModal'

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
            inmap: null
        }
    },
    components: {
        smartHeader,
        CreateBrand,
        BrandDetail,
        ChartPanel,
        Legend,
        Search,
        DropTools,
        FilerTools,
        addressConfig,
        infoModal,
    },
    mounted() {
        this.createMap();
        this.responseFence();
        //初始化热力图
        this.initGriddingMap();
    },
    computed: {
        ...mapState(['map', 'chart']),
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
            map.addEventListener('click', e => {
                this.closePanel();
                this.closeDropDown();
            });
            //锁定城市，不可以移动到所选城市之外的区域
            // let b = new BMap.Bounds(new BMap.Point(120.629629, 30.410977), new BMap.Point(122.015846, 31.839066));
            // try {
            //     BMapLib.AreaRestriction.setBounds(map, b);
            // } catch (e) {
            //     alert(e);
            // }
            this.inmap = inmap;

            Vue.prototype.$inMap = inmap;
            Vue.prototype.$Baidu = map;

        },
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
            this.inmap.add(overlay);
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
                element.marker = marker;

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
            marker.addEventListener("mouseover", this.elementHover);
            marker.addEventListener("mouseout", this.elementOut);
            marker.addEventListener("click", this.elementClick);
            this.$Baidu.addOverlay(marker);
        },
        drawFence(element) {
            //增加点击事件
            element.addEventListener("mouseover", this.elementHover);
            element.addEventListener("mouseout", this.elementOut);
            element.addEventListener("click", this.elementClick);

            //默认围栏隐藏
            element.hide()
            this.$Baidu.addOverlay(element);
        },
        setStrokeWeight(e, number) {
            let element = e.target.element;
            element.setStrokeWeight(number);
        },
        drawIcon(e, number) {
            let targetE = e.target;
            if (e.target.type == 1 || e.target.type == 2) {
                //增加选中围栏当前状态
                let icon = this.$utils.drawIcon(number);
                if (targetE instanceof(BMap.Marker)) {
                    //悬浮在marker上
                    targetE.setIcon(icon);
                } else {
                    //悬浮在围栏上
                    targetE.marker.setIcon(icon);
                }
            }
            if (e.target.type == 3 || e.target.type == 4) {
                let icon = this.$utils.drawIcon(number);
                targetE.setIcon(icon);
            }
        },
        elementHover(e) {
            let targetE = e.target;
            // console.log(marker)
            if (e.target.type == 1) {
                //增加选中围栏当前状态
                this.setStrokeWeight(e, 4);

                this.drawIcon(e, 5);
            }
            if (e.target.type == 2) {
                //增加选中围栏当前状态
                this.setStrokeWeight(e, 4);

                this.drawIcon(e, 6);
            }
            if (e.target.type == 3) {
                this.drawIcon(e, 7);
            }
            if (e.target.type == 4) {
                this.drawIcon(e, 8);
            }
        },
        elementOut(e) {
            if (e.target.type == 1) {
                this.setStrokeWeight(e, 1);
                this.drawIcon(e, 1);
            }
            if (e.target.type == 2) {
                this.setStrokeWeight(e, 1);
                this.drawIcon(e, 2);
            }
            if (e.target.type == 3) {
                this.drawIcon(e, 3);
            }
            if (e.target.type == 4) {
                this.drawIcon(e, 4);
            }
        },
        elementClick(e) {
            this.$store.dispatch('setSelfModal', {
                infoModal: true,
                infoTarget: e
            })
        },
        /**
         * [closePanel 关闭右侧面板]
         */
        closePanel() {
            if (this.chart.switchPanel) {
                this.$store.dispatch('setSwitchPanel', false);
                this.$store.dispatch('setTabSelected', this.chart.tabs[0].value);
            }
        },
        closeDropDown() {
            this.$store.dispatch('setDropDownShop', false);
        }
    }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
@import './map/map.css';

</style>
