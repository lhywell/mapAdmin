<template>
    <div id="DropTools" class="dropTools">
        <Dropdown trigger="custom" :visible="dropDownShop">
            <Button type="primary" class="wl" @click="handleOpen">
                <span class="icon-fence"></span>
                <span class="title">
                    <Icon type="ios-plus-outline"></Icon>
                    <span class="i">添加意向门店</span>
                </span>
                <Icon type="chevron-down"></Icon>
            </Button>
            <Dropdown-menu slot="list">
                <Dropdown-item>
                    <circleTool></circleTool>
                </Dropdown-item>
                <Dropdown-item>
                    <walkingTool></walkingTool>
                </Dropdown-item>
                <Dropdown-item>
                    <drivingTool></drivingTool>
                </Dropdown-item>
            </Dropdown-menu>
        </Dropdown>
    </div>
</template>
<script>
import {
    mapState,
    mapGetters,
    mapMutations
} from 'vuex'

import circleTool from './circleTool'
import walkingTool from './walkingTool'
import drivingTool from './drivingTool'
export default {
    name: 'DropTools',
    data() {
        return {
            visible: true
        }
    },
    props: {},
    computed: {
        ...mapGetters(['dropDownShop'])
    },
    watch: {},
    components: {
        circleTool,
        walkingTool,
        drivingTool
    },
    mounted() {},
    updated() {},
    methods: {
        handleOpen() {
            if (this.dropDownShop == true) {
                // this.dropDownShop = false;
                this.$store.dispatch('setDropDownShop', false);
            } else {
                // this.dropDownShop = true;
                this.$store.dispatch('setDropDownShop', true);
            }
        }
    }
}

</script>
<style>
@import './map/dropTools.css'

</style>
