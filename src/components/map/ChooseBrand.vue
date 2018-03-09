<!--此文件仅供开发时测试使用，具体功能已合并到SettingBox.vue中-->
<template>
     <Modal v-model="showModal" :closable="false" :styles='modalStyle' class='choose_brand_container modal_layer' width='712px' :mask-closable='false'>
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
                <div class='search_btn'>
                    <a class='icon-search ' style='color:#000' @click='searchBrand'></a>
                </div>
                <div class='keyword'> 
                    <Input v-model="keyword" style='width:350px'size="default" placeholder="请输入搜索品牌" ></Input>
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
                             <Checkbox :label="subItem['name']"></Checkbox>
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
                    <div class='chosen_brand_label'>{{item}}</div>
                    <div class='delete_brand_btn'>
                        <a class="icon-close close_btn" @click='deleteBrand'></a>
                    </div>
                </div>
            </template>
        </div>
        <div class='clear_float'></div>
        <div slot="footer">
        </div>
    </Modal>
</template>
<script>
import {
    mapState,
    mapActions,
    mapGetters,
    mapMutations
} from 'vuex'

import  util  from '@/assets/js/util'

export default {
    name: 'chooseBrand',
    props: {
        isShow: Boolean,
    },
    data() {
        return {
            //显示未找到
            modalStyle: {
                // right:0,
                top: 0,
                marginRight: '0px',
            },
            showBody:true,
            keyword:'',
            //当前选中的category索引
            currentCategoryIndex:0,
            allSelectedBrands:[],
            datas:[{
                category:'餐饮',
                // displayStyle:'category is_focus',
                // indeterminate:false,
                // checkAll:false,
                // allBrands:['kfc','mc'],
                // selected:[],
                // index:0,
                node:[{
                    name:'kfc',
                },{
                    name:'mc',
                }],
            },{
                category:'服饰',
                // displayStyle:'category',
                // indeterminate:false,
                // checkAll:false,
                // allBrands:['高档货','优衣库','地摊儿货'],
                // selected:[],
                // index:1,
                node:[{
                    name:'高档货',
                },{
                    name:'优衣库',
                },{
                    name:'地摊儿货',
                }],

            },{
                category:'食品',
                // displayStyle:'category',
                // indeterminate:false,
                // checkAll:false,
                // allBrands:['肉','菜','饭'],
                // selected:[],
                // index:2,
                node:[{
                    name:'肉',
                },{
                    name:'菜',
                },{
                    name:'饭',
                }],
            },{
                category:'化妆品',
                // displayStyle:'category',
                // indeterminate:false,
                // checkAll:false,
                // allBrands:['欧莱雅','dior','帮宝适','多美滋'],
                // selected:[],
                // index:3,
                node:[{
                    name:'欧莱雅',
                },{
                    name:'dior',
                },{
                    name:'帮宝适',
                },{
                    name:'多美滋',
                }],
            },{
                category:'家具',
                // displayStyle:'category',
                // indeterminate:false,
                // checkAll:false,
                // allBrands:['宜家1','宜家2','宜家3','宜家4','宜家5','宜家6'],
                // selected:[],
                // index:4,
                node:[{
                    name:'宜家1',
                },{
                    name:'宜家2',
                },{
                    name:'宜家3',
                },{
                    name:'宜家4',
                },{
                    name:'宜家5',
                },{
                    name:'宜家6',
                }],
            }],
        }
    },
    components: {},
    computed: {
        ...mapState(['map']),
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
        showModal: function(){
            console.log('this.isShow is ',this.isShow)
            return this.isShow;
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        ...mapActions({
            swtichAddBrandModal: 'swtichAddBrandModal',
            swtichBrandDetailModal: 'swtichBrandDetailModal',
            updateBrandSettingList:'updateBrandSettingList'
        }),
        init(){
            this.initChosenBrandData();
        },
        initChosenBrandData(){
            console.log('in chooseBrand:this is ',this)
            
            for(var i = 0 ; i <this.datas.length;i++){
                var iSelect = []
                for(var val of this.datas[i].node)
                    iSelect.push(val.name)
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
            console.log('this.datas is ',this.datas)
           
        },
        calAllSelectedBrand(){
            var all = [];
            for(var val of this.datas){
                if(val.selected){
                    all = all.concat(val.selected);
                }
            }
            this.allSelectedBrands = all;
        },
        close(){
            this.showModal = false
            this.swtichBrandDetailModal({
                'modalState': true
            })

        },
        submitData(){
            if(this.allSelectedBrands.length > 5 )
                this.error_tips = '选择的品牌数量不能超过5个'
            else{
                this.updateBrandSettingList({
                    title: '增益品牌设定',
                    tableData: [{
                        name: '大M',
                        type: '餐饮',
                        icon: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517317880345&di=bcdc7955301e8e3ce66785340340ddfc&imgtype=jpg&src=http%3A%2F%2Fimg1.imgtn.bdimg.com%2Fit%2Fu%3D2996272301%2C493319081%26fm%3D214%26gp%3D0.jpg'
                    }, {
                        name: '汉堡王',
                        type: '餐饮',
                        icon: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1614342440,3643628849&fm=27&gp=0.jpg'
                    }],
                    tips: '增益品牌'
                });

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
                   for(var j = 0;j < this.datas[i].allBrands.length;j++){
                       if(key === this.datas[i].allBrands[j]){
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
            //console.log('event is ',event)
            this.clickCategory(event)
            const index = this.currentCategoryIndex;
            if (this.datas[index].indeterminate) {
                this.datas[index].checkAll = false;
            } else {
                this.datas[index].checkAll = !this.datas[index].checkAll;
            }
            this.datas[index].indeterminate = false;

            if (this.datas[index].checkAll) {
                var arr = _.flattenDepth(this.datas[index].allBrands,1)
                this.datas[index].selected = arr
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
            var name = event.path[2].innerText;
            for(var i=0;i<this.datas.length;i++){
                var arr = this.datas[i].selected;
                if(arr){
                    for(var j = 0;j<arr.length;j++){
                        if(arr[j] === name){
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
@import './map/chooseBrand.css';
</style>


<style>
    .modal_layer{
        .ivu-modal-mask{
            z-index: 2000;
        }
        .ivu-modal-wrap{
            z-index: 2001;
        }
    }


    .choose_brand_container{
        .ivu-modal-header{
            padding: 0;
            height:64px;
        }
        .ivu-modal-body{
           padding:0;
        }
        .ivu-modal-content{
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
   
    ::-webkit-scrollbar {
        width: 6px;
        height: 6px;
    }

    ::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background: #a9a9a9;
    }
</style>