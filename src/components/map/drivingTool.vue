<template>
    <div id="drivingTool">
        <div @click="handler"><span class="icon-directions_car"></span>驾车时间</div>
        <Modal v-model="drivingModel" title="驾车时间" width="262" :closable="false" :mask-closable="false" id="drivingModal" class-name="circleModal drivingModal">
            <Form ref="formValidate" label-position="top" :model="formValidate" :rules="ruleValidate">
                <template>
                    <Form-item label="区域名称" prop="name">
                        <Input v-model="formValidate.name" placeholder="请输入区域名称"></Input>
                    </Form-item>
                </template>
                <template>
                    <div class="time">
                        <div class="head">
                            <div class="title">驾车时间</div>
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
    </div>
</template>
<script>
import qs from 'qs';
import mixin from '../../assets/js/driving.js'

export default {
    name: 'drivingTool',
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
            drivingModel: false
        }
    },
    mixins: [mixin],
    methods: {
        modalOpen() {
            this.drivingModel = true;
        },
        modalClose() {
            this.drivingModel = false;
        }
    }
}

</script>
<style>
@import './map/drivingTool.css'

</style>
