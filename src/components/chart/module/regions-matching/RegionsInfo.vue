<template>
    <div class="regions-matching__info">
        <div class="regions-matching__info__con">
            <div class="regions-matching__info__con--title">
                周边小区
            </div>
            <div class="regions-matching__info__con__subcon" :style="{width:subConWidth/((Object.keys(info.community))||[]).length+'px'}">
                <div class="regions-matching__info__con__subcon--num">{{info.community.total}}</div>
                <div class="regions-matching__info__con__subcon--title">小区总数</div>
            </div>
            <div class="regions-matching__info__con__subcon" :style="{width:subConWidth/((Object.keys(info.community))||[]).length+'px'}">
                <div class="regions-matching__info__con__subcon--num">{{info.community.householdNum}}</div>
                <div class="regions-matching__info__con__subcon--title">总户数</div>
            </div>
        </div>
        <div class="regions-matching__info__con regions-matching__info__con--margin">
            <div class="regions-matching__info__con--title">
                周边办公
            </div>
            <div class="regions-matching__info__con__subcon" :style="{width:subConWidth/((Object.keys(info.office))||[]).length+'px'}">
                <div class="regions-matching__info__con__subcon--num">{{info.office.total}}</div>
                <div class="regions-matching__info__con__subcon--title">写字楼</div>
            </div>
            <div class="regions-matching__info__con__subcon" :style="{width:subConWidth/((Object.keys(info.office))||[]).length+'px'}">
                <div class="regions-matching__info__con__subcon--num">{{info.office.householdNum}}</div>
                <div class="regions-matching__info__con__subcon--title">总面积(m²)</div>
            </div>
        </div>
        <div class="regions-matching__info__con">
            <div class="regions-matching__info__con--title">
                周边商业
            </div>
            <div class="regions-matching__info__con__subcon" :style="{width:subConWidth/((Object.keys(info.commerce))||[]).length+'px'}">
                <div class="regions-matching__info__con__subcon--num">{{info.commerce.shopping}}</div>
                <div class="regions-matching__info__con__subcon--title">购物</div>
            </div>
            <div class="regions-matching__info__con__subcon" :style="{width:subConWidth/((Object.keys(info.commerce))||[]).length+'px'}">
                <div class="regions-matching__info__con__subcon--num">{{info.commerce.dining}}</div>
                <div class="regions-matching__info__con__subcon--title">餐饮</div>
            </div>
            <div class="regions-matching__info__con__subcon" :style="{width:subConWidth/((Object.keys(info.commerce))||[]).length+'px'}">
                <div class="regions-matching__info__con__subcon--num">{{info.commerce.amusement}}</div>
                <div class="regions-matching__info__con__subcon--title">休闲娱乐</div>
            </div>
        </div>
        <div class="regions-matching__info__con regions-matching__info__con--margin">
            <div class="regions-matching__info__con--title">
                交通配套
            </div>
            <div class="regions-matching__info__con__subcon" :style="{width:subConWidth/((Object.keys(info.traffic))||[]).length+'px'}">
                <div class="regions-matching__info__con__subcon--num">{{info.traffic.bus}}</div>
                <div class="regions-matching__info__con__subcon--title">公交</div>
            </div>
            <div class="regions-matching__info__con__subcon" :style="{width:subConWidth/((Object.keys(info.traffic))||[]).length+'px'}">
                <div class="regions-matching__info__con__subcon--num">{{info.traffic.subway}}</div>
                <div class="regions-matching__info__con__subcon--title">地铁</div>
            </div>
            <div class="regions-matching__info__con__subcon" :style="{width:subConWidth/((Object.keys(info.traffic))||[]).length+'px'}">
                <div class="regions-matching__info__con__subcon--num">{{info.traffic.park}}</div>
                <div class="regions-matching__info__con__subcon--title">停车场</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        data: {
            type: Object,
            default: function() {
                return {};
            }
        }
    },
    data() {
        return {
            subConWidth: 294 - 24 * 2, //24*2 padding-left padding-right
            info: {
                community: {
                    total: 0,
                    householdNum: 0
                },
                office: {
                    total: 0,
                    householdNum: 0
                },
                commerce: {
                    shopping: 0,
                    dining: 0,
                    amusement: 0
                },
                traffic: {
                    bus: 0,
                    subway: 0,
                    park: 0
                }
            }
        }
    },
    watch: {
        data(val, oldVal) {
            this.init();
        }
    },
    mounted() {},
    methods: {
        init() {
            if (this.data && (Object.keys(this.data)).length) {
                this.info = this.data;
            }
        }
    }
}

</script>
<style>
@import './chart/module/regions-matching/regions-info.less'

</style>
