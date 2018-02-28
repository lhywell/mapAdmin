<template>
    <div id="Search">
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
        <Input v-model="searchValue" :icon="iconValue" placeholder="请输入位置" style="width: 278px" @on-enter="enter" @on-change="change" @on-click="emptyContent" class="searchInput">
        </Input>
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
            searchType: '位置'

        }
    },
    props: {},
    computed: {},
    components: {},
    mounted() {

    },
    methods: {
        enter() {},
        change() {
            if (this.searchValue.length > 0) {
                this.iconValue = 'close-circled';
            }
            if (this.searchValue.length == 0) {
                this.iconValue = '';
            }
        },
        emptyContent() {
            this.searchValue = '';
            this.iconValue = '';
        },
        searchPosition(item) {
            console.log(item)
            this.searchType = '位置'
        },
        searchBrand(){
            this.searchType = '品牌'
        }
    }
}

</script>
<style>
@import './map/search.css'

</style>
