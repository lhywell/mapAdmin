<template>
    <div class='brand_detail_container'>
        <Modal v-model="map.brandDetailModal" :closable="false" :transition-names='animate' :styles='map.brandModalStyle' class='brand_detail_modal' width='1006px' :mask-closable='true'>
            <div slot="header" class='detail_header'>
                <a class="icon-close closeBtn" @click='close'></a>
                <span class='brand_title'>{{brandBasicInfo.name}}</span>
                <div class='right_tools'>
                    <Poptip trigger="hover" placement="bottom-end" class="icon-more_vert my_poptip">
                        <div slot="content" class='btn_container'>
                            <Button type="text" class='delete_brand_btn' @click="deleteBrand">删除品牌</Button>
                        </div>
                    </Poptip>
                </div>
            </div>
            <div class='detail_tab_container'>
                <Tabs :value="currentTab" @on-click="changeTab" ref="tabs">
                    <TabPane label="品牌属性" class='attr_tab' name="attribute">
                        <Card class='basic_info' dis-hover>
                            <p slot="title" class='basic_info_title'>基本信息</p>
                            <div class='content'>
                                <div class='brand_name_container'>
                                    <span class='brand_name_title'>品牌名称</span>
                                    <span class='brand_name'>{{brandBasicInfo.name}}</span>
                                </div>
                                <div class='brand_category_container'>
                                    <span class='brand_category_title'>所属分类</span>
                                    <span class='brand_category'>{{brandBasicInfo.type}}</span>
                                </div>
                                <div class='brand_position_container'>
                                    <span class='brand_position_title'>品牌定位</span>
                                    <span class='brand_position'>{{brandBasicInfo.locate}}</span>
                                </div>
                            </div>
                        </Card>
                        <div class='settings_container'>
                            <SettingBox :outerDatas='gainBrandList' class='gain_brand_setting'></SettingBox>
                            <SettingBox :outerDatas='competitiveBrandList' class='compete_brand_setting'></SettingBox>
                            <div class='clear_float'></div>
                        </div>
                    </TabPane>
                    <TabPane label="已开店铺" name="opened" class='opened_tab'>
                        <OpenedShops></OpenedShops>
                    </TabPane>
                    <TabPane label="待选门店" name="remained" class='remained_tab'>
                        <ToBeChosenShops></ToBeChosenShops>
                    </TabPane>
                </Tabs>
            </div>
            <div slot="footer">
            </div>
        </Modal>
        <Modal title="Title" v-model="showConfirmModal" class="vertical_center_modal" width='340px' :styles='confirmModalStyle' @on-ok='confirmSuccess' @on-cancel='confirmFail'>
            <div slot="header" class='vertical_modal_header'>
                <Icon type="android-warning" class='warning_icon' size='26'></Icon>
                <span class='confirm_modal_title'>确定删除当前品牌</span>
            </div>
            <div class='vertical_modal_body'>删除后此品牌所有数据将被清除，包括已保存图层操作、上传门店等。</div>
        </Modal>
    </div>
</template>
<script>
import {
    mapState,
    mapActions,
    mapGetters,
    mapMutations
} from 'vuex'
import util from '@/assets/js/util'
import _resource from '@/assets/js/resource'
import SettingBox from './SettingBox'
import ChooseBrand from '@/components/map/ChooseBrand'
import OpenedShops from '@/components/map/OpenedShops'
import ToBeChosenShops from '@/components/map/ToBeChosenShops'

