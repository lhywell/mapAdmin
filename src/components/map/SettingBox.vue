<template>
    <Card class='setting_box' :padding = 'padVal'>
        <p slot="title" class='setting_title'>
            <span>{{settings.title}}</span>
            <Poptip trigger="hover" placement="top" transfer>
                <Icon type="ios-help-outline" class="helpIcon"></Icon>
                <div slot="content">                 
                    {{this.tips}} 
                </div>
            </Poptip>
           <!--  <Button type='info' @click='addData'>adddata</Button> -->
        </p>
        <a href="#" slot="extra" @click='add' class="icon-add-big setting_add">
        </a>
        <Table :columns="tableColumn" :data="tableData"></Table>	

        <Modal v-model="showModal" :closable="false" :styles='modalStyle' :transition-names='animate' class='choose_brand_container modal_layer' width='712px' :mask-closable='false'>
        <div slot="header" class='header'>
            <a class="icon-close close_btn" @click='close'></a>
            <span class='title'>选择品牌</span>
            <div class='right_tool'>
                <span class='error_tips'>{{error_tips}}</span>
                <Button type="info" class='submit_btn' @click="submitData">确认</Button>
            </div>
        </div>
        <div class='search_and_statistics'>
            <div class='search_container'>
                <div class='keyword'> 
                    <Input v-model="keyword" icon="search" style='width:350px'size="default" placeholder="请输入搜索品牌" @on-enter='searchBrand' @on-change='reset'></Input>
                </div>
            </div>
            <div class='statistics_container'>
                <div class='content'>
                    <span >已选品牌</span>
                    <span style='marginLeft:80px;color:rgba(45,140,240,1)'>{{allSelectedBrands.length}}</span>
                    <span>个</span>
                </div>
            </div>
            <div class='clear_float'></div>
        </div>
        <div v-if='showBody' class='choose_body'>
            <div class='layer_one'>
                <template v-for="(item,index) in datas">
                    <div :class="item['displayStyle']" @click='clickCategory'>
                        <Checkbox :indeterminate="item['indeterminate']" :value="item['checkAll']" @click.stop.prevent.native="handleCheckAll">{{item.category}} </Checkbox>
                    </div>
                </template>  
            </div>       
            <div class='layer_two'>
                    <template v-for="(item,index) in datas">
                        <CheckboxGroup v-model="datas[index]['selected']" @on-change="checkAllGroupChange">
                        <template v-for="(subItem,subIndex) in item['node']">
                            <div :class='showClass[index]'>
                                 <Checkbox :label="subItem['name']" :param='subItem'></Checkbox>
                            </div>
                        </template> 
                    </CheckboxGroup> 
                </template> 
            </div>
        </div>
        <div class='search_nothing' v-else>
            <div class='icon-attraction not_find_icon'></div>
            <div class='not_find_tips'>暂未收录此品牌</div>
        </div>
        <div class='chosen'>
            <template  v-for="(item,index) in allSelectedBrands">
                <div class='brand_label_container'>
                    <div class='chosen_brand_label' :paraId='item.id'>{{item.name}}</div>
                    <div class='delete_brand_btn'>
                        <a class="icon-close" style='color:#000' @click='deleteBrand'></a>
                    </div>
                </div>
            </template>
        </div>
        <div class='clear_float'></div>
        <div slot="footer">
        </div>
    </Modal>
    </Card>
</template>
<script>
import {
    mapState,
    mapActions,
    mapGetters,
    mapMutations
} from 'vuex'
import util from '@/assets/js/util'
import ChooseBrand from '@/components/map/ChooseBrand'

