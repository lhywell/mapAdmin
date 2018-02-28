<template>
    <div id="brandTools" class="brandTools">
        <i-switch v-model="visible" @on-change="switchChange" class="brand-swich"></i-switch>
        <!-- 增加遮罩层，图层开关关闭，筛选不可以点击 -->
        <div class="cover" v-show="visible_cover" @click="popInfo"></div>
        <Poptip placement="bottom-start" width="278" class="poptip brand-poptip">
            <Button type="ghost">
                <i class="icon-attraction"></i>品牌筛选
                <Icon type="chevron-down"></Icon>
                <div class="switchBox"></div>
            </Button>
            <div class="api" slot="content">
                <template>
                    <div class="brandSelect">
                        <div class="title">
                            <span>品牌筛选</span>
                            <div class="config" @click="toLocation">
                                <Icon type="android-settings" />
                            </div>
                        </div>
                        <div class="filterContent">
                            <div>
                                <div class="child_title">
                                    <span>增益品牌</span>
                                </div>
                                <CheckboxGroup v-model="zengyiCheckbox" @on-change="zengyiChange">
                                    <ul>
                                        <li v-for="item in zengyiList">
                                            <div class="li">
                                                <div class="atag"></div>
                                                <div class="num">{{item.storeList.length}}</div>
                                                <Checkbox :label="item.name">{{item.name}}</Checkbox>
                                            </div>
                                        </li>
                                    </ul>
                                </CheckboxGroup>
                            </div>
                            <div>
                                <div class="child_title">
                                    <span>竞品品牌</span>
                                </div>
                                <CheckboxGroup v-model="jingpinCheckbox" @on-change="jingpinChange">
                                    <ul>
                                        <li v-for="item in jingpinList">
                                            <div class="li">
                                                <span class="btag"></span>
                                                <span class="num">{{item.storeList.length}}</span>
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

//增益/竞品品牌
import storeBase from '../../views/storeBase.json'

export default {
    name: 'FilerTools',
    data() {
        return {
            visible: true,
            visible_cover: false,
            zengyiCheckbox: [],
            zengyiList: [],
            jingpinCheckbox: [],
            jingpinList: [],
            zengyiDisplay: [],
            jingpinDisplay: [],
        }
    },
    props: {},
    computed: {
        ...mapGetters(['switchBrand', 'brandCover'])
    },
    watch: {
        switchBrand: {
            handler(newVal, val) {
                // console.log(newVal)
                if (newVal == true) {
                    this.commonOpen();
                } else {
                    this.commonClose();
                }
            },
            deep: true
        },
        brandCover: {
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
        // console.log(storeBase)

        //增益/竞品品牌默认全选
        let zengyiList = storeBase.data.zengyi;
        this.zengyiList = zengyiList;


        let jingpinList = storeBase.data.jingpin;
        this.jingpinList = jingpinList;

        this.initSelected();
    },
    updated() {
        // console.log(this.$Baidu.getOverlays())
        let list = this.$Baidu.getOverlays();
        let zengyiList = [],
            jingpinList = [];
        list.map((item, index) => {
            if (item.type == 3) {
                //增益
                zengyiList.push(item)
            }
            if (item.type == 4) {
                //竞品
                jingpinList.push(item)
            }
        })
        this.zengyiDisplay = zengyiList;
        this.jingpinDisplay = jingpinList;
    },
    methods: {
        switchChange(status) {
            // console.log(status)
            //打开:checkbox全选中,关闭：checkbox全不选中
            if (status == true) {
                this.visible_cover = false;
                this.$store.dispatch('setBrandCover', false);
            } else {
                this.visible_cover = true;
                this.$store.dispatch('setBrandCover', true);
            }
            this.$store.dispatch('setSwitchBrand', status);
        },
        commonOpen() {
            this.visible = true;
            this.initSelected();
            this.zengyiDisplayShow();
            this.jingpinDisplayShow();
        },
        commonClose() {
            this.visible = false;
            this.zengyiCheckbox = [];
            this.jingpinCheckbox = [];
            this.zengyiDisplayHide();
            this.jingpinDisplayHide();
        },
        initSelected() {
            let zengyiCheckbox = [];
            this.zengyiList.map((item, index) => {
                zengyiCheckbox.push(item.name);
            })
            this.zengyiCheckbox = zengyiCheckbox;

            let jingpinCheckbox = [];
            this.jingpinList.map((item, index) => {
                jingpinCheckbox.push(item.name);
            })
            this.jingpinCheckbox = jingpinCheckbox;
        },
        zengyiDisplayShow() {
            this.zengyiDisplay.map((item, index) => {
                item.show();
            })
        },
        zengyiDisplayHide() {
            this.zengyiDisplay.map((item, index) => {
                item.hide();
            })
        },
        jingpinDisplayShow() {
            this.jingpinDisplay.map((item, index) => {
                item.show();
            })
        },
        jingpinDisplayHide() {
            this.jingpinDisplay.map((item, index) => {
                item.hide();
            })
        },
        zengyiChange() {
            // console.log(this.zengyiCheckbox,this.zengyiDisplay)
            this.zengyiDisplay.map((item, index) => {
                item.hide();
                this.zengyiCheckbox.map((x, y) => {
                    if (item.brand == x) {
                        item.show();
                    }
                })
            })
        },
        jingpinChange() {
            // console.log(this.jingpinCheckbox)
            this.jingpinDisplay.map((item, index) => {
                item.hide();
                this.jingpinCheckbox.map((x, y) => {
                    if (item.brand == x) {
                        item.show();
                    }
                })
            })
        },
        toLocation() {
            this.$store.dispatch('swtichBrandDetailModal', { modalState: true })
        },
        popInfo() {
            this.$Message.info('「请开启功能后再进行筛选。」');
        }
    }
}

</script>
<style>
@import './map/filterBrand.css'

</style>
