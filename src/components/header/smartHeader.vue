<template>
    <div id="top">
        <div class="headerTop">
            <div class="headerLeft">
                <img class="logo" :src="this.logo" width="185" height="31">
                <!-- <span class="brand">
                    <img src="../../assets/images/zhy.png" width="32" height="32">
                </span> -->
                <div class="components">
                    <seletctBrand></seletctBrand>
                    <Location></Location>
                </div>
            </div>
            <div class="email">
                <span class="icon-account_circle"></span>
                <span class="com">demo@tendcloud.com</span>
                <Poptip placement="bottom-end">
                    <Button>
                        <Icon type="chevron-down"></Icon>
                    </Button>
                    <div class="quit" slot="content" @click="quit">
                        <Icon type="android-exit"></Icon>退出登录
                    </div>
                </Poptip>
            </div>
        </div>
    </div>
</template>
<script>
import seletctBrand from './seletctBrand';
import Location from './Location';

export default {
    name: 'smartHeader',
    data() {
        return {
            brand: '',
            logo: this.$utils.$static + '/logo_ts.png'
        }
    },

    components: {
        seletctBrand,
        Location
    },
    mounted() {

    },
    computed: {},
    methods: {
        quit() {
            this.$router.push('/login');
        }
    }
}

</script>
<style scoped>
@import './header/header.css';

</style>
<style type="text/css">
.headerTop {
    .email {
        .ivu-poptip-popper {
            min-width: 124px
        }
        .ivu-poptip-body {
            padding: 13px 16px;
        }
    }
}

</style>
