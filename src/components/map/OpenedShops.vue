<template>
    <div class='opened_shops_container'>
        <div class='top_cards'>
            <div class='city_container'>
                <Card class='city' dis-hover>
                    <div class='label'>城市</div>
                    <div class='content'>{{openShopsBasicInfo.cityNum}}个城市</div>
                </Card>
            </div>
            <div class='shop_container'>
                <Card class='shop' dis-hover>
                    <div class='label'>店铺</div>
                    <div class='content'>{{openShopsBasicInfo.storeNum}}个店铺</div>
                </Card>
            </div>
            <div class='month_trade_container'>
                <Card class='month_trade' dis-hover>
                    <div class='label'>月总流水</div>
                    <div class='content'>￥{{totalIncomeSum}}</div>
                </Card>
            </div>
            <div class='clear_float'></div>
        </div>
        <div class= 'table_container'>
            <PageTable :options='defaults'></PageTable>
        </div>
    </div>
</template>
<script>
import PageTable from '@/components/map/PageTable'
import util from '@/assets/js/util'
export default {
    name: 'openShops',
    data() {
        return {
            defaults:{
                table:{
                    btnWords:'文件上传',
                    tips:'文件上传',
                    callback:function(){
                        console.log('open')
                    },
                    columns:[{
                        title:'店名',
                        key:'name',
                        width:250
                    },{
                        title:'城市',
                        key:'city',
                        width:200
                    },{
                        title:'详细地址',
                        key:'address',
                        render: (h, params) => {
                            const lengthLimit = util.maxTableColumnLength;
                            var address = params.row.address
                            var re = ''
                            if (address.length > lengthLimit) {
                                re = address.substr(0, lengthLimit) + '...'
                            } else {
                                re = address
                            }
                            return h('span', {
                                attrs: {
                                    title: address
                                }
                            },
                            re);
                        }
                    },{
                        title:'月流水',
                        key:'incomeMonthly',
                        sortable: true,
                        render: (h, params) => {
                            return util.milliFormat(parseFloat(params.row.incomeMonthly))
                        }
                    }],
                    data:[]
                }
            },
            openShopsBasicInfo:{},
        }
    },
    components: {
        PageTable,
    },
    computed: {
        shopCount:function(){
            return this.defaults.table.data.length
        },
        monthTradeAll:function(){
            var total = 0;
            for(var val of this.defaults.table.data){
                total += parseFloat(val['trade'])
            }
            return total;
        },
        totalIncomeSum:function(){
            if(this.openShopsBasicInfo.incomeSum)
                return util.milliFormat(this.openShopsBasicInfo.incomeSum)
            else
                return 0;
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        init() {
            //调用接口existedStoresSummary、existedStores获取已开店铺信息
            this.defaults.table.data = [
                    {
                        name: '周黑鸭(宝安机场三店)',
                        city: '深圳',
                        address: '深圳市宝安区宝安国际机场空港8道地面交通中兴2层GTC-106室(出发就坐电梯下层就直走)',
                        incomeMonthly: '10000'
                    },{
                        name: '周黑鸭(银田工业路)',
                        city: '深圳',
                        address: '深圳市宝安区银田工业路b13栋1楼',
                        incomeMonthly: '10000'
                    },{
                        name: '周黑鸭(布吉一村店)   ',
                        city: '深圳',
                        address: '深圳市龙岗区格塘路49-2号',
                        incomeMonthly: '10000'
                    },{
                        name: '周黑鸭(石街店)',
                        city: '深圳',
                        address: '深圳市宝安区固戍好万佳商场一楼',
                        incomeMonthly: '10000'
                    },{
                        name: '周黑鸭(银田工业路)',
                        city: '深圳',
                        address: '深圳市宝安区银田工业路b13栋1楼',
                        incomeMonthly: '10000'
                    },{
                        name: '周黑鸭(第二工业区路)',
                        city: '深圳',
                        address: '深圳市宝安区石岩镇上排新村西十一巷3号',
                        incomeMonthly: '10000'
                    },{
                        name: '周黑鸭(建辉路)',
                        city: '深圳',
                        address: '深圳市龙华区龙华汽车站帝龙城楼下',
                        incomeMonthly: '10000'
                    },{
                        name: '周黑鸭(上屋大道)',
                        city: '深圳',
                        address: '深圳市宝安区石岩镇上屋大道78号',
                        incomeMonthly: '10000'
                    },{
                        name: '周黑鸭(兰花路店)',
                        city: '深圳',
                        address: '深圳市宝安区钟屋三路50号荔枝公园门口',
                        incomeMonthly: '10000'
                    },{
                        name: '周记黑鸭',
                        city: '深圳',
                        address: '深圳市宝安区九围富源工业城S10栋',
                        incomeMonthly: '10000'
                    },{
                        name: '周黑鸭(银田工业路)',
                        city: '深圳',
                        address: '深圳市宝安区银田工业路b13栋1楼',
                        incomeMonthly: '10000'
                    },{
                        name: '周黑鸭(莲塘店)',
                        city: '深圳',
                        address: '深圳市罗湖区莲塘聚宝路1073号原公司旧机房',
                        incomeMonthly: '10000'
                    },{
                        name: '周黑鸭',
                        city: '深圳',
                        address: '深圳市龙岗区幛背步行街华都医院后门',
                        incomeMonthly: '10000'
                    },{
                        name: '周黑鸭(学府路店)',
                        city: '深圳',
                        address: '深圳市南山区学府路107-13号',
                        incomeMonthly: '10000'
                    },{
                        name: '周黑鸭(三围中路店)',
                        city: '深圳',
                        address: '深圳市宝安区三围中路与果园路交叉口南50米',
                        incomeMonthly: '10000'
                    },{
                        name: '周黑鸭(三围工业路)',
                        city: '深圳',
                        address: '深圳市宝安区三围万众百货旁',
                        incomeMonthly: '10000'
                    },{
                        name: '周黑鸭(石街店)',
                        city: '深圳',
                        address: '深圳市宝安区西乡街道固戌社区固戍一路281号一楼A4(固戌联升购物广场旁)',
                        incomeMonthly: '10000'
                    },{
                        name: '周黑鸭(一村街)',
                        city: '深圳',
                        address: '深圳市龙岗区一村街8-3号',
                        incomeMonthly: '10000'
                    },{
                        name: '周黑鸭(深圳万花筒店)',
                        city: '深圳',
                        address: '深圳市南山区桃源路147号南极苑1-006',
                        incomeMonthly: '10000'
                    },{
                        name: '周黑鸭(鹤围路)',
                        city: '深圳',
                        address: '深圳市罗湖区鹤围村4-5号',
                        incomeMonthly: '10000'
                    },{
                        name: '周黑鸭',
                        city: '深圳',
                        address: '深圳市龙岗区樟富北路法瑞姿大厦一楼',
                        incomeMonthly: '10000'
                    },{
                        name: '周黑鸭',
                        city: '深圳',
                        address: '深圳市宝安区沙井西环路2号附近',
                        incomeMonthly: '10000'
                    },{
                        name: '周黑鸭(深圳上梅林店)',
                        city: '深圳',
                        address: '深圳市福田区梅华路75-1号',
                        incomeMonthly: '10000'
                    },{
                        name: '周黑鸭(前海路店)',
                        city: '深圳',
                        address: '深圳市南山区前海路港湾丽都商业裙楼1层3005-17号',
                        incomeMonthly: '10000'
                    },{
                        name: '周黑鸭',
                        city: '深圳',
                        address: '深圳市宝安区横岗下大街小米横岗下旗舰店旁',
                        incomeMonthly: '10000'
                    },{
                        name: '周黑鸭(西丽店)',
                        city: '深圳',
                        address: '深圳市南山区西丽北路3-2号',
                        incomeMonthly: '10000'
                    }];
            this.openShopsBasicInfo = {
                cityNum: 1,
                storeNum: 26,
                incomeSum: 260000
            }
        },
    }
}
</script>
<style scoped>
@import './map/openedShops.css';
</style>
<style>
</style>