export default {
    name: 'brandDetail',
    data() {
        return {
            currentTab: 'attribute',
            animate: ['move-right', 'fade'],
            brandBasicInfo: {},
            confirmModalStyle: {
                'z-index': 1500
            },
            showConfirmModal: false,
            brandPositionList: util.brandPositionList,
            gainData: {},
            competeData: {},
            gainBrandList: {},
            competitiveBrandList: {},
        }
    },
    components: {
        SettingBox,
        ChooseBrand,
        OpenedShops,
        ToBeChosenShops
    },
    watch: {
        'map.currentBrandId': {
            handler: function(val, oldVal) {
                //console.log('map.currentBrandId state change,val is ',val)
                if (val) {
                    //发送请求查询该brandId对应的品牌基本信息,调用接口brandInfo
                    //this.queryBrandBasicInfo(val)
                }
            },
            deep: false,
            immediate: true
        }
    },
    computed: {
        ...mapState(['map']),
    },
    mounted() {
        this.init()
    },
    methods: {
        ...mapActions({
            switchDetailModal: 'swtichBrandDetailModal',
            // changeBrandModalStyle:'changeBrandModalStyle',
        }),
        init() {
            this.brandBasicInfo = {
                name: '周黑鸭',
                type: '餐饮',
                locate: '大众'
            };
            this.gainBrandList = {
                title: '增益品牌设定',
                placement: 'bottom-start',
                tableData: [{
                    id: 1,
                    name: '麦当劳',
                    type: '餐饮',
                    icon: 'http://www.wulihub.com.cn/go/JPVkkW/mc.png'
                }, {
                    id: 2,
                    name: '肯德基',
                    type: '餐饮',
                    icon: 'http://www.wulihub.com.cn/go/JPVkkW/kfc.png'
                }],
                tips: '待选地周边的增益品牌会使选址评分增加'
            };
            this.competitiveBrandList = {
                title: '竞品品牌设定',
                placement: 'bottom-start',
                tableData: [{
                    id: 9,
                    name: '绝味鸭脖',
                    type: '餐饮',
                    icon: 'http://www.wulihub.com.cn/go/JPVkkW/jw.png'
                }, {
                    id: 8,
                    name: '久久丫',
                    type: '餐饮',
                    icon: 'http://www.wulihub.com.cn/go/JPVkkW/jjy.png'
                }],
                tips: '待选地周边的排斥品牌会使选址评分降低'
            };
        },
        queryBrandBasicInfo(brandId){
            var url = _resource.brandInfo.replace('{brandId}',brandId)

            var ax = this.$axios(util.makeRequest({
                url: url,
                method:'get'
            }))
            this.$axios.get(ax)
                .then(response => {
                    if(response && response.data){
                        var responseData = response.data
                        this.brandBasicInfo['name'] = responseData.name
                        this.brandBasicInfo['type'] = responseData.type
                        this.brandBasicInfo['locate'] = responseData.locate
                    }
                })
                .catch((response) => {
                    if (response.response) {
                        if (response.response.status === 400) {

                        }
                    } else {

                    }
                })
        },
        changeTab(val) {
            this.$nextTick(() => {
                setTimeout(() => {
                    const tabs = this.$refs.tabs;
                    const index = tabs.navList.findIndex((nav) => nav.name === tabs.activeKey);
                    const inkBar = tabs.$refs.navScroll.children[0].children[0];
                    const left = (tabs.barOffset ? tabs.barOffset + index * 24 : 0) + 'px';
                    inkBar.style.transform = `translate3d(${left}, 0px, 0px)`;
                }, 100)
            });
        },
        close() {
            this.switchDetailModal({
                'modalState': false
            })
        },
        deleteBrand() {
            //console.log('delete brand')
            this.confirmDelete();
        },
        confirmDelete() {
            this.showConfirmModal = true;
        },
        confirmSuccess() {
            //调用deleteBrand接口
            //console.log('success')

        },
        confirmFail() {
            //this.showConfirmModal = false;
            //console.log('fail')
        }

    }
}
</script>
<style scoped>
@import './map/brandDetail.css';
</style>
<style>
.brand_detail_modal {
    .ivu-modal-content {
        height: 100%;
        border-radius: 1px;
        .ivu-modal-body {
            height: calc( 100% - 51px);
            /*51px位header高度*/
            background-color: rgba(23, 35, 61, 0.06);
            padding: 0px;
            .detail_tab_container {
                height: 100%;
                .ivu-tabs {
                    height: 100%;
                    .ivu-tabs-bar {
                        margin-bottom: 0px;
                        background-color: rgba(23, 35, 61, 0.03);
                        .ivu-tabs-nav-scroll {
                            margin-top: 7px;
                            .ivu-tabs-nav {
                                margin-left: 50px;
                                height: 41px;
                                .ivu-tabs-tab {
                                    margin-right: 40px;
                                    font-size: 14px;
                                    color: rgba(23, 35, 61, 0.75);
                                }
                            }
                        }
                    }
                    .ivu-tabs-content {
                        height: 100%;
                    }
                }
            }
        }
        .ivu-modal-footer {
            background-color: rgba(16, 17, 19, 0.03);
            border-top: none;
            padding: 0;
        }
    }
}

.brand_detail_modal {
    .ivu-modal-header {
        border: none;
    }
}

.vertical_center_modal {
    display: flex;
    align-items: center;
    justify-content: center;
    .ivu-modal {
        top: 200px;
        .ivu-modal-close {
            .ivu-icon-ios-close-empty:hover {
                color: #2D8CF0;
            }
        }
        .ivu-modal-header {
            padding: 10px;
            border: none;
            /*border-bottom-width: 0px;*/
        }
        .vertical_modal_header {
            .warning_icon {
                color: rgba(255, 153, 0, 1);
                margin: 5px 0 0 10px;
            }
            .confirm_modal_title {
                color: rgba(23, 35, 61, 1);
                font-family: PingFangSC-Medium;
                font-size: 16px;
                font-weight: bold;
                line-height: 24px;
                margin-left: 5px;
            }
        }
        .vertical_modal_body {
            margin-left: 35px;
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: rgba(23, 35, 61, 0.75);
            line-height: 22px;
        }
        .ivu-modal-footer {
            border-top: none;
            .ivu-btn {
                border-radius: 5px;
            }
        }
    }
}

.my_poptip {
    .btn_container {
        margin: 5px 0px 5px 20px;
    }
}

.brand_detail_modal {
    .ivu-modal-wrap {
        position: absolute;
        right: 0;
        bottom: 0;
    }
}

.settings_container {
    .ivu-table-wrapper {
        border: none;
    }
}
</style>
