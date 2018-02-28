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
        <Modal v-model="infoModel" width="262" :mask-closable="true" :title="tobeShop.name" id="circleInfo" class-name="infoModel circleInfo">
            <!--内容-->
            <template v-if="tobeShop.display">
                <ul>
                    <li>
                        <span>所在城市</span>{{tobeShop.city}}
                    </li>
                    <li>
                        <span>辐射半径</span>{{tobeShop.range}}m
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
import {
    mapState,
    mapGetters,
    mapMutations
} from 'vuex'

import qs from 'qs';

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
    props: {
        // drop: ''
    },
    watch: {
        // drop: {
        //     handler(newVal, val) {
        //         console.log(newVal)
        //         // if (newVal == true) {
        //         //     this.visible = true;
        //         // } else {
        //         //     this.visible = false;
        //         // }
        //     },
        //     deep: true
        // },
    },
    computed: {
        ...mapGetters(['circleListener', 'walkListener', 'driveListener'])
    },
    methods: {
        //添加点标注
        handler() {
            this.removeEvent();

            this.$Baidu.addEventListener("click", this.mapClick);

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
            var marker = this.$utils.drawMarker(point, 2);

            //画圆
            let circle = this.$utils.drawCircle(point, this.range);


            // circle.item = obj;
            circle.addEventListener("click", this.elementClick);


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
                let obj = {
                    x: e.clientX,
                    y: e.clientY
                }
                //获取像素坐标弹出框
                this.setPosition(obj, document.getElementsByClassName('circleModal')[0])
                this.circleModel = true;
            }

        },
        elementClick(e) {
            let item = e.target.item;
            let obj = {
                x: e.clientX,
                y: e.clientY
            }
            //获取像素坐标
            this.setPosition(obj, document.getElementsByClassName('circleInfo')[0])

            this.infoModel = true;
            this.tobeShop.display = true;
            this.tobeShop.city = '深圳';
            this.tobeShop.name = item.name;
            this.tobeShop.range = item.radius;
            this.tobeShop.area = item.area;

            this.selectedFence(e);
        },
        setPosition(pixel, dom) {
            let left = pixel.x;
            let top = pixel.y

            dom.style.position = 'absolute';
            dom.style.left = left + 'px';
            dom.style.top = top + 'px';
            dom.style.right = 'inherit';
            dom.style.bottom = 'inherit';
        },
        dataChange(item) {
            let circle = this.circles;
            circle.setRadius(item);
        },
        handleSubmit(name) {
            //解决2次点击的问题
            this.removeEvent();

            this.$refs[name].validate((valid) => {
                if (valid) {

                    /*****保存属性*****/
                    let obj = {
                        name: this.formValidate.name,
                        type: 2,
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
        },
        selectedFence(e) {
            //清除掉其他围栏的当前状态
            let list = this.$Baidu.getOverlays();
            list.map((item, index) => {
                if (item.type == 1 || item.type == 2) {
                    item.element.setFillOpacity(0.1);
                }
            })

            //增加选中围栏当前状态
            let element = e.target.element;
            element.setFillOpacity(0.6);
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
@import './map/circleTool.css'

</style>
