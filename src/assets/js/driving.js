import {
    mapState,
    mapGetters,
    mapMutations
} from 'vuex'

export default {
    data() {
        return {
            location: '', //转换新坐标
            center: null, //中心点坐标
            marker: null,
            mode: '',
            reachType: 0, //到达圈类型，步行是2，驾车是1
            element: null
        }
    },
    computed: {
        ...mapGetters(['circleListener', 'walkListener', 'driveListener'])
    },
    methods: {
        handler(e) {
            this.removeEvent();

            if (e.target.innerText == "步行时间") {
                this.mode = 'walking';
                this.reachType = 2;
                this.$Baidu.addEventListener("click", this.mapClick);

                this.$store.dispatch('setWalkListener', this.mapClick);
            } else {
                this.mode = 'driving';
                this.reachType = 1;
                this.$Baidu.addEventListener("click", this.mapClick);

                this.$store.dispatch('setDriveListener', this.mapClick);
            }

            //关闭dropdown
            this.$store.dispatch('setDropDownShop', false);
        },
        clickinit() {
            this.formValidate.name = '';
        },
        drawMarker(e) {
            let lng = e.point.lng,
                lat = e.point.lat;
            //转换成国测局的坐标系
            this.toLD(lng, lat);

            let point = this.$utils.drawLngLat(lng, lat);
            this.center = point;

            //画中心点标记
            var marker = this.$utils.drawMarker(point, 2);

            /*****保存属性*****/
            //画意向门店包括点和围栏,并且定义类型为2
            marker.type = 2;
            this.marker = marker;
            /*****保存属性*****/

            this.$Baidu.addOverlay(marker);

        },
        mapClick(e) {
            if (this.$Baidu) {

                this.clickinit();

                this.drawMarker(e);
                let obj = {
                    x: e.clientX,
                    y: e.clientY
                }
                //获取像素坐标,弹出弹框
                this.setPosition(obj, document.getElementsByClassName(this.mode + 'Modal')[0])

                //显示弹出框
                this.modalOpen();
            }
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
        toLD(lng, lat) {
            //转换成国测局的坐标系
            let url = this.$utils.toLD(lng, lat);
            // console.log(url)
            this.$axios.get(url).then(response => {
                // console.log(response)
                if (response) {
                    let point = response.data.result[0];

                    this.location = point.x + ',' + point.y;
                }
            });
        },
        reachrange() {
            // console.log(url)
            const reachAsync = async() => {
                //调用立得的到达圈服务
                let type = this.reachType;
                let time = this.sliderValue;
                let url = this.$utils.reachrange(this.location, type, time);
                var responseA = await this.$axios.get(url);
                // console.log(2222, responseA)
                let bounds = responseA.data.result.bounds;

                //调用立得的面积
                let urlB = this.$utils.getArea(bounds);
                let responseB = await this.$axios.get(urlB);
                let area = Math.floor(parseFloat(responseB.data.result.polygonarea) * 1000);

                //转换成百度坐标系
                let urlC = this.$utils.toBaidu(bounds);
                let responseC = await this.$axios.get(urlC);
                let pathArray = responseC.data.result;
                // console.log(33333, responseB.data.result)
                let path = [];
                for (var i = 0, l = pathArray.length; i < l; ++i) {
                    let lng = pathArray[i].x;
                    let lat = pathArray[i].y;

                    let point = this.$utils.drawLngLat(Number(lng), Number(lat));

                    path.push(point);
                }

                //画多边形
                let polygon = this.$utils.drawPolygon(path);
                polygon.addEventListener("click", this.elementClick);

                // this.marker.element = polygon;

                /*****保存属性*****/
                let object = {
                    name: this.formValidate.name,
                    type: 2,
                    time: this.sliderValue,
                    area: area
                }
                polygon.type = 2;
                polygon.item = object;
                polygon.element = polygon;

                this.element = polygon;

                this.marker.item = object;
                this.marker.element = polygon;

                /*****保存属性*****/
                //
                this.$Baidu.setCenter(this.center);
                this.$Baidu.addOverlay(polygon);
            }
            reachAsync();
        },
        elementClick(e) {
            let item = e.target.item;
            let obj = {
                x: e.clientX,
                y: e.clientY
            }
            //获取像素坐标弹出框
            this.setPosition(obj, document.getElementsByClassName(this.mode + 'Info')[0])
            this.infoModel = true;

            this.tobeShop.display = true;
            this.tobeShop.city = '深圳';
            this.tobeShop.name = item.name;
            this.tobeShop.time = item.time;
            this.tobeShop.area = item.area;

            this.selectedFence(e);
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
        handleSubmit(name) {
            //解决2次点击的问题
            this.removeEvent();

            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.reachrange();

                    this.modalClose();
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

            this.modalClose();
            this.formValidate.name = '';
        }
    }
}
