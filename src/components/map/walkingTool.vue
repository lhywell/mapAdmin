<template>
    <div id="walkingTool">
        <div @click="handler"><span class="icon-directions_walk"></span>步行时间</div>
        <Modal v-model="walkingModel" title="步行时间" width="262" :closable="false" :mask-closable="false" id="walkingModal" class-name="circleModal walkingModal">
            <Form ref="formValidate" label-position="top" :model="formValidate" :rules="ruleValidate">
                <template>
                    <Form-item label="区域名称" prop="name">
                        <Input v-model="formValidate.name" placeholder="请输入区域名称"></Input>
                    </Form-item>
                </template>
                <template>
                    <div class="time">
                        <div class="head">
                            <div class="title">步行时间</div>
                            <span class="minute">{{sliderValue}} 分钟</span>
                        </div>
                        <div class="slider">
                            <Slider v-model="sliderValue" :step="1" :min="1" :max="60"></Slider>
                            <div class="text">
                                <span>0分钟</span>
                                <span>60分钟</span>
                            </div>
                        </div>
                    </div>
                </template>
                <Form-item class="footer">
                    <Button type="ghost" size="large" class="cancle" @click="handleCancel()">取消</Button>
                    <Button type="primary" size="large" @click="handleSubmit('formValidate')" style="margin-left: 8px">保存</Button>
                </Form-item>
            </Form>
        </Modal>
        <Modal v-model="infoModel" width="262" :mask-closable="true" :title="tobeShop.name" id="walkingInfo" class-name="infoModel walkingInfo">
            <!--内容-->
            <template v-if="tobeShop.display">
                <ul>
                    <li>
                        <span>所在城市</span>{{tobeShop.city}}
                    </li>
                    <li>
                        <span>步行时间</span>{{tobeShop.time}}分钟
                    </li>
                    <li>
                        <span>服务区域</span>{{tobeShop.area}}㎡
                    </li>
                </ul>
                <div class="">
                    <Button type="ghost" size="large" class="toLocation" @click="toLocation()">区域洞察</Button>
                </div>
            </template>
        </Modal>
    </div>
</template>
<script>
import qs from 'qs';
import mixin from '../../assets/js/driving.js'

export default {
    name: 'walkingTool',
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
            sliderValue: 5,
            walkingModel: false,
            visible: false,
            infoModel: false,
            tobeShop: {
                display: false,
                city: '',
                name: '',
                time: '',
                area: ''
            },
        }
    },
    mixins: [mixin],
    methods: {
        modalOpen() {
            this.walkingModel = true;
        },
        modalClose() {
            this.walkingModel = false;
        },
        toLocation() {
            this.infoModel = false;
            this.$store.dispatch('setStoreInfo', {
                id: 10000,
                name: '西单概念店', //商店名称
                coverage: 5, //辐射半径
                serviceArea: 6800, //服务区域
            });
        }
    }
}

</script>
<style>
@import './map/walkingTool.css'

</style>
