<template>
    <div class="regions-matching__analyse">
        <div class="regions-matching__analyse__con">
            <div class="regions-matching__analyse__con__head">
                <span class="regions-matching__analyse__con__head--title">周边竞品分析</span>
                <div class="regions-matching__analyse__con__head--extra">
                    <Select v-model="selected" class="regions-matching__analyse__con__head--extra__types" @on-change="changeSelect">
                        <Option v-for="item in types" :value="item" :key="item">{{item}}</Option>
                    </Select>
                </div>
            </div>
            <div class="regions-matching__analyse__con__info">
                <div class="regions-matching__analyse__con__info--title">
                    {{selected.indexOf('全部')===-1?selected:'全部'}}门店
                </div>
                <div class="regions-matching__analyse__con__info__subcon">
                    <div class="regions-matching__analyse__con__info__subcon--num">{{selectedInfo[0]}}</div>
                </div>
            </div>
            <div class="regions-matching__analyse__con__info">
                <div class="regions-matching__analyse__con__info--title">
                    {{selected.indexOf('全部')===-1?selected:'全部'}}品牌
                </div>
                <div class="regions-matching__analyse__con__info__subcon">
                    <div class="regions-matching__analyse__con__info__subcon--num">{{selectedInfo[1]}}</div>
                </div>
            </div>
            <Table class="regions-matching__analyse__con__table" :columns="table.columns" :data="table.data"></Table>
            <Page class="regions-matching__analyse__con__page" :total="total" :current="current" @on-change="changePage"></Page>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        data: {
            type: Object,
            default: function() {
                return {}
            }
        }
    },
    data() {

        return {
            info: [],
            selectedInfo: [0, 0],
            types: ['全部分类'],
            selected: '全部分类',
            list: [],
            filterList: [], //存储符合条件的数据
            table: {
                columns: [{
                        title: '排名',
                        key: 'rank',
                        render: (h, params) => {
                            return h('span', this.start + params.index + 1);
                        }


                    },
                    {
                        title: '品牌',
                        key: 'brand',
                    },
                    {
                        title: '分类',
                        key: 'type',
                    },
                    {
                        title: '店铺数',
                        key: 'number',
                    }
                ],
                data: []
            },
            total: 0,
            current: 0,
            pageSize: 10,
            start: 0, //计算
        }
    },
    watch: {
        data(val, oldVal) {
            this.init();
        }
    },
    mounted() {},
    methods: {
        init() {
            this.types = [this.types[0]].concat(this.data.types);
            this.list = this.data.list;
            this.filterData();
        },
        changeSelect(val) {
            this.selected = val;
            this.filterData();
        },
        /**
         * [filterData 过滤周边竞品分析 table表格数据]
         */
        filterData() {
            let data = [],
                selectedInfo = [0, 0];
            //全部分类
            if (this.selected === this.types[0]) {
                data.push.apply(data, this.list);
            } else {
                this.list.forEach((item, index) => {
                    if (item.type === this.selected) {
                        data.push(item);
                    }
                });
            }

            data.forEach((item) => {
                selectedInfo[0] += item.number
            });
            selectedInfo[1] = data.length;
            this.selectedInfo = selectedInfo;
            this.filterList = data;
            this.total = data.length;
            this.current = 1;
            this.start = 0;
            this.table.data = this.filterList.slice(0, this.pageSize);
        },
        changePage(val) {
            //start开始数量
            this.start = (val - 1) * this.pageSize;
            this.current = val;
            this.table.data = this.filterList.slice(this.start, this.start + this.pageSize);
        }
    }
}

</script>
<style>
@import './chart/module/regions-matching/regions-analyse.less'

</style>
