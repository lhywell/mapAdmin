<template>
    <Modal v-model="map.newBrandModal" :closable="false" width='332px' class='brandModal' :mask-closable='false'>
        <div slot="header" class='brand_header'>
            <span class='brand_title'>新建选址品牌</span>
            <a class="icon-close closeBtn" v-show='showCancel' @click='close'></a>
            <!--      <img src="../../assets/images/icons/mc.png"/> -->
        </div>
        <form @keyup.enter="clickSubmit">
            <div class='brand_name'>
                <span class='brand_name_lab'>品牌名称</span>
                <Select v-model="brand.name" filterable class="brand_name_value" placeholder="搜索品牌或者直接输入名称" @on-change="focus">
                    <Option v-for="item in brandList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <div v-show="nameError" class='brand_name_err'>{{ nameErrorMsg }}</div>
            </div>
            <div class='brand_position'>
                <span class='brand_position_lab'>品牌定位</span>
                <Select v-model="brand.position" @on-change='changeSelect' class="brand_position_value" placeholder='请选择品牌定位'>
                    <Option v-for="item in brandPositionList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <div v-show="positionError" class='brand_position_err'>{{ positionErrorMsg }}</div>
            </div>
        </form>
        <div slot="footer">
            <Button type="text" v-show='showCancel' size="large" @click="close">取消</Button>
            <Button type="info" size="large" @click="clickSubmit" class='submit_btn'>确认</Button>
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

import util from '@/assets/js/util'
import _resource from '@/assets/js/resource'

export default {
    name: 'createBrand',
    data() {
        return {
            //showModal:true,
            brandList: [],
            brand: {
                name: '',
                position: ''
            },
            brandPositionList: util.brandPositionList,
            nameError: false,
            nameErrorMsg: '',
            positionError: false,
            positionErrorMsg: '',
            showCancel: true,
            indeterminate: true,
            checkAll: false,
            checkAllGroup: []
        }
    },
    components: {},
    computed: {
        ...mapState(['map'])
    },
    mounted() {
        this.init();
    },
    methods: {
        ...mapActions({
            switchModal: 'swtichBrandDetailModal',
            swithCurrentModal: 'swtichNewBrandModal',
            setCurrentBrandId: 'setCurrentBrandId'
        }),
        init() {
            //模拟查询品牌，调用接口standardBrandList
            //this.queryBrandList();
            this.brandList = [{
                id: 39,
                value: '周黑鸭',
                label: '周黑鸭'
            }, {
                id: 1,
                value: '肯德基',
                label: '肯德基'
            }, {
                id: 2,
                value: '麦当劳',
                label: '麦当劳'
            }, {
                id: 9,
                value: '绝味鸭脖',
                label: '绝味鸭脖'
            }, {
                id: 8,
                value: '久久丫',
                label: '久久丫'
            }]
        },
        focus() {
            let vm = this
            vm.nameError = false
            vm.nameErrorMsg = ''
        },
        changeSelect() {
            let vm = this
            vm.positionError = false
            vm.positionErrorMsg = ''
        },
        queryBrandList(){
            let requestList = []
            var url = _resource.standardBrandList
            requestList.push(this.$axios(util.makeRequest({
                url: url,
                method: 'get'
            })))

            this.$axios.all(requestList)
                .then(this.$axios.spread((acct) => {
                    if (acct) {
                        // this.$Message.warning('lvelvelve!', 3);
                        var responseData = acct.data;
                        this.brandList = []
                        for(var val of responseData){
                            this.brandList.push({
                                value:val.id,
                                label:val.name
                            })
                        }
                    }
                }))
                .catch((response) => {
                    if (response.response) {
                        if (response.response.status === 400) {
                           
                        }
                    } else {

                    }
                })
        },
        clickSubmit(event) {
            event.preventDefault()
            if (!this.brand.name) {
                this.nameError = true
                this.nameErrorMsg = '请输入品牌名称'
            } else if (!this.brand.position) {
                this.positionError = true
                this.positionErrorMsg = '请选择品牌定位'
            } else { 
                for(var key in this.brandList){
                    if(this.brand.name === this.brandList[key].id){
                        //this.submitData(this.brandList[key],this.brand.position);
                    }
                }

                var brandId = '';
                for (var val of this.brandList) {
                    if (val.value === this.brand.name)
                        brandId = val.id;
                }
                this.setCurrentBrandId({
                    'brandId': brandId
                })

                this.swithCurrentModal({
                    'modalState': false
                })
                this.switchModal({
                    'modalState': true
                })
            }
        },
        submitData(obj,position){
            var result = {};
            result['name'] = obj.name
            result['standardBrandId'] = obj.id
            result['userId'] = obj.id
            result['type'] = obj.type
            result['locate'] = position
            let requestList = [];
            requestList.push(this.$axios(util.makeRequest({
                url: _resource.createBrand,
                method: 'post',
                data: result
            })))

            this.$axios.all(requestList)
                .then(this.$axios.spread((acct) => {
                    if (acct && acct.code === 200) {
                        this.setCurrentBrandId({
                            'brandId': obj.id
                        })

                        this.swithCurrentModal({
                            'modalState': false
                        })
                        this.switchModal({
                            'modalState': true
                        })
                    }
                })).catch((response) => {
                    if (response.response) {
                        if (response.response.status === 400) {
                           
                        }
                    } else {

                    }
                })
        },
        close() {
            this.swithCurrentModal({
                'modalState': false
            })
        },
    }
}
</script>
<style scoped>
@import './map/createBrand.css';
</style>
<style>
.brandModal {
    .ivu-modal-footer {
        border: none;
    }
    .ivu-modal-header {
        padding: 16px;
    }
    .ivu-modal-body {
        padding: 0 16px 16px 22px;
    }
}


/*   .brand_name_value{
            .ivu-select-input{
                color: rgba(23,35,61,0.25);
            }
        }*/

.brand_position_value {
    .ivu-select-placeholder {
        color: rgba(28, 36, 56, 0.56) !important;
    }
}
</style>
