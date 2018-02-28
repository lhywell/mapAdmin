<template>
    <div class="flow-matching__info">
        <div class="flow-matching__info__con">
            <div class="flow-matching__info__con--title">
                周总客流
            </div>
            <div class="flow-matching__info__con__subcon">
                <div class="flow-matching__info__con__subcon--num">{{$utils.milliFormat(passengerSumWeek)}}</div>
            </div>
        </div>
        <div class="flow-matching__info__con flow-matching__info__con--margin">
            <div class="flow-matching__info__con--title">
                月总客流
            </div>
            <div class="flow-matching__info__con__subcon">
                <div class="flow-matching__info__con__subcon--num">{{$utils.milliFormat(passengerSumMonth)}}</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        passengerSumWeek: {
            type: Number,
            default: 0
        },
        passengerSumMonth: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            
        }
    },
    watch: {
        passengerSumWeek(val, oldVal) {
        },
        passengerSumMonth(val, oldVal){

        }
    },
    mounted() {},
    methods: {
        init() {
            // this.info = this.data;
        }
    }
}

</script>
<style>
@import './chart/module/flow-matching/flow-info.less'

</style>
