<template>
    <div class='page_table'>
        <div class='header_tool'>
            <div class='upload'>
                <Button v-if='defaults.table.btnWords==="文件上传"' type="primary" @click='doIt' style='width:102px'>{{defaults.table.btnWords}}</Button>
                <Button v-else type="primary" icon="ios-plus-outline" @click='doIt' style='width:138px'>{{defaults.table.btnWords}}</Button>
                <!-- <Poptip trigger="hover" placement="top" class='tips' transfer>
                    <Icon type="ios-help-outline" class="helpIcon"></Icon>
                    <div slot="title">说明</div>
                    <div slot="content">
                        {{this.defaults.table.tips}}
                    </div>
                </Poptip> -->
            </div>
            <!-- <div class='clear_float'></div> -->
            <div class='search'>
                <Input v-model="keyword" icon="search" placeholder="搜索店铺名称" style="width: 200px" @on-enter='search' @on-change='search'></Input>
            </div>
        </div>
        <div class='table_container'>
            <Table
               :height='defaults.table.height'
               :columns="defaults.table.columns"
               :data="defaults.table.showData"
                >
            </Table>
        </div>
        <div class='page_container'>
            <Page :total="defaults.table.newData.length"
                    :current="defaults.table.currentPage"
                    @on-change="changePage"
                    :page-size="defaults.table.pageSize"
                    @on-page-size-change = 'pageSizeChange'
                    show-sizer class ='page'
                    placement = 'top'
                    >
            </Page>
            <div class='clear_float'></div>
        </div>
    </div>
</template>
<script>
import {
    mapState,
    mapActions,
    mapGetters,
    mapMutations
} from 'vuex'
export default {
    props: {
        options: {}
    },
    data() {
        return {
            defaults: _.merge({
                table: {
                    columns: [],
                    data: [],
                    width:0,
                    currentPage:1,
                    pageSize:10,
                    newData:[],
                    showData:[]
                }
            }, this.options),
            keyword:'',
        }
    },
    watch: {
        'options.table': {
            handler: function (val, oldVal) {
                // this.defaults.table = _.merge(this.defaults.table, val)
                this.defaults.table = _.merge({
                            columns: [],
                            data: [],
                            width:0,
                            currentPage:1,
                            pageSize:10,
                            newData:[],
                            showData:[]
                        },val);
                this.init()
            },
            deep: true
        },
        'map.brandDetailModal': {
                handler: function(val, oldVal) {
                    if(val === true){
                        this.keyword = '';
                        this.search();
                    }
                },
                deep: false,
                immediate: true
            }
    },
    mounted() {
        this.init()
    },
    computed:{
         ...mapState(['map']),
    },
    methods: {
        ...mapActions({
            swtichBrandDetailModal: 'swtichBrandDetailModal',
            // setDropDownShop:'setDropDownShop'
        }),
        // teset(param,index){
        //     // debugger
        //     console.log('param is ',param,',index is ',index)
        //     // this.refs.table
        // },
        init() {
            if (this.defaults.table.columns.length) {

            }
            if (this.defaults.table.data.length) {
                this.defaults.table.newData = this.defaults.table.data;
                this.changePage(1);
            }
            document.getElementsByTagName('tr').onmouseover=function(){
                alert('mouseover')
            }
        },
        changePage(pageNum) {                     //页码改变的回调
           const size = this.defaults.table.pageSize;
           this.defaults.table.showData = this.defaults.table.newData.slice((pageNum-1)*size,pageNum*size);
           this.defaults.table.currentPage = pageNum;
        },
        pageSizeChange(size){
            this.defaults.table.pageSize = size;
            this.changePage(1);
        },
        doIt(){
            this.defaults.table.callback();
            //console.log('upload file')
        },
        search(){
            if(this.keyword.trim() === ''){
                this.defaults.table.newData = this.defaults.table.data;
                // console.log('search in kong:this.defaults.table.newData is ',this.defaults.table.newData,'this.defaults.table.data is ',this.defaults.table.data )
                this.changePage(1);
            }
            else{
                var result = []
                for(var val of this.defaults.table.data){
                    if(val.name === this.keyword)
                        result.push(val)
                }
                this.defaults.table.newData = result;
                this.changePage(1);
            }

        }
    }
}
</script>
<style scoped>
@import './map/pageTable.css';
</style>
<style>
.page_container{
    font-size:14px !important;

    .ivu-page-options-sizer{
        width:96px;
    }
    .ivu-select-selected-value{
        font-size:14px !important;
    }
}
</style>
