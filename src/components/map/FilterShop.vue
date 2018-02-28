<template>
    <div id="shopTools" class="shopTools">
        <i-switch v-model="visible" @on-change="switchChange" class="myshop-swich"></i-switch>
        <!-- 增加遮罩层，图层开关关闭，筛选不可以点击 -->
        <div class="cover" v-show="visible_cover" @click="popInfo"></div>
        <Poptip placement="bottom-end" width="278" class="poptip myshop-poptip">
            <Button type="ghost">
                <i class="icon-mall_directory"></i>门店筛选
                <Icon type="chevron-down"></Icon>
                <div class="switchBox"></div>
            </Button>
            <div class="api" slot="content">
                <template>
                    <div class="brandSelect">
                        <div class="title">
                            <span>门店筛选</span>
                            <div class="config" @click="toLocation">
                                <Icon type="android-settings" />
                            </div>
                        </div>
                        <div class="filterContent">
                            <div class="first_child">
                                <div>
                                    <span class="tag"></span>
                                    <span>已开门店</span>
                                </div>
                                <div>
                                    <span class="num">{{openNum}}</span>
                                    <Checkbox v-model="check_open" @on-change="singleChange"></Checkbox>
                                </div>
                            </div>
                            <div>
                                <div class="child_title">
                                    <span>意向门店</span>
                                </div>
                                <CheckboxGroup v-model="tobeCheckbox" @on-change="groupChange">
                                    <ul>
                                        <li v-for="item in tobeList">
                                            <div class="li">
                                                <span class="tag"></span>
                                                <Checkbox :label="item.name">{{item.name}}</Checkbox>
                                            </div>
                                        </li>
                                    </ul>
                                </CheckboxGroup>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </Poptip>
    </div>
</template>
<script>
import {
    mapState,
    mapGetters,
    mapMutations
} from 'vuex'

//待选门店
import fenceTobe from '../../views/fence_tobe.json'

//已开门店
import fenceOpen from '../../views/fence_open.json'

export default {
    name: 'FilerTools',
    data() {
        return {
            visible: true,
            visible_cover: false,
            check_open: true,
            openNum: 0,
            tobeCheckbox: [],
            tobeList: [],
            openDisplay: [],
            toDisplay: [],
        }
    },
    props: {},
    computed: {
        ...mapGetters(['switchShop', 'shopCover'])
    },
    watch: {
        switchShop: {
            handler(newVal, val) {
                console.log(newVal)
                if (newVal == true) {
                    this.commonOpen();
                } else {
                    this.commonClose();
                }
            },
            deep: true
        },
        shopCover: {
            handler(newVal, val) {
                console.log(newVal)
                if (newVal == true) {
                    this.visible_cover = true;
                } else {
                    this.visible_cover = false;
                }
            },
            deep: true
        },
    },
    components: {},
    mounted() {
        //待选门店默认全选
        let tobeList = fenceTobe.data.storeList;
        this.tobeList = tobeList;
        this.initSelected();

        //已开门店数量
        this.openNum = fenceOpen.data.storeList.length;
    },
    updated() {
        // console.log(this.$store.state.map.switchShop)
        // if(this.$store.state.map.switchShop == false){
        //     this.commonClose();
        // }
        // console.log(this.$Baidu.getOverlays())
        //控制显示隐藏
        let list = this.$Baidu.getOverlays();
        let openList = [],
            toList = [];
        list.map((item, index) => {
            if (item.type == 1) {
                //已开门店
                openList.push(item)
            }
            if (item.type == 2) {
                //意向门店
                toList.push(item)
            }
        })
        this.openDisplay = openList;
        this.toDisplay = toList;
    },
    methods: {
        switchChange(status) {
            // console.log(status)
            // let my = document.getElementsByClassName('myshop-poptip')[0];
            // let pop = my.getElementsByClassName('ivu-poptip-popper')[0]
            // console.log(pop)
            // setTimeout(function() {
            //     pop.style.display = 'block';
            // }, 1000)
            //打开:checkbox全选中,关闭：checkbox全不选中
            if (status == true) {
                this.commonOpen();
                this.visible_cover = false;
                this.$store.dispatch('setShopCover', false);
            } else {
                this.visible_cover = true;
                this.$store.dispatch('setShopCover', true);
                this.commonClose();
            }
            this.$store.dispatch('setSwitchShop', status);
        },
        commonOpen() {
            this.visible = true;
            this.initSelected();
            this.check_open = true;
            this.openDisplayShow();
            this.tobeDisplayShow();
        },
        commonClose() {
            this.visible = false;
            this.tobeCheckbox = [];
            this.check_open = false;
            this.openDisplayHide();
            this.tobeDisplayHide();
        },
        initSelected() {
            let tobeCheckbox = [];
            this.tobeList.map((item, index) => {
                tobeCheckbox.push(item.name)
            })
            this.tobeCheckbox = tobeCheckbox;
        },
        singleChange(status) {
            if (status == true) {
                this.openDisplayShow();
            } else {
                this.openDisplayHide();
            }
        },
        openDisplayHide() {
            this.openDisplay.map((item, index) => {
                item.element.hide();
                item.hide();
            })
        },
        openDisplayShow() {
            this.openDisplay.map((item, index) => {
                item.show();
            })
        },
        tobeDisplayShow() {
            this.toDisplay.map((item, index) => {
                item.show();
            })
        },
        tobeDisplayHide() {
            this.toDisplay.map((item, index) => {
                item.element.hide();
                item.hide();
            })
        },
        groupChange() {
            this.toDisplay.map((item, index) => {
                item.hide()
                this.tobeCheckbox.map((x, y) => {
                    if (item.item.name == x) {
                        item.show()
                    }
                })
            })
        },
        toLocation() {
            //跳转到品牌属性
            this.$store.dispatch('swtichBrandDetailModal', { modalState: true })
        },
        popInfo() {
            this.$Message.info('「请开启功能后再进行筛选。」');
        }
    }
}

</script>
<style>
@import './map/filterShop.css'

</style>
