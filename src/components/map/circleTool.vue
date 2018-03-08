<template>
    <div id="circleTool">
        <div @click="handler"><span class="icon-circular"></span>辐射半径</div>
        <!--弹出层-->
        <Modal v-model="circleModel" width="262" :closable="false" :mask-closable="false" title="圆形" id="circleModal" class-name="circleModal">
            <!--内容-->
            <Form ref="formValidate" label-position="top" :model="formValidate" :rules="ruleValidate">
                <template>
                    <Form-item label="区域名称" prop="name">
                        <Input placeholder="请输入区域名称" v-model="formValidate.name"></Input>
                    </Form-item>
                </template>
                <template>
                    <div class="time">
                        <div class="head">
                            <div class="title">区域半径</div>
                            <span class="minute">{{range}}米</span>
                        </div>
                        <div class="slider">
                            <Slider v-model="range" :step="1" :min="1" :max="500" @on-input="dataChange">
                            </Slider>
                            <div class="text">
                                <span>1米</span>
                                <span>500米</span>
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
import {
    mapState,
    mapGetters,
    mapMutations
} from 'vuex'

import qs from 'qs';
import selfModel from '@/assets/js/selfModel'
import setCurDefault from '@/assets/js/setCurDefault'

export default {
    name: 'circleTool',
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
            circles: null,
            circleModel: false,
            range: 500,
            addEvent: '',
            marker: null,
            infoModel: false,
            tobeShop: {
                display: false,
                name: '',
                city: '',
                range: '',
                area: ''
            },
        }
    },
    computed: {
        ...mapGetters(['circleListener', 'walkListener', 'driveListener'])
    },
    mixins: [selfModel, setCurDefault],
    methods: {
        //添加点标注
        handler() {
            this.removeEvent();

            this.$Baidu.addEventListener("click", this.mapClick);

            this.$Baidu.setDefaultCursor("url(http://smartdata.b0.upaiyun.com/thinkmark/choose-stores.cur) 32 32,default");

            this.$store.dispatch('setCircleListener', this.mapClick);
            // console.log(1111,this.$store.state.map.dropDownShop)
            //关闭dropdown
            this.$store.dispatch('setDropDownShop', false);
        },
        clickinit() {
            this.formValidate.name = '';
            this.range = 500;
        },
        drawElement(e) {
            // console.log(e)
            let lng = e.point.lng,
                lat = e.point.lat;

            let point = this.$utils.drawLngLat(lng, lat);
            //画中心点标记
            var marker = this.$utils.drawFenceMarker(point, 1);

            //画圆
            let circle = this.$utils.drawCircle(point, this.range);


            // circle.item = obj;
            circle.addEventListener("click", this.elementClick);
            // circle.addEventListener("mouseover", this.elementClick);

            marker.addEventListener("click", this.elementClick);
            // marker.addEventListener("mouseover", this.elementClick);
            /*****保存属性*****/

            //画意向门店包括点和围栏,并且定义类型为2
            circle.type = 2;
            circle.element = circle;
            this.circles = circle;

            marker.type = 2;
            marker.element = circle;
            this.marker = marker;
            /*****保存属性*****/

            // this.$Baidu.setCenter(point);
            this.$Baidu.addOverlay(circle);
            this.$Baidu.addOverlay(marker);
        },
        mapClick(e) {
            // console.log(e)
            if (this.$Baidu) {
                // console.log('圆',e)
                this.clickinit();

                this.drawElement(e);

                //获取像素坐标弹出框
                this.setPosition(e, document.getElementsByClassName('circleModal')[0], 'new')
                this.circleModel = true;
            }

        },
        elementClick(e) {
            this.$store.dispatch('setSelfModal', {
                infoModal: true,
                infoTarget: e
            })
        },
        dataChange(item) {
            let circle = this.circles;
            circle.setRadius(item);
        },
        handleSubmit(name) {
            //在已有意向店区域内添加新意向店，添加完成后，不显示已有意向店弹层信息
            this.$store.dispatch('setSelfModal', {
                infoModal: false,
                infoTarget: undefined
            })

            this.setCurDefault();
            //解决2次点击的问题
            this.removeEvent();

            this.$refs[name].validate((valid) => {
                if (valid) {

                    /*****保存属性*****/
                    let obj = {
                        name: this.formValidate.name,
                        type: 2,
                        mode: 'circle',
                        radius: this.range,
                        area: Math.floor(Math.PI * Math.pow(this.range, 2))
                    }
                    this.circles.item = obj;
                    this.marker.item = obj;
                    /*****保存属性*****/

                    this.circleModel = false;
                } else {
                    this.$Message.error('表单验证失败!');
                }
            })
        },
        handleCancel() {
            //在已有意向店区域内添加新意向店，添加完成后，不显示已有意向店弹层信息
            this.$store.dispatch('setSelfModal', {
                infoModal: false,
                infoTarget: undefined
            })

            this.setCurDefault();

            //解决2次点击的问题
            this.removeEvent();
            //移除掉点和围栏
            this.$Baidu.removeOverlay(this.marker);
            this.$Baidu.removeOverlay(this.marker.element);

            this.circleModel = false;
            this.formValidate.name = '';
        },
        removeEvent() {
            if (this.walkListener) {
                this.$Baidu.removeEventListener("click", this.walkListener);
            }
            if (this.driveListener) {
                this.$Baidu.removeEventListener("click", this.driveListener);
            }
            if (this.circleListener) {
                this.$Baidu.removeEventListener("click", this.circleListener);
            }
        }
    }
}

</script>
<style>
@import './map/circleTool.css'

</style>
