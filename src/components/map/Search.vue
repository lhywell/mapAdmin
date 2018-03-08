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
            <div class="searchResult" style="width: 349px;">
                <ul>
                    <li v-for="item in results" class="ui3-suggest-item" style="">
                        <a @click="panto(item)">
                            <Icon type="search"></Icon><i class="default">{{item.name}}</i><em>{{item.address}}</em></a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import qs from 'qs';
import selfModel from '@/assets/js/selfModel'

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
    mixins: [selfModel],
    methods: {
        enter() {
            if (this.results) {

                this.results.map((x, y) => {
                    let point = x.point;
                    let marker = this.$utils.drawSearchMarker(point, 2);
                    /*保存属性*/
                    marker.type = 'smart_search_poi';
                    marker.item = x;
                    marker.addEventListener("click", this.elementClick);
                    /*保存属性*/
                    this.$Baidu.addOverlay(marker);
                })
                this.$Baidu.reset();
            }
        },
        elementClick(e) {
            this.$store.dispatch('setSelfModal', {
                infoModal: true,
                infoTarget: e
            })
        },
        change() {
            if (this.searchValue.length > 0) {
                this.iconValue = 'close-circled';
            }
            if (this.searchValue.length == 0) {
                this.iconValue = '';
                this.emptyMap();
            }
            if (this.searchType === '位置') {
                let options = {
                    onSearchComplete: (results) => {
                        this.results = [];
                        if (local.getStatus() == BMAP_STATUS_SUCCESS) {
                            var s = [];
                            for (var i = 0; i < results.getCurrentNumPois(); i++) {
                                s.push({
                                    name: results.getPoi(i).title,
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

            this.emptyMap();
        },
        emptyMap() {
            let list = this.$Baidu.getOverlays();
            list.map((item, index) => {
                if (item.type == 'smart_search_poi' && item instanceof BMap.Marker) {
                    this.$Baidu.removeOverlay(item);
                }
            })
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
            let marker = this.$utils.drawSearchMarker(point, 1);
            /*保存属性*/
            marker.type = 'smart_search_poi';
            marker.item = item;
            /*保存属性*/

            marker.addEventListener("click", this.elementClick);
            this.searchValue = item.name;
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
