<template>
    <div id="seletctBrand">
        <Poptip placement="bottom-start" width="278" class="poptip" v-model="visible">
            <img src="http://smartdata.b0.upaiyun.com/thinkmark/zhouheiya.png" width="32" height="32" class="brand">
            <Button type="ghost">{{initText}}
                <Icon type="chevron-down"></Icon>
            </Button>
            <div class="api" slot="content">
                <template>
                    <div class="brandSelect">
                        <div class="title">
                            <span>选择品牌</span>
                            <a class="addbrand" @click="addBrand"><i class="icon-add"></i></a>
                        </div>
                        <ul>
                            <li v-for="item in brandList" :class="{active:item.active}">
                                <a href="#" @click="selectBrand">
                                    <div><img src="http://smartdata.b0.upaiyun.com/thinkmark/zhouheiya.png" width="32" height="32">{{item.name}}</div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </template>
            </div>
        </Poptip>
    </div>
</template>
<script>
export default {
    name: 'seletctBrand',
    data() {
        return {
            visible: false,
            brandList: [{
                "name": "周黑鸭",
                "active": true
            }],
            initText: '请选择',
        }
    },

    components: {},
    mounted() {
        this.initText = this.brandList[0].name;
    },
    computed: {},
    methods: {
        selectBrand(e) {
            this.initText = e.target.innerText;
            this.visible = false;
            return false;
        },
        addBrand() {
            this.visible = false;
            this.$store.dispatch('swtichNewBrandModal', { modalState: true })
        }
    }
}

</script>
<style>
@import './header/selectBrand.css';

</style>