export default {
    name: 'settingBox',
    props: {
        outerDatas: Object,
    },
    data() {
        return {
            //模态框用属性
            showModal:false,
            //模态框动画
            animate:['move-right', 'fade'],
            //显示未找到
            modalStyle: {
                height:'100%',
                position:'absolute',
                bottom:0,
                top:0,
                right: 0,
            },
            showBody:true,
            keyword:'',
            //当前选中的category索引
            currentCategoryIndex:0,
            allSelectedBrands:[],
            datas:[],
            //table用属性
        	settings:{},
        	padVal : 0,
            isShow:false,
            //sourceMark:this.mark,
        	tableColumn: [
                    {
                        title: '品牌名称',
                        key: 'name',
                        render: (h, params) => {
                            //var im = this.tableData[params['index']]['icon'];
                            var re = this.tableData[params['index']]['icon'];
                            return h('div', [
                                h('Avatar', {
                                    'class': {},
                                    attrs: {
                                        src: re,
                                        
                                    },
                                    style:{
                                        height:'32px',
                                        width:'32px',
                                        verticalAlign:'middle'
                                    },
                                    domProps:{}
                                }),
                                h('span', {
                                	style:{
                                    	marginLeft:'20px',
                                        color:'rgba(23,35,61,0.75)',
                                    },
                                    domProps: {
                                        innerHTML:params.row.name
                                    }
                                }),
                            ]);
                        },
                        width:215
                    },
                    {
                        title: '品牌类型',
                        key: 'type',	
                        width:160
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('a', {
                                    'class':{
                                        'icon-delete':true
                                    },
                                    style: {
                                        // backgroundColor: 'white',
                                        color: 'rgba(23,35,61,0.55)',
                                        border:'none',
                                        pointer:'cursor',
                                        fontSize:'16px'
                                    },
                                    on: {
                                        click: () => {
                                            //删除品牌竞品/增益关系，调用接口deleteBrandRelation
                                            this.removeRow(params.index)
                                        }
                                    }
                                }, '')
                            ]);
                        }
                    }
                ],
        }
    },
    watch: {
            'outerDatas': {
                handler: function(val, oldVal) {
                  	this.settings = val;
                },
                deep: false,
                immediate: true
            },
            'map.currentBrandId': {
                handler: function(val, oldVal) {
                    //console.log('map.currentBrandId state change,val is ',val)
                    if(val){
                        //发送请求查询全部品牌列表，用于初始化添加增益品牌、竞品品牌列表，调用接口standardBrandList 
                    }
                },
                deep: false,
                immediate: true
            }
        },
    components: {
    },
    computed: {
        ...mapState(['map']),
        tableData:function(){
            return this.settings.tableData;
        },
        tips:function(){
            return this.settings.tips
        },
        showClass : function(){
            var result = []
            for(var i = 0;i < this.datas.length ;i++)
            {
                if(i !== this.currentCategoryIndex)
                    result.push('single_option '+'not_show_current')
                else
                    result.push('single_option '+'show_current')
            }
            return result;
        },
        error_tips :function(){
            if(this.allSelectedBrands.length > 5 )
                return '选择的品牌数量不能超过5个';
            else
                return '';
        },
    },
    created(){
        //this.initChosenBrandData();
    },
    mounted() {
        this.init()
    },
    methods: {
        ...mapActions({
            swtichBrandDetailModal: 'swtichBrandDetailModal',
            changeBrandModalStyle:'changeBrandModalStyle'
        }),
        addData(){
            // this.datas = [{
            //     category:'餐饮',
            //     selected:[],
            //     node:[{
            //         id:1,
            //         name:'肯德基',
            //     },{
            //         id:2,
            //         name:'麦当劳',
            //     },{
            //         id:3,
            //         name:'必胜客',
            //     },{
            //         id:4,
            //         name:'海底捞',
            //     },{
            //         id:5,
            //         name:'真功夫',
            //     },{
            //         id:6,
            //         name:'永和大王',
            //     },{
            //         id:7,
            //         name:'小肥羊',
            //     },{
            //         id:8,
            //         name:'久久丫',
            //     },{
            //         id:9,
            //         name:'绝味鸭脖',
            //     },{
            //         id:10,
            //         name:'大娘水饺',
            //     },{
            //         id:11,
            //         name:'庆丰包子铺',
            //     },{
            //         id:12,
            //         name:'谷子帝',
            //     },{
            //         id:13,
            //         name:'吉野家',
            //     },{
            //         id:14,
            //         name:'永和豆浆',
            //     },{
            //         id:15,
            //         name:'丽华快餐',
            //     },{
            //         id:16,
            //         name:'东方既白',
            //     },{
            //         id:17,
            //         name:'面点王',
            //     },{
            //         id:18,
            //         name:'BurgerKing汉堡王',
            //     },{
            //         id:19,
            //         name:'马兰拉面Malan',
            //     }],
            // },{
            //     category:'服饰',
            //     selected:[],
            //     node:[{
            //         id:20,
            //         name:'韩都衣舍HSTYLE',
            //     },{
            //         id:21,
            //         name:'海澜之家HLA',
            //     },{
            //         id:22,
            //         name:'Zara飒拉',
            //     },{
            //         id:23,
            //         name:'UNIQLO优衣库',
            //     },{
            //         id:24,
            //         name:'H&M',
            //     },{
            //         id:25,
            //         name:'太平鸟PEACEBIRD',
            //     },{
            //         id:26,
            //         name:'罗蒙ROMON',
            //     },{
            //         id:27,
            //         name:'七匹狼SEPTWOLVES',
            //     },{
            //         id:28,
            //         name:'美特斯邦威',
            //     },{
            //         id:29,
            //         name:'森马Semir',
            //     },{
            //         id:30,
            //         name:'柒牌SEVEN',
            //     },{
            //         id:31,
            //         name:'乐町LEDIN',
            //     },{
            //         id:32,
            //         name:'劲霸K-BOXING',
            //     },{
            //         id:33,
            //         name:'鄂尔多斯ERDOS',
            //     },{
            //         id:34,
            //         name:'秋水伊人CHIUSHUI',
            //     },{
            //         id:35,
            //         name:'唐狮Tonlion',
            //     },{
            //         id:36,
            //         name:'GAP盖璞',
            //     },{
            //         id:37,
            //         name:'JEANSWEST真维斯',
            //     },{
            //         id:38,
            //         name:'裂帛LIEBO',
            //     }],
            // }]
        },
    	init(){
    		this.settings = _.merge({},this.outerDatas);
            this.datas = [{
                category:'餐饮',
                selected:[],
                node:[{
                    id:1,
                    name:'肯德基',
                },{
                    id:2,
                    name:'麦当劳',
                },{
                    id:3,
                    name:'必胜客',
                },{
                    id:4,
                    name:'海底捞',
                },{
                    id:5,
                    name:'真功夫',
                },{
                    id:6,
                    name:'永和大王',
                },{
                    id:7,
                    name:'小肥羊',
                },{
                    id:8,
                    name:'久久丫',
                },{
                    id:9,
                    name:'绝味鸭脖',
                },{
                    id:10,
                    name:'大娘水饺',
                },{
                    id:11,
                    name:'庆丰包子铺',
                },{
                    id:12,
                    name:'谷子帝',
                },{
                    id:13,
                    name:'吉野家',
                },{
                    id:14,
                    name:'永和豆浆',
                },{
                    id:15,
                    name:'丽华快餐',
                },{
                    id:16,
                    name:'东方既白',
                },{
                    id:17,
                    name:'面点王',
                },{
                    id:18,
                    name:'BurgerKing汉堡王',
                },{
                    id:19,
                    name:'马兰拉面Malan',
                }],
            },{
                category:'服饰',
                selected:[],
                node:[{
                    id:20,
                    name:'韩都衣舍HSTYLE',
                },{
                    id:21,
                    name:'海澜之家HLA',
                },{
                    id:22,
                    name:'Zara飒拉',
                },{
                    id:23,
                    name:'UNIQLO优衣库',
                },{
                    id:24,
                    name:'H&M',
                },{
                    id:25,
                    name:'太平鸟PEACEBIRD',
                },{
                    id:26,
                    name:'罗蒙ROMON',
                },{
                    id:27,
                    name:'七匹狼SEPTWOLVES',
                },{
                    id:28,
                    name:'美特斯邦威',
                },{
                    id:29,
                    name:'森马Semir',
                },{
                    id:30,
                    name:'柒牌SEVEN',
                },{
                    id:31,
                    name:'乐町LEDIN',
                },{
                    id:32,
                    name:'劲霸K-BOXING',
                },{
                    id:33,
                    name:'鄂尔多斯ERDOS',
                },{
                    id:34,
                    name:'秋水伊人CHIUSHUI',
                },{
                    id:35,
                    name:'唐狮Tonlion',
                },{
                    id:36,
                    name:'GAP盖璞',
                },{
                    id:37,
                    name:'JEANSWEST真维斯',
                },{
                    id:38,
                    name:'裂帛LIEBO',
                }],
            }]
    	},
    	add(){
            if(this.datas.length > 0){
                var table = this.settings.tableData;
                this.initChosenBrandData();
                this.allSelectedBrands = []; 
                //根据table中已经选中的品牌id修改checkbox状态
                for(var i = 0 ;i <table.length;i++){
                    var bran = table[i];
                    for(var j = 0 ; j < this.datas.length;j++){
                        for(var k = 0 ;k <this.datas[j].allBrands.length;k++){
                            if(bran['id'] === this.datas[j].allBrands[k]){
                                this.datas[j].selected.push(bran.name);
                                this.allSelectedBrands.push(bran);
                                if(this.datas[j].selected.length === this.datas[j].allBrands){
                                    this.datas[j].checkAll = true
                                    this.datas[j].indeterminate = false
                                }
                                else{
                                    this.datas[j].checkAll = false
                                    this.datas[j].indeterminate = true
                                }
                            }
                        }
                    }
                }
                //移动后面到最左边
                var left = window.screen.width - 1006 - 712;
                if(left < 0 )
                    left = 0
                var resultLeft = left+'px'
                //console.log('resultLeft is ',resultLeft)
                // console.log('left is ',left)
                this.changeBrandModalStyle({
                    modalStyle:{
                        height:'100%',
                        position:'absolute',
                        bottom:0,
                        top:0,
                        //right: 300,
                        left:resultLeft,
                        // transition: 'right,left 2s,2s',
                        // '-moz-transition': 'right,left 2s,2s',
                        // '-webkit-transition': 'right,left 2s,2s',
                        // '-ms-transition': 'right,left 2s,2s',
                        // '-o-transition': 'right,left 2s,2s',
                    }
                });
                this.showModal = true
            }
            else{
                console.log('与服务器连接失败，无法获取'+ this.settings.title +'列表')
            }
    
    	},
        removeRow(index) {
            this.tableData.splice(index, 1);
        },
        initChosenBrandData(){
            for(var i = 0 ; i <this.datas.length;i++){
                var iSelect = []
                for(var val of this.datas[i].node)
                    iSelect.push(val.id)
                this.datas[i]['allBrands'] = iSelect;
                this.datas[i]['selected'] = [];
                this.datas[i]['indeterminate'] = false;
                this.datas[i]['checkAll'] = false;
                this.datas[i]['index'] = i;

                if(i === 0 ){
                    this.datas[i]['displayStyle'] = 'category is_focus';
                }
                else{
                    this.datas[i]['displayStyle'] = 'category';
                }
            }
        },
        calAllSelectedBrand(){
            var all = [];
            for(var val of this.datas){
                var te = [];
                for(var i = 0 ;i<val.selected.length;i++){
                    for(var j = 0 ;j<val.node.length;j++){
                        if(val.selected[i] === val.node[j].name)
                            te.push(val.node[j])
                    }
                }
                all = all.concat(te);
            }
            // debugger
            this.allSelectedBrands = all;
        },
        close(){
            this.changeBrandModalStyle({
                modalStyle:{
                    height:'100%',
                    position:'absolute',
                    bottom:0,
                    top:0,
                    right: 0,
                    left: 'auto',
                    // transition: 'right,left 2s,2s',
                    // '-moz-transition': 'right,left 2s,2s',
                    // '-webkit-transition': 'right,left 2s,2s',
                    // '-ms-transition': 'right,left 2s,2s',
                    // '-o-transition': 'right,left 2s,2s',
                }
            });
            this.showModal = false
            // this.swtichBrandDetailModal({
            //     'modalState': true
            // })

        },
        submitData(){
            if(this.allSelectedBrands.length > 5 )
                this.error_tips = '选择的品牌数量不能超过5个'
            else{
                //提交所选择品牌，调用接口createBrandRelation,创建成功后调用brandRelation查询品牌数据
                this.close();
            }
        },
        searchBrand(){
            var key = this.keyword.trim();
            var searchResult = false;
            if( key === '')
                this.showBody = true;
            else{
                for(var i = 0;i < this.datas.length;i++){
                   for(var j = 0;j < this.datas[i].node.length;j++){
                       if(key === this.datas[i].node[j].name){
                            this.currentCategoryIndex = i;
                            searchResult = true;
                            this.freshStyle(i);
                            break;
                       }
                    }
                }
                if(searchResult === false)
                    this.showBody = false;
            }
        },
        reset(){
            var key = this.keyword.trim();
            if( key === '')
                this.showBody = true;
        },
        clickCategory(event){
            //判断点击的是文字还是checkbox框
            var content = event.path[0].innerText.trim();
            if(!content)
                content = event.currentTarget.innerText.trim();
            for(var i = 0;i < this.datas.length;i++){
                if(content === this.datas[i].category){
                    this.currentCategoryIndex = i;
                    this.freshStyle(i);
                    break;
                }
            }
        },
        //修改点击后的背景样式
        freshStyle(index){
            for(var i = 0;i < this.datas.length;i++){
                if( index === this.datas[i].index ){
                    this.datas[i].displayStyle = 'category is_focus'
                }
                else
                    this.datas[i].displayStyle = 'category'
            }
        },
        handleCheckAll(event) {
            this.clickCategory(event)
            const index = this.currentCategoryIndex;
            if (this.datas[index].indeterminate) {
                this.datas[index].checkAll = false;
            } else {
                this.datas[index].checkAll = !this.datas[index].checkAll;
            }
            this.datas[index].indeterminate = false;

            if (this.datas[index].checkAll) {
                var arr = _.flattenDepth(this.datas[index].node,1);
                for(var val of arr)
                    this.datas[index].selected.push(val.name);
            } else {
                this.datas[index].selected = [];
            }
            this.calAllSelectedBrand();
        },
        checkAllGroupChange(data,index) {
            if(index === undefined ||index === '')
                index = this.currentCategoryIndex;
            if (data.length === this.datas[index].allBrands.length) {
                this.datas[index].indeterminate = false;
                this.datas[index].checkAll = true;
            } else if (data.length > 0) {
                this.datas[index].indeterminate = true;
                this.datas[index].checkAll = false;
            } else {
                this.datas[index].indeterminate = false;
                this.datas[index].checkAll = false;
            }
            this.calAllSelectedBrand();
        },
        deleteBrand(event){
            var name = event.path[2].innerText.trim();
            //var id = parseInt(event.path[2].childNodes[0].attributes.paraId.value);
            for(var i=0;i<this.datas.length;i++){
                var arr = this.datas[i].selected;
                if(arr){
                    for(var j = 0;j<arr.length;j++){
                        if(arr[j].trim() === name){
                            this.datas[i].selected.splice(j,1);
                            var arr2 = _.flattenDepth(this.datas[i].selected,1)
                            this.checkAllGroupChange(arr2,i);
                        }
                    }
                }
                
            }
        }
    }
}
</script>
<style scoped>
@import './map/settingBox.css';
@import './map/chooseBrand.css';
</style>

<style>

.modal_layer{
    .ivu-modal-mask{
        z-index: 2000;
    }
    .ivu-modal-wrap{
        z-index: 2001;
        position:absolute;
        right:0;
        bottom:0;
    }
}


.setting_box{
    .icon-add-big:before {
        color:rgba(45,140,240,1);
    }
}

.choose_brand_container{
        .ivu-modal-header{
            padding: 0;
            height:64px;
        }
        .ivu-modal-body{
           padding:0;
           height:calc(100% - 67px);  /*67px为header高度*/
        }
        .ivu-modal-content{
            height:100%;
            border-radius:1px;
        }
        .ivu-modal-footer{
            padding:0;
        }
    }


    .layer_two{
         .ivu-checkbox-wrapper{
            font-size:14px;
            color:rgba(23,35,61,0.75);
         }
    }

    .layer_one{
        .ivu-checkbox-wrapper{
            font-size:14px;
            color:rgba(23,35,61,0.75);
        }
    }
</style>
   
</style>
