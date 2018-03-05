<template>
    <Modal v-model="infoModel" width="262" :mask-closable="true" :title="name" id="infoModel" class-name="infoModel mapModel" @on-cancel="cancel">
        <template v-if="openShop.display">
            <ul>
                <li>
                    <span>所在城市</span>{{openShop.city}}
                </li>
                <li>
                    <span>月流水</span>{{this.$utils.milliFormat(openShop.amount)}}
                </li>
                <li>
                    <span>辐射半径</span>{{openShop.range}}m
                </li>
                <li>
                    <span>服务区域</span>{{this.$utils.milliFormat(openShop.area)}}㎡
                </li>
            </ul>
            <div class="">
                <Button type="ghost" size="large" class="toLocation" @click="toLocation()">区域洞察</Button>
            </div>
        </template>
        <template v-else-if="tobeShop.display">
            <ul>
                <li>
                    <span>所在城市</span>{{tobeShop.city}}
                </li>
                <li v-show="this.circle">
                    <span>辐射半径</span>{{tobeShop.range}}m
                </li>
                <li v-show="this.walking">
                    <span>步行时间</span>{{tobeShop.time}}分钟
                </li>
                <li v-show="this.driving">
                    <span>驾车时间</span>{{tobeShop.time}}分钟
                </li>
                <li>
                    <span>服务区域</span>{{this.$utils.milliFormat(tobeShop.area)}}㎡
                </li>
            </ul>
            <div class="">
                <Button type="ghost" size="large" class="toLocation" @click="toLocation()">区域洞察</Button>
            </div>
        </template>
        <template v-else="other.display">
            <ul>
                <li>
                    <span>所在城市</span>{{other.city}}
                </li>
            </ul>
        </template>
    </Modal>
</template>
<script>
import {
    mapState,
    mapGetters,
    mapMutations
} from 'vuex'

import selfModel from '@/assets/js/selfModel'

export default {
    name: 'DropTools',
    data() {
        return {
            infoModel: false,
            name: '',
            openShop: {
                display: false,
                city: '',
                amount: '',
                range: '200',
                area: '125,600'
            },
            tobeShop: {
                display: false,
                city: '',
                range: '200',
                area: '125,600',
                time: ''
            },
            other: {
                display: false,
                city: '',
            },
            circle: false,
            walking: false,
            driving: false,
        }
    },
    props: {},
    computed: {
        ...mapGetters(['infoModal', 'infoTarget']),
    },
    watch: {
        infoModal() {
            // console.log(this.infoModal)
            this.infoModel = this.infoModal;
        },
        infoTarget() {
            // console.log(this.infoTarget)
            let infoTarget = this.infoTarget;

            if (infoTarget) {
                let type = infoTarget.target.type;
                let item = infoTarget.target.item;

                this.setPosition(infoTarget, document.getElementsByClassName('mapModel')[0], type);

                this.name = item.name;
                // console.log(item)
                if (type == 1) {
                    this.openShop.display = true;
                    this.tobeShop.display = false;
                    this.openShop.city = item.city;
                    this.openShop.amount = item.amount;
                    this.openShop.area = item.area;

                    this.selectedFence(infoTarget);
                }
                if (type == 2 && item.mode != 'circle' && item.mode != 'walking' && item.mode != 'driving') {
                    this.tobeShop.display = true;
                    this.openShop.display = false;
                    this.circle = true;
                    this.driving = false;
                    this.walking = false;
                    this.tobeShop.city = item.city || '深圳';
                    this.tobeShop.range = item.content.radius;
                    this.tobeShop.area = item.area;

                    this.selectedFence(infoTarget);
                }
                if (type == 2 && item.mode == 'circle') {
                    this.tobeShop.display = true;
                    this.openShop.display = false;
                    this.circle = true;
                    this.driving = false;
                    this.walking = false;
                    this.tobeShop.city = item.city || '深圳';
                    this.tobeShop.range = item.radius;
                    this.tobeShop.area = item.area;

                    this.selectedFence(infoTarget);
                }
                if (type == 2 && item.mode == 'walking') {
                    this.tobeShop.display = true;
                    this.openShop.display = false;
                    this.walking = true;
                    this.driving = false;
                    this.circle = false;
                    this.tobeShop.city = item.city || '深圳';
                    this.tobeShop.area = item.area;
                    this.tobeShop.time = item.time;

                    this.selectedFence(infoTarget);
                }
                if (type == 2 && item.mode == 'driving') {
                    this.tobeShop.display = true;
                    this.openShop.display = false;
                    this.driving = true;
                    this.walking = false;
                    this.circle = false;
                    this.tobeShop.city = item.city || '深圳';
                    this.tobeShop.area = item.area;
                    this.tobeShop.time = item.time;

                    this.selectedFence(infoTarget);
                }
                if (type == 3 || type == 4) {
                    this.other.display = true;
                    this.openShop.display = false;
                    this.tobeShop.display = false;
                    this.other.city = item.city;
                }
            }

        }
    },
    components: {},
    mounted() {},
    updated() {},
    mixins: [selfModel],
    methods: {
        cancel() {
            this.$store.dispatch('setSelfModal', {
                infoModal: false
            })
        },
        selectedFence(e) {
            //清除掉其他围栏的当前状态
            let list = this.$Baidu.getOverlays();
            list.map((item, index) => {
                if (item.type == 1 || item.type == 2) {
                    item.element.setStrokeWeight(1);
                }
            })

            //增加选中围栏当前状态
            let element = e.target.element;
            element.setStrokeWeight(4);
        },
        toLocation() {
            this.$store.dispatch('setSelfModal', {
                infoModal: false
            })
            this.$store.dispatch('setStoreInfo', {
                id: 10000,
                name: '西单概念店', //商店名称
                coverage: 5, //辐射半径
                serviceArea: 6.8, //服务区域
            });
            //开启右侧面板
            this.$store.dispatch('setSwitchPanel', true);
        },
    }
}

</script>
<style>


</style>
