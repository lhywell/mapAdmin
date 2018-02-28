<template>
    <div class="population-matching__info">
        <div class="population-matching__info__con">
            <div class="population-matching__info__con--title">
                总人口
            </div>
            <div class="population-matching__info__con__subcon">
                <div class="population-matching__info__con__subcon--num">{{$utils.milliFormat(info.total)}}</div>
            </div>
        </div>
        <div class="population-matching__info__con population-matching__info__con--margin">
            <div class="population-matching__info__con--title">
                居住人口
            </div>
            <div class="population-matching__info__con__subcon">
                <div class="population-matching__info__con__subcon--num">{{$utils.milliFormat(info.live)}}</div>
                <div class="population-matching__info__con--scale">{{info.liveScale+'%'}}</div>
            </div>
        </div>
        <div class="population-matching__info__con population-matching__info__con--margin">
            <div class="population-matching__info__con--title">
                工作人口
            </div>
            <div class="population-matching__info__con__subcon">
                <div class="population-matching__info__con__subcon--num">{{$utils.milliFormat(info.work)}}</div>
                <div class="population-matching__info__con--scale">{{info.workScale+'%'}}</div>
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
                return {

                };
            }
        }
    },
    data() {
        return {
            info: {
                total: 0,
                live: 0,
                work: 0,
                liveScale: 0,
                workScale: 0,
            },
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
                this.info = {
                    total: this.data.total,
                    live: this.data.live,
                    work: this.data.work,
                    liveScale: parseInt(this.data.live / this.data.total*100),
                    workScale: parseInt(this.data.work / this.data.total*100)
                }
            }

        }
    }
}

</script>
<style>
@import './chart/module/population-matching/population-info.less'

</style>
