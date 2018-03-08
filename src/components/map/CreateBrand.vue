<template>
    <Modal v-model="map.newBrandModal" :closable="false" width='332px' class='brandModal' :mask-closable='false'>
            <div slot="header" class='brand_header'>
                <span class='brand_title'>新建选址品牌</span>
                <a class="icon-close closeBtn" @click='close'></a>
           <!--      <img src="../../assets/images/icons/mc.png"/> -->
            </div>
            <form @keyup.enter="submitData">
                <div class='brand_name'>
                    <span class='brand_name_lab'>品牌名称</span>
                    <Select v-model="brand.name" filterable class="brand_name_value" placeholder="搜索品牌或者直接输入名称"  @on-change="focus">
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
                <Button type="info" size="large" @click="submitData" class='submit_btn'>确认</Button>
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
    name: 'createBrand',
    data() {
        return {
            //showModal:true,
            brandList:[],
            brand:{
                name:'',
                position:''
            },
            brandPositionList:util.brandPositionList,
            nameError:false,
            nameErrorMsg:'',
            positionError:false,
            positionErrorMsg:'',
            showCancel:true,
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
            switchModal : 'swtichBrandDetailModal',
            swithCurrentModal: 'swtichNewBrandModal',
            setCurrentBrandId: 'setCurrentBrandId'
        }),
        init(){
            //模拟查询品牌，调用接口standardBrandList
            this.brandList = [
                    {
                        id:39,
                        value: '周黑鸭',
                        label: '周黑鸭'
                    },
                    {
                        id:1,
                        value: '肯德基',
                        label: '肯德基'
                    },
                    {
                        id:2,
                        value: '麦当劳',
                        label: '麦当劳'
                    },
                    {
                        id:9,
                        value: '绝味鸭脖',
                        label: '绝味鸭脖'
                    },
                    {
                        id:8,
                        value: '久久丫',
                        label: '久久丫'
                    }]
        },
        focus() {
            let vm = this
            vm.nameError = false
            vm.nameErrorMsg = ''
        },
        changeSelect(){
            let vm = this
            vm.positionError = false
            vm.positionErrorMsg = ''
        },
        submitData(event) {
                event.preventDefault()
                if (!this.brand.name) {
                    this.nameError = true
                    this.nameErrorMsg = '请输入品牌名称'
                }
                else if(!this.brand.position){
                    this.positionError = true
                    this.positionErrorMsg = '请选择品牌定位'
                }
                else { // admin
                    // const form = new FormData()
                    // form.append('id',this.brand.id)
                    // form.append('brandName', this.brand.name)
                    // form.append('brandPosition', this.brand.position)
                    var brandId = '';
                    for(var val of this.brandList){
                        if(val.value === this.brand.name)
                            brandId = val.id;
                    }
                    this.setCurrentBrandId({
                        'brandId': brandId
                    })

                    this.swithCurrentModal({
                        'modalState':false
                    })
                    this.switchModal({'modalState':true})
                    //var url = process.env.basicPath + process.env.loginPath

                    // bus.$axios({
                    //     method: 'post',
                    //     url: url,
                    //     headers: {
                    //         'Authorization': 'Basic d2ViX2FwcDo='
                    //     },
                    //     data: form
                    // }).then((response) => {
                    //     if (response.data.access_token) {
                    //         localStorage.setItem('access_token', response.data.access_token)
                    //         this.$router.push('/economy')
                    //     }
                    // }).catch((response) => {
                    //     if (response.response) {
                    //         if (response.response.status === 400) {
                    //             this.login_error = true
                    //             this.error = '用户名或密码错误，请重新输入'
                    //         }
                    //     } else {
                    //         this.login_error = true
                    //         this.error = '与服务器连接超时，请重试'
                    //     }
                    // })
                }
            },
            close(){
                this.swithCurrentModal({
                    'modalState':false
                })
            },
    }
}
</script>
<style scoped>
@import './map/createBrand.css';
</style>

<style>
    .brandModal{
        .ivu-modal-footer{
            border:none;
        }
        .ivu-modal-header {
            padding: 16px;
        }
        .ivu-modal-body{
           padding:0 16px 16px 22px;
        }
    }

    .brand_name_value{
        .ivu-select-input{
            color: rgba(23,35,61,0.25);
        }
    }

    .brand_position_value{
        .ivu-select-placeholder{
            color: rgba(28,36,56,0.56) !important;
        }
    }
    

</style>
