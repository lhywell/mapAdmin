<template>
    <div class='to_be_chosen_shops_container'>
        <div class='top_cards'>
            <div class='city_container'>
                <Card class='city'>
                    <div class='label'>意向城市</div>
                    <div class='content'>{{toBeChosenShopsBasicInfo.cityNum}}个城市</div>
                </Card>
            </div>
            <div class='shop_container'>
                <Card class='shop'>
                    <div class='label'>意向店铺</div>
                    <div class='content'>{{toBeChosenShopsBasicInfo.storeNum}}个店铺</div>
                </Card>
            </div>
            <div class='total_area'>
                <Card class='area'>
                    <div class='label'>辐射区域总面积</div>
                    <div class='content'>{{toBeChosenShopsBasicInfo.serviceAreaSum}}km²</div>
                </Card>
            </div>
            <div class='clear_float'></div>
        </div>
        <div class='table_container'>
            <PageTable :options='defaults'></PageTable>
        </div>
    </div>
</template>
<script>
import PageTable from '@/components/map/PageTable'
import util from '@/assets/js/util'
import {
    mapState,
    mapActions,
    mapGetters,
    mapMutations
} from 'vuex'
export default {
    name: 'openShops',
    data() {
        return {
            defaults: {
                table: {
                    btnWords: '添加待选门店',
                    height: '410',
                    callback: '',
                    tips: '文件上传',
                    columns: [{
                        title: '意向店址',
                        key: 'name',
                        width: 171,
                    }, {
                        title: '城市',
                        key: 'city',
                        width: 106,
                    }, {
                        title: '地址',
                        key: 'address',
                        width: 239,
                        render: (h, params) => {
                            const lengthLimit = util.maxTableColumnLength;
                            var address = params.row.address
                            var re = ''
                            if (address.length > lengthLimit) {
                                re = address.substr(0, lengthLimit) + '...'
                                return re;
                            } else {
                                return address;
                            }
                        }
                    }, {
                        title: '服务范围',
                        key: 'serviceScope',
                        width: 182,
                        sortable: true
                    }, {
                        title: '服务区域',
                        key: 'serviceArea',
                        width: 162,
                        sortable: true
                    }, {
                        title: ' ',
                        key: 'action',
                        width: 52,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('a', {
                                    'class': {
                                        'icon-delete': true
                                    },
                                    style: {
                                        // backgroundColor: 'white',
                                        color: 'rgba(23,35,61,0.55)',
                                        border: 'none',
                                        pointer: 'cursor',
                                        fontSize: '20px'
                                    },
                                    on: {
                                        click: () => {
                                          //调用接口deleteIntentionStore，删除意向门店
                                            this.removeRow(params.index);
                                        }
                                    }
                                }, '')
                            ]);
                        }
                    }],
                    data: []
                }
            },
            toBeChosenShopsBasicInfo: {}
        }
    },
    components: {
        PageTable,
    },
    computed: {},
    mounted() {
        this.init()
    },
    methods: {
        ...mapActions({
            swtichBrandDetailModal: 'swtichBrandDetailModal',
            setDropDownShop: 'setDropDownShop'
        }),
        init() {
            var vm = this;
            this.defaults.table.callback = function() {
                vm.swtichBrandDetailModal({
                    modalState: false
                });
                //vm.setDropDownShop(true);
            };
            this.toBeChosenShopsBasicInfo = {
                cityNum: 1,
                storeNum: 4,
                serviceAreaSum: 49.7,
            };
            this.defaults.table.data = [{
                name: '万豪意向店',
                city: '深圳',
                address: '广东省深圳市南山区粤海街道海珠社区东方向',
                serviceScope: '驾车30分钟',
                serviceArea: '24'
            }, {
                name: '后海意向店',
                city: '深圳',
                address: '中国广东省深圳市南山区海德三道13号',
                serviceScope: '半径 500米',
                serviceArea: '7.85'
            }, {
                name: '太阳广场意向店',
                city: '深圳',
                address: '中国广东省深圳市罗湖区解放路2001号',
                serviceScope: '步行时间 15分钟',
                serviceArea: '10'
            }, {
                name: '鸿展中心意向店',
                city: '深圳',
                address: '中国广东省深圳市罗湖区人民北路2022号',
                serviceScope: '半径 500米',
                serviceArea: '7.85'
            }, ]
        },
        removeRow(index) {
            this.defaults.table.data.splice(index, 1);
        },
    }
}
</script>
<style scoped>
@import './map/toBeChosenShops.css';
</style>
<style>
.table_container {
    .ivu-table-wrapper {
        border: none;
    }
}
</style>
