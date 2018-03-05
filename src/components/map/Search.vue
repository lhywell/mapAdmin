<template>
    <div id="Search">
        <div class="box">
            <Dropdown class="searchType" placement="bottom-start">
                <Button type="ghost">
                    <span class="title">
                    <span>{{searchType}}</span>
                    </span>
                    <Icon type="chevron-down"></Icon>
                </Button>
                <Dropdown-menu slot="list">
                    <Dropdown-item>
                        <div @click="searchPosition">
                            <Icon type="ios-location"></Icon>位置
                        </div>
                    </Dropdown-item>
                    <Dropdown-item>
                        <div @click="searchBrand">
                            <i class="icon-attraction"></i>品牌
                        </div>
                    </Dropdown-item>
                </Dropdown-menu>
            </Dropdown>
            <Input v-model="searchValue" :icon="iconValue" :placeholder="this.place" style="width: 278px" @on-enter="enter" @on-change="change" @on-click="emptyContent" class="searchInput">
            </Input>
        </div>
        <div>
            <div class="searchResult" style="width: 278px;">
                <ul>
                    <li v-for="item in results" class="ui3-suggest-item" style="">
                        <a @click="panto(item)"><i class="default">{{item.title}}</i><em>{{item.address}}</em></a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import qs from 'qs';

export default {
    name: 'Search',
    data() {
        return {
            formValidate: {
                name: '',
            },
            ruleValidate: {
                name: [
                    { required: true, message: '名称不能为空', trigger: 'blur' }
                ]
            },
            searchValue: '',
            iconValue: '',
            searchType: '位置',
            results: [],
            place: '请输入位置'

        }
    },
    props: {},
    computed: {},
    components: {},
    mounted() {

    },
    methods: {
        enter() {
            if (this.results[0]) {
                this.panto(this.results[0]);
            }
        },
        change() {
            if (this.searchValue.length > 0) {
                this.iconValue = 'close-circled';
            }
            if (this.searchValue.length == 0) {
                this.iconValue = '';
            }
            if (this.searchType === '位置') {
                let options = {
                    onSearchComplete: (results) => {
                        this.results = [];
                        if (local.getStatus() == BMAP_STATUS_SUCCESS) {
                            var s = [];
                            for (var i = 0; i < results.getCurrentNumPois(); i++) {
                                s.push({
                                    title: results.getPoi(i).title,
                                    city: results.getPoi(i).city,
                                    address: results.getPoi(i).address,
                                    point: results.getPoi(i).point
                                });
                            }
                            this.results = s;
                        }
                    }
                };
                let local = new BMap.LocalSearch(this.$Baidu, options);
                local.search(this.searchValue);
            }
        },
        emptyContent() {
            this.searchValue = '';
            this.iconValue = '';
            this.results = [];
        },
        searchPosition(item) {
            this.searchType = '位置';
            this.place = '请输入位置';
        },
        searchBrand() {
            this.searchType = '品牌';
            this.place = '请输入品牌';
        },
        panto(item) {
            let point = item.point;
            let marker = this.$utils.drawMarker(point, 2);

            this.searchValue = item.title;
            this.results = [];

            this.$Baidu.addOverlay(marker);
            this.$Baidu.setCenter(point);
            this.$Baidu.panTo(point);
            this.$Baidu.setZoom(16);
        }
    }
}

</script>
<style>
@import './map/search.css'

</style>
