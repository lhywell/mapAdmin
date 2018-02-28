<template>
    <Modal v-model="map.brandDetailModal" :closable="false" :transition-names='animate' :styles='map.brandModalStyle' class='brand_detail_modal'  width='1006px' :mask-closable='false'>
        <div slot="header" class='detail_header'>
            <a class="icon-close closeBtn" @click='close'></a>
            <span>{{brandBasicInfo.name}}</span>
            <div class='right_tools'>
                <Poptip trigger="hover" placement="bottom-end" class="icon-more_vert my_poptip">
                    <div slot="content" class='btn_container'>
                        <Button type="ghost" class='delete_brand_btn' @click="deleteBrand">删除品牌</Button>
                    </div>
                </Poptip>
            </div>
        </div>
        <div class='detail_tab_container'>
            <Tabs :value="currentTab">
                <TabPane label="品牌属性" class ='attr_tab' name="attribute">
                    <Card class='basic_info'>
                        <p slot="title" class='basic_info_title'>基本信息</p>
                        <div class = 'content'>
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
                        <SettingBox :outerDatas='compeleteBrandList' class='compete_brand_setting'></SettingBox>
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

    <!-- <ChooseBrand></ChooseBrand> -->
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
import SettingBox from './SettingBox'
import ChooseBrand from '@/components/map/ChooseBrand'
import OpenedShops from '@/components/map/OpenedShops'
import ToBeChosenShops from '@/components/map/ToBeChosenShops'

export default {
    name: 'brandDetail',
    data() {
        return {
            currentTab: 'attribute',
            animate:['move-right', 'fade'],
            title:'周黑鸭',
            brandBasicInfo:{},
            // brand: {
            //     name: '',
            //     position: '轻奢侈'
            // },
            brandPositionList: util.brandPositionList,
            gainData : {},
            competeData : {},
            gainBrandList :{},
            compeleteBrandList : {},
            // modalTransition:'brand_detail_modal'

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
                if(val){
                    //发送请求查询该brandId对应的品牌信息,调用接口brandInfo，brandRelation*2
                }
            },
            deep: false,
            immediate: true
        }
    },
    computed: {
        ...mapState(['map']),
        // text:function(){
        //     //console.log('tse')
        //     return this.map.brandDetailModal
        // }
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
                tableData: [{
                    id:1,
                    name: '麦当劳',
                    type: '餐饮',
                    icon: 'http://smartdata.b0.upaiyun.com/thinkmark/mc.png'
                }, {
                    id:2,
                    name: '肯德基',
                    type: '餐饮',
                    icon: 'http://smartdata.b0.upaiyun.com/thinkmark/kfc.png'
                }],
                tips: '待选地周边的增益品牌会使选址评分增加'
            };
            this.compeleteBrandList = {
                title: '竞品品牌设定',
                tableData: [{
                    id:9,
                    name: '绝味鸭脖',
                    type: '餐饮',
                    icon: 'http://smartdata.b0.upaiyun.com/thinkmark/jw.png'
                }, {
                    id:8,
                    name: '久久丫',
                    type: '餐饮',
                    icon: 'http://smartdata.b0.upaiyun.com/thinkmark/jjy.png'
                }],
                tips: '待选地周边的排斥品牌会使选址评分降低'
            };
        },
        close() {
            this.switchDetailModal({
                'modalState': false
            })
        },
        deleteBrand() {
            console.log('delete brand')
            this.confirmDelete();
        },
        confirmDelete(){
            this.$Modal.confirm({
                    title: '确定删除当前品牌',
                    content: '<p>删除后此品牌所有数据将被清除，包括已保存图层操作、上传门店等。</p>',
                    onOk: () => {
                        //调用deleteBrand接口
                    },
                    onCancel: () => {

                    }
                });
        },
    }
}
</script>

<style scoped>
@import './map/brandDetail.css';
</style>

<style>
.brand_detail_modal {
    height:100%;
    .ivu-modal-content{
        height:100%;
        border-radius:1px;
        .ivu-modal-body {
            /*height:calc( 100% - 47px);*/
            min-height:710px;
            background-color: rgba(23, 35, 61, 0.06);
            padding: 0px;

            .detail_tab_container {
                height:100%;
                .ivu-tabs{
                   height:100%;

                   .ivu-tabs-bar{
                        margin-bottom:0px;
                        background-color: rgba(23, 35, 61, 0.03);

                        .ivu-tabs-nav-scroll{
                            margin-top:7px;
                            .ivu-tabs-nav {
                                margin-left: 50px;
                                height:41px;
                            }
                        }
                    }

                    .ivu-tabs-content{
                        height:100%;
                    }
                }

            }
        }
        .ivu-modal-footer {
            background-color: rgba(16, 17, 19, 0.03);
            border-top: none;
            padding:0;
        }
    }
}

/*.brand_detail_modal{
    .ivu-modal-wrap{
        .ivu-modal{
            .ivu-modal-content{
                overflow-y:hidden;
                overflow-x:hidden;
            }
        }
    }

}*/

.my_poptip {
    .btn_container {
        margin: 5px 0px 5px 20px;
    }
}
</style>
